exports.home = (req,res) => {
    res.render('home');  
};

exports.about = (req, res) => {
    res.render('about');
};

exports.signin = (req, res) => {
    res.render('signin');
};

exports.signup = (req, res) => {
    res.render('signup');
};