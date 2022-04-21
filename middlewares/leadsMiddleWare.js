const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectId;

const leadLookUp = async (req, res) => {
  console.log(req.body);
  let term = req.body.term;
  let collection = req.body.collection;
  let leads = null;

  if (req.body.category == 'phone') {
    leads = await mongoose.connection.db
      .collection(collection)
      .find({ phoneHome: term })
      .toArray();
    console.log(leads);

    if (leads.length == 0) {
      leads = await mongoose.connection.db
        .collection(collection)
        .find({ phoneHome2: term })
        .toArray();
      console.log(leads);
    }
    if (leads.length == 0) {
      leads = await mongoose.connection.db
        .collection(collection)
        .find({ phoneMobile: term })
        .toArray();
      console.log(leads);
    }
    if (leads.length == 0) {
      leads = await mongoose.connection.db
        .collection(collection)
        .find({ phoneWork: term })
        .toArray();
      console.log(leads);
    }
    if (leads.length == 0) {
      leads = await mongoose.connection.db
        .collection(collection)
        .find({ phoneWork2: term })
        .toArray();
      console.log(leads);
    }
  } else if (req.body.category == 'email') {
    leads = await mongoose.connection.db
      .collection(collection)
      .find({ email: term })
      .toArray();
  } else if (req.body.category == 'lastName') {
    leads = await mongoose.connection.db
      .collection(collection)
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
