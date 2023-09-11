const config = require("../config/auth.config");
let User = require("../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}).then((user) => {
        if (!user) return res.status(400).json({msg: "User does not exist"});

        // Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) return res.status(400).json({msg: "Invalid password credentials"});

            const token = jwt.sign({id: user.id, role: user.role},
                config.secret,
                {
                    algorithm: 'HS256',
                    allowInsecureKeySizes: true,
                    expiresIn: 86400, // 24 hours
                });

            res.cookie("access_token", token, {httpOnly: true}).status(200).send({
                id: user._id,
                email: user.email,
                role: user.role,
                msg: "login",
                token:token
            });
            console.log("Access-token", token)
        });
    });
}
const logout = (req, res) => {
    req.session.destroy((err) => {
        //delete session data from store, using sessionID in cookie
        if (err) throw err;
        res.clearCookie("id"); // clears cookie containing expired sessionID
        res.send("Logged out successfully");
    });
}






//forgot password

const transporter = nodemailer.createTransport({
    host: 'Gmail',
    auth: {
        user: '3rdyeargroupproject2023@gmail.com', // your email address
        pass: 'ucsc@2023', // your email password
    },
});
const sendResetPasswordEmail = (userEmail, resetToken) => {
    const mailOptions = {
        from: '3rdyeargroupproject2023@gmail.com', // your email address
        to: userEmail, // recipient's email address
        subject: 'Password Reset',
        text: `Click the following link to reset your password: http://example.com/reset-password?token=${resetToken}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending password reset email:', error);
        } else {
            console.log('Password reset email sent:', info.response);
        }
    });
};
const forgotPassword = (req,res) =>{
    const email = req.body.email;


    User.findOne({email: email}).then((user) => {
        if (!user) return res.status(400).json({msg: "User does not exist"});

        // Generate a unique reset token (you can implement this as needed)
        const resetToken = generateResetToken();
const messege =`We have Recieved a password reset reqest.please use the below link to reset your password


 ${resetURL}\n\n.This Reset Password link will be valid only for limited time`
        // In a real application, you would save the reset token and expiration time to a database
        // and associate it with the user's account for later verification.

        // Send the reset password email to the user
        sendResetPasswordEmail(email, resetToken);

        // Respond to the client with a success message
        res.status(200).json({ message: 'Password reset email sent successfully.' });
    });
};


// Generate a unique reset token
function generateResetToken() {
    const crypto = require('crypto');
    return crypto.randomBytes(20).toString('hex');



}







module.exports = {
    login,
    logout,
    forgotPassword,
    transporter,
    sendResetPasswordEmail,

}

