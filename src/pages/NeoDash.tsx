import { useState } from "react";

const CORRECT_PASSWORD = "EXP3-CLIENT";

const NeoDash = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (authenticated) {
    return (
      <div
        id="tool-container"
        style={{ height: "100vh", width: "100%", overflow: "auto" }}
      >
        {/* Tool will be loaded here */}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col items-center gap-6 p-8 rounded-2xl border border-border bg-card"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-foreground">EXP3 Tool Access</h1>
          <p className="text-sm text-muted-foreground">Restricted access</p>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          placeholder="Password"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          autoFocus
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          className="w-full h-10 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default NeoDash;
