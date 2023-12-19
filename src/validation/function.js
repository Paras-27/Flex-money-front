function validateName(name) {
  if (name === undefined) return false;
  if (name.length > 150) return false;
  return /^[a-zA-Z ]+$/.test(name);
}

function validatePhone(phone) {
  if (phone === undefined) return false;
  return /^[0-9]{10}$/.test(phone);
}

function validateAge(dateOfBirth) {
  if (!dateOfBirth) return false;

  const dobDate = new Date(dateOfBirth);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dobDate.getFullYear();
  return age;
}

function validateCardLength(cardNo) {
  return cardNo.length === 16;
}

function validateCvvLength(cvvCode) {
  return cvvCode.length === 3;
}

function validateUpi(upiId) {
  return upiId !== undefined && upiId !== "";
}

export {
  validateAge,
  validateName,
  validatePhone,
  validateCardLength,
  validateUpi,
  validateCvvLength,
};
