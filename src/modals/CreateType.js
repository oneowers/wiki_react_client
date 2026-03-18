import React, { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, CommandLineIcon, TagIcon } from '@heroicons/react/24/outline'
import { createType } from "../http/deviceApi.js";

const CreateType = ({ show, onHide }) => {
    const [name, setName] = useState('');

    const addType = () => {
        createType({ name: name }).then(data => {
            setName('')
            onHide()
        })
    }

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
                                            [ Category_Registry_Init ]
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

                                <div className="grid grid-cols-1 md:grid-cols-12">
                                    {/* --- SIDE VISUAL (Technical Placeholder) --- */}
                                    <div className="relative hidden md:block md:col-span-4 bg-white/5 border-r border-white/10 overflow-hidden">
                                        <img 
                                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop" 
                                            className="h-full object-cover grayscale brightness-50 contrast-125" 
                                            alt="Code Matrix"
                                        />
                                        <div className="absolute inset-0 bg-black/40" />
                                        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(255,255,255,0.25)_50%)] bg-[length:100%_4px]" />
                                    </div>

                                    {/* --- FORM CONTENT --- */}
                                    <div className="md:col-span-8 p-8 flex flex-col justify-center">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TagIcon className="h-3 w-3 text-white/40" />
                                            <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                                                Initialize_New_Type
                                            </h2>
                                        </div>
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-8">
                                            Define hardware classification parameters.
                                        </p>

                                        <section className="space-y-6">
                                            <div>
                                                <label htmlFor="name" className="block text-[10px] uppercase text-white/50 mb-1">
                                                    &gt; Type_Label_ID
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={name}
                                                    autoComplete="off"
                                                    onChange={e => setName(e.target.value)}
                                                    placeholder="E.G._DEDICATED_SERVERS"
                                                    className="w-full bg-transparent border-b border-white/20 focus:border-white py-3 outline-none text-sm text-white transition-all placeholder:text-white/10"
                                                    required
                                                />
                                            </div>

                                            <div className="pt-4 flex flex-col gap-3">
                                                <button
                                                    onClick={addType}
                                                    className="w-full bg-white text-black py-4 font-black uppercase text-xs tracking-[0.3em] border-2 border-white hover:bg-black hover:text-white transition-all active:scale-[0.98]"
                                                >
                                                    [ REGISTER_NODE_TYPE ]
                                                </button>
                                                
                                                <div className="flex justify-between items-center opacity-20 text-[7px] uppercase tracking-widest">
                                                    <span>STATUS: READY</span>
                                                    <span>ENCRYPT: AES_256</span>
                                                    <span>LOG: WR_CORE</span>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>

                                {/* Decorative Corner Accent */}
                                <div className="absolute bottom-0 right-0 p-1">
                                    <div className="w-4 h-4 border-b border-r border-white/20" />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default CreateType;