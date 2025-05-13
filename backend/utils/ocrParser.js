// Parses OCR text to extract relevant fields
function parseOCRText(text) {
  const amount = extractAmount(text);
  const date = extractDate(text);
  const merchant = extractMerchant(text);
  return { amount, date, merchant };
}
