import React, { Fragment, useState, useContext, useEffect } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Context } from "../index.js";
import { Menu, Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, ChevronDownIcon, CommandLineIcon, CloudArrowUpIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { createDevice, fetchBrands, fetchTypes } from "../http/deviceApi.js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CreateDevice = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [brandField, setBrand] = useState(null);
  const [typeField, setType] = useState(null);
  const [info, setInfo] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data));
    fetchTypes().then((data) => device.setTypes(data));
  }, [device]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const handleInputChange = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const handleDelete = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("img", file);
    formData.append("brandId", brandField.id);
    formData.append("typeId", typeField.id);
    formData.append("info", JSON.stringify(info));

    const contentState = editorState.getCurrentContent();
    const descriptionHtml = draftToHtml(convertToRaw(contentState));
    formData.append("description", descriptionHtml);

    createDevice(formData).then(() => onHide());
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-[100] font-mono" onClose={onHide}>
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
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
            >
              <Dialog.Panel className="relative w-full max-w-4xl bg-black border-2 border-white overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                
                {/* --- TERMINAL HEADER --- */}
                <div className="bg-white text-black px-4 py-2 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CommandLineIcon className="h-4 w-4 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest">Deploy_New_Hardware_Node</span>
                  </div>
                  <button onClick={onHide} className="hover:bg-black hover:text-white p-0.5 transition-colors">
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="p-6 md:p-8 space-y-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
                  
                  {/* --- CONFIGURATION SECTION --- */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Selectors */}
                    <div className="space-y-6">
                       <div className="flex flex-col gap-4">
                          <label className="text-[10px] text-white/40 uppercase tracking-widest font-bold">// Hardware_Parameters</label>
                          <div className="grid grid-cols-2 gap-3">
                            {/* Type Menu */}
                            <Menu as="div" className="relative">
                              <Menu.Button className="w-full border border-white/20 bg-white/5 px-3 py-2 text-[10px] text-white uppercase text-left flex justify-between items-center hover:border-white transition-colors">
                                {typeField?.name || "Select_Type"}
                                <ChevronDownIcon className="h-4 w-4" />
                              </Menu.Button>
                              <Menu.Items className="absolute z-50 mt-1 w-full border border-white bg-black p-1 shadow-2xl">
                                {device.types.map((type) => (
                                  <Menu.Item key={type.id}>
                                    {({ active }) => (
                                      <button
                                        onClick={() => setType(type)}
                                        className={classNames(active ? "bg-white text-black" : "text-white", "w-full text-left px-3 py-2 text-[10px] uppercase font-bold")}
                                      >
                                        {type.name}
                                      </button>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Menu>

                            {/* Brand Menu */}
                            <Menu as="div" className="relative">
                              <Menu.Button className="w-full border border-white/20 bg-white/5 px-3 py-2 text-[10px] text-white uppercase text-left flex justify-between items-center hover:border-white transition-colors">
                                {brandField?.name || "Select_Brand"}
                                <ChevronDownIcon className="h-4 w-4" />
                              </Menu.Button>
                              <Menu.Items className="absolute z-50 mt-1 w-full border border-white bg-black p-1 shadow-2xl">
                                {device.brands.map((brand) => (
                                  <Menu.Item key={brand.id}>
                                    {({ active }) => (
                                      <button
                                        onClick={() => setBrand(brand)}
                                        className={classNames(active ? "bg-white text-black" : "text-white", "w-full text-left px-3 py-2 text-[10px] uppercase font-bold")}
                                      >
                                        {brand.name}
                                      </button>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Menu>
                          </div>
                       </div>

                       <div>
                        <label className="text-[10px] text-white/50 uppercase mb-2 block tracking-widest">&gt; node_alias</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 outline-none text-sm transition-all text-white"
                          placeholder="ENTER_IDENTIFIER..."
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center p-6 relative group hover:border-white transition-all">
                      <input 
                        type="file" 
                        onChange={selectFile} 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        accept="image/*"
                      />
                      <CloudArrowUpIcon className="h-8 w-8 text-white/20 mb-2 group-hover:text-white transition-colors" />
                      <span className="text-[10px] uppercase font-bold text-white/40 group-hover:text-white">
                        {file ? file.name : "Upload_Schematics.img"}
                      </span>
                    </div>
                  </div>

                  {/* --- RICH TEXT EDITOR --- */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/50 uppercase tracking-widest">&gt; core_description_payload</label>
                    <div className="border border-white/20 focus-within:border-white transition-all bg-black text-white editor-terminal">
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        toolbar={{
                          options: ['inline', 'list', 'textAlign', 'history'],
                          inline: { inDropdown: false },
                          list: { inDropdown: true },
                        }}
                      />
                    </div>
                  </div>

                  {/* --- DYNAMIC PARAMETERS --- */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] text-white/50 uppercase tracking-widest">// Hardware_Specs_Table</label>
                      <button 
                        onClick={addInfo}
                        className="text-[9px] font-bold border border-white/30 px-3 py-1 uppercase hover:bg-white hover:text-black transition-all flex items-center gap-2"
                      >
                        <PlusIcon className="h-3 w-3" /> Add_Param
                      </button>
                    </div>

                    <div className="space-y-2">
                      {info.map((item) => (
                        <div key={item.number} className="flex gap-2 group animate-[slideIn_0.2s_ease-out]">
                          <input
                            placeholder="KEY"
                            value={item.title}
                            onChange={(e) => handleInputChange("title", e.target.value, item.number)}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-[11px] text-white outline-none focus:border-white flex-1 font-bold uppercase"
                          />
                          <input
                            placeholder="VALUE"
                            value={item.description}
                            onChange={(e) => handleInputChange("description", e.target.value, item.number)}
                            className="bg-white/5 border border-white/10 px-3 py-2 text-[11px] text-white outline-none focus:border-white flex-[2]"
                          />
                          <button
                            onClick={() => handleDelete(item.number)}
                            className="border border-red-900 text-red-900 px-3 hover:bg-red-900 hover:text-white transition-all"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* --- EXECUTE BUTTON --- */}
                  <div className="pt-6 border-t border-white/10">
                    <button
                      onClick={addDevice}
                      className="w-full bg-white text-black py-4 font-black uppercase text-xs tracking-[0.4em] hover:bg-black hover:text-white border-2 border-white transition-all"
                    >
                      [ EXECUTE_DEPLOYMENT_SEQUENCE ]
                    </button>
                    <div className="mt-4 flex justify-between text-[7px] text-white/20 uppercase tracking-[0.3em]">
                       <span>Status: Ready_to_init</span>
                       <span>Auth_Token: Verified</span>
                       <span>Priority: High</span>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>

        {/* CSS overrides for the Rich Text Editor to match the theme */}
        <style jsx global>{`
          .editor-terminal .rdw-editor-main { padding: 10px; min-height: 150px; font-size: 14px; }
          .editor-terminal .rdw-editor-toolbar { background: #111; border: none; border-bottom: 1px solid #333; }
          .editor-terminal .rdw-option-wrapper { background: #222; border: 1px solid #444; color: white; }
          .editor-terminal .rdw-option-wrapper:hover { background: #fff; }
          .editor-terminal .rdw-option-active { background: #fff; color: #000; }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; }
          @keyframes slideIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateDevice;