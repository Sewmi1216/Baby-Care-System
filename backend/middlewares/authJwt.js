const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("authHeader: ", req.headers)
    if (!authHeader) {
        return res.status(403).send({ message: "No token provided!" });
    }
    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format

    jwt.verify(token, config.secret, (err, user) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized token!",
            });
        }
        req.user = user;
        next();
    });
};

const verifyParent = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("userId:", req.user.id)
        if (req.user.id === req.params.id || req.user.role === 'Parent') {
            next();
        } else {
            return res.status(401).send({message: "Unauthorized user!"});
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("userId:", req.user.id)
        if (req.user.id === req.params.id || req.user.role === 'Admin') {
            next();
        } else {
            return res.status(401).send({message: "Unauthorized user!"});
        }
    });
};



module.exports = {
    verifyToken,
    verifyParent,
    verifyAdmin
};