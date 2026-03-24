import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { fetchOneDevices } from "../http/deviceApi.js";
import { XMarkIcon, CpuChipIcon } from "@heroicons/react/24/outline";

const DeviceModal = ({ show, onHide, deviceId }) => {
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && deviceId) {
      setLoading(true);
      fetchOneDevices(deviceId).then((data) => {
        setDevice(data);
        setLoading(false);
      });
    } else {
      setDevice(null);
    }
  }, [show, deviceId]);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto font-mono selection:bg-white selection:text-black" onClose={onHide}>
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden border-2 border-white bg-black text-left align-bottom shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle relative">
              
              {/* --- MODAL HEADER LOGIC --- */}
              <div className="flex justify-between items-center bg-white text-black px-4 py-2 border-b-2 border-white">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">
                    Hardware_Details // ID: {deviceId ? deviceId.toString().padStart(4, '0') : "0000"}
                  </span>
                </div>
                <button
                  onClick={onHide}
                  className="text-black hover:text-gray-600 transition-colors focus:outline-none"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* --- MODAL CONTENT --- */}
              <div className="p-6 sm:p-8 text-white relative">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-5" 
                  style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                />

                {loading || !device ? (
                  <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                     <CpuChipIcon className="h-16 w-16 text-white/20 mb-4" />
                     <div className="text-[10px] tracking-widest uppercase text-white/50">Fetching_Node_Data...</div>
                  </div>
                ) : (
                  <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                    
                    {/* --- IMAGE SECTION --- */}
                    <div className="w-full lg:w-1/2 relative group">
                       <div className="aspect-w-1 aspect-h-1 overflow-hidden border border-white/20 bg-black group-hover:border-white transition-colors duration-500">
                          <img
                            src={device.img ? (device.img.startsWith('http') ? device.img : process.env.REACT_APP_API_URL + device.img) : ''}
                            alt={device.name}
                            className="h-full w-full object-cover object-center grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
                          />
                          {/* Scanline */}
                          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.06),rgba(0,255,255,0.02),rgba(255,255,255,0.06))] bg-[length:100%_2px,3px_100%] z-10 opacity-30" />
                       </div>
                       
                       <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 text-[8px] border border-white/20 uppercase tracking-widest backdrop-blur-sm">
                          SYS_IMG_01
                       </div>
                    </div>

                    {/* --- DETAILS SECTION --- */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-between">
                       
                       <div>
                          <div className="mb-2">
                             <div className="inline-block border border-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest mb-3">
                                {device.info?.length > 0 ? "Specs_Available" : "No_Specs"}
                             </div>
                             <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">
                               {device.name}
                             </h2>
                          </div>

                          <div className="h-[1px] w-full bg-white/20 mb-6 relative">
                             <div className="absolute left-0 top-0 h-[1px] w-1/3 bg-white" />
                          </div>

                          {/* Description using dangerouslySetInnerHTML */}
                          <div className="text-xs text-white/70 leading-relaxed mb-6 italic max-h-40 overflow-y-auto custom-scrollbar pr-2">
                            <div dangerouslySetInnerHTML={{ __html: device.description }} />
                          </div>
                          
                          {/* Hardware Info Table */}
                          {device.info && device.info.length > 0 && (
                             <div className="mt-4 border border-white/20 p-4 bg-white/5">
                                <h3 className="text-[10px] uppercase text-white/40 tracking-widest mb-3">Tech_Specs:</h3>
                                <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar pr-2">
                                  {device.info.map((info, index) => (
                                     <div key={info.id || index} className="flex justify-between border-b border-white/10 pb-1 text-xs last:border-0 last:pb-0">
                                        <span className="text-white/60 uppercase">{info.title}</span>
                                        <span className="font-bold">{info.description}</span>
                                     </div>
                                  ))}
                                </div>
                             </div>
                          )}
                       </div>

                       {/* Action Button */}
                       <div className="mt-8 pt-6 border-t border-white/20">
                           <button 
                             onClick={onHide}
                             className="w-full py-3 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-black hover:text-white border-2 border-white transition-all duration-300 focus:outline-none"
                           >
                             [ Close_Connection ]
                           </button>
                       </div>

                    </div>
                  </div>
                )}
              </div>
              
              {/* Corner decor */}
              <div className="absolute bottom-0 right-0 p-1 px-2 bg-white text-black text-[8px] font-black tracking-widest pointer-events-none">
                 END_OF_FILE
              </div>
            </div>
          </Transition.Child>
        </div>

        {/* Global style for custom scrollbar in this modal */}
        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
          }
        `}} />
      </Dialog>
    </Transition.Root>
  );
};

export default DeviceModal;
