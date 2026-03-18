import React from "react";

const HostingVisualGrid = () => {
  return (
    <div className="w-full lg:w-1/2 relative h-[650px] flex items-center justify-center bg-black text-white overflow-hidden font-mono">

      {/* --- BACKGROUND GRID --- */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(transparent_95%,white_95%),linear-gradient(90deg,transparent_95%,white_95%)] bg-[size:40px_40px] animate-pulse" />
      </div>

      {/* --- SCANLINES --- */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_3px)] pointer-events-none" />

      {/* --- MAIN TERMINAL CORE --- */}
      <div className="relative z-20 group">
        <div className="w-80 h-96 border border-white/20 bg-black p-6 flex flex-col justify-between shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] transition-all duration-500">

          {/* HEADER */}
          <div className="flex justify-between items-center text-xs tracking-widest">
            <span>CORE_NODE</span>
            <span className="animate-pulse">● ONLINE</span>
          </div>

          {/* TERMINAL TEXT */}
          <div className="text-[11px] leading-relaxed opacity-80 space-y-1">
            <p className="animate-pulse">Initializing system...</p>
            <p>> Loading kernel modules</p>
            <p>> Establishing secure link</p>
            <p className="text-white">> ACCESS GRANTED</p>
          </div>

          {/* ID */}
          <div>
            <div className="h-[1px] bg-white/20 mb-2" />
            <p className="text-[10px] opacity-50">ID: SYS_CORE_01</p>
          </div>
        </div>
      </div>

      {/* --- FLOATING LEFT PANEL --- */}
      <div className="absolute left-4 top-20 w-56 border border-white/10 p-4 text-xs bg-black/80 backdrop-blur animate-pulse">
        <p className="mb-2">NETWORK_STATUS</p>
        <div className="w-full h-1 bg-white/10">
          <div className="h-full bg-white w-3/4 animate-[pulse_1.5s_infinite]" />
        </div>
      </div>

      {/* --- FLOATING RIGHT PANEL --- */}
      <div className="absolute right-4 bottom-16 w-52 border border-white/10 p-4 text-xs bg-black/80 backdrop-blur animate-pulse">
        <p className="mb-1">DATA_STREAM</p>
        <p className="opacity-60">Packets: 248K/s</p>
        <p className="opacity-60">Latency: 12ms</p>
      </div>

      {/* --- GLITCH OVERLAY --- */}
      <div className="absolute inset-0 pointer-events-none animate-[glitch_3s_infinite] opacity-10">
        <div className="w-full h-full bg-white" />
      </div>

    </div>
  );
};

export default HostingVisualGrid;