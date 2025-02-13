const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "09.aatif@gmail.com",
    // pass: "zquapuanmdchhfml",
    pass: process.env.Email_Account_Password,
    //npm i dotenv
  },
});

const sendEmail = async (email, otp) => {
  const info = {
    from: "Aatif Jamshed",
    to: email,
    subject: "OTP Verification",
    html:
      `
    <div>
    <h2>OTP Verification</h2>
    <h3>Copy Right@AJ</h3>
    <p>Your One Time Password (OTP) is: Don't Not Share</p>
    <h4>OPT is:${otp}</h4>
    </div>
    `,
  };

  try {
    const resp = await transporter.sendMail(info);
    console.log("Message sent: %s", resp.messageId);
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }

};

module.exports = { sendEmail };