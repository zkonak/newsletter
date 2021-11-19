import mailer from 'nodemailer'

// Creating a transporter
const sendMail = async (html_mail, clusterName, logger) => {
  const transporter = mailer.createTransport({
    host: process.env.MAIL_SMTP,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: MAIL_PASS
    }
  })

  // sending the email
  transporter.sendMail({
    from: process.env.MAIL_ADRESS,
    to: process.env[clusterName],
    subject: 'Scheduled Email',
    text: html_mail
  })
    .then(_ => { logger.log('warn', 'Email sent on ' + new Date()) })
    .catch(error => { logger.log('error', error) })
}
