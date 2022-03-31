const userModels = require('../models/userModels');
const admin = require('../firebase-services/admin');

module.exports = (app) => {
  app.post('/auth/signup', async (req, res) => {
    let user = await userModels.createUser(req);
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

  app.post('/auth/user/delete', async (req, res) => {
    console.log(req.body);
    let user = await userModels.deleteUser(req);

    return res.status(200).send({
      error: false,
      message: 'User has been deleted',
      user: user,
    });
  });
};
