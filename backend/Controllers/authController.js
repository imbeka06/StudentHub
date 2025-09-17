// Get logged in user info

const getMe = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'UNauthorized' });
    }

    //Return safe info only
    const userData = {
        uid: req.user.uid,
        email: req.user.email,
        name: req.user.name || req.user.displayName || null,
    };

    res.join({ user: userData });
};

module.exports = { getMe };