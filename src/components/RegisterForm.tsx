import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import ProgressBar from './ProgressBar';
import ClinicInfoStep from './registration/ClinicInfoStep';
import PricingStep from './registration/PricingStep';
import StaffingStep from './registration/StaffingStep';
import ManagementStep from './registration/ManagementStep';
import JobSeekerInfoStep from './registration/JobSeekerInfoStep';
import ProfessionalStep from './registration/ProfessionalStep';
import PreferencesStep from './registration/PreferencesStep';

interface RegisterFormProps {
  userType: 'clinic' | 'jobseeker';
  onClose: () => void;
}

const clinicSteps = [
  { id: 'clinic-info', title: 'Clinic Info' },
  { id: 'pricing', title: 'Pricing' },
  { id: 'staffing', title: 'Staffing' },
  { id: 'management', title: 'Management' }
];

const jobSeekerSteps = [
  { id: 'personal-info', title: 'Personal Info' },
  { id: 'professional', title: 'Professional' },
  { id: 'preferences', title: 'Preferences' }
];

export default function RegisterForm({ userType, onClose }: RegisterFormProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const steps = userType === 'clinic' ? clinicSteps : jobSeekerSteps;

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // TODO: Implement form submission
      console.log('Form submitted:', formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const renderStep = () => {
    if (userType === 'clinic') {
      switch (currentStep) {
        case 0:
          return <ClinicInfoStep data={formData} onUpdate={updateFormData} />;
        case 1:
          return <PricingStep data={formData} onUpdate={updateFormData} />;
        case 2:
          return <StaffingStep data={formData} onUpdate={updateFormData} />;
        case 3:
          return <ManagementStep data={formData} onUpdate={updateFormData} />;
        default:
          return null;
      }
    } else {
      switch (currentStep) {
        case 0:
          return <JobSeekerInfoStep data={formData} onUpdate={updateFormData} />;
        case 1:
          return <ProfessionalStep data={formData} onUpdate={updateFormData} />;
        case 2:
          return <PreferencesStep data={formData} onUpdate={updateFormData} />;
        default:
          return null;
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar steps={steps} currentStep={currentStep} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
      >
        {renderStep()}

        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={cn(
              "px-6 py-2 rounded-lg text-sm font-medium transition-colors",
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            Back
          </button>

          <button
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}