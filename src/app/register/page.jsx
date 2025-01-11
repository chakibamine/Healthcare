"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiBriefcase, FiStar, FiClock } from 'react-icons/fi';
import Link from 'next/link';
import axios from 'axios';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('doctor'); // 'doctor' or 'secretary'
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Doctor specific fields
    specialite: '',
    experience: '',
    rating: 5.0,
    // Secretary specific fields
    shiftHours: ''
  });
  
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const dataToSend = {
        nom: formData.nom,
        email: formData.email,
        password: formData.password,
        ...(userType === 'doctor' ? {
          specialite: formData.specialite,
          experience: parseInt(formData.experience),
          rating: 5.0 // Default rating for new doctors
        } : {
          shiftHours: formData.shiftHours
        })
      };

      const response = await axios.post(
        `http://localhost:5167/api/${userType === 'doctor' ? 'Doctors' : 'Secretaries'}`,
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        router.push('/');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
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
            <h1 className="text-4xl font-bold mb-4">Join Our Healthcare Community</h1>
            <p className="text-lg opacity-90">Start your journey towards better healthcare management</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join us as a healthcare professional</p>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              type="button"
              onClick={() => setUserType('doctor')}
              className={`px-6 py-2 rounded-lg ${
                userType === 'doctor' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Doctor
            </button>
            <button
              type="button"
              onClick={() => setUserType('secretary')}
              className={`px-6 py-2 rounded-lg ${
                userType === 'secretary' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Secretary
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="nom"
                    type="text"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <FiMail className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {userType === 'doctor' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Speciality</label>
                    <div className="relative">
                      <FiBriefcase className="absolute top-3 left-3 text-gray-400" />
                      <input
                        name="specialite"
                        type="text"
                        value={formData.specialite}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your speciality"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <div className="relative">
                      <FiStar className="absolute top-3 left-3 text-gray-400" />
                      <input
                        name="experience"
                        type="number"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Years of experience"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {userType === 'secretary' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shift Hours</label>
                  <div className="relative">
                    <FiClock className="absolute top-3 left-3 text-gray-400" />
                    <input
                      name="shiftHours"
                      type="text"
                      value={formData.shiftHours}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 9:00 AM - 5:00 PM"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <FiLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a password"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <FiLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 ease-in-out transform hover:scale-[1.02]"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/" className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
} 