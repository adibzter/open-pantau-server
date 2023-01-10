import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { API_SERVER } from '../utils/config';
import { isValidToken } from '../utils/token';

import NavBar from '../components/NavBar';
import VideoPlayer from '../components/VideoPlayer';
import Thumbnail from '../components/Thumbnail';

import './styles/Playback.css';

const Playback = () => {
  const [videos, setVideos] = useState([]);
  const [playbackUrl, setPlaybackUrl] = useState('');
  const [timeCreated, setTimeCreated] = useState('');

  const history = useHistory();

  // Wrong token
  if (!isValidToken()) {
    history.push('/login');
  }

  useEffect(() => {
    document.title = 'Pantau | Playback';

    (async () => {
      let resVideo = await fetch(`${API_SERVER}/api/playback`);
      resVideo = await resVideo.json();

      if (!resVideo.length) {
        return;
      }

      setVideos(resVideo.reverse());
      setPlaybackUrl(resVideo[0].publicUrl);

      const date = stringDateToLocale(resVideo[0].timeCreated);
      setTimeCreated(date);
    })();
  }, []);

  function stringDateToLocale(date) {
    date = new Date(date);
    date = date.toLocaleString();

    return date;
  }

  function handleChangePlayback(url, timeCreated) {
    setPlaybackUrl(url);
    setTimeCreated(stringDateToLocale(timeCreated));
  }

  return (
    <>
      <NavBar />
      <div id='playback-page'>
        <div id='center'>
          <div id='title-div'>
            <b>Playback - {timeCreated}</b>
          </div>

          <VideoPlayer src={playbackUrl} />

          <div id='more-videos'>
            {videos.length && (
              <>
                {videos.map((video, i) => {
                  return (
                    <Thumbnail
                      key={i}
                      src={video.thumbnailUrl}
                      timeCreated={stringDateToLocale(video.timeCreated)}
                      onClick={() =>
                        handleChangePlayback(video.publicUrl, video.timeCreated)
                      }
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Playback;
