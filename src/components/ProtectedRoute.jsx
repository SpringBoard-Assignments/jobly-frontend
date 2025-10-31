import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../authContext';

function ProtectedRoute({ children }) {
  const { currUser, dataGuard } = useContext(UserContext);

  //wait for hydration

  if (!dataGuard) return <div>Loading...</div>;

  // Block access if not logged in

  if (!currUser) {
    return <Navigate to="/login" replace />;
  }
  // Provide contents of UserContext if authentication passes
  return children;
}

export default ProtectedRoute;
