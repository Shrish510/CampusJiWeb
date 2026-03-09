// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to fetch profile details (role/permissions)
  const fetchProfile = async (sessionUser) => {
    if (!sessionUser) return null;

    try {
      // Attempt to fetch from 'profiles' table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

      if (error) {
        console.warn("Could not fetch profile, falling back to basic user info:", error.message);
        // Fallback or use metadata if available
        return {
          ...sessionUser,
          role: 'student', // Default role
          permission: 'user',
          name: sessionUser.email.split('@')[0],
        };
      }

      return {
        ...sessionUser,
        ...profile, // Merge profile data (e.g., role, name)
      };
    } catch (err) {
      console.error("Error in fetchProfile:", err);
      return {
          ...sessionUser,
          role: 'student',
          permission: 'user',
          name: sessionUser.email.split('@')[0],
      };
    }
  };

  useEffect(() => {
    // Check active session on mount
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const enrichedUser = await fetchProfile(session.user);
        setUser(enrichedUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
            const enrichedUser = await fetchProfile(session.user);
            setUser(enrichedUser);
        } else {
            setUser(null);
        }
        setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        return { success: false, error: error.message };
      }

      // User state will be updated by onAuthStateChange
      return { success: true };
    } catch (err) {
        console.error("Unexpected login error:", err);
        return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      // User state will be updated by onAuthStateChange
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
