"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiMail, FiLock, FiEye, FiEyeOff, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure, logout, setLoading } from '@/redux/actions/authActions';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { error, loading, isAuthenticated, role } = useSelector(state => state.auth);
  console.log('auth : ',isAuthenticated,role);
  

  useEffect(() => {
    if (isAuthenticated && role) {
      router.push('/Dashboard');
    }
  }, [isAuthenticated, role, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    
    try {
      const response = await axios.post('http://localhost:5167/api/Auth/login', {
        email,
        password
      });

      if (response.data.token) {
        // Set cookie for middleware
        Cookies.set('token', response.data.token);
        
        // Configure axios defaults
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        // Dispatch success action
        dispatch(loginSuccess(response.data));

        // Navigate to dashboard
        router.push('/Dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch(loginFailure(error.response?.data?.message || 'An error occurred'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 z-50 animate-slideIn">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg flex items-center justify-between max-w-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(loginFailure(null))}
              className="ml-4 flex-shrink-0 text-red-400 hover:text-red-600 transition-colors duration-200"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-blue-600 to-blue-900 text-white flex-col justify-between relative">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
          <Image
            src="/images/onboarding-img.png"
            alt="Healthcare illustration"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-90 hover:scale-105 transition-transform duration-700"
            priority
            quality={100}
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome to Healthcare Portal</h1>
            <p className="text-lg opacity-90">Manage your healthcare journey with ease and efficiency</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Please sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <FiMail className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out text-black placeholder-gray-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <FiLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out text-black placeholder-gray-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 ease-in-out transform hover:scale-[1.02] ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            {/* <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div> */}
            {/* <div className="grid grid-cols-3 gap-3">
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Image src="/google.svg" alt="Google" width={20} height={20} />
              </button>
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Image src="/apple.svg" alt="Apple" width={20} height={20} />
              </button>
              <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Image src="/facebook.svg" alt="Facebook" width={20} height={20} />
              </button>
            </div> */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}