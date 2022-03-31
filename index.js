const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 201,
};

// Import models
require('./models/userModels');
// require('./models/leadModel');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI ||
    'mongodb://localhost:27017/platinumCapitalApp'
);

app.use(cors(corsOptions));
// Serve static files
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  })
);

//Enables FileUpload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Import Routes
require('./routes/userRoutes')(app);
require('./routes/leadRoutes')(app);

app.get('/api/', (req, res) => {
  return res.status(200).json({
    status: 'success',
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html')
    );
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
