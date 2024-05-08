//import nodemailer from "nodemailer";

// transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: import.meta.env.VITE_MAILER_MAIL,
//       pass: import.meta.env.VITE_MAILER_PASS,
//     },
//   });

class mailingSystem {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: import.meta.env.VITE_MAILER_MAIL,
        pass: import.meta.env.VITE_MAILER_PASS,
      },
    });
  }
  sendSuccessfullyCreatedApplication(
    applicationMail,
    ApplicantName,
    durationOfInternship,
    applicationID
  ) {
    this.transporter.sendMail({
      from: "sneakpmail@gmail.com",
      to: applicationMail,
      subject: "Application successfully created",
      text: `Congratulations ${ApplicantName}, you have successfully created your application to ITEMS, UI to have ${durationOfInternship} internship. your application ID is ${applicationID}, it is important to take note of your application ID , as it would required to write your application test. `,
    });
  }
}

export const mailerExports = {
  mailingSystem,
};
