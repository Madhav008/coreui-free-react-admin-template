import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CSpinner } from '@coreui/react';
import './scss/style.scss';
import { ipoStatusApi } from './services/fanxangeApi';
import { setUser } from './store/authSlice';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  const user = useSelector((state) => state.auth.user?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await ipoStatusApi.getProfile();
        dispatch(setUser(res.data));
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Optionally handle errors, e.g., by clearing user data if not authenticated
      }
    }

    getProfile();
  }, [dispatch]);

  const ProtectedRoute = ({ children }) => {
    return user?._id ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="pt-3 text-center"><CSpinner color="primary" variant="grow" /></div>}>
        <Routes>
          <Route path="/login" element={user?._id ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={user?._id ? <Navigate to="/" replace /> : <Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          {/* Protected Routes */}
          <Route path="*" name="Home" element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
