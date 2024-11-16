import React from 'react';
import { motion } from 'framer-motion';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';

interface ProfessionalStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const specializations = [
  { value: 'general', label: 'General Dentistry' },
  { value: 'orthodontics', label: 'Orthodontics' },
  { value: 'pediatric', label: 'Pediatric Dentistry' },
  { value: 'periodontics', label: 'Periodontics' },
  { value: 'endodontics', label: 'Endodontics' },
  { value: 'oral-surgery', label: 'Oral Surgery' },
];

export default function ProfessionalStep({ data, onUpdate }: ProfessionalStepProps) {
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
        Professional Details
      </h2>

      <div className="space-y-6">
        <FormInput
          label="Years of Experience"
          type="number"
          min="0"
          value={data.experience || ''}
          onChange={(e) => handleChange('experience', e.target.value)}
          required
        />

        <FormSelect
          label="Specializations"
          isMulti
          value={specializations.filter(spec => data.specializations?.includes(spec.value))}
          onChange={(options) => handleChange('specializations', options.map(opt => opt.value))}
          options={specializations}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Professional Summary
          </label>
          <textarea
            value={data.summary || ''}
            onChange={(e) => handleChange('summary', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            placeholder="Brief overview of your professional experience and skills"
          />
        </div>
      </div>
    </motion.div>
  );
}