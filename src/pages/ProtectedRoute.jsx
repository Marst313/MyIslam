import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { openApp } = useSelector((store) => store.user);
  if (!openApp) {
    return <Navigate to="landing" />;
  }

  return children;
};

export default ProtectedRoute;
