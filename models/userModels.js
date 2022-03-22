const admin = require('../firebase-services/admin');

const createUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const user = await admin.fb.auth().createUser({
    email,
    password,
    displayName: `${firstName} ${lastName}`,
  });
};

const getAllUser = async (req, res) => {};

exports.createUser = createUser;
