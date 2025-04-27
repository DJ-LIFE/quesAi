import { useNavigate } from 'react-router-dom';
import './auth.css';
const Auth = () => {
	const navigate = useNavigate();
  return (
    <div className="container">
      <div className="hero">
        <div className="background_img">
          <div className="hero_text">
            <div
              style={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span>
                <img
                  src="./logo.svg"
                  alt="logo"
                  style={{ width: '100px', height: '100px', color: 'white' }}
                />
              </span>
              <div style={{ fontSize: '4rem', fontWeight: '600' }}>
                Ques.
                <span style={{ fontSize: '4rem', fontWeight: '200' }}>AI</span>
              </div>
            </div>
            <h1>
              Your podcast <br /> will no longer <br /> be just a hobby
            </h1>
            <p>
              Supercharge Your Distribution <br /> using ore AI assistant
            </p>
          </div>
        </div>
      </div>
      <div className="auth">
        <div className="login_text">
          <img src="./logo.svg" alt="logo" className="logo" />
          <h2>
            <span className="welcome_text">Welcome to</span> <br />
            Ques.AI
          </h2>
        </div>
        <div className="authFields">
          <input type="email" placeholder="Enter you email..." />
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter your password..."
          />
          <div className="checkbox">
            <p>
              <span>
                <input type="checkbox" />
              </span>{' '}
              Remember Me
            </p>
            <div className="forgot-password">Forgot Password ?</div>
          </div>
          <button onClick={() => navigate('/home')}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
