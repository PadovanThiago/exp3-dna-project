import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any; isAdmin: boolean }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const adminCheckRef = useRef<((result: boolean) => void) | null>(null);

  const checkAdmin = useCallback(async (userId: string): Promise<boolean> => {
    const { data } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin'
    });
    const result = !!data;
    setIsAdmin(result);
    return result;
  }, []);

  useEffect(() => {
    let resolved = false;
    const resolve = () => {
      if (!resolved) {
        resolved = true;
        setLoading(false);
      }
    };

    const timeout = setTimeout(resolve, 5000);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const result = await checkAdmin(session.user.id);
          // Resolve any pending signIn promise
          if (adminCheckRef.current) {
            adminCheckRef.current(result);
            adminCheckRef.current = null;
          }
        } else {
          setIsAdmin(false);
        }
        resolve();
      }
    );

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await checkAdmin(session.user.id);
      }
      resolve();
    }).catch(() => {
      resolve();
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [checkAdmin]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error, isAdmin: false };
    }
    // Wait for onAuthStateChange to complete the admin check
    const adminResult = await new Promise<boolean>((resolve) => {
      adminCheckRef.current = resolve;
      // Safety timeout in case onAuthStateChange doesn't fire
      setTimeout(() => {
        if (adminCheckRef.current) {
          adminCheckRef.current(false);
          adminCheckRef.current = null;
        }
      }, 5000);
    });
    return { error: null, isAdmin: adminResult };
  }, []);

  const signOut = useCallback(async () => {
    setIsAdmin(false);
    await supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
