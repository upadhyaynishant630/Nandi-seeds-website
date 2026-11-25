const FEATURE_SPEC_ORDER = [
  ["plantHeight", "Plant height"],
  ["panicleLength", "Panicle length"],
  ["panicle", "Panicle"],
  ["plantType", "Plant characteristics"],
  ["tolerance", "Key trait"],
  ["growthHabit", "Growth habit"],
];

export function getProductCardSpecs(product) {
  const specs = product.specs ?? {};
  const rows = [
    { label: "Maturity", value: specs.maturity },
    { label: "Expected yield", value: specs.expectedYield },
  ].filter((row) => Boolean(row.value));

  const feature = FEATURE_SPEC_ORDER.find(([key]) => Boolean(specs[key]));

  if (feature) {
    rows.push({ label: feature[1], value: specs[feature[0]] });
  }

  return rows;
}
