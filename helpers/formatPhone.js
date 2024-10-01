const formatPhone = (phone) => {
  // Remove any non-digit characters from the phone number
  const digitsOnly = phone.replace(/\D/g, "");

  // If the phone number starts with "51", remove the "51" prefix
  const withoutPrefix = digitsOnly.startsWith("51")
    ? digitsOnly.slice(2)
    : digitsOnly;

  // If the resulting phone number has less than 9 digits, return an error
  if (withoutPrefix.length < 9) {
    throw new Error("Invalid phone number");
  }

  // If the resulting phone number has exactly 9 digits, format it with dashes
  if (withoutPrefix.length === 9) {
    return `51${ withoutPrefix }`;
  }

  // If the resulting phone number has more than 9 digits, take the first 9
  if (withoutPrefix.length > 9) {
    return `51${ withoutPrefix.slice(0, 9) }`;
  }

  // Otherwise, return the original phone number without formatting
  return digitsOnly;
};

module.exports = {
  formatPhone,
};
