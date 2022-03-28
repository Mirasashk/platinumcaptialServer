const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectId;

const leadLookUp = async (req, res) => {
  console.log(req.body);
  let term = req.body.term;
  let leads = null;

  if (req.body.category == 'phone') {
    leads = await mongoose.connection.db
      .collection('Leads')
      .find({ phoneHome: term })
      .toArray();
  } else if (req.body.category == 'email') {
    leads = await mongoose.connection.db
      .collection('Leads')
      .find({ email: term })
      .toArray();
  } else if (req.body.category == 'lastName') {
    leads = await mongoose.connection.db
      .collection('Leads')
      .find({ lastName: term })
      .toArray();
  }

  return leads;
};

const leadDetails = async (req, res) => {
  let lead = await mongoose.connection.db
    .collection('Leads')
    .findOne({ _id: new ObjectID(req.body._id) })
    .then((data) => {
      return data;
    });

  return lead;
};

exports.leadDetails = leadDetails;
exports.leadLookUp = leadLookUp;
