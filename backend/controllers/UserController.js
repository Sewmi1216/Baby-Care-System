let User = require("../models/User")
const bcrypt = require("bcryptjs");
const constants = require("constants");
const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}).then((user) => {
        if (!user) return res.status(400).json({msg: "User does not exist"});

        // Validate password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) return res.status(400).json({msg: "Invalid password credentials"});

             const session = { id: user._id,email: user.email };
             req.session.user = session; // Auto saves session data in mongo store
            console.log(req.session.user);
            console.log(req.session.user.email);
            return res.json({msg: "Logged In Successfully", role: user.role, id:user._id}); // sends cookie with sessionID automatically in response
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
