import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Context } from "../index.js";
import { fetchBrands, fetchTypes, fetchDevices } from "../http/deviceApi.js";
import { ABOUT_ROUTE } from "../utils/consts.js";
import PreviewDeviceList from "../components/PreviewDeviceList.js";
import { FunnelIcon } from "@heroicons/react/24/outline";

const inputClass =
  "mt-2 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] outline-none transition-all focus:border-[var(--color-accent)]/50 focus:bg-white focus:ring-2 focus:ring-[var(--color-accent)]/15";

const FilterFields = ({
  device,
  selectedBrand,
  setSelectedBrand,
  selectedType,
  setSelectedType,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  onClear,
}) => (
  <>
    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
      Refine
    </p>
    <div className="mt-4 grid gap-4 md:grid-cols-3 lg:grid-cols-1">
      <label className="block text-[12px] text-[var(--color-text-muted)]">
        Brand
        <select
          value={selectedBrand.id || ""}
          onChange={(e) => {
            const found = device.brands.find(
              (b) => String(b.id) === e.target.value
            );
            setSelectedBrand(found || {});
          }}
          className={inputClass}
        >
          <option value="">All brands</option>
          {device.brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-[12px] text-[var(--color-text-muted)]">
        Type
        <select
          value={selectedType.id || ""}
          onChange={(e) => {
            const found = device.types.find(
              (t) => String(t.id) === e.target.value
            );
            setSelectedType(found || {});
          }}
          className={inputClass}
        >
          <option value="">All types</option>
          {device.types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-2 md:col-span-3 lg:col-span-1 lg:grid-cols-2">
        <label className="block text-[12px] text-[var(--color-text-muted)]">
          Min
          <input
            type="number"
            value={priceMin}
            placeholder="0"
            onChange={(e) => setPriceMin(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block text-[12px] text-[var(--color-text-muted)]">
          Max
          <input
            type="number"
            value={priceMax}
            placeholder="∞"
            onChange={(e) => setPriceMax(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>
    </div>
    <button
      type="button"
      onClick={onClear}
      className="mt-4 w-full rounded-full border border-[var(--color-border)] bg-white py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-muted)] shadow-sm transition-all hover:border-[var(--color-accent)]/35 hover:text-[var(--color-text-primary)]"
    >
      Clear filters
    </button>
  </>
);

const Shop = observer(() => {
  const { device } = useContext(Context);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedBrand, setSelectedBrand] = useState({});
  const [selectedType, setSelectedType] = useState({});
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const clearFilters = () => {
    setSelectedBrand({});
    setSelectedType({});
    setPriceMin("");
    setPriceMax("");
  };

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data));
    fetchTypes().then((data) => device.setTypes(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only bootstrap
  }, []);

  useEffect(() => {
    const typeId = selectedType.id || device.selectedType.id || null;
    const brandId = selectedBrand.id || device.selectedBrand.id || null;

    fetchDevices(typeId, brandId, device.page, device.limit)
      .then((data) => {
        device.setDevices(data);
      })
      .catch((err) => console.error("Device load error:", err));
  // eslint-disable-next-line react-hooks/exhaustive-deps -- MobX store fields drive refetch
  }, [
    device.page,
    device.limit,
    selectedType,
    selectedBrand,
    device.selectedType.id,
    device.selectedBrand.id,
  ]);

  const allDevices = device.devices?.rows || [];
  const filteredDevices = allDevices.filter((item) => {
    if (priceMin && Number(item.price) < Number(priceMin)) return false;
    if (priceMax && Number(item.price) > Number(priceMax)) return false;
    return true;
  });

  const totalListed = device.devices?.count ?? filteredDevices.length;
  const brandCount = device.brands?.length ?? 0;
  const typeCount = device.types?.length ?? 0;

  const filterProps = {
    device,
    selectedBrand,
    setSelectedBrand,
    selectedType,
    setSelectedType,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    onClear: clearFilters,
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg)] px-4 pb-8 font-sans text-[var(--color-text-primary)] md:px-0">
      <div
        className="pointer-events-none absolute -right-16 top-32 h-64 w-64 rounded-full border border-[var(--color-accent)]/15 opacity-90 animate-slide-up"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-40 h-48 w-48 rounded-full bg-[var(--color-accent-soft)] blur-3xl animate-fade-in"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply luxury-noise"
        aria-hidden
      />

      {/* HERO */}
      <section className="relative mt-1 overflow-hidden rounded-[28px] shadow-[0_20px_60px_rgba(15,23,42,0.12)] animate-slide-up md:rounded-[32px]">
        <div className="relative h-[220px] w-full md:h-[300px] lg:h-[340px]">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop"
            alt="Premium hosting edge"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/55 to-slate-900/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 via-transparent to-slate-900/80" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              Curated hardware
            </p>
            <h1 className="mt-2 max-w-xl font-display text-[32px] font-extrabold leading-[1.1] tracking-tight text-white md:text-[40px]">
              Edge-grade
              <span className="block bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
                performance
              </span>
            </h1>
            <p className="mt-2 max-w-xl text-[13px] leading-snug text-white/80 md:text-[15px]">
              NVMe clusters, encrypted tunnels, and concierge onboarding — built
              for teams who refuse slow lanes.
            </p>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="relative z-10 mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {[
          { label: "Live listings", value: String(totalListed), hint: "In this feed" },
          { label: "Brands", value: String(brandCount), hint: "Partners" },
          { label: "Categories", value: String(typeCount), hint: "Silhouettes" },
          { label: "Avg. deploy", value: "18m", hint: "From cart to live" },
        ].map((m, i) => (
          <div
            key={m.label}
            className="rounded-[22px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)]/25 hover:shadow-[0_16px_50px_rgba(37,99,235,0.1)]"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              {m.label}
            </p>
            <p className="mt-2 font-display text-[28px] font-extrabold leading-none text-[var(--color-text-primary)]">
              {m.value}
            </p>
            <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">{m.hint}</p>
          </div>
        ))}
      </section>

      <div className="relative z-10 mt-8 lg:grid lg:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] lg:gap-10 lg:items-start">
        {/* SIDEBAR FILTERS — desktop */}
        <aside className="relative hidden lg:sticky lg:top-28 lg:block lg:self-start">
          <section className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
            <FilterFields {...filterProps} />
          </section>
        </aside>

        <div className="min-w-0">
          {/* TABLET FILTERS */}
          <section className="relative z-10 mt-0 hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm md:block lg:hidden">
            <FilterFields {...filterProps} />
          </section>

          {/* INVENTORY */}
          <section className="relative z-10 mt-8 flex flex-col gap-4 lg:mt-0">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  Inventory
                </p>
                <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)] md:text-3xl">
                  Signature nodes
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-[var(--color-accent)] text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)]"
                      : "border border-[var(--color-border)] bg-white text-[var(--color-text-muted)] shadow-sm hover:border-[var(--color-accent)]/35"
                  }`}
                >
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-[var(--color-accent)] text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)]"
                      : "border border-[var(--color-border)] bg-white text-[var(--color-text-muted)] shadow-sm hover:border-[var(--color-accent)]/35"
                  }`}
                >
                  List
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between md:hidden">
              <button
                type="button"
                onClick={() => setShowMobileFilters(true)}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-primary)] shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-[var(--color-accent)]/35 active:scale-[0.98]"
              >
                <FunnelIcon className="h-4 w-4 text-[var(--color-accent)]" />
                Filters
              </button>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                {viewMode} view
              </span>
            </div>
          </section>

          <PreviewDeviceList devices={filteredDevices} viewMode={viewMode} />

          <section className="relative z-10 mt-10">
            <Link
              to={ABOUT_ROUTE}
              className="flex w-full cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[var(--color-accent)] via-[#3b82f6] to-[var(--color-accent-deep)] py-4 text-[13px] font-extrabold uppercase tracking-[0.2em] text-white shadow-[0_20px_50px_rgba(37,99,235,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              View manifest &amp; ethos
            </Link>
          </section>
        </div>
      </div>

      {showMobileFilters && (
        <div
          className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm md:hidden"
          onClick={() => setShowMobileFilters(false)}
          role="presentation"
        >
          <div
            className="absolute inset-x-4 top-24 space-y-4 rounded-[24px] border border-[var(--color-border)] bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.15)]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal
            aria-label="Filters"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-display text-lg text-[var(--color-text-primary)]">
                Filters
              </h4>
              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-primary)]"
              >
                Close
              </button>
            </div>
            <label className="block text-[12px] text-[var(--color-text-muted)]">
              Brand
              <select
                value={selectedBrand.id || ""}
                onChange={(e) => {
                  const found = device.brands.find(
                    (b) => String(b.id) === e.target.value
                  );
                  setSelectedBrand(found || {});
                }}
                className={inputClass}
              >
                <option value="">All brands</option>
                {device.brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-[12px] text-[var(--color-text-muted)]">
              Type
              <select
                value={selectedType.id || ""}
                onChange={(e) => {
                  const found = device.types.find(
                    (t) => String(t.id) === e.target.value
                  );
                  setSelectedType(found || {});
                }}
                className={inputClass}
              >
                <option value="">All types</option>
                {device.types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={priceMin}
                placeholder="Min"
                onChange={(e) => setPriceMin(e.target.value)}
                className={inputClass + " mt-0"}
              />
              <input
                type="number"
                value={priceMax}
                placeholder="Max"
                onChange={(e) => setPriceMax(e.target.value)}
                className={inputClass + " mt-0"}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                clearFilters();
              }}
              className="w-full rounded-full border border-[var(--color-border)] py-3 text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-text-muted)]"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default Shop;
