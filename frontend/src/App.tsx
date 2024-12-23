import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import PrivateRoutes from './services/PrivateRoutes';
import LandingPage from './services/LandingPage';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route
          path="*"
          element={
            <Layout>
              <PrivateRoutes />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
