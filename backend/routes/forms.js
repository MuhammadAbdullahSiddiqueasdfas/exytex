const express = require('express');
const router = express.Router();
const Joi = require('joi');
const FormSubmission = require('../models/FormSubmission');
const { sendNotificationEmail, sendConfirmationEmail } = require('../utils/emailService');

// Validation schemas for different form types
const baseSchema = {
  name: Joi.string().required().trim().min(2).max(100),
  email: Joi.string().email().required().trim(),
  phone: Joi.string().trim().allow(''),
  company: Joi.string().trim().allow(''),
  message: Joi.string().required().trim().min(10).max(1000),
  formType: Joi.string().required()
};

const contactFormSchema = Joi.object({
  ...baseSchema,
  service: Joi.string().allow('')
});

const itStaffingSchema = Joi.object({
  ...baseSchema,
  role: Joi.string().allow(''),
  duration: Joi.string().allow(''),
  teamSize: Joi.string().allow(''),
  startDate: Joi.date().allow('')
});

const digitalMarketingSchema = Joi.object({
  ...baseSchema,
  service: Joi.string().allow(''),
  budget: Joi.string().allow('')
});

const hireDeveloperSchema = Joi.object({
  ...baseSchema,
  projectType: Joi.string().allow(''),
  receiveUpdates: Joi.boolean().default(false)
});

// Get validation schema based on form type
function getValidationSchema(formType) {
  switch (formType) {
    case 'it-staffing':
      return itStaffingSchema;
    case 'digital-marketing':
      return digitalMarketingSchema;
    case 'hire-developer':
      return hireDeveloperSchema;
    default:
      return contactFormSchema;
  }
}

// Submit form endpoint
router.post('/submit', async (req, res) => {
  try {
    const { formType } = req.body;
    
    // Validate input based on form type
    const schema = getValidationSchema(formType);
    const { error, value } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }

    // Add metadata
    const submissionData = {
      ...value,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referer')
    };

    // Save to database
    const submission = new FormSubmission(submissionData);
    await submission.save();

    // Send emails asynchronously
    try {
      await Promise.all([
        sendConfirmationEmail(submission),
        sendNotificationEmail(submission)
      ]);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      submissionId: submission._id
    });

  } catch (error) {
    console.error('Form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit form',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get form submission by ID (for confirmation pages)
router.get('/submission/:id', async (req, res) => {
  try {
    const submission = await FormSubmission.findById(req.params.id).select('-adminNotes');
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      submission
    });

  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve submission'
    });
  }
});

// Get form statistics (public endpoint for analytics)
router.get('/stats', async (req, res) => {
  try {
    const stats = await FormSubmission.aggregate([
      {
        $group: {
          _id: '$formType',
          count: { $sum: 1 },
          latestSubmission: { $max: '$submittedAt' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const totalSubmissions = await FormSubmission.countDocuments();

    res.json({
      success: true,
      stats: {
        total: totalSubmissions,
        byType: stats
      }
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve statistics'
    });
  }
});

module.exports = router;