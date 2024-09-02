const User = require("../models/user");

const handleShowUserSignIn = (req, res) => {
    return res.render('signin');
};

const handleShowUserSignUp = (req, res) => {
    return res.render('signup');
};

const handleUserSignUp = async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    res.redirect('/');
};

const handleUserSignIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password)

        return res.cookie('token', token).redirect('/')
    } catch (error) {
        return res.render('signin',{
            error: "Incorrect email or password"
        })
    }
}

const handleUserLogout=(req,res)=>{
    res.clearCookie('token').redirect('/')
}

module.exports = {
    handleShowUserSignIn,
    handleShowUserSignUp,
    handleUserSignUp,
    handleUserSignIn,
    handleUserLogout
};
