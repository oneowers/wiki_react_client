import { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  CommandLineIcon,
  CpuChipIcon,
  ServerStackIcon,
  FingerPrintIcon
} from "@heroicons/react/24/outline";
import CreateBrand from "../modals/CreateBrand.js";
import CreateType from "../modals/CreateType.js";
import CreateDevice from "../modals/CreateDevice.js";
import ParticipantsList from '../components/admin/ParticipantsList.js';
import DeviceListAdmin from '../components/admin/DeviceListAdmin.js';

const Admin = observer(() => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black pb-20">
      {/* --- GRID BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none opacity-5" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* --- HEADER CONSOLE --- */}
        <div className="border-2 border-white mb-10 overflow-hidden">
          <div className="bg-white text-black px-4 py-1 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FingerPrintIcon className="h-4 w-4 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Root_Access_Established</span>
            </div>
            <span className="text-[10px] opacity-50">NODE_ADMIN_V4.0</span>
          </div>
          
          <div className="p-6 md:flex md:items-center md:justify-between bg-black">
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl font-black uppercase tracking-tighter italic">Command_Center</h1>
              <p className="text-xs text-white/40 mt-1 tracking-widest">// System hardware and node registry management</p>
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div className="flex flex-wrap gap-3">
              <button
                className="group relative border border-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                onClick={() => setTypeVisible(true)}
              >
                <div className="flex items-center gap-2">
                  <CommandLineIcon className="h-4 w-4" />
                  <span>[Init_Type]</span>
                </div>
              </button>

              <button
                className="group relative border border-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                onClick={() => setBrandVisible(true)}
              >
                <div className="flex items-center gap-2">
                  <ServerStackIcon className="h-4 w-4" />
                  <span>[Deploy_Brand]</span>
                </div>
              </button>

              <button
                className="group relative bg-white text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-white hover:bg-black hover:text-white transition-all"
                onClick={() => setDeviceVisible(true)}
              >
                <div className="flex items-center gap-2">
                  <CpuChipIcon className="h-4 w-4" />
                  <span>[Upload_Hardware]</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="grid grid-cols-1 gap-8">
          <div className="border border-white/20 bg-white/5 relative group">
            {/* Corner Decorative Elements */}
            <div className="absolute top-0 right-0 p-2 text-[8px] text-white/20">LOG_REF_09</div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white" />
            
            <div className="p-4 border-b border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 bg-white animate-pulse" />
                <h2 className="text-xs font-bold uppercase tracking-widest">Active_Participants_Registry</h2>
            </div>
            
            <div className="p-2 overflow-x-auto">
                <ParticipantsList />
            </div>
          </div>

          <div className="border border-white/20 bg-white/5 relative group">
            {/* Corner Decorative Elements */}
            <div className="absolute top-0 right-0 p-2 text-[8px] text-white/20">LOG_REF_10</div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white" />
            
            <div className="p-4 border-b border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 bg-white animate-pulse" />
                <h2 className="text-xs font-bold uppercase tracking-widest">Hardware_Nodes_Registry</h2>
            </div>
            
            <div className="p-2">
                <DeviceListAdmin />
            </div>
          </div>
        </div>

        {/* --- MODALS --- */}
        <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
        <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />

        {/* --- SYSTEM FOOTER METADATA --- */}
        <div className="mt-12 opacity-20 flex justify-between text-[8px] uppercase tracking-[0.4em]">
           <span>Encrypted_Link: Secure</span>
           <span>Packet_Loss: 0.00%</span>
           <span>Buffer: Stable</span>
        </div>
      </div>

      {/* --- GLOBAL SCANLINE --- */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(255,255,255,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02),rgba(255,255,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
});

export default Admin;