import React from 'react';
import { Collapse } from 'antd';
import { CompanyInformation } from './CompanyInformation';
import { CompanyLogo } from './form-sections/CompanyLogo';
import { Addresses } from './form-sections/Addresses';
import { DocumentLibrary } from './form-sections/DocumentLibrary';
import { Personnel } from './form-sections/Personnel';
import { EmployeeCount } from './form-sections/employee-count/EmployeeCount';
import { KeyContacts } from './form-sections/key-contacts/KeyContacts';
import { IPPortfolio } from './form-sections/ip-portfolio/IPPortfolio';
import { TechnologyDescription } from './form-sections/technology-description/TechnologyDescription';
import { Financials } from './form-sections/financials/Financials';
import { InvestmentHistory } from './form-sections/investment-history/InvestmentHistory';
import { DebtInformation } from './form-sections/debt-information/DebtInformation';
import { Projections } from './form-sections/projections/Projections';
import type { FormInstance } from 'antd/es/form';

interface CompanyFormContentProps {
  form: FormInstance;
}

export const CompanyFormContent: React.FC<CompanyFormContentProps> = ({ form }) => {
  const items = [
    {
      key: 'companyInfo',
      label: 'Company Information',
      children: <CompanyInformation form={form} />
    },
    {
      key: 'companyLogo',
      label: 'Company Logo',
      children: <CompanyLogo />
    },
    {
      key: 'addresses',
      label: 'Addresses',
      children: <Addresses />
    },
    {
      key: 'documents',
      label: 'Document Library',
      children: <DocumentLibrary />
    },
    {
      key: 'personnel',
      label: 'Personnel',
      children: <Personnel />
    },
    {
      key: 'employeeCount',
      label: 'Employee Count',
      children: <EmployeeCount />
    },
    {
      key: 'keyContacts',
      label: 'Key Contacts',
      children: <KeyContacts />
    },
    {
      key: 'ipPortfolio',
      label: 'IP Portfolio',
      children: <IPPortfolio />
    },
    {
      key: 'technologyDescription',
      label: 'Technology Description',
      children: <TechnologyDescription />
    },
    {
      key: 'financials',
      label: 'Financials',
      children: <Financials />
    },
    {
      key: 'investmentHistory',
      label: 'Investment History',
      children: <InvestmentHistory />
    },
    {
      key: 'debtInformation',
      label: 'Debt Information',
      children: <DebtInformation />
    },
    {
      key: 'projections',
      label: 'Projections',
      children: <Projections />
    }
  ];

  return (
    <div className="space-y-8">
      <Collapse
        defaultActiveKey={['companyInfo']}
        className="company-info-form"
        items={items}
      />
    </div>
  );
};