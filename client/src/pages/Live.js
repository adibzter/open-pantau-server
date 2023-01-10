import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';

import FlvJs from 'flv.js';

import { MEDIA_SERVER } from '../utils/config';
import { isValidToken } from '../utils/token';

import NavBar from '../components/NavBar';

import './styles/Live.css';

const url = `${MEDIA_SERVER}/live/ayam.flv`;

const Live = () => {
  const history = useHistory();

  // Wrong token
  if (!isValidToken()) {
    history.push('/login');
  }

  useEffect(() => {
    document.title = 'Pantau | Live';
  }, []);

  const videoRef = useRef();

  useEffect(() => {
    const flvPlayer = FlvJs.createPlayer(
      {
        type: 'flv',
        isLive: true,
        hasAudio: false,
        hasVideo: true,
        url,
      },
      { autoCleanupSourceBuffer: true, enableStashBuffer: false }
    );
    flvPlayer.attachMediaElement(videoRef.current);
    flvPlayer.load();
    flvPlayer.on(FlvJs.ErrorTypes.NETWORK_ERROR, (err) => {
      console.error(err);
    });
  }, []);

  return (
    <>
      <div id='live-page'>
        <NavBar></NavBar>

        <div id='center'>
          <div id='title-div'>
            <b>Live</b>
          </div>
          <video id='video' ref={videoRef} muted autoPlay></video>
        </div>
      </div>
    </>
  );
};

export default Live;
