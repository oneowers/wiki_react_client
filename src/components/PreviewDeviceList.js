import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import {
  ChatBubbleLeftIcon,
  CommentIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import {
  createDeviceComment,
  fetchDeviceComments,
  fetchLatestDevices,
} from "../http/deviceApi";

const Shop = observer(() => {
  const { device } = useContext(Context);
  const [lastDevice, setLastDevice] = useState([]);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState(""); // State to hold the text of the comment

  useEffect(() => {
    fetchLatestDevices(5).then((data) => setLastDevice(data));
  }, []);

  useEffect(() => {
    if (lastDevice) {
      lastDevice.forEach((product) => {
        fetchDeviceComments(product.id).then((comments) => {
          setComments((prevComments) => ({
            ...prevComments,
            [product.id]: comments,
          }));
        });
      });
    }
  }, [lastDevice]);

  const navigate = useNavigate();

  const sendComment = async (deviceId) => {
    try {
      // Make a POST request to create a comment
      await createDeviceComment(deviceId, commentText);
      // Refetch comments for the device to update the UI
      await fetchDeviceComments(deviceId).then((comments) => {
        setComments((prevComments) => ({
          ...prevComments,
          [deviceId]: comments,
        }));
      });
      // Clear the comment input field
      setCommentText("");
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
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 xl:gap-x-8">
      {lastDevice &&
        lastDevice.map((product) => (
          <div className="">
            <div
              key={product.id}
              onClick={() => navigate(DEVICE_ROUTE + "/" + product.id)}
              className="bg-white p-3 rounded-lg group relative flex flex-col items-start "
            >
              <div className=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-40 mb-4">
                <img
                  src={product.img}
                  className="bg-gray-100 h-full w-full object-cover object-center lg:h-full lg:w-full"
                  alt={product.name}
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex justify-between w-full">
                  <div>
                    <span className="text-sm font-bold uppercase text-center text-pink-500 bg-pink-50 px-4 py-0.5 rounded-full">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {device.brands[product.brandId] &&
                          device.brands[product.brandId].name}
                      </a>
                    </span>
                    <p className="mt-1 font-bold text-lg text-black">
                      {product.name}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span>
                        <EyeIcon className="h-4 w-4 mr-2 inline-block text-gray-500" />
                      </span>
                      <span className="text-black text-lg font-medium mr-4">
                        {product.views ? product.views : 0}
                      </span>
                      <span>
                        <ChatBubbleLeftIcon className="h-4 w-4 mr-2 inline-block text-gray-500" />
                      </span>
                      <span className="text-black text-lg font-medium">
                        {comments[product.id] && comments[product.id].length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" p-3 mt-2">
              <p className="text-sm text-gray-500 line-clamp-3">
                {product.description}
              </p>
              <div className="mt-4 border-t border-gray-300 divide-y divide-gray-300">
                {comments[product.id] &&
                  comments[product.id].map((comment, index) => (
                    <div className="text-gray-500 text-sm mx-3 py-2">
                      <div className="text-xs  text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </div>
                      <span className="text-sm  text-gray-700">
                        {comment.text}
                      </span>
                    </div>
                  ))}
                <div className="text-gray-500 text-sm ml-3 py-2 flex">
                  <form
                    onSubmit={(event) => handleFormSubmit(event, product.id)}
                    className="flex w-full"
                  >
                    <input
                      type="text"
                      value={commentText}
                      onFocus={() => setCommentText("")}
                      placeholder="Оставить комментарий"
                      className="w-full bg-gray-100 focus:border-gray-300 px-3 py-2 mr-2"
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    {commentText.length > 0 && (
                      <button
                        type="submit"
                        className="bg-gray-400 text-white px-4 py-2"
                      >
                        Отправить
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
});

export default Shop;
