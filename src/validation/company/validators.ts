import { Rule } from 'antd/es/form';
import { companyValidationRules } from './rules';

export const getCompanyNameRules = (language: 'en' | 'fr'): Rule[] => 
  companyValidationRules.companyName[language];

export const getAddressRules = (field: keyof typeof companyValidationRules.address): Rule[] =>
  companyValidationRules.address[field];

export const getContactRules = (field: keyof typeof companyValidationRules.contact): Rule[] =>
  companyValidationRules.contact[field];

export const getFinancialRules = (field: keyof typeof companyValidationRules.financials): Rule[] =>
  companyValidationRules.financials[field];

export const validateCompanyData = (values: any): Promise<void> => {
  const errors: string[] = [];

  // Validate company overview word count
  const wordCount = values.companyOverview?.trim().split(/\s+/).length || 0;
  if (wordCount < 150 || wordCount > 1000) {
    errors.push('Company overview must be between 150 and 1000 words');
  }

  // Validate addresses
  if (!values.addresses?.length) {
    errors.push('At least one address is required');
  }

  // Validate key contacts
  if (!values.keyContacts?.primaryContact) {
    errors.push('Primary contact information is required');
  }

  // Validate financials
  if (values.financials?.years?.length === 0) {
    errors.push('At least one year of financial data is required');
  }

  if (errors.length > 0) {
    return Promise.reject(errors);
  }

  return Promise.resolve();
};