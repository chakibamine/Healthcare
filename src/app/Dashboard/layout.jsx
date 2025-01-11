import ClientLayout from "./ClientLayout";
import ProtectedRoute from '@/Components/Auth/ProtectedRoute';

export default function DashboardLayout({ children }) {
  return (
    
    <ProtectedRoute>
      <ClientLayout>
          {children}
      </ClientLayout>
    </ProtectedRoute>
  );
}
