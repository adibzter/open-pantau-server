const NODE_ENV = 'production';

const RTMP_PORT = 10000;
const RTMP_SERVER = `rtmp://localhost:${RTMP_PORT}`;

const MEDIA_HTTP_PORT = 8000;
const MEDIA_HTTP_SERVER = `http://localhost:${MEDIA_HTTP_PORT}`;

const MEDIA_HTTPS_PORT = 8443;
const MEDIA_HTTPS_SERVER = `http://localhost:${MEDIA_HTTPS_PORT}`;

const MEDIA_USERNAME = 'adib';
const MEDIA_PASSWORD = 'adib';

let API_PORT = 5000;
if (NODE_ENV === 'production') {
  API_PORT = 443;
}
const API_SERVER = `http://localhost:${API_PORT}`;

const FFMPEG_WINDOWS = 'C:\\Program Files\\Ffmpeg\\bin\\ffmpeg.exe';
const FFMPEG_LINUX = '/usr/bin/ffmpeg';

function getFfmpeg() {
  let FFMPEG;
  if (process.platform === 'win32') {
    FFMPEG = FFMPEG_WINDOWS;
  } else if (process.platform === 'linux') {
    FFMPEG = FFMPEG_LINUX;
  }

  return FFMPEG;
}

module.exports = {
  RTMP_PORT,
  RTMP_SERVER,
  MEDIA_HTTP_PORT,
  MEDIA_HTTP_SERVER,
  MEDIA_HTTPS_PORT,
  MEDIA_HTTPS_SERVER,
  MEDIA_USERNAME,
  MEDIA_PASSWORD,
  API_PORT,
  API_SERVER,
  getFfmpeg,
};
