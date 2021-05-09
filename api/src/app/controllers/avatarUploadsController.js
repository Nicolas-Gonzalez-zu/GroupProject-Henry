const AWS = require('aws-sdk');
const async = require('async');
// const Mime = require('mime/Mime');
const bucketName = process.env.BUCKET;
const path = require('path');
const fs = require('fs');
let pathParams, image, imageName, contentType;

const s3 = new AWS.S3({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
const createMainBucket = (callback) => {
  // Create the parameters for calling createBucket
  const bucketParams = {
    Bucket: bucketName,
  };
  s3.headBucket(bucketParams, function (err, data) {
    if (err) {
      console.log('ErrorHeadBucket', err);
      s3.createBucket(bucketParams, function (err, data) {
        if (err) {
          console.log('Error', err);
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    } else {
      callback(null, data);
    }
  });
};

const createItemObject = (callback) => {
  const params = {
    Bucket: bucketName,
    Key: `${imageName}`,
    ACL: 'public-read',
    Body: image,
    ContentType: contentType,
  };
  s3.putObject(params, function (err, data) {
    if (err) {
      console.log('Error uploading image: ', err);
      callback(err, null);
    } else {
      console.log('Successfully uploaded image on S3', data);
      callback(null, data);
    }
  });
};
exports.upload = (req, res, next) => {
  const allowedExtension = ['png', 'jpeg', 'jpg'];
  const extension = req.files.file.name.split('.')[0];

  if (allowedExtension.includes(extension)) {
    var tmp_path = req.files.file.path;
    console.log('item', req.files.file);
    var tmp_path = req.files.file.path;
    image = fs.createReadStream(tmp_path);
    imageName = req.files.file.name;
    contentType = req.files.file.type;
    async.series([createMainBucket, createItemObject], (err, result) => {
      if (err) return res.send(err);
      else return res.json({ message: 'Successfully uploaded' });
    });
    console.log('hola');
  } else {
    return res.status(400).json({ message: 'Bad request' });
  }
};
exports.displayForm = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });
  res.write(
    '<form action="/api/fo/upload" method="post" enctype="multipart/form-data">' +
      '<input type="file" name="file">' +
      '<input type="submit" value="Upload">' +
      '</form>',
  );
  res.end();
};
