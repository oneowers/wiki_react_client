import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Context } from "../index.js";
import { fetchBrands, fetchTypes, fetchDevices } from "../http/deviceApi.js";
import { ABOUT_ROUTE } from "../utils/consts.js";
import PreviewDeviceList from "../components/PreviewDeviceList.js";


const Shop = observer(() => {
  const { device } = useContext(Context);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedBrand, setSelectedBrand] = useState({});
  const [selectedType, setSelectedType] = useState({});
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data));
    fetchTypes().then((data) => device.setTypes(data));
  }, []);

  useEffect(() => {
    const typeId = selectedType.id || device.selectedType.id || null;
    const brandId = selectedBrand.id || device.selectedBrand.id || null;

    fetchDevices(typeId, brandId, device.page, device.limit)
      .then((data) => {
        device.setDevices(data);
      })
      .catch((err) => console.error("Ошибка загрузки устройств:", err));
  }, [device.page, device.limit, selectedType, selectedBrand, device.selectedType.id, device.selectedBrand.id]);

  const allDevices = device.devices?.rows || [];
  const filteredDevices = allDevices.filter((item) => {
    if (priceMin && Number(item.price) < Number(priceMin)) return false;
    if (priceMax && Number(item.price) > Number(priceMax)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black overflow-x-hidden">
      {/* --- GRID BACKGROUND OVERLAY --- */}
      <div className="fixed inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
      />

      <div className="flex flex-row mx-auto max-w-7xl mb-14 relative z-10">
        


        {/* RIGHT SIDEBAR FILTERS */}
        <div className="basis-3/12 hidden lg:block ">
          <div className="m-5 mt-6 p-4 border border-white/10 bg-white/5 h-full space-y-4">
            <div className="text-sm font-bold uppercase tracking-widest">Фильтры</div>

            <div className="space-y-2">
              <label className="block text-xs text-white/60 uppercase">Brand</label>
              <select
                value={selectedBrand.id || ""}
                onChange={(e) => {
                  const found = device.brands.find((b) => String(b.id) === e.target.value);
                  setSelectedBrand(found || {});
                }}
                className="w-full bg-black/40 border border-white/20 text-white p-2 text-xs rounded-none"
              >
                <option value="">All brands</option>
                {device.brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-white/60 uppercase">Type</label>
              <select
                value={selectedType.id || ""}
                onChange={(e) => {
                  const found = device.types.find((t) => String(t.id) === e.target.value);
                  setSelectedType(found || {});
                }}
                className="w-full bg-black/40 border border-white/20 text-white p-2 text-xs rounded-none"
              >
                <option value="">All types</option>
                {device.types.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs text-white/60 uppercase">Цена</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={priceMin}
                  placeholder="от"
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 text-white p-2 text-xs rounded-none"
                />
                <input
                  type="number"
                  value={priceMax}
                  placeholder="до"
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="w-full bg-black/40 border border-white/20 text-white p-2 text-xs rounded-none"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedBrand({});
                setSelectedType({});
                setPriceMin("");
                setPriceMax("");
              }}
              className="w-full text-[10px] uppercase tracking-wider bg-white/10 hover:bg-white/20 py-2 rounded-none"
            >
              Сбросить фильтры
            </button>
          </div>
        </div>


        {/* MAIN CONTENT */}
        <div className="basis-full lg:basis-9/12 px-4">
          <div className="mt-6">
            
            {/* --- HACKER STYLE BANNER --- */}
            <div className="relative overflow-hidden border-2 border-white bg-black group transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] lg:h-64">
              
              {/* Scanline Animation */}
              <div className="absolute inset-0 w-full h-[2px] bg-white/20 shadow-[0_0_15px_white] animate-[scan_4s_linear_infinite] z-20 pointer-events-none" />
              
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
                  alt="Server Core"
                  className="h-full w-full object-cover object-center opacity-40 grayscale group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              </div>

              {/* Banner Content Card */}
              <div className="relative z-10 h-full p-6 flex flex-col justify-between items-start">
                <div className="bg-white text-black px-2 py-0.5 text-[10px] font-bold tracking-[0.2em] animate-pulse">
                  SYSTEM_INITIALIZING...
                </div>
                
                <div className="max-w-xs">
                  <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">
                    Next-Gen <br /> 
                    <span className="bg-white text-black">Hosting</span> Soon
                  </h2>
                  <p className="mt-2 text-xs text-white/70 leading-tight">
                    [DEPLOYMENT_PHASE: 04] // NVMe storage, global edge nodes, and encrypted tunneling. Join the dark side of speed.
                  </p>
                </div>

                <Link
                  to={ABOUT_ROUTE}
                  className="group relative inline-flex items-center justify-center border border-white px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all hover:bg-white hover:text-black"
                >
                  <span className="relative z-10">Initialize_Specs</span>
                  <div className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-0 right-0 p-2 text-[8px] text-white/30 text-right">
                ID: HOST_SRV_091<br/>
                LOC: EDGE_NODE_ALPHA
              </div>
            </div>

            {/* --- DEVICE LIST AREA --- */}
            <div className="mt-10">
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-white font-bold tracking-widest uppercase text-sm">Hardware_Inventory</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-1 text-[10px] uppercase tracking-wider border ${
                        viewMode === "grid" ? "border-emerald-400 text-emerald-400" : "border-white/30 text-white/60"
                      } rounded-none-sm`}
                    >
                      Сетка
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-1 text-[10px] uppercase tracking-wider border ${
                        viewMode === "list" ? "border-emerald-400 text-emerald-400" : "border-white/30 text-white/60"
                      } rounded-none-sm`}
                    >
                      Список
                    </button>
                  </div>
                </div>

                <div className="lg:hidden flex items-center justify-between gap-2">
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="px-3 py-2 text-xs bg-white/10 hover:bg-white/20 rounded-none uppercase tracking-wider"
                  >
                    Фильтры
                  </button>
                  <span className="text-[10px] text-white/40 uppercase">Режим: {viewMode}</span>
                </div>
              </div>

              <PreviewDeviceList devices={filteredDevices} viewMode={viewMode} />
            </div>
          </div>
        </div>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/70 lg:hidden" onClick={() => setShowMobileFilters(false)}>
          <div className="absolute inset-x-4 top-20 bg-black/90 border border-white/20 rounded-none p-4 space-y-3" onClick={(e)=>e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold uppercase tracking-wider">Мобильные фильтры</h4>
              <button onClick={() => setShowMobileFilters(false)} className="text-xs px-2 py-1 bg-white/10 rounded-none">Закрыть</button>
            </div>
            <div className="text-xs text-white/60">Brand</div>
            <select
              value={selectedBrand.id || ""}
              onChange={(e) => {
                const found = device.brands.find((b) => String(b.id) === e.target.value);
                setSelectedBrand(found || {});
              }}
              className="w-full bg-black/70 border border-white/20 text-white p-2 rounded-none"
            >
              <option value="">All brands</option>
              {device.brands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
            <div className="text-xs text-white/60">Type</div>
            <select
              value={selectedType.id || ""}
              onChange={(e) => {
                const found = device.types.find((t) => String(t.id) === e.target.value);
                setSelectedType(found || {});
              }}
              className="w-full bg-black/70 border border-white/20 text-white p-2 rounded-none"
            >
              <option value="">All types</option>
              {device.types.map((type) => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={priceMin}
                placeholder="от"
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full bg-black/70 border border-white/20 text-white p-2 rounded-none"
              />
              <input
                type="number"
                value={priceMax}
                placeholder="до"
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full bg-black/70 border border-white/20 text-white p-2 rounded-none"
              />
            </div>
            <button
              onClick={() => {
                setSelectedBrand({});
                setSelectedType({});
                setPriceMin("");
                setPriceMax("");
              }}
              className="w-full text-xs uppercase tracking-wider bg-white/10 hover:bg-white/20 py-2 rounded-none"
            >
              Сбросить
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(600px); }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
});

export default Shop;