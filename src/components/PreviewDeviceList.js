import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index.js";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts.js";
import { observer } from "mobx-react-lite";
import {
  ChatBubbleLeftIcon,
  CommentIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import {
  createDeviceComment,
  fetchDeviceComments,
} from "../http/deviceApi.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Shop = observer(() => {
  const { device } = useContext(Context);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState(""); // State to hold the text of the comment
  const [loading, setLoading] = useState(true);

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
    // Create a temporary DOM element
    var tempElement = document.createElement("div");
    // Set the HTML content of the temporary element
    tempElement.innerHTML = html;
    // Return the text content of the temporary element
    return tempElement.textContent || tempElement.innerText || "";
  }

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
      {loading
        ? // Render loading skeleton
          Array(12)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 p-3 rounded-lg animate-pulse py-32"
              >
                {/* Placeholder for loading skeleton */}
              </div>
            ))
        : device.devices.count &&
          device.devices.rows.map((product) => (
            <div className="" key={product.id}>
              <div
                onClick={() => navigate(DEVICE_ROUTE + "/" + product.id)}
                className="bg-white p-3 rounded-lg group relative flex flex-col items-start"
              >
                {/* Product image */}
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-40 mb-4">
                  <img
                    src={product.img}
                    className="bg-gray-100 h-full w-full object-cover object-center lg:h-full lg:w-full"
                    alt={product.name}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  {/* Product details */}
                  <div className="flex justify-between w-full">
                    <div>
                      {/* Brand name and product name */}
                      <span
                        aria-hidden="true"
                        className={classNames(
                          `text-sm font-bold uppercase text-center ${
                            device.brands[product.brandId] &&
                            device.brands[product.brandId].color
                          } px-4 py-0.5 rounded-full`
                        )}
                      >
                        {device.brands[product.brandId] &&
                          device.brands[product.brandId].name}
                      </span>
                      <p className="mt-1 font-bold text-lg text-black">
                        {product.name}
                      </p>
                    </div>
                    <div>
                      {/* Views and comments count */}
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
                          {comments[product.id] &&
                            comments[product.id].length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Product description and comments */}
              <div className=" p-3 mt-2">
                {/* Product description */}
                <p className="text-sm text-gray-500 line-clamp-3">
                  {decodeHTML(product.description)}
                </p>
                <div className="mt-4 border-t border-gray-300 divide-y divide-gray-300">
                  {/* Comments */}
                  {comments[product.id] &&
                    comments[product.id].map((comment, index) => (
                      <div className="text-gray-500 text-sm mx-3 py-2" key={index}>
                        <div className="text-xs text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "en-US",
                            options
                          )}
                        </div>
                        <span className="text-sm text-gray-700">
                          {comment.text}
                        </span>
                      </div>
                    ))}
                  {/* Comment input */}
                  <div className="text-gray-500 text-sm ml-3 py-2 flex">
                    <form
                      onSubmit={(event) =>
                        handleFormSubmit(event, product.id)
                      }
                      className="flex w-full"
                    >
                      <input
                        type="text"
                        value={commentText}
                        onFocus={() => setCommentText("")}
                        placeholder="Leave a comment"
                        className="w-full bg-gray-100 focus:border-gray-300 px-3 py-2 mr-2"
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      {commentText.length > 0 && (
                        <button
                          type="submit"
                          className="bg-gray-400 text-white px-4 py-2"
                        >
                          Send
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
