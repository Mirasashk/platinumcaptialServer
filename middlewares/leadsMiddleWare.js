const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectId;

const leadLookUp = async (req, res) => {
  console.log(req.body);
  let term = req.body.term;
  let leads = {
    leadsDetail: [],
    collectionName: '',
  };
  let tempLeads = [];
  let allCollections = await mongoose.connection.db
    .listCollections()
    .toArray();

  console.log(typeof leads.leadsDetail);

  for (var i in allCollections) {
    if (tempLeads.length == 0) {
      leads.collectionName = allCollections[i].name;
      if (req.body.category == 'phone') {
        tempLeads = await mongoose.connection.db
          .collection(allCollections[i].name)
          .find({ phoneHome: term })
          .toArray();
        console.log(tempLeads);

        if (tempLeads.length == 0) {
          tempLeads = await mongoose.connection.db
            .collection(allCollections[i].name)
            .find({ phoneHome2: term })
            .toArray();
          console.log(tempLeads);
        }
        if (tempLeads.length == 0) {
          tempLeads = await mongoose.connection.db
            .collection(allCollections[i].name)
            .find({ phoneMobile: term })
            .toArray();
          console.log(tempLeads);
        }
        if (tempLeads.length == 0) {
          tempLeads = await mongoose.connection.db
            .collection(allCollections[i].name)
            .find({ phoneWork: term })
            .toArray();
          console.log(tempLeads);
        }
        if (tempLeads.length == 0) {
          tempLeads = await mongoose.connection.db
            .collection(allCollections[i].name)
            .find({ phoneWork2: term })
            .toArray();
          console.log(tempLeads);
        }
      } else if (req.body.category == 'email') {
        leads.collectionName = allCollections[i].name;
        tempLeads = await mongoose.connection.db
          .collection(allCollections[i].name)
          .find({ emailAddress: term })
          .toArray();
      } else if (req.body.category == 'lastName') {
        leads.collectionName = allCollections[i].name;
        tempLeads = await mongoose.connection.db
          .collection(allCollections[i].name)
          .find({ lastName: term })
          .toArray();
      }
    }
  }

  console.log(tempLeads);
  leads.leadsDetail = [...tempLeads];

  return leads;
};

const collectionDelete = async (req, res) => {
  let collectionName = req.body.collectionName;

  await mongoose.connection.db.dropCollection(collectionName);

  return collectionName;
};

const leadDetails = async (req, res) => {
  console.log(req.body);

  let lead = await mongoose.connection.db
    .collection(req.body.collection)
    .findOne({ _id: new ObjectID(req.body._id) })
    .then((data) => {
      return data;
    });

  console.log(lead);

  return lead;
};

exports.leadDetails = leadDetails;
exports.leadLookUp = leadLookUp;
exports.collectionDelete = collectionDelete;
