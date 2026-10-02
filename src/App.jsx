import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = message.trim();
    if (!text || loading) return;
    setMessages(p => [...p, { role: "user", content: text }]);
    setMessage("");
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ message: text })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Request failed");
      setMessages(p => [...p, { role: "assistant", content: data.response }]);
    } catch (e) {
      setMessages(p => [...p, { role: "assistant", content: "Error: " + e.message }]);
    } finally { setLoading(false); }
  }

  return <div className="page"><div className="card">
    <header><div><h1>Gemini AI Chatbot</h1><p>React + Vercel + Gemini API</p></div>
      <button className="clear" onClick={() => setMessages([])}>Clear</button>
    </header>
    <main>
      {messages.length === 0 && <div className="welcome"><h2>Ask Gemini anything</h2><p>Try: Explain REST APIs in simple terms.</p></div>}
      {messages.map((m,i) => <div key={i} className={"row " + m.role}><div className="bubble"><b>{m.role==="user"?"You":"Gemini"}</b><div>{m.content}</div></div></div>)}
      {loading && <div className="row assistant"><div className="bubble"><b>Gemini</b><div>Thinking...</div></div></div>}
    </main>
    <div className="input"><textarea value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage()}}} placeholder="Type your message..." rows="2"/><button onClick={sendMessage} disabled={loading||!message.trim()}>{loading?"Sending...":"Send"}</button></div>
    <small>Your Gemini API key is stored on Vercel, not in the React code.</small>
  </div></div>;
}
