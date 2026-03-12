import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Props {
  children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  console.log('[ProtectedAdminRoute] Component mounted/rendered, state:', state);

  useEffect(() => {
    const check = async () => {
      console.log('[ProtectedAdminRoute] Checking auth…');
      const { data: { user } } = await supabase.auth.getUser();
      console.log('[ProtectedAdminRoute] getUser result:', user?.id ?? 'NO USER');
      if (!user) {
        console.log('[ProtectedAdminRoute] → unauthorized (no user)');
        setState('unauthorized');
        return;
      }
      const { data } = await supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' as const });
      console.log('[ProtectedAdminRoute] has_role result:', data);
      const newState = data ? 'authorized' : 'unauthorized';
      console.log('[ProtectedAdminRoute] → setting state:', newState);
      setState(newState);
    };
    check();
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
