import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../index.js";
import { fetchOneDevices, updateDevice, fetchTypes, fetchBrands } from "../http/deviceApi.js";
import { observer } from "mobx-react-lite";

const UpdateDevice = observer(({ show, onHide, deviceId, onUpdated }) => {
    const { device } = useContext(Context);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [brand, setBrand] = useState(null);
    const[type, setType] = useState(null);
    const [info, setInfo] = useState([]);
    const[loading, setLoading] = useState(false);

    // Fetch types and brands for the dropdowns
    useEffect(() => {
        if (show) {
            fetchTypes().then(data => device.setTypes(data));
            fetchBrands().then(data => device.setBrands(data));
        }
    },[device, show]);

    // Fetch specific device data when the modal opens
    useEffect(() => {
        if (show && deviceId) {
            setLoading(true);
            fetchOneDevices(deviceId).then(data => {
                setName(data.name);
                setDescription(data.description || '');
                const fetchedBrand = device.brands.find(b => b.id === Number(data.brandId));
                const fetchedType = device.types.find(t => t.id === Number(data.typeId));
                setBrand(fetchedBrand || null);
                setType(fetchedType || null);
                setInfo(data.info ||[]);
                setFile(null); // Keep null to not overwrite existing image unless a new one is selected
            }).finally(() => setLoading(false));
        }
    },[show, deviceId, device.brands, device.types]);

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', id: Date.now() }]);
    };
    const removeInfo = (id) => {
        setInfo(info.filter(i => i.id !== id));
    };
    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? { ...i, [key]: value } : i));
    };

    const selectFile = e => {
        setFile(e.target.files[0]);
    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (file) {
            formData.append('img', file);
        }
        if (brand) formData.append('brandId', brand.id);
        if (type) formData.append('typeId', type.id);
        
        // Strip out the internal UI IDs before sending to backend
        const cleanInfo = info.map(i => ({ title: i.title, description: i.description }));
        formData.append('info', JSON.stringify(cleanInfo));
        
        updateDevice(deviceId, formData).then(data => {
            onHide();
            if (onUpdated) onUpdated(); // trigger refetch in the parent component
        }).catch(e => {
            alert(e.response?.data?.message || 'Error updating device');
        });
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono text-white">
            <div className="bg-black border border-white/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar relative flex flex-col shadow-2xl shadow-white/10">
                
                {/* Header */}
                <div className="border-b border-white/20 p-4 flex justify-between items-center bg-white/5 sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white animate-pulse" />
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white">Update_Hardware_Node</h2>
                    </div>
                    <button onClick={onHide} className="text-white/50 hover:text-white uppercase text-[10px] tracking-widest border border-transparent hover:border-white px-2 py-1 transition-all">
                        [CLOSE]
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {loading ? (
                        <div className="text-[10px] text-white/50 uppercase tracking-widest animate-pulse">
                            Loading_Node_Data...
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-white/50">Node_Type</label>
                                    <select 
                                        className="w-full bg-black border border-white/20 text-white p-2 text-xs focus:border-white focus:outline-none appearance-none uppercase"
                                        value={type?.id || ''}
                                        onChange={(e) => setType(device.types.find(t => t.id === Number(e.target.value)))}
                                    >
                                        <option value="" disabled>Select_Type</option>
                                        {device.types.map(t => (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-white/50">Node_Brand</label>
                                    <select 
                                        className="w-full bg-black border border-white/20 text-white p-2 text-xs focus:border-white focus:outline-none appearance-none uppercase"
                                        value={brand?.id || ''}
                                        onChange={(e) => setBrand(device.brands.find(b => b.id === Number(e.target.value)))}
                                    >
                                        <option value="" disabled>Select_Brand</option>
                                        {device.brands.map(b => (
                                            <option key={b.id} value={b.id}>{b.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-white/50">Alias / Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-black border border-white/20 text-white p-2 text-xs focus:border-white focus:outline-none placeholder-white/20"
                                        value={name} 
                                        onChange={e => setName(e.target.value)} 
                                        placeholder="Enter node alias" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-white/50">Description</label>
                                    <textarea 
                                        className="w-full bg-black border border-white/20 text-white p-2 text-xs focus:border-white focus:outline-none placeholder-white/20 min-h-[80px]"
                                        value={description} 
                                        onChange={e => setDescription(e.target.value)} 
                                        placeholder="Enter node description" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-white/50">Schematics / Image (Leave blank to keep current)</label>
                                    <input 
                                        type="file" 
                                        className="w-full bg-black border border-white/20 text-white/70 p-2 text-xs file:mr-4 file:py-1 file:px-3 file:rounded-none file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:bg-white file:text-black hover:file:bg-white/80 transition-all cursor-pointer"
                                        onChange={selectFile} 
                                    />
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-4 space-y-4 mt-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/70">Specifications</h3>
                                    <button 
                                        onClick={addInfo} 
                                        className="border border-white/30 px-3 py-1.5 text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                                    >
                                        + Add_Property
                                    </button>
                                </div>
                                {info.map(i => (
                                    <div key={i.id} className="flex gap-2 items-start border border-white/10 p-2 bg-white/5 relative group">
                                        <div className="absolute top-0 right-0 p-1 text-[7px] text-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                            ID_{String(i.id).slice(-4)}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <input 
                                                value={i.title} 
                                                onChange={(e) => changeInfo('title', e.target.value, i.id)} 
                                                placeholder="Property Name (e.g., Core)" 
                                                className="w-full bg-black border border-white/20 text-white p-1.5 text-[10px] focus:border-white focus:outline-none"
                                            />
                                            <input 
                                                value={i.description} 
                                                onChange={(e) => changeInfo('description', e.target.value, i.id)} 
                                                placeholder="Value (e.g., Quantum_v9)" 
                                                className="w-full bg-black border border-white/20 text-white p-1.5 text-[10px] focus:border-white focus:outline-none"
                                            />
                                        </div>
                                        <button 
                                            onClick={() => removeInfo(i.id)} 
                                            className="text-red-500 hover:text-white border border-red-900/50 hover:bg-red-900 px-2 py-1.5 text-[9px] uppercase transition-all mt-1"
                                        >
                                            DEL
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-white/20 p-4 bg-black flex justify-end gap-3 sticky bottom-0 z-10">
                    <button 
                        onClick={onHide} 
                        className="px-4 py-2 border border-white/30 text-[10px] uppercase tracking-widest text-white/70 hover:text-white hover:border-white transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleUpdate} 
                        disabled={loading}
                        className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest border border-white hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Commit_Update
                    </button>
                </div>
            </div>
        </div>
    );
});

export default UpdateDevice;