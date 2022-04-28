const mongoose = require('mongoose');
const leadsMiddleWare = require('../middlewares/leadsMiddleWare');
const { Schema } = mongoose;

module.exports = (app) => {
  app.post(`/lead/lookup`, async (req, res) => {
    console.log('Looking up leads');
    console.log(req.body);

    let leads = await leadsMiddleWare.leadLookUp(req);

    res.status(200).send({
      error: false,
      message: 'all leads with that phone number was found',
      data: leads,
    });
  });

  app.post(`/leads/leadDetails`, async (req, res) => {
    console.log(req.body);
    let lead = await leadsMiddleWare.leadDetails(req);

    res.status(200).send({
      error: false,
      message: 'here is the details',
      lead,
    });
  });

  app.post(`/leads`, async (req, res) => {
    console.log(`request for leads in ${req.body.name}`);
    try {
      let collectionName = req.body.name;
      let leads = await mongoose.connection.db
        .collection(collectionName)
        .find()
        .limit(30000)
        .toArray();

      setTimeout(() => {
        res.status(200).send({
          error: false,
          leads,
        });
      }, 2000);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post(`/db/createCollection`, async (req, res) => {
    const nameOfCollection = req.body.name;
    try {
      if (nameOfCollection == '') {
        return rest.status(201).send({
          error: 'No Name for collection received',
          message: 'Enter name for collection',
        });
      } else {
        let newSchema = new Schema(
          { any: Schema.Types.Mixed },
          { collection: nameOfCollection }
        );
        mongoose.model(nameOfCollection, newSchema);
        return res.status(201).send({
          error: false,
          message: 'New Collection has been created',
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post(`/db/collection/delete`, async (req, res) => {
    console.log(req.body);
    console.log(`Deleting the collection ${req.body.collectionName}`);
    try {
      let collectionName = leadsMiddleWare.collectionDelete(req);

      return res.status(201).send({
        error: false,
        collectionName: collectionName,
        messege: 'Collection has been deleted',
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get(`/db/collections`, async (req, res) => {
    try {
      const dbCollections = await mongoose.connection.db
        .listCollections()
        .toArray();

      let numberOfleads = 0;
      const collectionInfo = [];

      dbCollections.map(async (collection, index) => {
        numberOfleads = await mongoose.connection.db
          .collection(collection.name)
          .countDocuments();
        const temp = {
          collection: collection,
          count: numberOfleads,
        };
        collectionInfo.push(temp);
      });
      setTimeout(() => {
        res.status(200).send({
          error: false,
          collectionInfo,
        });
      }, 100);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post(`/leads/uploadFile`, async (req, res) => {
    try {
      if (!req.files) {
        res.send({
          error: true,
          message: 'No files uploaded',
        });
      } else {
        let file = req.files.myfile;
        file.mv('./leadUploads/' + file.name);

        res.send({
          status: 'File is uploaded',
          message: 'Successfully uploaded the file',
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post(`/leads/uploadData`, async (req, res) => {
    try {
      mongoose.connection.db
        .collection(`${req.body.collection}`)
        .insertMany(req.body.data);
      res.send({
        status: 'File is uploaded',
        message: 'Successfully uploaded the file',
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });
};
