import sgMail from '@sendgrid/mail';
import configs from '../configs';
import mailTemplates from '../constants/mailTemplates';

sgMail.setApiKey(configs.sendGridApiKey);

const MailerService = {
  sendWelcomeMail: ({
    email,
    fullName
  }: {
    email: string;
    fullName: string;
  }) => {
    const msg: sgMail.MailDataRequired = {
      to: email,
      from: configs.sendGridEmail,
      subject: mailTemplates.welcome.subject,
      html: mailTemplates.welcome.html(fullName)
    };

    return sgMail.send(msg);
  }
};

export default MailerService;
