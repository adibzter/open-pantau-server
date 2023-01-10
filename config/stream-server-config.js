const {
  RTMP_PORT,
  MEDIA_HTTP_PORT,
  MEDIA_USERNAME,
  MEDIA_PASSWORD,
  getFfmpeg,
  MEDIA_HTTPS_PORT,
} = require('./config');

const config = {
  logType: 0,
  auth: {
    api: true,
    api_user: MEDIA_USERNAME,
    api_pass: MEDIA_PASSWORD,
  },
  http: {
    port: MEDIA_HTTP_PORT,
    allow_origin: '*',
    mediaroot: './recordings',
  },
  https: {
    port: MEDIA_HTTPS_PORT,
    key: './ssl/key.pem',
    cert: './ssl/cert.pem',
  },
  rtmp: {
    port: RTMP_PORT,
    chunk_size: 60000,
    // chunk_size: 1024,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  trans: {
    ffmpeg: getFfmpeg(),
    tasks: [
      {
        app: 'live',
        mp4: true,
        mp4Flags: '[movflags=frag_keyframe+empty_moov]',
      },
    ],
  },
};

module.exports = config;
