import React from 'react';
import { motion } from 'framer-motion';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';

interface PreferencesStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const availabilityOptions = [
  { value: 'immediate', label: 'Immediate' },
  { value: '2-weeks', label: '2 weeks notice' },
  { value: '1-month', label: '1 month notice' },
  { value: 'flexible', label: 'Flexible' },
];

const workTypeOptions = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'locum', label: 'Locum' },
];

export default function PreferencesStep({ data, onUpdate }: PreferencesStepProps) {
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
        Job Preferences
      </h2>

      <div className="space-y-6">
        <FormSelect
          label="Availability"
          value={availabilityOptions.find(opt => opt.value === data.availability)}
          onChange={(option) => handleChange('availability', option?.value)}
          options={availabilityOptions}
          required
        />

        <FormSelect
          label="Preferred Work Type"
          isMulti
          value={workTypeOptions.filter(type => data.workTypes?.includes(type.value))}
          onChange={(options) => handleChange('workTypes', options.map(opt => opt.value))}
          options={workTypeOptions}
          required
        />

        <FormInput
          label="Expected Salary (Annual)"
          type="number"
          min="0"
          value={data.expectedSalary || ''}
          onChange={(e) => handleChange('expectedSalary', e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Additional Requirements
          </label>
          <textarea
            value={data.requirements || ''}
            onChange={(e) => handleChange('requirements', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
            placeholder="Any specific requirements or preferences for your next position"
          />
        </div>
      </div>
    </motion.div>
  );
}