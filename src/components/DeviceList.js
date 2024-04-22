import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { fetchDevices } from "../http/deviceApi";

const Shop = observer(() => {
  const { device } = useContext(Context);
  const navigate = useNavigate();
  const [popularDevices, setPopularDevices] = useState({});


  useEffect(() =>{
    fetchDevices(undefined, undefined, undefined, 12, "views").then(data => setPopularDevices(data));
  }, []);

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 xl:gap-x-8">
      {popularDevices.count && popularDevices.rows.map((product) => (
          <div
            onClick={() => navigate(DEVICE_ROUTE + "/" + product.id)}
            key={product.id}
            className="bg-white p-3 rounded-lg group relative flex flex-col items-start"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-40 mb-4">
              <img
                src={product.img}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="flex flex-col justify-between">
              <span className="text-sm font-bold uppercase text-center text-pink-500 bg-pink-50 px-4 py-0.5 rounded-full">
                <a href={product.href}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {device.brands[product.brandId] &&
                    device.brands[product.brandId].name}
                </a>
              </span>
              <div></div>
            </div>
            <p className="ml-1 mt-1 font-bold text-lg text-black">
              {product.name}
            </p>
          </div>
        ))}
    </div>
  );
});

export default Shop;
