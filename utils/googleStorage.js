const path = require('path');

const { Storage } = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
  keyFilename: path.join(__dirname, '../secrets/skrin-pantau-bucket.json'),
  projectId: 'skrin-1',
});

const bucketName = 'pantau';
const bucket = storage.bucket(bucketName);

const getFiles = async (destination) => {
  const [files] = await bucket.getFiles({
    prefix: destination,
    delimiter: '/',
  });

  // return files.splice(1);
  return files;
};

const uploadBuffer = async (destination, buffer) => {
  await bucket.file(destination).save(buffer);

  console.log(`${destination} uploaded to ${bucketName} bucket`);
};

const downloadBuffer = async (destination) => {
  const buffer = await bucket.file(destination).download();

  return buffer[0];
};

const uploadFile = async (destination, filePath) => {
  console.log(`UPLOADING: ${filePath}`);

  await bucket.upload(filePath, {
    destination: destination,
  });

  console.log(`UPLOAD SUCCESS: ${filePath}`);
};

const getSignedUrlForUpload = async (filename) => {
  const [url] = await bucket.file(filename).getSignedUrl({
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

  return url;
};

const getSignedUrlForDownload = async (filename) => {
  const [url] = await bucket.file(filename).getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  });

  return url;
};

module.exports = {
  getFiles,
  uploadBuffer,
  downloadBuffer,
  uploadFile,
  getSignedUrlForUpload,
  getSignedUrlForDownload,
};
