"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const AuthContext = createContext({
  user: null,
  profile: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
  updateProfile: async () => {},
  updateData: async () => {},
  refreshProfile: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ─── Fetch profile from Supabase ───
  const fetchProfile = useCallback(async (userId) => {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code === "PGRST116") {
        // Row doesn't exist yet (trigger may be delayed) — create it
        const { data: newData } = await supabase
          .from("user_profiles")
          .insert({ id: userId })
          .select()
          .single();
        setProfile(newData);
        return newData;
      } else if (data) {
        setProfile(data);
        return data;
      }
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    }
    return null;
  }, []);

  // ─── Initialize: get session + listen for changes ───
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // Get existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        fetchProfile(u.id).then(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const u = session?.user ?? null;
        setUser(u);
        if (u) {
          await fetchProfile(u.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  // ─── Update profile name/initials ───
  const updateProfile = useCallback(async (updates) => {
    if (!user || !supabase) return;
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .update(updates)
        .eq("id", user.id)
        .select()
        .single();
      if (!error && data) {
        setProfile(data);
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  }, [user]);

  // ─── Update a specific data column (learn_progress, daily_pulse, etc.) ───
  //     Usage: updateData("learn_progress", { xp: 120, streak: 3, ... })
  const updateData = useCallback(async (key, value) => {
    if (!user || !supabase) return;
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .update({ [key]: value })
        .eq("id", user.id)
        .select()
        .single();
      if (!error && data) {
        setProfile(data);
      }
    } catch (err) {
      console.error(`Failed to update ${key}:`, err);
    }
  }, [user]);

  // ─── Re-fetch profile from Supabase ───
  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  // ─── Auth methods ───
  const signUp = async (email, password) => {
    if (!supabase) return { error: { message: "Auth not configured" } };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  };

  const signIn = async (email, password) => {
    if (!supabase) return { error: { message: "Auth not configured" } };
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signInWithGoogle = async () => {
    if (!supabase) return { error: { message: "Auth not configured" } };
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      signUp,
      signIn,
      signInWithGoogle,
      signOut,
      updateProfile,
      updateData,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
