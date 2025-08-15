import './NotFound.css';

const NotFound = () => {
  return (
    <div className='not-found-text'>
      <div className='title'>
        <h1>404</h1>
        <h2>NOT FOUND</h2>
      </div>
      <div className='message'>
        <h1>The Page Was Not Found, Please Return To The Main Page.</h1> {/* Исправлено закрытие тега */}
      </div>
    </div>
  );
}

export default NotFound;