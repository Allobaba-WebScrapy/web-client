import { RootState } from '@/state/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLogin);
    return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;