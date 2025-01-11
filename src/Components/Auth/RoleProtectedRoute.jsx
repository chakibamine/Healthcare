"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const router = useRouter();
  const { isAuthenticated, role } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    } else if (!allowedRoles.includes(role)) {
      router.push('/Dashboard'); // or any default route
    }
  }, [isAuthenticated, role, router, allowedRoles]);

  if (!isAuthenticated || !allowedRoles.includes(role)) {
    return null;
  }

  return children;
} 