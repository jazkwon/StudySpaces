var Review = require('../models/review');

module.exports = function(router, passport) {

    router.post('/signup',
        passport.authenticate('local-signup'),
        function(req, res) {
            res.status(200).json({ user: req.user.email
        });
    });

    router.post('/login',
        passport.authenticate('local-login'),
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user.email
        });
    });

    router.get('/profile',
        isLoggedIn,
        function(req, res) {
            console.log(req.isAuthenticated());
            res.status(200).json({ user: req.user, message: "Welcome!"
        });
    });

    router.get('/logout', function(req, res) {
        req.logOut();
        res.status(200).json({ message: "logged out "});
    });

    // Review Routes
    var reviewRoute = router.route('/review');
    var reviewIdRoute = router.route('/review/:id');

    // GET review
    reviewRoute.get(function(req, res) {
      var query = Review.find();
      query.exec(function(err, results) {
        if (err) {
          return res.status(404).json({
            message: "404: REVIEW NOT FOUND",
            data: []
          });
        }
        return res.status(200).json({
          message: "200: REVIEW OK",
          data: results
        });
      });
    });

    //POST a new review
    reviewRoute.post(function(req, res) {
      var newReview = new Review({
        email: req.body.email,
        rating1: req.body.rating1,
        rating2: req.body.rating2,
        rating3: req.body.rating3,
        rating4: req.body.rating4,
        text: req.body.text,
        location: req.body.location
      });
      newReview.save(function(err) {
        if (err) {
          return res.status(404).json({
            message: "404: NOT FOUND",
            data: err
          })
        }
        return res.status(201).json({
          message: "201: CREATED",
          data: newReview
        });
      });
    });

    //PUT a review
    reviewIdRoute.put(function(req, res) {
      Review.findById(req.params.id, function(err, edit_review) {
        if (err) {
          return res.status(404).json({
            message: "404: NOT FOUND (find query)",
            data: []
          });
        }
        edit_review.rating1 = req.body.rating1;
        edit_review.rating2 = req.body.rating2;
        edit_review.rating3 = req.body.rating3;
        edit_review.rating4 = req.body.rating4;
        edit_review.text = req.body.text;
        edit_review.save(function(err) {
          if (err) {
            return res.status(404).json({
              message: "404: NOT FOUND (failed to update)",
              data: []
            });
          }
          return res.status(200).json({
            message: "200: OK",
            data: edit_review
          });
        });
      });
    });

    // DELETE a review
    reviewIdRoute.delete(function(req, res) {
      Review.findById(req.params.id, function(err, get_review) {
        if (err) {
          return res.status(404).json({
            message: "404: REVIEW NOT FOUND",
            data: []
          });
        }
        else if (get_review == null) {
          return res.status(404).json({
            message: "404: REVIEW NOT FOUND",
            data: []
          });
        }
        else {
          Review.remove({
            _id: req.params.id
          }, function(err, deleted_review) {
            if (err) {
              return res.status(404).json({
                message: "404: REVIEW NOT FOUND",
                data: []
              });
            }
            return res.status(200).json({
              message: "DELETE: OK",
              data: deleted_review
            });
          });
        }
      });
    });

    return router;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ message: "unable to auth" });
}
