import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../redux/slices/authSlice';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message); // Show error alert
    }

    if (isSuccess || user) {
      navigate('/create-team'); // Redirect on success
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark font-display text-white">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 bg-surface-dark p-8 rounded-xl border border-border-light shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Join the Squad</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Create your account and start building your dream XI
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white ml-1">Full Name</label>
                <input
                  type="text" name="name" value={name} onChange={onChange}
                  className="mt-1 block w-full rounded-lg bg-background-dark border border-border-dark px-3 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="Erling Haaland" required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-white ml-1">Email Address</label>
                <input
                  type="email" name="email" value={email} onChange={onChange}
                  className="mt-1 block w-full rounded-lg bg-background-dark border border-border-dark px-3 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="striker@pitchmaster.com" required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white ml-1">Password</label>
                <input
                  type="password" name="password" value={password} onChange={onChange}
                  className="mt-1 block w-full rounded-lg bg-background-dark border border-border-dark px-3 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="••••••••" required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white ml-1">Confirm Password</label>
                <input
                  type="password" name="confirmPassword" value={confirmPassword} onChange={onChange}
                  className="mt-1 block w-full rounded-lg bg-background-dark border border-border-dark px-3 py-2 text-white focus:border-primary focus:outline-none"
                  placeholder="••••••••" required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-bold text-[#111814] hover:bg-green-400 disabled:opacity-50 transition-all"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-text-secondary">
            Already have an account? <Link to="/login" className="font-medium text-primary">Sign in</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;