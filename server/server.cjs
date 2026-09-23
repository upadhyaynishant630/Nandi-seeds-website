/* =========================================================
   NANDI SEEDS - BACKEND API
   Express + optional MySQL storage + optional SMTP email.

   Endpoints
     GET  /            health check
     POST /api/contact enquiry form (contact + dealer)

   The server degrades gracefully: if MySQL or SMTP env
   variables are missing it still accepts the enquiry and
   logs it, so the front end works during local development.
========================================================= */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

/* =====================================================
   OPTIONAL INTEGRATIONS
   Loaded lazily so a missing package or bad credentials
   never stops the API from starting.
===================================================== */

let db = null;
let transporter = null;

function setupDatabase() {
  if (!process.env.DB_HOST || !process.env.DB_NAME) {
    console.warn("MySQL not configured - enquiries will only be logged.");
    return;
  }

  try {
    const mysql = require("mysql2/promise");

    db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT || 3306),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log("MySQL pool created.");
  } catch (error) {
    console.error("MySQL setup failed:", error.message);
    db = null;
  }
}

function setupMailer() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.warn("SMTP not configured - notification emails are disabled.");
    return;
  }

  try {
    const nodemailer = require("nodemailer");

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    console.log("SMTP transport created.");
  } catch (error) {
    console.error("SMTP setup failed:", error.message);
    transporter = null;
  }
}

/* =====================================================
   MIDDLEWARE
===================================================== */

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

/* =====================================================
   HELPERS
===================================================== */

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEnquiryId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const salt = crypto.randomBytes(2).toString("hex").toUpperCase();

  return `NS-${stamp}-${salt}`;
}

/* =====================================================
   HEALTH CHECK
===================================================== */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Nandi Seeds enquiry API is running.",
    database: db ? "connected" : "disabled",
    mailer: transporter ? "connected" : "disabled",
  });
});

/* =====================================================
   ENQUIRY VALIDATION
===================================================== */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readEnquiry(body) {
  const formType = body.formType === "dealer" ? "dealer" : "contact";

  const enquiry = {
    formType,
    fullName: String(body.fullName || "").trim(),
    email: String(body.email || "").trim(),
    phone: String(body.phone || "").trim(),
    subject: String(body.subject || "Seed Enquiry").trim(),
    message: String(body.message || "").trim(),
    businessName: String(body.businessName || "").trim(),
    district: String(body.district || "").trim(),
    state: String(body.state || "").trim(),
    monthlyVolume: String(body.monthlyVolume || "").trim(),
  };

  const errors = [];

  if (enquiry.fullName.length < 2) {
    errors.push("A valid full name is required.");
  }

  if (!EMAIL_PATTERN.test(enquiry.email)) {
    errors.push("A valid email address is required.");
  }

  if (enquiry.phone.length < 8) {
    errors.push("A valid phone number is required.");
  }

  if (enquiry.message.length < 10) {
    errors.push("Please describe the requirement in a few more words.");
  }

  if (enquiry.formType === "dealer" && !enquiry.businessName) {
    errors.push("The business name is required for a dealership enquiry.");
  }

  return { enquiry, errors };
}

/* =====================================================
   POST /api/contact
===================================================== */

