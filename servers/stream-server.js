const spawn = require('child_process').spawn;
const path = require('path');
const fs = require('fs');

const NodeMediaServer = require('node-media-server');

const { getFfmpeg, RTMP_SERVER } = require('../config/config');
const config = require('../config/stream-server-config');
const { uploadFile } = require('../utils/googleStorage');

const createStreamServer = () => {
  const streamServer = new NodeMediaServer(config);
  streamServer.run();

  streamServer.on('prePublish', async (id, StreamPath, args) => {
    try {
      const streamKey = StreamPath.split('/')[2];

      console.log(`Stream ${streamKey} connected`);

      // recordtoMp4(streamKey);
    } catch (err) {
      console.log(err);
      const session = streamServer.getSession(id);
      session?.reject();
    }
  });

  streamServer.on('donePublish', async (id, StreamPath, args) => {
    try {
      const streamKey = StreamPath.split('/')[2];
      const recordingPath = path.join(__dirname, '../', 'recordings/live/ayam');
      const files = fs.readdirSync(recordingPath);

      // No file available
      if (files.length === 0) {
        return;
      }

      const videoPath = path.join(recordingPath, files[0]);

      await compressVideo(videoPath);

      await handleVideo(videoPath);

      await handleThumbnail(videoPath);
    } catch (err) {
      console.log(err);
    }
  });
};

async function recordtoMp4(streamKey) {
  const date = new Date();
  const destinationPath = `./recordings/live/${streamKey}/${date.toISOString()}.mp4`;
  console.log(`RECORDING: stream ${destinationPath}`);

  const commands = [
    '-i',
    `${RTMP_SERVER}/live/${streamKey}`,
    '-c:v',
    'libx264',
    '-filter:v',
    'fps=23.976',
    '-an',
    destinationPath,
  ];
  const ffmpeg = spawn(getFfmpeg(), commands);

  ffmpeg.on('error', (err) => {
    console.error(`RECORDING FAILED: ${destinationPath}`);
    console.error(err);
  });

  ffmpeg.on('close', () => {
    console.log(`RECORDING FINISHED: ${destinationPath}`);

    resolve();
  });
}

async function compressVideo(filePath) {
  console.log(`COMPRESSING: ${filePath}`);

  const tempPath = `${filePath}_temp.mp4`;
  const commands = ['-i', filePath, '-c', 'copy', tempPath];
  const ffmpeg = spawn(getFfmpeg(), commands);

  ffmpeg.on('error', (err) => {
    console.error(`COMPRESS FAILED: ${filePath}`);
    console.error(err);
  });
  ffmpeg.on('disconnect', (err) => {
    console.error('disconnect', err);
  });
  ffmpeg.on('exit', (err) => {
    console.error('exit', err);
  });

  return new Promise((resolve, reject) => {
    ffmpeg.on('close', () => {
      fs.rmSync(filePath);
      fs.renameSync(tempPath, filePath);
      console.log(`COMPRESS SUCCESS: ${filePath}`);

      resolve();
    });
  });
}

async function handleVideo(videoPath) {
  let filename = videoPath.split(path.sep);
  filename = filename[filename.length - 1];

  await uploadFile(`playbacks/${filename}`, videoPath);
}

function handleThumbnail(videoPath) {
  const thumbnailPath = `${videoPath}.jpg`;
  const commands = [
    '-i',
    videoPath,
    '-ss',
    '1',
    '-vframes',
    '1',
    thumbnailPath,
  ];
  const ffmpeg = spawn(getFfmpeg(), commands);

  ffmpeg.on('error', (err) => {
    console.error(err);
  });

  return new Promise((resolve, reject) => {
    ffmpeg.on('close', async () => {
      let filename = thumbnailPath.split(path.sep);
      filename = filename[filename.length - 1];

      await uploadFile(`playbacks/thumbnails/${filename}`, thumbnailPath);
      fs.rmSync(thumbnailPath);
      fs.rmSync(videoPath);

      resolve();
    });
  });
}

module.exports = { createStreamServer };
