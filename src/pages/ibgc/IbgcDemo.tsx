import { useState, useEffect } from "react";
import { Dashboard } from "./Dashboard";

const SENHA = "governa2026";
const STORAGE_KEY = "ibgc_auth";

export default function IbgcDemo() {
  const [auth, setAuth] = useState(false);
  const [input, setInput] = useState("");
  const [erro, setErro] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "ok") setAuth(true);
  }, []);

  const tentar = () => {
    if (input === SENHA) {
      localStorage.setItem(STORAGE_KEY, "ok");
      setAuth(true);
    } else {
      setErro(true);
      setInput("");
      setTimeout(() => setErro(false), 3000);
    }
  };

  if (auth) return <Dashboard />;

  return (
    <div style={{background:"#0A0F1C",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"system-ui,sans-serif"}}>
      <div style={{width:340,textAlign:"center"}}>
        <div style={{fontSize:42,fontWeight:300,color:"#00D9FF",letterSpacing:4,marginBottom:8}}>EXP³</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginBottom:40,lineHeight:1.5}}>
          Sistema de Inteligência de Conhecimento<br/>IBGC
        </div>
        <input
          type="password"
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter")tentar()}}
          placeholder="Senha de acesso"
          style={{width:"100%",padding:"12px 14px",fontSize:14,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:8,color:"#e5e7eb",outline:"none",marginBottom:10,textAlign:"center",letterSpacing:2}}
          autoFocus
        />
        <button
          onClick={tentar}
          style={{width:"100%",padding:"12px",fontSize:14,background:"rgba(0,217,255,0.12)",border:"1px solid rgba(0,217,255,0.3)",borderRadius:8,color:"#00D9FF",cursor:"pointer",fontWeight:500}}
        >
          Acessar
        </button>
        {erro && <div style={{marginTop:12,fontSize:12,color:"#f87171"}}>Acesso não autorizado</div>}
        <div style={{marginTop:40,fontSize:11,color:"rgba(255,255,255,0.15)"}}>EXP³ · Inteligência Artificial &amp; Gestão do Conhecimento</div>
      </div>
    </div>
  );
}
