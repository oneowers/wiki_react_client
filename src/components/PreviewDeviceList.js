import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index.js";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts.js";
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Shop = observer(() => {
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const { device, user } = useContext(Context); // Add 'user' here
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [modalShow, setModalShow] = useState(false);

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

  const navigate = useNavigate();

  const sendComment = async (deviceId, text) => { // Add "text" here
    try {
      await createDeviceComment(deviceId, text); // Pass "text" here
      await fetchDeviceComments(deviceId).then((comments) => {
        setComments((prevComments) => ({
          ...prevComments,
          [deviceId]: comments,
        }));
      });
      setCommentText(""); // Clear the input
    } catch (error) {
      console.error("Error sending comment:", error);
    }
  };

  const handleFormSubmit = (event, productId) => {
    event.preventDefault();
    if (commentText.trim() !== "") {
      sendComment(productId, commentText.trim());
    }
  };

  const options = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return (
    <div className="mt-10 grid grid-cols-1 gap-y-12 font-mono selection:bg-white selection:text-black">
      {loading
        ? Array(3)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="border border-white/10 p-6 bg-black animate-pulse flex flex-col gap-4"
            >
              <div className="h-40 bg-white/5 w-full" />
              <div className="h-4 bg-white/20 w-1/4" />
              <div className="h-10 bg-white/10 w-full" />
            </div>
          ))
        : device.devices.count &&
        device.devices.rows.map((product) => (
          <div
            key={product.id}
            className="group relative border border-white/20 hover:border-white transition-colors duration-500 bg-black overflow-hidden"
          >
            {/* --- HEADER BAR --- */}
            <div className="flex justify-between items-center bg-white/5 border-b border-white/20 px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white animate-pulse" />
                <span className="text-[10px] text-white/50 tracking-widest uppercase">Node_Protocol: v.4.0</span>
              </div>
              <span className="text-[10px] text-white/30 uppercase">ID: {product.id.toString().padStart(4, '0')}</span>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div
                onClick={() => openDeviceModal(product.id)}
                className="relative w-full lg:w-1/3 h-48 lg:h-auto overflow-hidden cursor-pointer group"
              >
                <img
                  src={product.img ? (product.img.startsWith('http') ? product.img : process.env.REACT_APP_API_URL + product.img) : ''}
                  className="h-full w-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  alt={product.name}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                {/* Scanline Overlay on Image */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10 opacity-20" />
              </div>

              {/* Details Section */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block border border-white px-3 py-0.5 text-[10px] font-bold uppercase mb-2">
                      {device.brands[product.brandId]?.name || "Generic_Node"}
                    </span>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex gap-4 text-white/60">
                    <div className="flex items-center gap-1">
                      <EyeIcon className="h-3 w-3" />
                      <span className="text-xs">{product.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChatBubbleLeftIcon className="h-3 w-3" />
                      <span className="text-xs">{comments[product.id]?.length || 0}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-xs text-white/50 line-clamp-2 italic leading-relaxed">
                  {decodeHTML(product.description)}
                </p>

                {/* Comments Log */}
                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="max-h-32 overflow-y-auto space-y-3 custom-scrollbar">
                    {comments[product.id]?.slice(0, 2).map((comment, index) => (
                      <div className="text-[11px] leading-tight" key={index}>
                        <span className="text-white/30 mr-2">[{new Date(comment.createdAt).toLocaleDateString("en-US", options)}]</span>
                        <span className="text-white/80">&gt; {comment.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Input Field (Terminal Style) */}
                  {user.isAuth ? (
                    <form
                      onSubmit={(event) => handleFormSubmit(event, product.id)}
                      className="mt-4 flex items-center bg-white/5 border border-white/10 px-3 focus-within:border-white transition-colors"
                    >
                      <span className="text-white/40 text-xs mr-2">$</span>
                      <input
                        type="text"
                        value={commentText}
                        placeholder="INPUT_COMMAND..."
                        className="flex-1 bg-transparent text-xs text-white py-2 focus:outline-none placeholder:text-white/20"
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      {commentText.length > 0 && (
                        <button
                          type="submit"
                          className="text-[10px] font-bold text-white hover:underline uppercase tracking-widest"
                        >
                          Execute
                        </button>
                      )}
                    </form>
                  ) : (
                    <div className="mt-4 flex items-center bg-red-950/10 border border-red-900/30 px-3 py-2 justify-between">
                      <div className="flex items-center">
                        <span className="text-red-500 text-xs mr-2 font-bold animate-pulse">!</span>
                        <span className="text-[10px] text-red-500/70 uppercase tracking-tighter">
                          Error: Unauthorized_Access_Detected
                        </span>
                      </div>
                      <button
                        onClick={() => navigate('/login')} // Update route as needed
                        className="text-[10px] bg-white text-black px-2 py-0.5 font-bold hover:bg-gray-200 transition-colors uppercase"
                      >
                        Login_to_Comment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Decorative Corner Label */}
            <div className="absolute bottom-0 right-0 bg-white text-black px-1 text-[8px] font-bold">
              PRCH_READY
            </div>
          </div>
        ))}

      <DeviceModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        deviceId={selectedDeviceId}
      />

      {/* Internal CSS for scrollbar and styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
});

export default Shop;