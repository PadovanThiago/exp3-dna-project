import { useState, FormEvent } from "react";

const PASSWORD = (import.meta.env.VITE_ACCESS_PASSWORD as string) || "exp3anbima2026";

export default function DeckAnbima() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (authenticated) {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "#0A0F1C", transition: "opacity 0.3s" }}>
        <iframe
          src="/apresentacao-anbima.html"
          width="100%"
          height="100%"
          frameBorder={0}
          title="EXP³ — Anbima"
          style={{ display: "block", border: 0 }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0F1C",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif",
        transition: "opacity 0.3s",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontWeight: 800, fontSize: 36, color: "#fff", lineHeight: 1 }}>
          EXP<span style={{ color: "#00D9FF" }}>³</span>
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Implementação Organizacional de IA
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha de acesso"
            autoFocus
            style={{
              width: 280,
              height: 48,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: 10,
              padding: "0 16px",
              fontFamily: "inherit",
              fontSize: 15,
              color: "#fff",
              outline: "none",
            }}
            onFocus={(e) => (e.currentTarget.style.border = "1px solid rgba(0,217,255,0.4)")}
            onBlur={(e) => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.10)")}
          />
          <button
            type="submit"
            style={{
              width: 280,
              height: 48,
              background: "rgba(0,217,255,0.10)",
              border: "1px solid rgba(0,217,255,0.25)",
              borderRadius: 10,
              color: "#00D9FF",
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.06em",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,217,255,0.18)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,217,255,0.10)")}
          >
            Acessar
          </button>
          {error && (
            <div style={{ fontSize: 13, color: "rgba(255,107,51,0.9)", marginTop: 4, textAlign: "center" }}>
              Senha incorreta.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

::placeholder-style
