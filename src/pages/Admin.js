import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  CommandLineIcon,
  CpuChipIcon,
  ServerStackIcon,
  FingerPrintIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import CreateBrand from "../modals/CreateBrand.js";
import CreateType from "../modals/CreateType.js";
import CreateDevice from "../modals/CreateDevice.js";
import ParticipantsList from '../components/admin/ParticipantsList.js';
import DeviceListAdmin from '../components/admin/DeviceListAdmin.js';

// --- КОМПОНЕНТ "ХАКЕРСКОГО" СПИСКА (АККОРДЕОНА) ---
const HackerAccordion = ({ title, logRef, isOpen, onToggle, children }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  // Эффект "глюка/декодирования" при открытии
  useEffect(() => {
    if (isOpen) {
      setIsGlitching(true);
      const timer = setTimeout(() => setIsGlitching(false), 250); // длительность бага
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className={`border transition-colors duration-500 relative group ${
      isOpen ? 'border-white/50 bg-white/5' : 'border-white/20 bg-black'
    }`}>
      {/* Декоративные элементы по углам */}
      <div className="absolute top-0 right-0 p-2 text-[8px] text-white/20">{logRef}</div>
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 transition-colors duration-300 ${
        isOpen ? 'border-white' : 'border-white/30'
      }`} />
      
      {/* Кнопка открытия/закрытия */}
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 outline-none hover:bg-white/5 transition-all focus:outline-none"
      >
        <div className="flex items-center gap-3">
          {/* Анимированная стрелка */}
          <ChevronRightIcon 
            className={`w-4 h-4 transition-all duration-300 ease-out transform ${
              isOpen ? 'rotate-90 text-white' : 'rotate-0 text-white/40 group-hover:translate-x-1 group-hover:text-white'
            }`} 
          />
          
          <div className="flex items-center gap-2">
            {/* Статус системы */}
            <span className={`text-[10px] font-bold tracking-widest transition-all duration-300 ${
              isOpen ? 'text-green-400' : 'text-red-500/80'
            }`}>
              {isOpen ? '[UNLOCKED]' : '[ENCRYPTED]'}
            </span>

            {/* Заголовок с Glitch анимацией */}
              {title}

            {/* Мигающий курсор терминала */}
            <div className={`w-2 h-3 bg-white transition-opacity ${isOpen ? 'animate-pulse opacity-100' : 'opacity-0'}`} />
          </div>
        </div>
      </button>

      {/* Плавное раскрытие контента через CSS Grid */}
      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}>
        <div className="overflow-hidden">
          <div className="px-4 pb-4 border-t border-white/10 relative mt-2">
            {/* Анимированная боковая линия "данных" */}
            <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-white/50 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.8)] opacity-50" />
            
            {/* Вставляем наши списки сюда */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Admin = observer(() => {
  // Состояния для модальных окон
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  // Состояния для хакерских списков
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [devicesOpen, setDevicesOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black pb-20">
      {/* --- GRID BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none opacity-5" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        
          
          <div className="pb-6 md:flex md:items-center md:justify-between bg-black">
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

        {/* --- MAIN CONTENT AREA (ХАКЕРСКИЕ АККОРДЕОНЫ) --- */}
        <div className="grid grid-cols-1 gap-6">
          
          {/* Секция 1: Active Participants */}
          <HackerAccordion 
            title="Active_Participants_Registry" 
            logRef="LOG_REF_09"
            isOpen={participantsOpen}
            onToggle={() => setParticipantsOpen(!participantsOpen)}
          >
            <ParticipantsList />
          </HackerAccordion>

          {/* Секция 2: Hardware Nodes */}
          <HackerAccordion 
            title="Hardware_Nodes_Registry" 
            logRef="LOG_REF_10"
            isOpen={devicesOpen}
            onToggle={() => setDevicesOpen(!devicesOpen)}
          >
            <DeviceListAdmin />
          </HackerAccordion>

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