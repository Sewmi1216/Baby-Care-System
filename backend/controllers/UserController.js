const config = require("../config/auth.config");
let User = require("../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const path = require('path')

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
                token: token,
                status:user.status
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

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'sewmi.rotaract3220@gmail.com',
        pass: 'uaqgejykofzquoaf',
    },
});

const sendResetPasswordEmail = (userEmail) => {
    const mailOptions = {
        from: 'sewmi.rotaract3220@gmail.com',
        to: userEmail,
        subject: 'Password Reset',
        html: `<p>We have received a password reset request. Please use the following link to navigate to reset password page:</p>
              <p><a href="http://localhost:4200/reset-password">Reset Password</a></p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending password reset email:', error);
        } else {
            console.log('Password reset email sent:', info.response);
        }
    });
};
const forgetPassword = (req, res) => {
    const email = req.body.email;
    // Check if the user exists
    User.findOne({email: email}).then((user) => {
        if (!user) {
            return res.status(400).json({message: 'User already not exists'});
        }
        // Send the reset password email to the user
        sendResetPasswordEmail(email);

        // Respond to the client with a success message
        res.status(200).json({message: 'sent'});
    });
}

// const userId = res.user.id; // Assuming you have the user's ID from the authenticated user
//
// //Validate the request and perform password update
// const newPassword = req.body.newPassword; // Assuming the new password is sent in the request body
//
// User.findByIdAndUpdate(userId, { password: hashedNewPassword }, (err, user) => {
//     if (err) {
//         return res.status(500).json({ message: 'Error updating password' });
//     }
//
//     return res.status(200).json({ message: 'Password updated successfully' });
// });

const getImg = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("userID:", userId);

        const user = await User.findOne({_id: userId});
        console.log(user);

        if (!user) {
            res.status(404).send({status: "No user found"});
        } else {
            const imageFilename = user.profile;
            console.log("imageFilename: ", imageFilename);
            const imageFilePath = path.join(__dirname, 'uploads/', imageFilename);

            console.log("imageFilePath: ", imageFilePath);
            const imageUrl = `http://localhost:8070/images/${imageFilename}`;


            // Send user information along with the image file
            res.status(200).json({status: "user", user, imageUrl});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    }
}
const getUser = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log("userID:", userId);

        const user = await User.findOne({_id: userId});
        console.log(user)

        if (!user) {
            res.status(404).send({status: "No user found"});
        } else {
            res.status(200).send({status: "user : ", user});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    }
}


module.exports = {
    login,
    logout,
    //getUser,
    forgetPassword,
    transporter,
    sendResetPasswordEmail,
    // newPassword
    getUser,
    getImg
}
