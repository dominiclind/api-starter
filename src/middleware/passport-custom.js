import passport from 'passport';
import CustomStrategy from 'passport-custom';
import User from '../models/user';
import request from 'request';

const strategy = new CustomStrategy((req, done) => {
	if (!req.body.accessToken) {
		done('Missing access token');
	}
	if (!req.body.id) {
		done('Missing user id');
	}
	const options = {
		json: true,
		url: `https://graph.facebook.com/me?fields=id,name,picture.type(large)&access_token=${req.body.accessToken}`
	}
	//Verifying accesstoken belongs to correct user.
	request(options, (err, response, body) => {
		if (err) {
			done(err, null);
		} else if(body.id !== req.body.id) {		
			done('User id doesn\'t match facebook id', null);
		} else {
			// Valid user
			User.findOne({ facebookId: body.id}).then(user => {
				if (!user) {
					user = new User({
						facebookId: body.id,
						name: body.name,
						dateCreated: new Date(),
						profilePicture: body.picture.data.url
					});
					return user.save();
				} else {
					done(null, user);
				}
			})
			.then(user => {
				done(null, user);
			})
			.catch(err => {
				done(err, null);
			})
		}
	})
})

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
export default strategy;