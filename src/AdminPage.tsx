import React, { useState, useEffect } from "react";
import { Copy, Link, Check, MessageSquare } from "lucide-react";

export default function AdminPage() {
  const [prefix, setPrefix] = useState("Mr.");
  const [guestName, setGuestName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Generate the base URL (works in local dev and production)
  const baseUrl = window.location.origin + window.location.pathname.replace('/admin', '');

  const prefixes = ["Mr.", "Mrs.", "Mr. & Mrs.", "Family", "Dear"];

  const handleGenerate = () => {
    if (!guestName.trim()) return;
    
    // Create link with URL search params (p = prefix, n = name)
    const url = new URL(baseUrl);
    url.searchParams.set("p", prefix);
    url.searchParams.set("n", guestName.trim());
    
    setGeneratedLink(url.toString());
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const generatedMessage = `Dear ${prefix} ${guestName.trim()} ❤️

With joyful hearts, we warmly invite you and your family to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Hashintha & Hasini`;

  const copyLink = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy link");
    }
  };

  const copyFullMessage = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch (err) {
      console.error("Failed to copy message");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfaf5] font-montserrat p-4 md:p-10 flex justify-center items-start pt-16">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_20px_50px_-20px_rgba(131,63,105,0.15)] border border-theme-100 overflow-hidden relative">
        <div className="bg-theme-50/50 border-b border-theme-100 p-6 md:p-8 text-center">
          <h1 className="font-playball text-4xl text-theme-900 mb-2">Link Generator</h1>
          <p className="text-stone-500 text-xs tracking-widest uppercase font-bold">Admin Dashboard</p>
        </div>

        <div className="p-6 md:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-6">
            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-500 ml-2">Prefix</label>
              <div className="relative">
                <select
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="w-full bg-stone-50 border border-theme-200 px-4 py-3.5 text-stone-800 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-lg tracking-wide appearance-none rounded-xl cursor-pointer shadow-sm"
                >
                  {prefixes.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 border-r-2 border-b-2 border-theme-400 rotate-45 transform -translate-y-[25%]" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-500 ml-2">Guest Name</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full bg-stone-50 border border-theme-200 px-4 py-3.5 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-lg tracking-wide rounded-xl shadow-sm"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!guestName.trim()}
            className="w-full bg-theme-600 text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-theme-700 hover:shadow-lg hover:shadow-theme-600/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
          >
            <Link size={16} />
            Generate Link
          </button>

          {generatedLink && (
            <div className="pt-8 mt-8 border-t border-theme-100 space-y-6">
              <div className="bg-theme-50 border border-theme-200 rounded-xl p-4 overflow-x-auto text-sm text-theme-800 font-mono">
                {generatedLink}
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 relative">
                <pre className="font-montserrat text-stone-600 text-sm whitespace-pre-wrap font-medium leading-relaxed">
                  {generatedMessage}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={copyLink}
                  className="bg-white border border-theme-200 text-theme-700 py-3.5 rounded-xl font-bold uppercase tracking-[0.1em] text-[10px] hover:bg-theme-50 transition-colors flex justify-center items-center gap-2 shadow-sm"
                >
                  {copiedLink ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  {copiedLink ? "Copied!" : "Copy Link Only"}
                </button>
                
                <button
                  onClick={copyFullMessage}
                  className="bg-theme-800 text-white py-3.5 rounded-xl font-bold uppercase tracking-[0.1em] text-[10px] hover:bg-theme-900 transition-colors flex justify-center items-center gap-2 shadow-sm"
                >
                  {copiedMessage ? <Check size={14} className="text-green-400" /> : <MessageSquare size={14} />}
                  {copiedMessage ? "Copied Message!" : "Copy Full Message"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
