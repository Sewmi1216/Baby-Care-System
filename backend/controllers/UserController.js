const config = require("../config/auth.config");
let User = require("../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
            // req.session.token = token;

            // console.log(user.role)
            res.cookie("access_token", token, {httpOnly: true}).status(200).send({
                id: user._id,
                email: user.email,
                role: user.role,
                msg: "login"
            });
            //req.cookies.token = token
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

module.exports = {
    login,
    logout
}
