import React, { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { 
  XMarkIcon, 
  CommandLineIcon, 
  SwatchIcon, 
  DocumentTextIcon, 
  PhotoIcon 
} from '@heroicons/react/24/outline';
import { createBrand } from "../http/deviceApi.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CreateBrand = ({ show, onHide }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("bg-white text-black");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const addBrand = () => {
    createBrand({ name, color, description, cover_image: file }).then(() => {
      setName("");
      setColor("bg-white text-black");
      setDescription("");
      setFile(null);
      onHide();
    });
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-[100] font-mono" onClose={onHide}>
        {/* --- BACKDROP --- */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
        >
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
            >
              <Dialog.Panel className="relative w-full max-w-2xl transform bg-black border-2 border-white text-left transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                
                {/* --- TERMINAL HEADER --- */}
                <div className="bg-white text-black px-4 py-1.5 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CommandLineIcon className="h-4 w-4 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      [ Brand_Registry_Deployment ]
                    </span>
                  </div>
                  <button
                    type="button"
                    className="hover:bg-black hover:text-white transition-colors p-0.5"
                    onClick={() => onHide()}
                  >
                    <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="p-8 space-y-8">
                  {/* --- HEADER TEXT --- */}
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">
                      Initialize_Brand_Node
                    </h2>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">
                      // Define corporate visual parameters for the global registry
                    </p>
                  </div>

                  <section className="space-y-6">
                    {/* --- NAME INPUT --- */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-[10px] uppercase text-white/50 mb-1 group-focus-within:text-white transition-colors">
                        <CommandLineIcon className="h-3 w-3" /> &gt; node_alias
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ENTER_BRAND_NAME..."
                        className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none text-sm text-white transition-all"
                      />
                    </div>

                    {/* --- COLOR INPUT --- */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-[10px] uppercase text-white/50 mb-1 group-focus-within:text-white transition-colors">
                        <SwatchIcon className="h-3 w-3" /> &gt; visual_hex_protocol
                      </label>
                      <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="tailwind-class (e.g., bg-white text-black)"
                        className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none text-sm text-white transition-all"
                      />
                    </div>

                    {/* --- DESCRIPTION TEXTAREA --- */}
                    <div className="group">
                      <label className="flex items-center gap-2 text-[10px] uppercase text-white/50 mb-1 group-focus-within:text-white transition-colors">
                        <DocumentTextIcon className="h-3 w-3" /> &gt; mission_manifesto
                      </label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="DEFINE_COMPANY_OBJECTIVES..."
                        className="w-full bg-white/5 border border-white/20 focus:border-white p-3 outline-none text-sm text-white transition-all resize-none"
                      />
                    </div>

                    {/* --- FILE UPLOAD --- */}
                    <div className="group relative border-2 border-dashed border-white/10 hover:border-white/40 p-6 transition-all text-center">
                      <input
                        type="file"
                        onChange={selectFile}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <PhotoIcon className="h-8 w-8 text-white/20 mx-auto mb-2" />
                      <span className="text-[10px] uppercase text-white/40 block">
                        {file ? `[ FILE_LOADED: ${file.name} ]` : "// Click_to_upload_identity_schematic"}
                      </span>
                    </div>

                    {/* --- LIVE PREVIEW --- */}
                    {name && (
                      <div className="pt-4 border-t border-white/10">
                        <span className="text-[10px] text-white/30 uppercase mb-2 block">Visual_Output_Simulation:</span>
                        <div className="flex items-center justify-center border border-white/10 p-4 bg-white/5">
                           <span className={classNames(
                              "text-xs font-black uppercase tracking-widest px-6 py-1 border border-white",
                              color
                           )}>
                             {name}
                           </span>
                        </div>
                      </div>
                    )}

                    {/* --- EXECUTE BUTTON --- */}
                    <div className="pt-4">
                      <button
                        onClick={addBrand}
                        className="w-full bg-white text-black py-4 font-black uppercase text-xs tracking-[0.4em] border-2 border-white hover:bg-black hover:text-white transition-all active:scale-[0.98]"
                      >
                        [ EXECUTE_REGISTRY_INIT ]
                      </button>
                      
                      <div className="flex justify-between items-center opacity-20 text-[7px] uppercase tracking-[0.4em] mt-4">
                        <span>Buffer: Secure</span>
                        <span>Node: Active</span>
                        <span>Ref: WR_BR_09</span>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 p-1 opacity-20">
                   <div className="w-4 h-4 border-b border-r border-white" />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateBrand;