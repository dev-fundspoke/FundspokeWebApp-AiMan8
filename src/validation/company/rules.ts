import type { Rule } from 'antd/es/form';
import { validateSocialMediaLinks } from '../../utils/formValidation';

export const companyValidationRules = {
  companyName: {
    en: [
      { required: true, message: 'Company name in English is required' },
      { min: 2, message: 'Company name must be at least 2 characters' },
      { max: 100, message: 'Company name cannot exceed 100 characters' },
      { pattern: /^[a-zA-Z0-9\s\-&.]+$/, message: 'Company name can only contain letters, numbers, spaces, and -&.' }
    ],
    fr: [
      { required: true, message: 'Company name in French is required' },
      { min: 2, message: 'Company name must be at least 2 characters' },
      { max: 100, message: 'Company name cannot exceed 100 characters' },
      { pattern: /^[a-zA-ZÀ-ÿ0-9\s\-&.]+$/, message: 'Company name can only contain letters, numbers, spaces, and -&.' }
    ]
  },
  companyOverview: [
    { required: true, message: 'Company overview is required' },
    { min: 150, message: 'Overview must be at least 150 words' },
    { max: 1000, message: 'Overview cannot exceed 1000 words' }
  ],
  legalName: [
    { required: true, message: 'Legal name is required' },
    { min: 2, message: 'Legal name must be at least 2 characters' },
    { max: 100, message: 'Legal name cannot exceed 100 characters' }
  ],
  corporationNumber: [
    { required: true, message: 'Corporation number is required' },
    { pattern: /^[A-Z0-9-]+$/, message: 'Corporation number must contain only uppercase letters, numbers, and hyphens' }
  ],
  naicsCode: [
    { pattern: /^\d{6}$/, message: 'NAICS code must be exactly 6 digits' }
  ],
  federalBusinessRegistryNumber: [
    { pattern: /^\d{9}$/, message: 'Federal business registry number must be exactly 9 digits' }
  ],
  address: {
    line1: [
      { required: true, message: 'Address line 1 is required' },
      { max: 100, message: 'Address line 1 cannot exceed 100 characters' }
    ],
    line2: [
      { max: 100, message: 'Address line 2 cannot exceed 100 characters' }
    ],
    city: [
      { required: true, message: 'City is required' },
      { pattern: /^[a-zA-Z\s-]+$/, message: 'City can only contain letters, spaces, and hyphens' }
    ],
    state: [
      { required: true, message: 'State/Province is required' }
    ],
    zipCode: [
      { required: true, message: 'Postal code is required' },
      { pattern: /^[A-Z0-9\s-]+$/i, message: 'Please enter a valid postal code' }
    ],
    country: [
      { required: true, message: 'Country is required' }
    ]
  },
  contact: {
    name: [
      { required: true, message: 'Name is required' },
      { pattern: /^[a-zA-Z\s-]+$/, message: 'Name can only contain letters, spaces, and hyphens' }
    ],
    email: [
      { required: true, message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email address' }
    ],
    phone: [
      { required: true, message: 'Phone number is required' },
      { pattern: /^\+?[\d\s-()]+$/, message: 'Please enter a valid phone number' }
    ],
    linkedIn: [
      { type: 'url', message: 'Please enter a valid LinkedIn URL' },
      { pattern: /^https:\/\/[w.]*linkedin\.com\/.*$/, message: 'Please enter a valid LinkedIn URL' }
    ]
  },
  financials: {
    revenue: [
      { required: true, message: 'Revenue is required' },
      { type: 'number', min: 0, message: 'Revenue must be a positive number' }
    ],
    profit: [
      { required: true, message: 'Profit/Loss is required' },
      { type: 'number', message: 'Profit/Loss must be a number' }
    ],
    rdExpense: [
      { required: true, message: 'R&D expense is required' },
      { type: 'number', min: 0, message: 'R&D expense must be a positive number' }
    ]
  },
  socialMedia: [
    { validator: validateSocialMediaLinks }
  ]
} as const;