import './styles/Button.css';

const Button = ({ text = '', style, onClick }) => {
  return (
    <>
      <button className='button' style={style} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
