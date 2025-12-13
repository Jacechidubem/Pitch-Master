import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // 1. Import Toast
import { login, reset } from '../redux/slices/authSlice'; 
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get global state (loading, error, user)
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message); // 2. Changed from alert() to toast.error()
    }

    if (isSuccess || user) {
      navigate('/dashboard'); // Changed redirect to Dashboard (standard flow)
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
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0d1110] font-sans text-white">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 bg-[#121614] p-8 rounded-xl border border-[#2a3b32] shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white uppercase italic tracking-tighter">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-400">
              Sign in to manage your teams and comparisons
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-lg bg-[#1e2622] border border-[#2a3b32] px-3 py-2 text-white focus:border-[#13ec6d] focus:outline-none transition-colors"
                  placeholder="striker@pitchmaster.com"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-white ml-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-lg bg-[#1e2622] border border-[#2a3b32] px-3 py-2 text-white focus:border-[#13ec6d] focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded bg-[#13ec6d] px-4 py-3 text-sm font-black uppercase tracking-wider text-[#0d1110] hover:bg-[#10d460] disabled:opacity-50 transition-transform active:scale-95 shadow-[0_0_20px_rgba(19,236,109,0.2)]"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#13ec6d] hover:underline transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;