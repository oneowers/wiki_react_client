import React, { useEffect, useState, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { XMarkIcon, CpuChipIcon, EyeIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

// ТВОИ ИМПОРТЫ API (Убедись, что пути правильные)
import { 
  fetchOneDevices, 
  fetchDeviceComments, 
  createDeviceComment 
} from "../http/deviceApi.js";

import { getImgSrc } from "../utils/getImgSrc.js";

const DeviceModal = observer(({ show, onHide, deviceId }) => {
  // ДОБАВЛЕНО: device: deviceStore чтобы брать списки брендов и типов
  const { user, device: deviceStore } = useContext(Context);
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(false);

  const [comments, setComments] = useState({});
  const [commentTexts, setCommentTexts] = useState({});

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  useEffect(() => {
    if (show && deviceId) {
      setLoading(true);
      
      fetchOneDevices(deviceId).then((data) => {
        setDevice(data);
        setLoading(false);
      });

      fetchDeviceComments(deviceId).then((data) => {
        setComments((prev) => ({
          ...prev,
          [deviceId]: data,
        }));
      });

    } else {
      setDevice(null);
    }
  }, [show, deviceId]);

  const handleFormSubmit = async (event, currentDeviceId) => {
    event.preventDefault();
    const text = commentTexts[currentDeviceId] || "";
    
    if (text.trim() !== "") {
      try {
        await createDeviceComment(currentDeviceId, text.trim());
        const updatedComments = await fetchDeviceComments(currentDeviceId);
        
        setComments((prev) => ({
          ...prev,
          [currentDeviceId]: updatedComments,
        }));
        
        setCommentTexts((prev) => ({ ...prev,[currentDeviceId]: "" }));
      } catch (error) {
        console.error("Error sending comment:", error);
      }
    }
  };

  // Получаем имена бренда и типа
  const brandName = device ? (deviceStore.brands.find(b => b.id === device.brandId)?.name || "GENERIC_BRAND") : "";
  const typeName = device ? (deviceStore.types.find(t => t.id === device.typeId)?.name || "UNKNOWN_SYS") : "";

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto font-mono selection:bg-white selection:text-black" onClose={onHide}>
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block transform overflow-hidden border-2 border-white bg-black text-left align-bottom shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle relative">
              
              {/* --- MODAL HEADER --- */}
              <div className="flex justify-between items-center bg-white text-black px-4 py-2 border-b-2 border-white">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">
                    Hardware_Details // ID: {deviceId ? deviceId.toString().padStart(4, '0') : "0000"}
                  </span>
                </div>
                <button onClick={onHide} className="text-black hover:text-gray-600 transition-colors focus:outline-none">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* --- MODAL CONTENT --- */}
              <div className="p-6 sm:p-8 text-white relative flex flex-col max-h-[85vh]">
                
                <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                {loading || !device ? (
                  <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                     <CpuChipIcon className="h-16 w-16 text-white/20 mb-4" />
                     <div className="text-[10px] tracking-widest uppercase text-white/50">Fetching_Node_Data...</div>
                  </div>
                ) : (
                  <div className="flex flex-col lg:flex-row gap-8 relative z-10 flex-1 overflow-hidden">
                    
                    {/* --- IMAGE SECTION --- */}
                    <div className="w-full lg:w-1/2 relative group shrink-0">
                       <div className="aspect-w-1 aspect-h-1 overflow-hidden border border-white/20 bg-black group-hover:border-white transition-colors duration-500">
                          <img
                            src={getImgSrc(device.img)}
                            alt={device.name}
                            className="h-full w-full object-cover object-center grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
                          />
                          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.06),rgba(0,255,255,0.02),rgba(255,255,255,0.06))] bg-[length:100%_2px,3px_100%] z-10 opacity-30" />
                       </div>
                       <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 text-[8px] border border-white/20 uppercase tracking-widest backdrop-blur-sm">
                          SYS_IMG_01
                       </div>
                    </div>

                    {/* --- DETAILS & LOGS SECTION --- */}
                    <div className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden">
                       
                       {/* --- СКРОЛЛИРУЕМАЯ ЧАСТЬ (ИНФА) --- */}
                       <div className="overflow-y-auto custom-scrollbar pr-2 pb-4 flex-1">
                          
                          {/* ВЕРХНЯЯ СТРОКА: ПЛАШКА + СТАТИСТИКА */}
                          <div className="flex justify-between items-start mb-3">
                            <div className="inline-block border border-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                                {device.info?.length > 0 ? "Specs_Available" : "No_Specs"}
                            </div>
                            
                            {/* БЛОК СО СТАТИСТИКОЙ */}
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 border border-white/20">
                                  <EyeIcon className="h-3 w-3 text-white" />
                                  <span className="text-[10px] text-white font-bold">{device.views || 0}</span>
                                </div>
                                <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 border border-white/20">
                                  <ChatBubbleLeftIcon className="h-3 w-3 text-white" />
                                  <span className="text-[10px] text-white font-bold">{comments[deviceId]?.length || 0}</span>
                                </div>
                            </div>
                          </div>
                          
                          {/* БРЕНД И ТИП */}
                          <div className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
                             <span>{brandName}</span>
                             <span className="text-white/30">||</span>
                             <span>{typeName}</span>
                          </div>

                          {/* НАЗВАНИЕ */}
                          <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">
                            {device.name}
                          </h2>

                          {/* ЦЕНА И ДАТА СОЗДАНИЯ */}
                          <div className="flex justify-between items-end mb-4 border-b border-white/20 pb-4">
                             <div className="text-sm font-bold text-white uppercase tracking-widest border-l-2 border-white pl-2">
                                VALUE: {Number.isFinite(Number(device.price)) ? `${Number(device.price)} USD` : "UNKNOWN"}
                             </div>
                             {device.createdAt && (
                               <div className="text-[9px] text-white/40 uppercase tracking-widest text-right">
                                  SYS_INIT: {new Date(device.createdAt).toLocaleDateString("ru-RU", options)}
                               </div>
                             )}
                          </div>

                          {/* ОПИСАНИЕ (С HTML) */}
                          {device.description && (
                            <div className="text-[11px] text-white/70 leading-relaxed mb-6 font-mono border border-white/10 p-3 bg-[#050505]">
                               <span className="text-white/30 mr-2 font-bold">DESC://</span>
                               <span dangerouslySetInnerHTML={{ __html: device.description }} />
                            </div>
                          )}

                          {/* ХАРАКТЕРИСТИКИ */}
                          {device.info && device.info.length > 0 && (
                             <div className="mt-4 border border-white/20 p-4 bg-white/5 mb-2">
                                <h3 className="text-[10px] uppercase text-white/40 tracking-widest mb-3">Tech_Specs:</h3>
                                <div className="space-y-2">
                                  {device.info.map((info, index) => (
                                     <div key={info.id || index} className="flex justify-between border-b border-white/10 pb-1 text-xs last:border-0 last:pb-0">
                                        <span className="text-white/60 uppercase">{info.title}</span>
                                        <span className="font-bold text-right ml-4">{info.description}</span>
                                     </div>
                                  ))}
                                </div>
                             </div>
                          )}
                       </div>

                       {/* --- БЛОК КОММЕНТАРИЕВ (ТЕРМИНАЛ) --- */}
                       <div className="mt-auto border border-white/20 bg-[#0a0a0a] relative shrink-0">
                          <div className="absolute -top-2.5 left-2 bg-black px-1 text-[9px] text-white/50 font-bold tracking-widest uppercase z-10">
                            Sys_Logs
                          </div>
                          
                          <div className="overflow-y-auto p-3 space-y-2 custom-scrollbar max-h-32 min-h-[80px]">
                            {comments[deviceId]?.length > 0 ? (
                              comments[deviceId].map((comment, index) => (
                                <div className="text-[10px] leading-relaxed flex gap-2" key={index}>
                                  <span className="text-white/40 shrink-0">[{new Date(comment.createdAt).toLocaleDateString("ru-RU", options)}]
                                  </span>
                                  <span className="text-white break-words">
                                    <span className="text-white/50 mr-1">&gt;</span>
                                    {comment.text}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className="text-[10px] text-white/30 italic">[ NO_RECORDS_FOUND ]
                              </div>
                            )}
                          </div>

                          {/* Строка ввода */}
                          <div className="border-t border-white/20 bg-black">
                            {user.isAuth ? (
                              <form
                                onSubmit={(event) => handleFormSubmit(event, deviceId)}
                                className="flex items-center px-3 py-2"
                              >
                                <span className="text-white font-bold text-xs mr-2 animate-pulse">
                                  $&gt;
                                </span>
                                <input
                                  type="text"
                                  value={commentTexts[deviceId] || ""}
                                  placeholder="INPUT_COMMAND..."
                                  className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder:text-white/20"
                                  onChange={(e) =>
                                    setCommentTexts((prev) => ({
                                      ...prev,
                                      [deviceId]: e.target.value,
                                    }))
                                  }
                                />
                                {(commentTexts[deviceId]?.length || 0) > 0 && (
                                  <button
                                    type="submit"
                                    className="text-[9px] bg-white text-black px-2 py-1 font-bold hover:bg-gray-300 transition-colors uppercase tracking-widest ml-2 focus:outline-none"
                                  >
                                    EXEC
                                  </button>
                                )}
                              </form>
                            ) : (
                              <div className="flex items-center justify-between px-3 py-2 bg-white text-black">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-black">!</span>
                                  <span className="text-[10px] font-bold uppercase tracking-widest">
                                    ACCESS_DENIED
                                  </span>
                                </div>
                                <button
                                  onClick={() => navigate("/login")}
                                  className="text-[9px] border border-black px-2 py-0.5 font-bold hover:bg-black hover:text-white transition-colors uppercase"
                                >
                                  AUTH_REQ
                                </button>
                              </div>
                            )}
                          </div>
                       </div>
                       {/* --- КОНЕЦ БЛОКА КОММЕНТАРИЕВ --- */}

                       {/* Action Button */}
                       <div className="mt-4 pt-4 border-t border-white/20 shrink-0">
                           <button 
                             onClick={onHide}
                             className="w-full py-2 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-black hover:text-white border-2 border-white transition-all duration-300 focus:outline-none"
                           >
                             [ Close_Connection ]
                           </button>
                       </div>

                    </div>
                  </div>
                )}
              </div>
              
              <div className="absolute bottom-0 right-0 p-1 px-2 bg-white text-black text-[8px] font-black tracking-widest pointer-events-none">
                 END_OF_FILE
              </div>
            </div>
          </Transition.Child>
        </div>

        {/* Стили скроллбара */}
        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #000;
            border-left: 1px solid rgba(255,255,255,0.1);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #fff;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.8);
          }
        `}} />
      </Dialog>
    </Transition.Root>
  );
});

export default DeviceModal;