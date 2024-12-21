import { collection, doc, setDoc, getDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { fileService } from './fileService';
import { CompanyError, CompanyErrorCodes } from './errors';
import type { CompanyInformation } from '../../types/company';

export const companyService = {
  async createCompany(data: CompanyInformation): Promise<string> {
    const batch = writeBatch(db);
    const companyRef = doc(collection(db, 'companies'));
    const companyId = companyRef.id;

    try {
      // Upload logo if exists
      let logoUrl = '';
      if (data.logo instanceof File) {
        const { url } = await fileService.uploadFile(data.logo, companyId, 'logos');
        logoUrl = url;
      }

      // Prepare company data
      const companyData = {
        ...data,
        logo: logoUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add main company document
      batch.set(companyRef, companyData);

      // Add addresses subcollection
      if (data.addresses?.length) {
        data.addresses.forEach((address, index) => {
          const addressRef = doc(collection(db, 'companies', companyId, 'addresses'));
          batch.set(addressRef, { ...address, order: index });
        });
      }

      // Add personnel subcollection
      if (data.keyContacts?.length) {
        data.keyContacts.forEach((contact, index) => {
          const contactRef = doc(collection(db, 'companies', companyId, 'personnel'));
          batch.set(contactRef, { ...contact, order: index });
        });
      }

      // Commit all changes
      await batch.commit();
      return companyId;
    } catch (error) {
      // Attempt to clean up any uploaded files
      if (data.logo instanceof File) {
        await fileService.deleteFile(companyId, 'logo', data.logo.name, 'logos').catch(console.error);
      }

      throw new CompanyError(
        'Failed to create company',
        CompanyErrorCodes.CREATE_FAILED,
        { error }
      );
    }
  },

  // ... rest of the service methods
};