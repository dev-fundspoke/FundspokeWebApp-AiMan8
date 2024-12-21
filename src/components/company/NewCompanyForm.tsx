import React from 'react';
import { Form } from 'antd';
import { SciFiCard } from '../common/SciFiCard';
import { CompanyFormContent } from './sections/CompanyFormContent';
import { FormActions } from './FormActions';
import { LoadingState } from '../common/LoadingState';
import { useCompanyForm } from '../../hooks/useCompanyForm';
import { useOfflineSupport } from '../../hooks/useOfflineSupport';
import { useFormRetry } from '../../hooks/useFormRetry';
import { FormErrorBoundary } from '../error/FormErrorBoundary';
import type { CompanyInformation } from '../../types/company';

export const NewCompanyForm: React.FC = () => {
  const { form, handleSubmit, isSubmitting, isSaving } = useCompanyForm();
  const { isOnline } = useOfflineSupport();
  const { retry } = useFormRetry();

  const handleFormSubmit = async () => {
    if (!isOnline) {
      return;
    }
    await retry(handleSubmit);
  };

  if (isSubmitting) {
    return (
      <SciFiCard className="w-full p-6 md:p-8">
        <LoadingState message="Submitting form..." />
      </SciFiCard>
    );
  }

  return (
    <FormErrorBoundary>
      <SciFiCard className="w-full p-6 md:p-8">
        <Form<CompanyInformation>
          form={form}
          layout="vertical"
          className="w-full"
          requiredMark="optional"
          onFinish={handleFormSubmit}
          preserve={false}
        >
          <CompanyFormContent form={form} />
          
          <div className="flex justify-end mt-8 md:mt-12">
            <FormActions
              onSubmit={() => form.submit()}
              onClear={() => form.resetFields()}
              isSubmitting={isSubmitting}
              isSaving={isSaving}
              isOffline={!isOnline}
            />
          </div>
        </Form>
      </SciFiCard>
    </FormErrorBoundary>
  );
};