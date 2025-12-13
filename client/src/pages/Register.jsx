import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // 1. Import Toast
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
      toast.error(message); // 2. Replace alert with Toast Error
    }

    if (isSuccess || user) {
      // 3. Show Success Message & Redirect to Login
      toast.success("Registration Successful! Please check your email to verify account.");
      navigate('/login'); 
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
      toast.error('Passwords do not match'); // 4. Replace password alert
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0d1110] font-sans text-white">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 bg-[#121614] p-8 rounded-xl border border-[#2a3b32] shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white uppercase italic tracking-tighter">Join the Squad</h2>
            <p className="mt-2 text-sm text-gray-400">
              Create your account and start building your dream XI
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-lg bg-[#1e2622] border border-[#2a3b32] px-3 py-2 text-white focus:border-[#13ec6d] focus:outline-none transition-colors"
                  placeholder="Erling Haaland"
                  required
                />
              </div>
              
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

              <div>
                <label className="text-sm font-medium text-white ml-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account? <Link to="/login" className="font-bold text-[#13ec6d] hover:underline">Sign in</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;