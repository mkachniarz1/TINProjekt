module.exports = {
    ifSignedIn: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please sign in to view that page');
      res.redirect('/signin');
    }
  };
  