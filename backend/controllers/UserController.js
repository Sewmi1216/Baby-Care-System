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

// Generate a unique reset token
function generateResetToken() {
    const crypto = require('crypto');
    return crypto.randomBytes(20).toString('hex');

}



const sendResetPasswordEmail = (userEmail, resetToken) => {
    const mailOptions = {
        from: '3rdyeargroupproject2023@gmail.com', // your email address
        to: userEmail, // recipient's email address
        subject: 'Password Reset',
        html: `<p>We have received a password reset request. Please use the following link to reset your password:</p>
              <p><a href="http://example.com/reset-password?token=${resetToken}">Reset Password</a></p>`,
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
        // Save the reset token and expiration time to the user document in the database
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour (adjust as needed)
        user.save();

        // Send the reset password email to the user
        sendResetPasswordEmail(email, resetToken);

        // Respond to the client with a success message
        res.status(200).json({ message: 'Password reset email sent successfully.' });
    });
};

// Endpoint to handle password reset
const resetPassword = (req, res) => {
    const resetToken = req.params.token; // Extract the token from the URL
    const password1 = req.body.password1;
    const password2 = req.body.password2;

    if (password1 !== password2) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }

    User.findOne({
        resetToken: resetToken,
        resetTokenExpiration: { $gt: Date.now() }, // Token should be valid (not expired)
    }).then((user) => {
        if (!user) return res.status(400).json({ msg: 'Invalid or expired reset token' });

        // Hash the new password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password1, salt, (err, hash) => {
                if (err) throw err;

                // Update the user's password in the database
                user.password = hash;
                user.resetToken = undefined; // Clear the reset token and expiration
                user.resetTokenExpiration = undefined;
                user.save();

                // Respond to the client with a success message
                res.status(200).json({ message: 'Password reset successful.' });
            });
        });
    });
};







            module.exports = {
                login,
                logout,
                forgotPassword,
                transporter,
                sendResetPasswordEmail,
                resetPassword,



        }


