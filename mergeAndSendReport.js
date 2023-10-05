const fs = require('fs')
const { merge } = require('mochawesome-merge')
const generator = require('mochawesome-report-generator')
const nodemailer = require('nodemailer')
const puppeteer = require('puppeteer')

async function main() {
  // Merge Mochawesome JSON reports
  const mergedReport = await merge({
    files: ['cypress/reports/mochawesome/*.json'],
  })

  // Generate HTML and JSON reports
  generator.create(mergedReport, {
    reportDir: 'cypress/reports/merge-reports',
    reportFilename: 'merged-report',
    reportTitle: 'Cypress Test Report',
    saveJson: true, // Generate JSON report
  })

  // Read the HTML report file
  const reportHtml = fs.readFileSync('cypress/reports/merge-reports/merged-report.html', 'utf8')

  // Use Puppeteer to generate a PDF from the HTML report
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(reportHtml)
  await page.pdf({ path: 'cypress/reports/merge-reports/merged-report.pdf', format: 'A4' })
  await browser.close()

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail'
    auth: {
      user: 'samsonpatrickhenry@gmail.com',
      pass: 'bjys mgqp dlhu vsjs',
    },
  })

  // Email options
  const mailOptions = {
    from: 'dummyst01@gmail.com',
    to: 'samsonpatrickhenry@gmail.com',
    subject: 'Cypress Test Report',
    html: reportHtml,
    attachments: [
      {
        filename: 'merged-report.pdf', // Attach PDF report
        path: 'cypress/reports/merge-reports/merged-report.pdf', // Path to the generated PDF
      },
    ],
  }

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error)
    } else {
      console.log('Email sent:', info.response)
    }
  })
}

main().catch((error) => {
  console.error('An error occurred:', error)
})