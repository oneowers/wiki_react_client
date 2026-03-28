import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index.js";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
  ChatBubbleLeftIcon,
  EyeIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import {
  createDeviceComment,
  fetchDeviceComments,
} from "../http/deviceApi.js";
import DeviceModal from "./DeviceModal.js";
import { getImgSrc } from "../utils/getImgSrc.js";

const Shop = observer(({ devices: explicitDevices, viewMode = "grid" }) => {
  const[comments, setComments] = useState({});
  // Исправление UX: теперь у каждого устройства свой стейт для текста комментария
  const [commentTexts, setCommentTexts] = useState({});
  const [loading, setLoading] = useState(true);
  const { device, user } = useContext(Context);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  const openDeviceModal = (id) => {
    setSelectedDeviceId(id);
    setModalShow(true);
  };

  useEffect(() => {
    if (device.devices.count) {
      Promise.all(
        device.devices.rows.map((product) =>
          fetchDeviceComments(product.id).then((comments) => ({
            productId: product.id,
            comments: comments,
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
    }
  }, [device.devices]);

  function decodeHTML(html) {
    var tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  }

  const sendComment = async (deviceId, text) => {
    try {
      await createDeviceComment(deviceId, text);
      const updatedComments = await fetchDeviceComments(deviceId);
      setComments((prev) => ({
        ...prev,
        [deviceId]: updatedComments,
      }));
      // Очищаем конкретный инпут после отправки
      setCommentTexts((prev) => ({ ...prev, [deviceId]: "" }));
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  const handleFormSubmit = (event, productId) => {
    event.preventDefault();
    const text = commentTexts[productId] || "";
    if (text.trim() !== "") {
      sendComment(productId, text.trim());
    }
  };

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const currentDevices = explicitDevices || (device.devices?.rows ||[]);
  const isLoading = loading && !explicitDevices;

  // Динамические классы для Сетки (до 5 колонок) и Списка (1 колонка)
  const listWrapperClass =
    viewMode === "grid"
      ? "mt-10 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 font-mono"
      : "mt-10 flex flex-col gap-6 font-mono";

  return (
    <div className={listWrapperClass}>
      {isLoading ? (
        // Скелетон в хакерском стиле
        Array(viewMode === "grid" ? 5 : 3)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="border border-white/20 p-6 bg-black flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.05)_50%)] bg-[length:100%_4px] pointer-events-none" />
              <div className="bg-white text-black px-2 py-1 text-[10px] w-fit font-bold animate-pulse">
                &gt; LOADING_DATA_BLOCK...
              </div>
              <div className="h-40 bg-white/10 w-full" />
              <div className="h-4 bg-white/20 w-1/2 mt-4" />
              <div className="h-10 bg-white/5 border border-white/10 w-full mt-auto" />
            </div>
          ))
      ) : currentDevices.length > 0 ? (
        currentDevices.map((product) => (
          <div
            key={product.id}
            className={`group relative bg-black border border-white/30 hover:border-white transition-all duration-300 overflow-hidden flex ${
              viewMode === "grid" ? "flex-col" : "flex-col md:flex-row"
            }`}
          >
            {/* --- ТЕРМИНАЛЬНЫЙ ЗАГОЛОВОК --- */}
            <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-white text-black px-3 py-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2">
                <CommandLineIcon className="h-3 w-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  ROOT@NODE_ID:{product.id.toString().padStart(4, "0")}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase">
                STATUS: [ ONLINE ]
              </span>
            </div>

            {/* --- СЕКЦИЯ ИЗОБРАЖЕНИЯ --- */}
            <div
              onClick={() => openDeviceModal(product.id)}
              className={`relative cursor-pointer overflow-hidden ${
                viewMode === "grid"
                  ? "w-full h-56 border-b border-white/20"
                  : "w-full md:w-2/5 md:min-w-[320px] h-64 md:h-auto border-b md:border-b-0 md:border-r border-white/20"
              }`}
            >
              <img
                src={getImgSrc(product.img)}
                className="h-full w-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                alt={product.name}
              />
              {/* Scanline эффект: строгий ЧБ */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] z-10" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
            </div>

            {/* --- СЕКЦИЯ ДАННЫХ И ЛОГОВ --- */}
            <div className="flex-1 p-5 flex flex-col justify-between relative z-10 bg-black">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block text-[10px] font-bold uppercase text-white/50 tracking-[0.2em] mb-1">
                      {device.brands.find((b) => b.id === product.brandId)
                        ?.name || "GENERIC_SYS"}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none">
                      {product.name}
                    </h3>
                  </div>
                  
                  {/* Статистика */}
                  <div className="flex flex-col gap-1 items-end">
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 border border-white/20">
                        <EyeIcon className="h-3 w-3 text-white" />
                        <span className="text-[10px] text-white font-bold">{product.views || 0}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 border border-white/20">
                        <ChatBubbleLeftIcon className="h-3 w-3 text-white" />
                        <span className="text-[10px] text-white font-bold">{comments[product.id]?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs font-bold text-white uppercase tracking-widest border-l-2 border-white pl-2 mb-4">
                   VALUE:{" "}
                  {Number.isFinite(Number(product.price))
                    ? `${Number(product.price)} USD`
                    : "UNKNOWN"}
                </div>

                {/* <p className="text-[11px] text-white/60 line-clamp-3 leading-relaxed mb-6 font-mono border border-white/10 p-2 bg-[#050505]">
                  <span className="text-white/30 mr-2">DESC://</span>
                  {decodeHTML(product.description)}
                </p> */}
              </div>

              {/* --- БЛОК КОММЕНТАРИЕВ (ТЕРМИНАЛ) --- */}
              {/* <div className="mt-auto border border-white/20 bg-[#0a0a0a] relative">
                <div className="absolute -top-2.5 left-2 bg-black px-1 text-[9px] text-white/50 font-bold tracking-widest uppercase">
                  Sys_Logs
                </div>
                
                <div
                  className={`overflow-y-auto p-3 space-y-2 custom-scrollbar ${
                    viewMode === "grid" ? "max-h-24" : "max-h-32"
                  }`}
                >
                  {comments[product.id]?.length > 0 ? (
                    comments[product.id].map((comment, index) => (
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
                    <div className="text-[10px] text-white/30 italic">
                      [ NO_RECORDS_FOUND ]
                    </div>
                  )}
                </div> */}

                {/* Строка ввода */}
                {/* <div className="border-t border-white/20 bg-black">
                  {user.isAuth ? (
                    <form
                      onSubmit={(event) => handleFormSubmit(event, product.id)}
                      className="flex items-center px-3 py-2"
                    >
                      <span className="text-white font-bold text-xs mr-2 animate-pulse">
                        $&gt;
                      </span>
                      <input
                        type="text"
                        value={commentTexts[product.id] || ""}
                        placeholder="INPUT_COMMAND..."
                        className="flex-1 bg-transparent text-xs text-white focus:outline-none placeholder:text-white/20"
                        onChange={(e) =>
                          setCommentTexts((prev) => ({
                            ...prev,
                            [product.id]: e.target.value,
                          }))
                        }
                      />
                      {(commentTexts[product.id]?.length || 0) > 0 && (
                        <button
                          type="submit"
                          className="text-[9px] bg-white text-black px-2 py-1 font-bold hover:bg-gray-300 transition-colors uppercase tracking-widest ml-2"
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
                </div> */}
              {/* </div> */}
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full border border-white/30 bg-black p-10 flex flex-col items-center justify-center gap-4">
          <CommandLineIcon className="h-10 w-10 text-white/20" />
          <div className="text-white/50 font-mono text-sm tracking-widest uppercase">
            &gt; ERR: NO_NODES_FOUND_MATCHING_CRITERIA
          </div>
        </div>
      )}

      <DeviceModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        deviceId={selectedDeviceId}
      />

      <style jsx>{`
        /* Строгий ЧБ скроллбар в стиле консоли */
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
      `}</style>
    </div>
  );
});

export default Shop;