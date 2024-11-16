import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
  },
});

const operatingHoursSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    required: true,
  },
  open: {
    type: String,
    required: true,
  },
  close: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
});

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  duration: {
    type: Number, // in minutes
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  dynamicPricing: {
    enabled: {
      type: Boolean,
      default: false,
    },
    minPrice: Number,
    maxPrice: Number,
    factors: [{
      name: String,
      weight: Number,
    }],
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
});

const staffSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    enum: ['dentist', 'hygienist', 'assistant', 'receptionist', 'manager'],
    required: true,
  },
  specializations: [String],
  schedule: [operatingHoursSchema],
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  }],
});

const clinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: locationSchema,
    required: true,
    index: '2dsphere',
  },
  operatingHours: [operatingHoursSchema],
  services: [serviceSchema],
  staff: [staffSchema],
  facilities: [{
    name: String,
    count: Number,
  }],
  analytics: {
    patientDistribution: {
      age: Map,
      gender: Map,
      location: Map,
    },
    peakHours: [{
      day: String,
      hour: Number,
      score: Number,
    }],
    competitiveIndex: {
      type: Number,
      default: 0,
    },
  },
  settings: {
    appointmentDuration: {
      type: Number,
      default: 30,
    },
    bufferTime: {
      type: Number,
      default: 15,
    },
    autoConfirm: {
      type: Boolean,
      default: false,
    },
    reminderSettings: {
      enabled: {
        type: Boolean,
        default: true,
      },
      timing: [{
        unit: String,
        value: Number,
      }],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for optimization
clinicSchema.index({ 'location.coordinates': '2dsphere' });
clinicSchema.index({ 'services.name': 'text', 'services.description': 'text' });

// Update timestamp on save
clinicSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Clinic = mongoose.model('Clinic', clinicSchema);