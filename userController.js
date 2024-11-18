const User = require('../models/User');

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
        req.session.userId = user._id; // Assuming you're using express-session
        res.redirect('/products');
    } else {
        res.render('login', { error: 'Invalid username or password' });
    }
};
