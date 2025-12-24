// AdminRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;

      if (!user) {
        // Not logged in
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Force refresh token to get latest claims
        const tokenResult = await user.getIdTokenResult(true);
        if (tokenResult.claims.admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        console.error("Error checking admin claims:", err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();

    // Optional: re-check on auth state change
    const unsubscribe = auth.onIdTokenChanged((user) => {
      if (user) checkAdmin();
      else setIsAdmin(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

  if (!isAdmin) return <Navigate to="/" />; // redirect if not admin

  return children;
};

export default AdminRoute;
