const admin = require('../firebase-services/admin');
const { getDatabase } = require('firebase-admin/database');

const createUser = async (req, res) => {
  const { email, password, firstName, lastName, accessLevel } =
    req.body;
  console.log(req.body);
  const user = await admin.fb.auth().createUser({
    email,
    password,
    displayName: `${firstName} ${lastName}`,
  });
  console.log(user);

  const db = getDatabase();
  const ref = db.ref('users');

  ref.child(user.uid).set({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    status: user.disabled,
    access: accessLevel,
  });
};

const deleteUser = async (req, res) => {
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
      const db = getDatabase();
      const ref = db.ref('users');
      ref.child(user.uid).set(null);
      console.log('Successfully Deleted User');
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });
};

exports.createUser = createUser;
exports.deleteUser = deleteUser;
