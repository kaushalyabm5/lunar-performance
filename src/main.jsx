import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import ProductsPage from './pages/ProductsPage'
import BikeDetail from './components/BikeDetail' // Add BikeDetail page
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./components/PrivateRoute";
import './index.css'
import HomePage from './pages/HomePage'
import { AuthProvider } from "./contexts/AuthContext";
import AdminRoute from './components/AdminRoute'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <ProductsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route
  path="/admin"
  element={
    <AdminRoute>
      <PrivateRoute>
        <AdminPage />
      </PrivateRoute>
    </AdminRoute>
  }
/>
          {/* Bike detail route */}
          <Route
            path="/bike/:id"
            element={
              <PrivateRoute>
                <BikeDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
