const fs = require('fs');
const { merge } = require('mochawesome-merge');
const generator = require('mochawesome-report-generator');
const nodemailer = require('nodemailer');

async function main() {
  // Merge Mochawesome JSON reports
  const mergedReport = await merge({
    files: ['cypress/reports/mochawesome/*.json'],
  });

  // Generate an HTML report
  generator.create(mergedReport, {
    reportDir: 'cypress/reports',
    reportFilename: 'merged-report.html',
    reportTitle: 'Cypress Test Report',
    saveJson: true,
  });

  // Read the HTML report file
  const reportHtml = fs.readFileSync('cypress/reports/merged-report.html', 'utf8');

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail'
    auth: {
      user: 'samsonpatrickhenry@gmail.com',
      pass: 'bjys mgqp dlhu vsjs',
    },
  });

  // Email options
  const mailOptions = {
    from: 'dummyst01@gmail.com',
    to: 'samsonpatrickhenry@gmail.com',
    subject: 'Cypress Test Report',
    html: reportHtml,
    attachments: [
      {
        filename: 'merged-report.html',
        content: reportHtml,
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

main().catch((error) => {
  console.error('An error occurred:', error);
});
