import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import PrivateRoutes from './services/PrivateRoutes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
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
