import { enquiryPackages, type EnquiryPackage } from '../data/site.ts';

// Australian mobiles and landlines, written with +61 (optionally "+61 (0)") or a
// leading 0, then an area code or mobile prefix (2, 3, 4, 7 or 8) and 8 more
// digits. 1300 / 1800 business numbers are accepted too.
const AU_PHONE = /^(?:(?:\+610?|0)[23478]\d{8}|1[38]00\d{6})$/;

// Spaces, brackets, dots and dashes are formatting only, so they're stripped
// before matching. An empty value is valid because the field is optional.
export const isValidPhone = (phone: string): boolean => {
  const digits = phone.trim().replace(/[\s().-]/g, '');
  return !digits || AU_PHONE.test(digits);
};

// Any script, apostrophes and hyphens are all fine; just ask for 2+ characters.
export const isValidName = (name: string): boolean => name.trim().length >= 2;

// Deliberately loose: something@something.tld. Formspree checks again on its side.
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

/** The form's fields, in the order they appear, so the first error is the first on screen. */
export const contactFields = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'enquiry',
  'message',
] as const;
export type ContactField = (typeof contactFields)[number];
export type ContactValues = Record<ContactField, string>;

/** The three enquiry types, sent to Formspree as these labels so the email reads plainly. */
export const enquiryTypes = ['New website', 'App or integration', 'Something else'] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

/** Which enquiry type a /contact?package= link preselects. */
export const enquiryForPackage: Record<EnquiryPackage, EnquiryType> = {
  starter: 'New website',
  professional: 'New website',
  custom: 'App or integration',
};

export const isEnquiryPackage = (value: string | null): value is EnquiryPackage =>
  value !== null && Object.hasOwn(enquiryPackages, value);

/** The message for one field, or '' when it's fine. */
export const validateField = (field: ContactField, value: string): string => {
  const v = value.trim();
  switch (field) {
    case 'firstName':
      if (!v) return 'Enter your first name.';
      return isValidName(v) ? '' : 'First name needs at least 2 characters.';
    case 'lastName':
      if (!v) return 'Enter your last name.';
      return isValidName(v) ? '' : 'Last name needs at least 2 characters.';
    case 'email':
      if (!v) return 'Enter your email address.';
      return isValidEmail(v) ? '' : 'Enter an email address like name@example.com.';
    case 'phone':
      return isValidPhone(v) ? '' : 'Enter an Australian phone number, or leave it blank.';
    case 'enquiry':
      return (enquiryTypes as readonly string[]).includes(v)
        ? ''
        : "Choose what you're getting in touch about.";
    case 'message':
      if (!v) return 'Tell me a little about what you need.';
      return v.length >= 10 ? '' : 'Your message needs at least 10 characters.';
  }
};

/** Every field's error, in form order; empty when the form can be sent. */
export const validateContact = (values: ContactValues): Partial<Record<ContactField, string>> => {
  const errors: Partial<Record<ContactField, string>> = {};
  for (const field of contactFields) {
    const message = validateField(field, values[field]);
    if (message) errors[field] = message;
  }
  return errors;
};

/** The email subject Formspree uses, so enquiries sort themselves in the inbox. */
export const enquirySubject = (enquiry: string, pkg?: EnquiryPackage): string => {
  const type = enquiry || 'Enquiry';
  return pkg ? `${type} (${enquiryPackages[pkg]}) from the website` : `${type} from the website`;
};
