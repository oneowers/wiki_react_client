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
    const [type, setType] = useState(null);
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');

    // Загрузка справочников при открытии
    useEffect(() => {
        if (show) {
            fetchTypes().then(data => device.setTypes(data));
            fetchBrands().then(data => device.setBrands(data));
        }
    }, [show]); // Убрали device из зависимостей, чтобы избежать лишних циклов

    // Загрузка данных конкретного девайса
    useEffect(() => {
        if (show && deviceId) {
            setLoading(true);
            fetchOneDevices(deviceId).then(data => {
                setName(data.name);
                setDescription(data.description || '');
                setImg(data.img || '');
                setInfo(data.info || []);
                
                // Находим объекты бренда и типа в сторе
                const fetchedBrand = device.brands.find(b => b.id === Number(data.brandId));
                const fetchedType = device.types.find(t => t.id === Number(data.typeId));
                setBrand(fetchedBrand || null);
                setType(fetchedType || null);
            }).finally(() => setLoading(false));
        }
    }, [show, deviceId]); // Зависим только от открытия и смены ID

    // --- Функции управления характеристиками ---
    const addInfo = () => setInfo([...info, { title: '', description: '', id: Date.now() }]);
    const removeInfo = (id) => setInfo(info.filter(i => i.id !== id));
    const changeInfo = (key, value, id) => setInfo(info.map(i => i.id === id ? { ...i, [key]: value } : i));

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        
        // Логика: если выбран новый файл — шлем его, иначе шлем строку URL
        if (file) {
            formData.append('img', file);
        } else {
            formData.append('img', img);
        }

        if (brand) formData.append('brandId', brand.id);
        if (type) formData.append('typeId', type.id);
        
        const cleanInfo = info.map(i => ({ title: i.title, description: i.description }));
        formData.append('info', JSON.stringify(cleanInfo));

        updateDevice(deviceId, formData).then(() => {
            onHide();
            if (onUpdated) onUpdated();
        }).catch(e => {
            alert(e.response?.data?.message || 'Error updating device');
        });
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-mono text-white">
            <div className="bg-black border border-white/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar relative flex flex-col shadow-2xl">
                
                {/* Header */}
                <div className="border-b border-white/20 p-4 flex justify-between items-center bg-white/5 sticky top-0 z-10">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-white">Update_Hardware_Node</h2>
                    <button onClick={onHide} className="text-white/50 hover:text-white uppercase text-[10px] tracking-widest">[CLOSE]</button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {loading ? (
                        <div className="text-[10px] text-white/50 uppercase animate-pulse">Loading_Node_Data...</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase text-white/50 tracking-widest">Type</label>
                                    <select 
                                        className="w-full bg-black border border-white/20 text-white p-2 text-xs focus:border-white outline-none"
                                        value={type?.id || ''}
                                        onChange={(e) => setType(device.types.find(t => t.id === Number(e.target.value)))}
                                    >
                                        <option value="" disabled>Select_Type</option>
                                        {device.types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase text-white/50 tracking-widest">Brand</label>
                                    <select 
                                        className="w-full bg-black border border-white/20 text-white p-2 text-xs focus:border-white outline-none"
                                        value={brand?.id || ''}
                                        onChange={(e) => setBrand(device.brands.find(b => b.id === Number(e.target.value)))}
                                    >
                                        <option value="" disabled>Select_Brand</option>
                                        {device.brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase text-white/50 tracking-widest">Alias / Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-black border border-white/20 text-white p-2 text-xs focus:border-white outline-none"
                                        value={name} 
                                        onChange={e => setName(e.target.value)} 
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase text-white/50 tracking-widest">Image URL</label>
                                    <input 
                                        type="text" 
                                        value={img}
                                        onChange={e => { setImg(e.target.value); setFile(null); }} // Если пишем URL, сбрасываем файл
                                        className="w-full bg-black border border-white/20 text-white/70 p-2 text-xs focus:border-white outline-none"
                                    />
                                    
                                    {/* PREVIEW BLOCK */}
                                    {img && (
                                        <div className="mt-2 border border-white/10 p-2 bg-white/5 flex flex-col items-center">
                                            <p className="text-[7px] uppercase text-white/30 self-start mb-1">Preview</p>
                                            <img 
                                                src={img} 
                                                alt="preview" 
                                                className="max-h-32 object-contain"
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Specifications */}
                            <div className="border-t border-white/10 pt-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/70">Specifications</h3>
                                    <button onClick={addInfo} className="border border-white/30 px-3 py-1 text-[9px] hover:bg-white hover:text-black transition-all">+ Add</button>
                                </div>
                                {info.map(i => (
                                    <div key={i.id} className="flex gap-2 items-start border border-white/10 p-2 bg-white/5 relative group">
                                        <div className="flex-1 space-y-2">
                                            <input 
                                                value={i.title} 
                                                onChange={(e) => changeInfo('title', e.target.value, i.id)} 
                                                placeholder="Title"
                                                className="w-full bg-black border border-white/20 text-white p-1.5 text-[10px] outline-none"
                                            />
                                            <input 
                                                value={i.description} 
                                                onChange={(e) => changeInfo('description', e.target.value, i.id)} 
                                                placeholder="Description"
                                                className="w-full bg-black border border-white/20 text-white p-1.5 text-[10px] outline-none"
                                            />
                                        </div>
                                        <button onClick={() => removeInfo(i.id)} className="text-red-500 text-[9px] p-2 hover:bg-red-900 transition-all">DEL</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-white/20 p-4 bg-black flex justify-end gap-3 sticky bottom-0 z-10">
                    <button onClick={onHide} className="px-4 py-2 border border-white/30 text-[10px] uppercase">Cancel</button>
                    <button onClick={handleUpdate} disabled={loading} className="px-4 py-2 bg-white text-black text-[10px] font-bold uppercase hover:bg-black hover:text-white transition-all disabled:opacity-50">Commit_Update</button>
                </div>
            </div>
        </div>
    );
});

export default UpdateDevice;