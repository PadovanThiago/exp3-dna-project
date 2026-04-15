import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { presentationHTML } from "@/data/presentationHTML";

const PASSWORD = "exp3pn2026";
const STORAGE_KEY = "deckpn_auth";

export default function DeckPinheiroNeto() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "ok") {
      setAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "ok");
      setAuthenticated(true);
    } else {
      setError(true);
      setPassword("");
      setTimeout(() => setError(false), 3000);
    }
  };

  if (authenticated) {
    return (
      <div className="relative w-screen h-screen overflow-hidden">
        <Link
          to="/"
          className="absolute top-4 left-4 z-50 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Voltar ao site
        </Link>
        <iframe
          srcDoc={presentationHTML}
          className="w-full h-full border-0"
          title="Apresentação EXP³ — Pinheiro Neto"
          sandbox="allow-scripts"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-content-center">
      <div className="w-full max-w-sm mx-auto text-center px-6">
        <div className="text-[42px] font-light tracking-[4px] text-primary mb-2">
          EXP³
        </div>
        <p className="text-sm text-muted-foreground mb-10">
          Apresentação restrita
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha de acesso"
            className="text-center tracking-widest"
            autoFocus
          />
          <Button type="submit" className="w-full">
            Acessar
          </Button>
        </form>
        {error && (
          <p className="mt-3 text-sm text-destructive">Senha incorreta.</p>
        )}
      </div>
    </div>
  );
}
