const User = require('../model/users');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken } = require("../utils/token");

const SECRET_KEY = process.env.SECRET_KEY;
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Username is not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ success: false, message: 'Password is incorrect' });
        }

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ success: true, accessToken, user });

    } catch (e) {
        console.log(e);
    }
};
exports.logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.json({ message: "Logged out" });

        const user = await User.findOne({ refreshToken: token });
        if (user) {
            user.refreshToken = "";
            await user.save();
        }
        res.clearCookie("refreshToken");
        res.json({ message: "Logged out" });

    } catch (e) {
        console.log(e);
    }
};

exports.getAllUser = async (req, res) => {

    let user = await User.find({ role: { $ne: 'admin' } });

    try {
        res.status(200).json({ success: true, user });
    } catch (e) {
        console.log(e);

    }
}
exports.refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) return res.status(401).json({ message: "No refresh token" });
        const decoded = jwt.verify(token, process.env.REFRESH_KEY);

        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== token) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        const accessToken = createAccessToken(user);
        const newRefreshToken = createRefreshToken(user);
        user.refreshToken = newRefreshToken;
        await user.save();
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });

    } catch (e) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({
            username: username,
            password: password
        });

        const user = await User.create(newUser);

        if (user) {

            res.json({ success: true, user });
        }

    } catch (e) {
        if (e.code == 11000) {
            res.status(401).json({ success: false, message: 'Username already Taken' });

        }
        console.log(e);

    }
}
// exports.update = async (req, res) => {
//     try {
//         const { username, password } = req.body;


//         let user = await User.findOne({ username });
//         if (user) {

//             user.password = password;
//             await user.save();
//             return res.json({ success: true, message: "Updated" });

//         }
//         res.json(user.message)
//     } catch (e) {
//         console.log(e);

//     }
// }


exports.deleteUser = async (req, res) => {
    try {
        const { Id } = req.params;

        const user = await User.findByIdAndDelete(Id);

        res.status(200).json({ message: "delete successfully", user })
    }

    catch (e) {
        console.log(e);


    }

}




