const createUser = require('../models/userModels');
const admin = require('../firebase-services/admin');

module.exports = (app) => {
  app.post('/auth/signup', async (req, res) => {
    let user = await createUser.createUser(req);
    return res.status(201).send({
      error: false,
      user,
    });
  });

  app.get('/auth', async (req, res) => {
    let users = await admin.fb.auth().listUsers();
    return res.status(200).send({
      error: false,
      users,
    });
  });

  app.post('/auth/user/', async (req, res) => {
    console.log(req.body);
    let user = undefined;
    await admin.fb
      .auth()
      .getUserByEmail(req.body.email)
      .then((UserRecord) => {
        user = UserRecord;
        console.log(
          `Successfully fetched user data: ${UserRecord.toJSON()}`
        );
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });
    await admin.fb
      .auth()
      .deleteUser(user.uid)
      .then(() => {
        console.log('Successfully Deleted User');
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
      });
    return res.status(200).send({
      error: false,
      user,
    });
  });
};
