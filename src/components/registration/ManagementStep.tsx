import React from 'react';
import { motion } from 'framer-motion';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';

interface ManagementStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const softwareOptions = [
  { value: 'none', label: 'No software currently' },
  { value: 'basic', label: 'Basic practice management' },
  { value: 'advanced', label: 'Advanced practice management' },
  { value: 'custom', label: 'Custom solution' },
];

export default function ManagementStep({ data, onUpdate }: ManagementStepProps) {
  const handleChange = (field: string, value: any) => {
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
        Practice Management
      </h2>

      <div className="space-y-6">
        <FormInput
          label="Number of Clinics"
          type="number"
          min="1"
          value={data.clinicCount || ''}
          onChange={(e) => handleChange('clinicCount', e.target.value)}
          required
        />

        <FormSelect
          label="Current Software Solution"
          value={softwareOptions.find(opt => opt.value === data.software)}
          onChange={(option) => handleChange('software', option?.value)}
          options={softwareOptions}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Main Challenges
          </label>
          <textarea
            value={data.challenges || ''}
            onChange={(e) => handleChange('challenges', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            placeholder="What are your main challenges in managing your practice?"
          />
        </div>
      </div>
    </motion.div>
  );
}