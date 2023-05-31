const express = require('express');
const app = express();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const cors = require("cors");
const mongoSanitize = require('express-mongo-sanitize')
require('dotenv').config()
const routes = require('./routes');
const passport = require('passport')
const { jwtStrategy } = require('./middleWare/passport')

const { handleError, covertToApiError } = require('./middleWare/apiError')




// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://admin:<password>@cluster0.lxept3r.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lxept3r.mongodb.net/?retryWrites=true&w=majority`;
app.use(cors());

const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-hcfysj1-shard-00-00.lxept3r.mongodb.net:27017,ac-hcfysj1-shard-00-01.lxept3r.mongodb.net:27017,ac-hcfysj1-shard-00-02.lxept3r.mongodb.net:27017/?ssl=true&replicaSet=atlas-k39tzu-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,





}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB111!!!')
});

/// body parse
app.use(express.json())


/// sanitize
app.use(xss());
app.use(mongoSanitize());


// Passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy)


/// routes
app.use('/api', routes)

/// HANDLE ERRORS
/// if the error not recognized....convert to api error
app.use(covertToApiError);
app.use((err, req, res, next) => {
    console.log('HandleError Calling')
    handleError(err, res)
})

app.get("/", (req, res) => {
    res.send("Hello Eccomerce!");
  });
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})