import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  title: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700">
        <motion.div
          className="h-full bg-primary-600"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Steps */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  isCompleted ? "bg-primary-600" : 
                  isCurrent ? "bg-primary-600" : 
                  "bg-gray-200 dark:bg-gray-700"
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-white" : "text-gray-500 dark:text-gray-400"
                  )}>
                    {index + 1}
                  </span>
                )}
              </motion.div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={cn(
                  "mt-2 text-sm font-medium",
                  isCurrent ? "text-primary-600 dark:text-primary-400" :
                  isCompleted ? "text-primary-600 dark:text-primary-400" :
                  "text-gray-500 dark:text-gray-400"
                )}
              >
                {step.title}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
}