function validateEmail(email) {
  const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return email !== undefined && email.match(mailformat) !== null;
}

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
  // Assuming you want to validate the length of the card number
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
  validateEmail,
  validateName,
  validatePhone,
  validateCardLength,
  validateUpi,
  validateCvvLength,
};
