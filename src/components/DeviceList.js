import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { fetchDevices } from "../http/deviceApi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Shop = observer(() => {
  const { device } = useContext(Context);
  const navigate = useNavigate();
  const [popularDevices, setPopularDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevices(undefined, undefined, undefined, 12, "views")
      .then((data) => setPopularDevices(data.rows))
      .catch((error) => console.error("Error fetching devices:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 xl:gap-x-8">
      {loading ? (
        // Render loading skeleton
        Array(12)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 p-3 rounded-lg group relative flex flex-col items-start"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-40 mb-4" />
              <div className="flex flex-col justify-between">
                <span
                  className={classNames(
                    `text-sm font-bold uppercase text-center px-4 py-0.5 rounded-full`
                  )}
                />
                <div className="animate-pulse bg-gray-200 w-3/4 h-4 mt-1 rounded-full" />
              </div>
              <p className="animate-pulse bg-gray-200 w-3/4 h-4 mt-1 rounded-full" />
            </div>
          ))
      ) : (
        // Render actual devices
        popularDevices.map((product) => (
          <div
            key={product.id}
            className="bg-white p-3 rounded-lg group relative flex flex-col items-start"
            onClick={() => navigate(DEVICE_ROUTE + "/" + product.id)}
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-40 mb-4">
              <img
                src={product.img}
                alt={product.name}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="flex flex-col justify-between">
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
              <div />
            </div>
            <p className="ml-1 mt-1 font-bold text-lg text-black">
              {product.name}
            </p>
          </div>
        ))
      )}
    </div>
  );
});

export default Shop;
