import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <div className="bg-black border-r border-white/20 h-full flex flex-col font-mono selection:bg-white selection:text-black overflow-hidden">
      
      {/* --- TOP: SYSTEM IDENTIFIER --- */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative h-3 w-3">
            <div className="absolute inset-0 bg-white/20 animate-ping rounded-full" />
            <div className="absolute inset-1 bg-white rounded-full shadow-[0_0_8px_white]" />
          </div>
          <h2 className="text-xs font-black tracking-[0.2em] text-white uppercase">
            Root_Directory
          </h2>
        </div>
        <div className="flex justify-between text-[8px] text-white/30 uppercase tracking-widest">
          <span>Srv_Partition: /dev/sda1</span>
          <span className="animate-pulse">Active</span>
        </div>
      </div>

      {/* --- MIDDLE: THE PROTOCOL LIST --- */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        <div className="px-4 py-2 mb-2">
           <span className="text-[9px] text-white/40 uppercase tracking-[0.3em]">
             // Filter_Clusters
           </span>
        </div>

        <div className="space-y-1">
          {device.brands.map((brand, index) => {
            const isSelected = brand.id === device.selectedBrand.id;
            // Generate a fake hex address based on index
            const hexAddr = `0x${(index + 10).toString(16).toUpperCase()}F`;
            
            return (
              <div
                key={brand.id}
                onClick={() => device.setSelectedBrand(brand)}
                className={classNames(
                  "group relative cursor-pointer flex items-center px-4 py-2 transition-all duration-75",
                  isSelected 
                    ? "bg-white text-black" 
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                )}
              >
                {/* Pointer / Cursor */}
                <span className={classNames(
                  "text-[10px] mr-3 font-bold",
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                )}>
                  {">"}
                </span>

                {/* Node Hex ID */}
                <span className="text-[9px] w-8 opacity-40 font-mono tracking-tighter">
                  {hexAddr}
                </span>

                {/* Brand Name */}
                <span className="text-[11px] font-bold uppercase tracking-tighter flex-1">
                  {brand.name}
                </span>

                {/* Binary / Binary-Style Status */}
                <span className="text-[8px] opacity-40">
                  {isSelected ? "[1]" : "[0]"}
                </span>

                {/* Selected Scanning Decoration */}
                {isSelected && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-black animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* --- RESET COMMAND --- */}
        <div className="mt-4 px-4">
          <button
            onClick={() => device.setSelectedBrand({})}
            className="w-full border border-dashed border-white/20 py-2 text-[9px] uppercase tracking-widest text-white/30 hover:text-white hover:border-white transition-all"
          >
            [ EXECUTE: RESET_ALL ]
          </button>
        </div>
      </div>

      {/* --- BOTTOM: SYSTEM LOG (DYNAMTIC DECOR) --- */}
      <div className="mt-auto p-4 bg-white/5 border-t border-white/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[8px] text-white/40 uppercase font-bold">Terminal_Log</span>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white/20" />
            <div className="w-1 h-1 bg-white/60" />
            <div className="w-1 h-1 bg-white" />
          </div>
        </div>
        <div className="text-[7px] space-y-1 font-mono leading-none">
          <p className="text-white/40 truncate italic">
            &gt; Selected_Brand: {device.selectedBrand.name || "None"}
          </p>
          <p className="text-white/20">&gt; Latency: 14ms</p>
          <p className="text-white/20">&gt; Protocol: HTTPS/TLS</p>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
});

export default TypeBar;