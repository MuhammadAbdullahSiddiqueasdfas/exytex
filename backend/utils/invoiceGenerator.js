const PDFDocument = require('pdfkit');
const moment = require('moment');

const generateInvoicePDF = async ({ invoiceNumber, submission, amount, description }) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Header
      doc.fontSize(20)
         .fillColor('#667eea')
         .text('EXYTEX', 50, 50)
         .fontSize(10)
         .fillColor('#666')
         .text('Professional IT Services', 50, 75);

      // Invoice title
      doc.fontSize(24)
         .fillColor('#333')
         .text('INVOICE', 400, 50);

      // Invoice details
      doc.fontSize(10)
         .text(`Invoice #: ${invoiceNumber}`, 400, 80)
         .text(`Date: ${moment().format('MMMM DD, YYYY')}`, 400, 95)
         .text(`Due Date: ${moment().add(30, 'days').format('MMMM DD, YYYY')}`, 400, 110);

      // Line separator
      doc.moveTo(50, 140)
         .lineTo(550, 140)
         .stroke('#eee');

      // Bill to section
      doc.fontSize(12)
         .fillColor('#333')
         .text('Bill To:', 50, 160);

      doc.fontSize(10)
         .text(submission.name, 50, 180)
         .text(submission.email, 50, 195);

      if (submission.company) {
        doc.text(submission.company, 50, 210);
      }

      if (submission.phone) {
        doc.text(submission.phone, 50, 225);
      }

      // Service details section
      doc.fontSize(12)
         .text('Service Details:', 50, 270);

      // Table header
      doc.rect(50, 290, 500, 25)
         .fill('#f8f9fa')
         .stroke('#dee2e6');

      doc.fillColor('#333')
         .fontSize(10)
         .text('Description', 60, 300)
         .text('Form Type', 300, 300)
         .text('Amount', 450, 300);

      // Table row
      doc.rect(50, 315, 500, 25)
         .stroke('#dee2e6');

      doc.text(description || 'Professional Services', 60, 325)
         .text(submission.formType.toUpperCase(), 300, 325)
         .text(`$${amount}`, 450, 325);

      // Total section
      doc.rect(350, 360, 200, 25)
         .fill('#667eea')
         .stroke('#667eea');

      doc.fillColor('white')
         .fontSize(12)
         .text('Total Amount:', 360, 370)
         .text(`$${amount}`, 450, 370);

      // Payment terms
      doc.fillColor('#666')
         .fontSize(10)
         .text('Payment Terms:', 50, 420)
         .text('• Payment is due within 30 days of invoice date', 50, 440)
         .text('• Late payments may incur additional charges', 50, 455)
         .text('• Please include invoice number with payment', 50, 470);

      // Footer
      doc.fontSize(8)
         .fillColor('#999')
         .text('Thank you for choosing Exytex for your IT service needs!', 50, 550)
         .text('For questions about this invoice, please contact us at info@exytex.com', 50, 565);

      // Company details footer
      doc.text('Exytex | Professional IT Services | www.exytex.com', 50, 700, {
        align: 'center'
      });

      doc.end();

    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generateInvoicePDF
};