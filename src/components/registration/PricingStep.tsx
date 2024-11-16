import React from 'react';
import { motion } from 'framer-motion';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';

interface PricingStepProps {
  data: any;
  onUpdate: (data: any) => void;
}

const pricingMethods = [
  { value: 'fixed', label: 'Fixed Pricing' },
  { value: 'variable', label: 'Variable Pricing' },
  { value: 'insurance', label: 'Insurance-based' },
];

const timeSlots = [
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '45', label: '45 minutes' },
  { value: '60', label: '1 hour' },
];

export default function PricingStep({ data, onUpdate }: PricingStepProps) {
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
        Pricing & Scheduling
      </h2>

      <div className="space-y-6">
        <FormSelect
          label="Pricing Method"
          value={pricingMethods.find(m => m.value === data.pricingMethod)}
          onChange={(option) => handleChange('pricingMethod', option?.value)}
          options={pricingMethods}
          required
        />

        <FormSelect
          label="Average Treatment Duration"
          value={timeSlots.find(t => t.value === data.treatmentDuration)}
          onChange={(option) => handleChange('treatmentDuration', option?.value)}
          options={timeSlots}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Working Hours Start"
            type="time"
            value={data.workingHoursStart || ''}
            onChange={(e) => handleChange('workingHoursStart', e.target.value)}
            required
          />

          <FormInput
            label="Working Hours End"
            type="time"
            value={data.workingHoursEnd || ''}
            onChange={(e) => handleChange('workingHoursEnd', e.target.value)}
            required
          />
        </div>
      </div>
    </motion.div>
  );
}