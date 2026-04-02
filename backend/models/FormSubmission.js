const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
  // Common fields across all forms
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  
  // Form type identifier
  formType: {
    type: String,
    required: true,
    enum: [
      'contact',
      'it-staffing', 
      'digital-marketing',
      'about-contact',
      'hire-developer',
      'hi-tech',
      'general'
    ]
  },
  
  // Additional fields for specific forms
  service: String, // For contact and digital marketing forms
  role: String, // For IT staffing
  duration: String, // For IT staffing
  teamSize: String, // For IT staffing
  startDate: Date, // For IT staffing
  budget: String, // For digital marketing
  projectType: String, // For hire developer modal
  receiveUpdates: {
    type: Boolean,
    default: false
  },
  
  // Metadata
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  userAgent: String,
  referrer: String,
  
  // Admin fields
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'completed', 'archived'],
    default: 'new'
  },
  adminNotes: String,
  assignedTo: String,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Invoice related
  invoiceGenerated: {
    type: Boolean,
    default: false
  },
  invoiceNumber: String,
  invoiceDate: Date,
  invoiceAmount: Number
}, {
  timestamps: true
});

// Indexes for better query performance
formSubmissionSchema.index({ email: 1 });
formSubmissionSchema.index({ formType: 1 });
formSubmissionSchema.index({ status: 1 });
formSubmissionSchema.index({ submittedAt: -1 });

module.exports = mongoose.model('FormSubmission', formSubmissionSchema);