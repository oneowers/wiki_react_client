import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import {
  ChatBubbleLeftIcon,
  EyeIcon,
  ChevronRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { fetchDeviceComments } from "../http/deviceApi.js";
import DeviceModal from "./DeviceModal.js";
import { getImgSrc } from "../utils/getImgSrc.js";

const PreviewDeviceList = observer(
  ({ devices: explicitDevices, viewMode = "grid" }) => {
    const [comments, setComments] = useState({});
    const [loading, setLoading] = useState(true);
    const { device } = useContext(Context);
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [modalShow, setModalShow] = useState(false);

    const openDeviceModal = (id) => {
      setSelectedDeviceId(id);
      setModalShow(true);
    };

    useEffect(() => {
      if (explicitDevices !== undefined) {
        setLoading(false);
        return;
      }
      if (device.devices?.count) {
        Promise.all(
          device.devices.rows.map((product) =>
            fetchDeviceComments(product.id).then((c) => ({
              productId: product.id,
              comments: c,
            }))
          )
        )
          .then((data) => {
            const commentsObj = {};
            data.forEach((item) => {
              commentsObj[item.productId] = item.comments;
            });
            setComments(commentsObj);
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }, [device.devices, explicitDevices]);

    const currentDevices =
      explicitDevices !== undefined
        ? explicitDevices
        : device.devices?.rows || [];
    const isLoading = loading && explicitDevices === undefined;

    const listWrapperClass =
      viewMode === "grid"
        ? "mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
        : "mt-8 flex flex-col gap-3";

    return (
      <div className={listWrapperClass}>
        {isLoading ? (
          Array(viewMode === "grid" ? 4 : 3)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm"
              >
                <div className="h-40 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50" />
                <div className="mt-4 h-3 w-1/3 rounded-full bg-slate-200" />
                <div className="mt-2 h-5 w-2/3 rounded-full bg-slate-200" />
              </div>
            ))
        ) : currentDevices.length > 0 ? (
          currentDevices.map((product) => {
            const brandName =
              device.brands.find((b) => b.id === product.brandId)?.name ||
              "Partner";
            const isList = viewMode === "list";

            return (
              <div
                key={product.id}
                className={`group relative overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_12px_40px_rgba(15,23,42,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)]/25 hover:shadow-[0_20px_60px_rgba(37,99,235,0.12)] ${
                  isList
                    ? "flex flex-row items-stretch rounded-[22px] active:scale-[0.99]"
                    : "flex flex-col rounded-[24px]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => openDeviceModal(product.id)}
                  className={`relative block overflow-hidden text-left ${
                    isList
                      ? "h-24 w-28 shrink-0 sm:h-28 sm:w-32"
                      : "h-52 w-full"
                  }`}
                >
                  <img
                    src={getImgSrc(product.img)}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />
                  {!isList && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-accent-deep)] ring-1 ring-[var(--color-accent)]/25 shadow-sm backdrop-blur-sm">
                      <SparklesIcon className="h-3 w-3" />
                      Featured
                    </span>
                  )}
                </button>

                <div
                  className={`flex min-w-0 flex-1 flex-col justify-center ${
                    isList ? "px-4 py-3" : "p-5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                        {brandName}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)]">
                        {product.name}
                      </h3>
                    </div>
                    {isList && (
                      <ChevronRightIcon className="h-5 w-5 shrink-0 text-[var(--color-accent)] transition group-hover:translate-x-0.5" />
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-[12px] font-bold text-[var(--color-accent-deep)] ring-1 ring-[var(--color-accent)]/20">
                      {Number.isFinite(Number(product.price))
                        ? `$${Number(product.price)}`
                        : "Quote"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-text-muted)]">
                      <EyeIcon className="h-3.5 w-3.5" />
                      {product.views || 0}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-2 py-0.5 text-[10px] font-semibold text-[var(--color-text-muted)]">
                      <ChatBubbleLeftIcon className="h-3.5 w-3.5" />
                      {comments[product.id]?.length || 0}
                    </span>
                  </div>

                  {!isList && (
                    <button
                      type="button"
                      onClick={() => openDeviceModal(product.id)}
                      className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-white py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-primary)] shadow-sm transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-soft)] active:scale-[0.98]"
                    >
                      Open brief
                      <ChevronRightIcon className="h-4 w-4 text-[var(--color-accent)]" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-[28px] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-muted)] px-8 py-14 text-center">
            <SparklesIcon className="h-10 w-10 text-[var(--color-accent)]/50" />
            <p className="max-w-xs text-[13px] leading-relaxed text-[var(--color-text-muted)]">
              No nodes match your filters yet. Loosen price or category to see
              the full catalog.
            </p>
          </div>
        )}

        <DeviceModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          deviceId={selectedDeviceId}
        />
      </div>
    );
  }
);

export default PreviewDeviceList;
