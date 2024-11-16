import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  duration: {
    type: Number,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  dynamicPricing: {
    enabled: {
      type: Boolean,
      default: false,
    },
    factors: [{
      name: {
        type: String,
        enum: ['time', 'demand', 'location', 'competition'],
      },
      weight: {
        type: Number,
        min: 0,
        max: 1,
      },
    }],
    minPrice: Number,
    maxPrice: Number,
  },
  availability: {
    daysOfWeek: [{
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    }],
    timeSlots: [{
      start: String,
      end: String,
    }],
  },
  prerequisites: [{
    type: String,
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

serviceSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Service = mongoose.model('Service', serviceSchema);