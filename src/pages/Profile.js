import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index.js";
import { 
  CommandLineIcon, 
  CpuChipIcon, 
  ShieldCheckIcon,
  PencilSquareIcon 
} from '@heroicons/react/24/outline';
import Modal from "../elements/Modal";
import { observer } from "mobx-react-lite";
import { updateProfile } from "../http/userApi.js";
import { toast } from "react-toastify";

const Profile = observer(() => {
  const { user } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Инициализация состояний из стора
  const [newName, setNewName] = useState(user.user?.first_name || "");
  const [newImage, setNewImage] = useState(user.user?.profile_image || "");
  const [newRole, setNewRole] = useState(user.user?.role || "USER");

  useEffect(() => {
    if (isModalOpen) {
      setNewName(user.user?.first_name || "");
      setNewImage(user.user?.profile_image || "");
      setNewRole(user.user?.role || "USER");
    }
  }, [isModalOpen, user.user]);

  const handleUpdate = async () => {
    try {
      // Вызываем API для сохранения данных в базу
      const response = await updateProfile(
        user.user.id, 
        newName, 
        newImage, 
        newRole, 
        user
      );

      if (response.success) {
        toast.success(`> STATUS: OK. ${response.message}`);
        setIsModalOpen(false);
      } else {
        toast.error(`> ERROR: UPDATE_FAILED. ${response.message}`);
      }
    } catch (e) {
      toast.error("> ERROR: NETWORK_OR_SERVER_ERROR");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono pb-20 selection:bg-white selection:text-black">
      
      {/* --- PROFILE BANNER --- */}
      <div className="relative h-48 lg:h-64 overflow-hidden border-b-2 border-white">
        {user.user?.profile_image ? (
          <img 
            className="h-full w-full object-cover grayscale brightness-50 contrast-125" 
            // src={user.user.profile_image} 
            alt="Hardware" 
          />
        ) : (
          <div className="h-full w-full bg-white/5 flex items-center justify-center">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
             <CommandLineIcon className="h-12 w-12 text-white/20 animate-pulse" />
          </div>
        )}
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,255,255,0.06),rgba(0,255,255,0.02),rgba(255,255,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-30" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-16 sm:-mt-20 relative z-10 sm:flex sm:items-end sm:space-x-8">
          
          {/* --- AVATAR --- */}
          <div className="flex">
            {user.user?.profile_image ? (
              <img 
                className="h-32 w-32 border-4 border-black bg-black grayscale contrast-150 ring-2 ring-white sm:h-40 sm:w-40"
                src={user.user.profile_image} 
                alt="Node Avatar"
              />
            ) : (
              <div className="h-32 w-32 bg-black border-2 border-white flex items-center justify-center sm:h-40 sm:w-40 ring-4 ring-black">
                <span className="text-4xl font-black text-white">?</span>
              </div>
            )}
          </div>

          {/* --- USER INFO BAR --- */}
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1">
              <h1 className="text-3xl font-black uppercase tracking-tighter">
                {user.user?.first_name || "UNIDENTIFIED_NODE"}
              </h1>
              <div className="flex items-center gap-4 mt-1 text-white/50 text-[10px] uppercase tracking-widest">
                <span className="flex items-center gap-1">
                  <ShieldCheckIcon className="h-3 w-3" />
                  AUTH_LEVEL: {user.user?.role || "GUEST"}
                </span>
                <span className="flex items-center gap-1 text-white/30">
                  <CpuChipIcon className="h-3 w-3" />
                  UID: {user.user?.id ? user.user.id.toString().padStart(5, '0') : "00000"}
                </span>
              </div>
            </div>

            {/* --- ACTIONS --- */}
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex justify-center items-center bg-white text-black px-6 py-2 text-xs font-black uppercase tracking-widest border-2 border-white hover:bg-black hover:text-white transition-all"
              >
                <PencilSquareIcon className="mr-2 h-4 w-4" />
                Configure_Node
              </button>
            </div>
          </div>
        </div>

        {/* --- SYSTEM STATS / DETAILS SECTION --- */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-white/10 p-6 bg-white/5">
            <h3 className="text-[10px] text-white/40 uppercase mb-4 tracking-widest">Network_Status</h3>
            <div className="space-y-2">
               <div className="flex justify-between text-xs">
                  <span className="text-white/60">Uptime:</span>
                  <span className="text-white font-bold">99.9%</span>
               </div>
               <div className="h-1 bg-white/10 w-full">
                  <div className="h-full bg-white w-full animate-pulse" />
               </div>
            </div>
          </div>

          <div className="md:col-span-2 border border-white/10 p-6">
            <h3 className="text-[10px] text-white/40 uppercase mb-4 tracking-widest">System_Logs</h3>
            <div className="text-[10px] space-y-1 text-white/60">
              <p>&gt; LAST_LOGIN: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
              <p>&gt; ENCRYPTION_STATE: ACTIVE (AES_256)</p>
              <p className="text-white animate-pulse">&gt; CONNECTION_STABLE: EDGE_NODE_ALPHA</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- EDIT INFORMATION MODAL --- */}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-black uppercase tracking-widest">Update_Credentials</h2>
            <p className="text-[10px] text-white/40 uppercase">Modify node identification parameters</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] text-white/50 uppercase mb-1">&gt; first_name (alias)</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 focus:border-white py-2 outline-none text-sm transition-colors"
                placeholder="ENTER_NEW_ALIAS"
              />
            </div>
            
            <div>
              <label className="block text-[10px] text-white/50 uppercase mb-1">&gt; profile_image_url</label>
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 focus:border-white py-2 outline-none text-sm transition-colors"
                placeholder="https://example.com/image.png"
              />
            </div>

            <div>
              <label className="block text-[10px] text-white/50 uppercase mb-1">&gt; system_role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full bg-black text-white border-b border-white/30 focus:border-white py-2 outline-none text-sm transition-colors uppercase"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            
            {/* Displaying static info as non-editable for aesthetic */}
            <div>
              <label className="block text-[10px] text-white/50 uppercase mb-1">&gt; phone_identifier</label>
              <div className="text-sm text-white/30 py-2 border-b border-white/10 italic">
                {user.user?.phone_number || "NOT_FOUND"} (LOCKED)
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={handleUpdate}
              className="w-full py-3 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white border-2 border-white transition-all"
            >
              [ EXECUTE_UPDATE ]
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-3 bg-transparent text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-colors"
            >
              //_Abort_Operation
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default Profile;