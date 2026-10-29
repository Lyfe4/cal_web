// Australian mobiles and landlines, written with +61 (optionally "+61 (0)") or a
// leading 0, then an area code or mobile prefix (2, 3, 4, 7 or 8) and 8 more
// digits. 1300 / 1800 business numbers are accepted too.
const AU_PHONE = /^(?:(?:\+610?|0)[23478]\d{8}|1[38]00\d{6})$/;

// Spaces, brackets, dots and dashes are formatting only, so they're stripped
// before matching. An empty value is valid because the field is optional.
export const isValidPhone = (phone) => {
  const digits = phone.trim().replace(/[\s().-]/g, '');
  return !digits || AU_PHONE.test(digits);
};

// Any script, apostrophes and hyphens are all fine; just ask for 2+ characters.
export const isValidName = (name) => name.trim().length >= 2;
