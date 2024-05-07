import React, { useContext, useEffect } from "react";
import TypeBar from "../components/TypeBar";
import DeviceList from "../components/DeviceList";
import PreviewDeviceList from "../components/PreviewDeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchBrands, fetchTypes, fetchDevices } from "../http/deviceApi";
import { Link } from "react-router-dom";
import { ABOUT_ROUTE } from "../utils/consts";

const Shop = observer(() => {
  const { device } = useContext(Context);

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data));
  }, []);

  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      device.limit
    ).then((data) => {
      device.setDevices(data);
    });
  }, [device.page, device.selectedType.id, device.selectedBrand.id]);

  return (
    <div className="flex flex-row mx-auto max-w-7xl">
      <div class="basis-1/6 hidden lg:block">
        <TypeBar />
      </div>
      <div class="basis-6/6 lg:basis-3/6 ">
        <div className="mt-6 h-full">
              <div className="relative overflow-hidden rounded-lg lg:h-96">
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1631697886307-421ae87d3426?q=80&w=2486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="relative h-96 w-full lg:hidden"
                />
                <div
                  aria-hidden="true"
                  className="relative h-32 w-full lg:hidden"
                />
                <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-white bg-opacity-75 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg">
                  <div>
                    <h2 className="text-xl font-bold text-black">
                      Leather Expo 2024
                    </h2>
                    <p className="mt-1 text-sm text-gray-700">
                      Присоединяйтесь к нам в Экспо с 28 по 30 мая, нажмите чтобы узнать больше.
                    </p>
                  </div>
                  <Link
                    to={ABOUT_ROUTE}
                    className="mt-6 flex flex-shrink-0 items-center justify-center rounded-full  bg-black px-4 py-3 text-base font-medium text-white hover:bg-black-900 sm:ml-8 sm:mt-0 lg:ml-0 lg:w-full"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
          <PreviewDeviceList />
        </div>
      </div>
      <div class="basis-2/6 hidden lg:block">
        <div className=" m-5 rounded-lg  mt-6 h-full">
          <DeviceList />
        </div>
      </div>
    </div>
  );
});

export default Shop;
