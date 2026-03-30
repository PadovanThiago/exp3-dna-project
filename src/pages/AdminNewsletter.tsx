import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  name: string;
  language: string;
  created_at: string;
}

const AdminNewsletter: React.FC = () => {
  const navigate = useNavigate();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      setSubscribers(data ?? []);
      setLoading(false);
    };
    fetch();
  }, []);

  const exportCSV = () => {
    const header = 'Name,Email,Language,Subscribed At\n';
    const rows = subscribers.map(s =>
      `"${s.name}","${s.email}","${s.language}","${new Date(s.created_at).toISOString()}"`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter_subscribers_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/blog')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
          {!loading && (
            <span className="text-muted-foreground text-sm">({subscribers.length})</span>
          )}
        </div>
        <Button onClick={exportCSV} disabled={loading || subscribers.length === 0} size="sm">
          <Download className="h-4 w-4 mr-2" /> Export CSV
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : subscribers.length === 0 ? (
        <p className="text-muted-foreground text-center py-20">Nenhum inscrito ainda.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Idioma</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map(s => (
              <TableRow key={s.id}>
                <TableCell>{s.name || '—'}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell className="uppercase">{s.language}</TableCell>
                <TableCell>{new Date(s.created_at).toLocaleDateString('pt-BR')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminNewsletter;
