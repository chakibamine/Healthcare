"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, role } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Optional: Show loading state while checking auth
  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return children;
} 