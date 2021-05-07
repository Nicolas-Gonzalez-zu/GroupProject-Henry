const mongoose = require('mongoose');

const { MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB connected ${MONGO_URI}`))
  .catch((err) => console.log(err));

module.exports = mongoose;
