import { useNavigate } from 'react-router-dom';
import '../styles/pages/auth.css';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStore from '../stores/useAuthStore';
import { useState, useEffect } from 'react';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const { login, signup, isAuthenticated, isLoading, error, clearError } =
    useAuthStore();

  // Define schema based on whether we're signing up or logging in
  const userSchema = z.object({
    name: isSignup
      ? z.string().min(2, { message: 'Name must be at least 2 characters' })
      : z.string().optional(),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  });

  type User = z.infer<typeof userSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    reset();
    clearError();
  }, [isSignup, reset, clearError]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<User> = async (data) => {
    if (isSignup) {
      // Handle signup
      if (data.name) {
        await signup(data.name, data.email, data.password);
      }
    } else {
      // Handle login
      await login(data.email, data.password);
    }
  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="auth__container">
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
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="authFields">
            {isSignup && (
              <>
                <input
                  type="text"
                  placeholder="Enter your name..."
                  {...register('name', { required: isSignup })}
                />
                {errors.name && (
                  <span className="error">{errors.name.message}</span>
                )}
              </>
            )}
            <input
              type="email"
              placeholder="Enter your email..."
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
            <input
              type="password"
              {...register('password', { required: true })}
              placeholder="Enter your password..."
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}

            {/* Display authentication errors */}
            {error && <span className="error">{error}</span>}

            <div className="checkbox">
              <p>
                <span>
                  <input type="checkbox" />
                </span>{' '}
                Remember Me
              </p>
              <div className="forgot-password">Forgot Password ?</div>
            </div>

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : isSignup ? 'Sign Up' : 'Sign In'}
            </button>

            <p className="auth-toggle">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="toggle-btn"
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
