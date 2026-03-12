import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Props {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    const checkAuth = async () => {
      console.log('[ProtectedAdminRoute] Checking auth via getSession…');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.log('[ProtectedAdminRoute] No session found → unauthorized');
        setState('unauthorized');
        return;
      }

      const user = session.user;
      console.log('[ProtectedAdminRoute] Session found, user:', user.id);

      const { data } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' as const });
      console.log('[ProtectedAdminRoute] has_role result:', data);

      setState(data ? 'authorized' : 'unauthorized');
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('[ProtectedAdminRoute] Auth state changed:', _event);
      if (!session) {
        setState('unauthorized');
      } else {
        checkAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (state === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (state === 'unauthorized') {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
