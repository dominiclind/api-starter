/*

  # APP DOMAIN: 
  User
  # DESCRIPTION: 
  get current user

*/

/*functions*/
exports.me = (req, res) => {
	const { user } = req;
	res.json({
  	user
  });
};