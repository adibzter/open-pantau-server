import './styles/Thumbnail.css';

const Thumbnail = ({ src, timeCreated, onClick }) => {
  return (
    <>
      <div className='thumbnail' onClick={onClick}>
        <img src={src} alt='thumbnail' />
        <b>{timeCreated}</b>
      </div>
    </>
  );
};

export default Thumbnail;
