import React from 'react';
import { motion } from 'framer-motion';
import FormInput from '../FormInput';

interface ClinicInfoStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

export default function ClinicInfoStep({ data, onUpdate }: ClinicInfoStepProps) {
  const handleChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Clinic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Full Name"
          value={data.fullName || ''}
          onChange={(e) => handleChange('fullName', e.target.value)}
          placeholder="Dr. John Doe"
          required
        />

        <FormInput
          label="Clinic Name"
          value={data.clinicName || ''}
          onChange={(e) => handleChange('clinicName', e.target.value)}
          placeholder="Modern Dental Clinic"
          required
        />

        <FormInput
          label="Email"
          type="email"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="doctor@example.com"
          required
        />

        <FormInput
          label="Phone"
          type="tel"
          value={data.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+1 (555) 000-0000"
          required
        />

        <div className="md:col-span-2">
          <FormInput
            label="Clinic Address"
            value={data.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="123 Medical Center Drive"
            required
          />
        </div>
      </div>
    </motion.div>
  );
}