app.post("/api/contact", async (req, res) => {
  console.log("\n======================================");
  console.log("NEW ENQUIRY RECEIVED");
  console.log("======================================");

  try {
    const { enquiry, errors } = readEnquiry(req.body || {});

    if (errors.length > 0) {
      console.warn("Validation failed:", errors.join(" "));

      return res.status(400).json({
        success: false,
        message: errors[0],
      });
    }

    const enquiryId = buildEnquiryId();

    console.log(`Enquiry ID : ${enquiryId}`);
    console.log(`Type       : ${enquiry.formType}`);
    console.log(`Name       : ${enquiry.fullName}`);
    console.log(`Contact    : ${enquiry.email} / ${enquiry.phone}`);

    /* =================================================
       PERSIST (OPTIONAL)
    ================================================= */

    if (db) {
      try {
        await db.execute(
          `INSERT INTO enquiries
             (enquiry_id, form_type, full_name, email, phone, subject,
              message, business_name, district, state, monthly_volume)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            enquiryId,
            enquiry.formType,
            enquiry.fullName,
            enquiry.email,
            enquiry.phone,
            enquiry.subject,
            enquiry.message,
            enquiry.businessName || null,
            enquiry.district || null,
            enquiry.state || null,
            enquiry.monthlyVolume || null,
          ]
        );

        console.log("Enquiry saved to MySQL.");
      } catch (dbError) {
        console.error("MySQL insert failed:", dbError.message);
      }
    }

    /* =================================================
       NOTIFY (OPTIONAL)
    ================================================= */

    if (transporter) {
      const fromName = process.env.MAIL_FROM_NAME || "Nandi Seeds Website";
      const toSales = process.env.MAIL_TO_SALES || process.env.SMTP_USER;

      const isDealer = enquiry.formType === "dealer";

      const detailRows = [
        ["Enquiry ID", enquiryId],
        ["Type", isDealer ? "Dealer application" : "General enquiry"],
        ["Name", enquiry.fullName],
        ["Email", enquiry.email],
        ["Phone", enquiry.phone],
        ["Subject", enquiry.subject],
      ];

      if (isDealer) {
        detailRows.push(
          ["Business", enquiry.businessName],
          ["District", enquiry.district],
          ["State", enquiry.state],
          ["Monthly volume", enquiry.monthlyVolume]
        );
      }

      const rowsHtml = detailRows
        .filter(([, value]) => value)
        .map(
          ([label, value]) =>
            `<tr>
               <td style="padding:8px 12px;font-weight:600;color:#14562b;">${escapeHtml(
                 label
               )}</td>
               <td style="padding:8px 12px;color:#2c3a31;">${escapeHtml(
                 value
               )}</td>
             </tr>`
        )
        .join("");

      try {
        await transporter.sendMail({
          from: `"${fromName}" <${process.env.SMTP_USER}>`,
          to: toSales,
          replyTo: enquiry.email,
          subject: `${isDealer ? "Dealer" : "Website"} Enquiry #${enquiryId} - ${
            enquiry.fullName
          }`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;">
              <h2 style="color:#14562b;">
                ${isDealer ? "New Dealer Application" : "New Website Enquiry"}
              </h2>

              <table style="width:100%;border-collapse:collapse;margin:18px 0;">
                ${rowsHtml}
              </table>

              <div style="background:#f5f9f5;padding:18px;border-radius:10px;">
                <strong style="color:#14562b;">Message</strong>
                <p style="color:#2c3a31;line-height:1.6;">
                  ${escapeHtml(enquiry.message)}
                </p>
              </div>
            </div>
          `,
        });

        console.log("Notification email sent.");
      } catch (mailError) {
        console.error("Notification email failed:", mailError.message);
      }

      try {
        await transporter.sendMail({
          from: `"${fromName}" <${process.env.SMTP_USER}>`,
          to: enquiry.email,
          subject: `We received your enquiry - Nandi Seeds #${enquiryId}`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;">
              <h2 style="color:#14562b;">
                Thank you, ${escapeHtml(enquiry.fullName)}!
              </h2>

              <p style="color:#2c3a31;line-height:1.6;">
                We have received your enquiry and our team will get back to
                you within one working day.
              </p>

              <div style="background:#e7f4ea;padding:16px;border-radius:10px;margin:20px 0;">
                <strong>Reference: #${enquiryId}</strong>
              </div>

              <p style="color:#2c3a31;line-height:1.6;">
                Regards,<br />
                <strong>Nandi Seeds</strong>
              </p>
            </div>
          `,
        });

        console.log("Customer confirmation email sent.");
      } catch (mailError) {
        console.error("Customer email failed:", mailError.message);
      }
    }

    /* =================================================
       SUCCESS
    ================================================= */

    return res.status(201).json({
      success: true,
      message:
        enquiry.formType === "dealer"
          ? "Thank you! Your dealership application has been received. Our regional manager will contact you within three working days."
          : "Thank you! Your enquiry has been received. Our team will contact you shortly.",
      enquiryId,
    });
  } catch (error) {
    console.error("ENQUIRY SUBMISSION ERROR");
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message:
        "We could not process your enquiry right now. Please try again or call us directly.",
      error:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

/* =====================================================
   START
===================================================== */

function startServer() {
  setupDatabase();
  setupMailer();

  app.listen(PORT, () => {
    console.log("======================================");
    console.log("NANDI SEEDS ENQUIRY API");
    console.log("======================================");
    console.log(`Listening on http://localhost:${PORT}`);
    console.log(`CORS origin ${FRONTEND_URL}`);
    console.log("======================================");
  });
}

startServer();
