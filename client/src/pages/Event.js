import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { API_SERVER } from '../utils/config';
import { isValidToken } from '../utils/token';

import NavBar from '../components/NavBar';
import VideoPlayer from '../components/VideoPlayer';
import Thumbnail from '../components/Thumbnail';

import './styles/Event.css';

const Event = () => {
  const [videos, setVideos] = useState([]);
  const [eventUrl, setEventUrl] = useState('');
  const [timeCreated, setTimeCreated] = useState('');
  const token = localStorage.getItem('token');

  const history = useHistory();

  // Wrong token
  if (!isValidToken()) {
    history.push('/login');
  }

  useEffect(() => {
    document.title = 'Pantau | Event';

    (async () => {
      let resVideo = await fetch(`${API_SERVER}/api/event`);
      resVideo = await resVideo.json();

      if (!resVideo.length) {
        return;
      }

      setVideos(resVideo.reverse());
      setEventUrl(resVideo[0].publicUrl);

      const date = stringDateToLocale(resVideo[0].timeCreated);
      setTimeCreated(date);
    })();
  }, []);

  function stringDateToLocale(date) {
    date = new Date(date);
    date = date.toLocaleString();

    return date;
  }

  function handleChangeEvent(url, timeCreated) {
    setEventUrl(url);
    setTimeCreated(stringDateToLocale(timeCreated));
  }

  return (
    <>
      <NavBar />
      <div id='event-page'>
        <div id='center'>
          <div id='title-div'>
            <b>Event - {timeCreated}</b>
          </div>

          <VideoPlayer src={eventUrl} />

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
                        handleChangeEvent(video.publicUrl, video.timeCreated)
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

export default Event;
