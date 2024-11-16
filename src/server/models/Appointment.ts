import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clinic',
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled',
  },
  price: {
    base: Number,
    adjustments: [{
      reason: String,
      amount: Number,
    }],
    final: Number,
  },
  notes: {
    preAppointment: String,
    postAppointment: String,
  },
  questionnaire: {
    completed: {
      type: Boolean,
      default: false,
    },
    responses: [{
      question: String,
      answer: mongoose.Schema.Types.Mixed,
    }],
  },
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'sms', 'push'],
    },
    scheduledFor: Date,
    sent: {
      type: Boolean,
      default: false,
    },
    sentAt: Date,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

appointmentSchema.index({ dateTime: 1, clinic: 1, staff: 1 });
appointmentSchema.index({ patient: 1, dateTime: -1 });

appointmentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);