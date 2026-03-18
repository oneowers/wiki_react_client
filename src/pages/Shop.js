import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Context } from "../index.js";
import { fetchBrands, fetchDevices } from "../http/deviceApi.js";
import { ABOUT_ROUTE } from "../utils/consts.js";
import PreviewDeviceList from "../components/PreviewDeviceList.js";

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      device.limit
    ).then((data) => {
      device.setDevices(data);
    });
  }, [device.page, device.selectedType.id, device.selectedBrand.id]);

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black overflow-x-hidden">
      {/* --- GRID BACKGROUND OVERLAY --- */}
      <div className="fixed inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
      />

      <div className="flex flex-row mx-auto max-w-7xl mb-14 relative z-10">
        
        {/* LEFT SIDEBAR (TypeBar) */}
        <div className="basis-1/6 hidden lg:block border-r border-white/20 pt-6">
          {/* <TypeBar /> */}
        </div>

        {/* MAIN CONTENT */}
        <div className="basis-full lg:basis-3/6 px-4">
          <div className="mt-6">
            
            {/* --- HACKER STYLE BANNER --- */}
            <div className="relative overflow-hidden border-2 border-white bg-black group transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] lg:h-64">
              
              {/* Scanline Animation */}
              <div className="absolute inset-0 w-full h-[2px] bg-white/20 shadow-[0_0_15px_white] animate-[scan_4s_linear_infinite] z-20 pointer-events-none" />
              
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
                  alt="Server Core"
                  className="h-full w-full object-cover object-center opacity-40 grayscale group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              </div>

              {/* Banner Content Card */}
              <div className="relative z-10 h-full p-6 flex flex-col justify-between items-start">
                <div className="bg-white text-black px-2 py-0.5 text-[10px] font-bold tracking-[0.2em] animate-pulse">
                  SYSTEM_INITIALIZING...
                </div>
                
                <div className="max-w-xs">
                  <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">
                    Next-Gen <br /> 
                    <span className="bg-white text-black">Hosting</span> Soon
                  </h2>
                  <p className="mt-2 text-xs text-white/70 leading-tight">
                    [DEPLOYMENT_PHASE: 04] // NVMe storage, global edge nodes, and encrypted tunneling. Join the dark side of speed.
                  </p>
                </div>

                <Link
                  to={ABOUT_ROUTE}
                  className="group relative inline-flex items-center justify-center border border-white px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-black"
                >
                  <span className="relative z-10">Initialize_Specs</span>
                  <div className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-0 right-0 p-2 text-[8px] text-white/30 text-right">
                ID: HOST_SRV_091<br/>
                LOC: EDGE_NODE_ALPHA
              </div>
            </div>

            {/* --- DEVICE LIST AREA --- */}
            <div className="mt-10">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-white font-bold tracking-widest uppercase text-sm">Hardware_Inventory</h3>
                <div className="h-[1px] flex-grow bg-white/20" />
              </div>
              
              <PreviewDeviceList />
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="basis-2/6 hidden lg:block border-l border-white/20">
          <div className="m-5 mt-6 p-4 border border-white/10 bg-white/5 h-full">
             <div className="text-[10px] text-white/40 mb-4">TERMINAL_LOGS:</div>
             <div className="space-y-2 font-mono text-[9px] text-white/60">
                <p>&gt; Connection established...</p>
                <p>&gt; Protocol 802.11 active</p>
                <p className="text-white">&gt; 99.9% Uptime guaranteed</p>
                <div className="w-full h-1 bg-white/10 mt-4 overflow-hidden">
                  <div className="h-full bg-white w-1/3 animate-[loading_2s_infinite]" />
                </div>
             </div>
             {/* <DeviceList /> */}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(600px); }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
});

export default Shop;