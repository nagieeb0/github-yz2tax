import React from 'react';
import { motion } from 'framer-motion';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';

interface StaffingStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const staffRoles = [
  { value: 'dentist', label: 'Dentist' },
  { value: 'hygienist', label: 'Dental Hygienist' },
  { value: 'assistant', label: 'Dental Assistant' },
  { value: 'receptionist', label: 'Receptionist' },
  { value: 'manager', label: 'Office Manager' },
];

export default function StaffingStep({ data, onUpdate }: StaffingStepProps) {
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
        Staff Information
      </h2>

      <div className="space-y-6">
        <FormInput
          label="Total Staff Count"
          type="number"
          min="1"
          value={data.staffCount || ''}
          onChange={(e) => handleChange('staffCount', e.target.value)}
          required
        />

        <FormSelect
          label="Staff Roles"
          isMulti
          value={staffRoles.filter(role => data.staffRoles?.includes(role.value))}
          onChange={(options) => handleChange('staffRoles', options.map(opt => opt.value))}
          options={staffRoles}
          required
        />

        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={data.hiringPlans || false}
              onChange={(e) => handleChange('hiringPlans', e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Planning to hire more staff in the next 6 months
            </span>
          </label>
        </div>
      </div>
    </motion.div>
  );
}