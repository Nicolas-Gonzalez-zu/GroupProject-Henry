/* eslint-disable no-shadow */
const AWS = require('aws-sdk');
const async = require('async');

const bucketName = process.env.BUCKET;
const fs = require('fs');

let image;
let imageName;
let contentType;

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
  s3.headBucket(bucketParams, (err, data) => {
    if (err) {
      console.log('ErrorHeadBucket', err);
      s3.createBucket(bucketParams, (err, data) => {
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
    Body: image,
    ContentType: contentType,
  };
  s3.putObject(params, (err, data) => {
    if (err) {
      console.log('Error uploading image: ', err);
      callback(err, null);
    } else {
      console.log('Successfully uploaded image on S3', data);
      callback(null, data);
    }
  });
};
exports.upload = (req, res) => {
  const allowedExtension = ['png', 'jpeg', 'jpg'];
  const extension = req.files.file.type.slice(6);

  // eslint-disable-next-line consistent-return
  function uploadAvatar() {
    if (allowedExtension.includes(extension)) {
      const tmpPath = req.files.file.path;
      // console.log('item', req.files.file);
      image = fs.createReadStream(tmpPath);
      imageName = req.files.file.name;
      contentType = req.files.file.type;
      async.series([createMainBucket, createItemObject], (err) => {
        if (err) return res.status(500).json({ error: err, success: false });
        return res.status(200).json({ message: 'Successfully uploaded', success: true });
      });
    } else {
      return res.status(400).json({ message: 'Bad request', success: false });
    }
  }

  s3.getObject({ key: req.files.file.name, bucket: bucketName }, (err) => {
    if (err) {
      uploadAvatar();
    } else {
      s3.deleteObject({ key: req.files.file.name, bucket: bucketName }, (error) => {
        if (error) {
          console.log(error);
        }
        uploadAvatar();
      });
    }
  });
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
