const express = require('express');
const router = express.Router();
const FormSubmission = require('../models/FormSubmission');
const { authMiddleware } = require('../middleware/auth');
const { generateInvoicePDF } = require('../utils/invoiceGenerator');

// Apply auth middleware to all admin routes
router.use(authMiddleware);

// Get dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const [
      totalSubmissions,
      todaySubmissions,
      weekSubmissions,
      monthSubmissions,
      statusCounts,
      formTypeCounts,
      recentSubmissions
    ] = await Promise.all([
      FormSubmission.countDocuments(),
      FormSubmission.countDocuments({ submittedAt: { $gte: startOfDay } }),
      FormSubmission.countDocuments({ submittedAt: { $gte: startOfWeek } }),
      FormSubmission.countDocuments({ submittedAt: { $gte: startOfMonth } }),
      FormSubmission.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      FormSubmission.aggregate([
        { $group: { _id: '$formType', count: { $sum: 1 } } }
      ]),
      FormSubmission.find()
        .sort({ submittedAt: -1 })
        .limit(10)
        .select('name email formType status submittedAt')
    ]);

    res.json({
      success: true,
      dashboard: {
        totals: {
          all: totalSubmissions,
          today: todaySubmissions,
          week: weekSubmissions,
          month: monthSubmissions
        },
        statusCounts,
        formTypeCounts,
        recentSubmissions
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard data'
    });
  }
});

// Get all form submissions with filtering and pagination
router.get('/submissions', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      formType,
      search,
      sortBy = 'submittedAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (formType) filter.formType = formType;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const [submissions, total] = await Promise.all([
      FormSubmission.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      FormSubmission.countDocuments(filter)
    ]);

    res.json({
      success: true,
      submissions,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve submissions'
    });
  }
});

// Get single submission by ID
router.get('/submissions/:id', async (req, res) => {
  try {
    const submission = await FormSubmission.findById(req.params.id);
    
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

// Update submission status and notes
router.put('/submissions/:id', async (req, res) => {
  try {
    const { status, adminNotes, assignedTo, priority } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (priority) updateData.priority = priority;

    const submission = await FormSubmission.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Submission updated successfully',
      submission
    });

  } catch (error) {
    console.error('Update submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update submission'
    });
  }
});

// Delete submission
router.delete('/submissions/:id', async (req, res) => {
  try {
    const submission = await FormSubmission.findByIdAndDelete(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Submission deleted successfully'
    });

  } catch (error) {
    console.error('Delete submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete submission'
    });
  }
});

// Generate invoice for submission
router.post('/submissions/:id/invoice', async (req, res) => {
  try {
    const { amount, description } = req.body;
    
    const submission = await FormSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Generate invoice number
    const invoiceNumber = `INV-${Date.now()}-${submission._id.toString().slice(-6)}`;
    
    // Update submission with invoice details
    submission.invoiceGenerated = true;
    submission.invoiceNumber = invoiceNumber;
    submission.invoiceDate = new Date();
    submission.invoiceAmount = amount;
    await submission.save();

    // Generate PDF
    const pdfBuffer = await generateInvoicePDF({
      invoiceNumber,
      submission,
      amount,
      description
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="invoice-${invoiceNumber}.pdf"`);
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Generate invoice error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate invoice'
    });
  }
});

// Export submissions to CSV
router.get('/export/csv', async (req, res) => {
  try {
    const { status, formType, startDate, endDate } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (formType) filter.formType = formType;
    if (startDate || endDate) {
      filter.submittedAt = {};
      if (startDate) filter.submittedAt.$gte = new Date(startDate);
      if (endDate) filter.submittedAt.$lte = new Date(endDate);
    }

    const submissions = await FormSubmission.find(filter).sort({ submittedAt: -1 });

    // Convert to CSV
    const csvHeaders = [
      'Name', 'Email', 'Phone', 'Company', 'Form Type', 'Status', 
      'Submitted At', 'Message', 'Service', 'Priority'
    ];
    
    const csvRows = submissions.map(sub => [
      sub.name,
      sub.email,
      sub.phone || '',
      sub.company || '',
      sub.formType,
      sub.status,
      sub.submittedAt.toISOString(),
      sub.message.replace(/"/g, '""'), // Escape quotes
      sub.service || '',
      sub.priority
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="submissions-export.csv"');
    res.send(csvContent);

  } catch (error) {
    console.error('Export CSV error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export data'
    });
  }
});

module.exports = router;