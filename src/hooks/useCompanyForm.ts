import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { showMessage } from '../components/common/ThemedMessage';
import { companyService } from '../services/company/companyService';
import { CompanyError } from '../services/company/errors';
import { useErrorRecovery } from './useErrorRecovery';
import type { CompanyInformation } from '../types/company';

export const useCompanyForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<CompanyInformation>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { startRecovery, clearRecoveryData } = useErrorRecovery();

  const handleError = useCallback((error: unknown) => {
    if (error instanceof CompanyError) {
      showMessage.error(error.message);
      console.error('Company error:', {
        code: error.code,
        context: error.context,
      });
      
      // Save form data for recovery
      startRecovery(form.getFieldsValue());
    } else {
      showMessage.error('An unexpected error occurred');
      console.error('Unexpected error:', error);
    }
  }, [form, startRecovery]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const values = await form.validateFields();
      const companyId = await companyService.createCompany({
        ...values,
        status: 'Active'
      });
      
      clearRecoveryData(); // Clear any saved recovery data
      showMessage.success('Company information submitted successfully');
      navigate('/new-company/confirmation', { state: { companyId } });
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, navigate, handleError, clearRecoveryData]);

  return {
    form,
    handleSubmit,
    isSubmitting,
    isSaving,
  };
};