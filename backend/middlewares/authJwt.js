const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token,
        config.secret,
        (err, user) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized token!",
                });
            }
            //console.log(user)
            req.user = user;
            next();
        });
};

const verifyParent = (req, res, next) => {
    verifyToken(req, res, () => {
         console.log("userId:",req.user.id)
        if (req.user.id === req.params.id && req.user.role === 'Parent') {
            next();
        } else {
            return res.status(401).send({ message: "Unauthorized user!" });
        }
    });
};

module.exports = {
    verifyToken,
    verifyParent
};