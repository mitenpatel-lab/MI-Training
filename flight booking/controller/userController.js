const User = require('../model/users');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;
exports.login = async (req, res) => {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        console.log(user);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Username/Password is incorrect' });
        }
        if (user.password != password) {
            return res.status(401).json({ success: false, message: 'Username/Password is incorrect' });
        }
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        console.log(user);
        res.json({ success: true, token, user });
    } catch (e) {
        console.log(e);

    }

}

exports.getAllUser = async (req, res) => {

    let user = await User.find({ role: { $ne: 'admin' } });

    console.log(user);
    try {
        res.status(200).json(user);
    } catch (e) {
        console.log(e);

    }
}

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({
            username: username,
            password: password
        });
        const user = await User.create(newUser);
        res.status(200).json({ success: true, })

    } catch (e) {
        if (e.code == 11000) {
            res.status(401).json({ success: false, message: 'Username already Taken' });

        }
        console.log(e);

    }
}
exports.update = async (req, res) => {
    try {
        const { username, password } = req.body;


        let user = await User.findOne({ username });
        console.log(user);
        if (user) {

            user.password = password;
            await user.save();
            return res.json({ success: true, message: "Updated" });

        }
        res.json(user.message)
    } catch (e) {
        console.log(e);

    }
}


exports.deleteUser = async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.deleteOne({ username })

        res.status(200).json({ message: "delete successfully", user })
    }


    catch (e) {
        console.log(e);


    }

}




