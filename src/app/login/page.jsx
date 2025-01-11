"use client";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/redux/actions/authActions';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector(state => state.auth);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(credentials.email, credentials.password));
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // ... rest of your component code
} 