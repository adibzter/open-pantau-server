import Plyr from 'plyr-react';
import 'plyr-react/dist/plyr.css';

const VideoPlayer = ({ src }) => {
  return (
    <Plyr
      preload='metadata'
      source={{
        title: 'Video',
        type: 'video',
        sources: [
          {
            src,
            type: 'video/mp4',
          },
        ],
      }}
      options={{ invertTime: false }}
    />
  );
};

export default VideoPlayer;
