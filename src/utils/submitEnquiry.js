/* =========================================================
   submitEnquiry
   Single place that talks to the Express backend, so the
   Contact and Dealers forms stay free of fetch details.

   The backend runs on http://localhost:5000 in development.
   Vite proxies "/api" to it (see vite.config.js), so no base
   URL is needed locally. On production set:

   VITE_API_BASE_URL=https://api.your-domain.com
========================================================= */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export const ENQUIRY_ENDPOINT = `${API_BASE}/api/contact`;

/* =========================================================
   SUBMIT
   Resolves with the parsed JSON body on success and throws
   an Error with a readable message on any failure.
========================================================= */

export async function submitEnquiry(payload) {
  let response;

  try {
    response = await fetch(ENQUIRY_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "We could not reach the server. Please check your connection or call us directly."
    );
  }

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || !data?.success) {
    throw new Error(
      data?.message || "Something went wrong. Please try again in a moment."
    );
  }

  return data;
}

/* =========================================================
   VALIDATION
   Returns an object of field -> message. Empty means valid.
========================================================= */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{8,18}$/;

export function validateEnquiry(values) {
  const errors = {};

  if (!values.fullName || values.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!values.email || !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.phone || !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message = "Please describe your requirement in at least 10 characters.";
  }

  return errors;
}
