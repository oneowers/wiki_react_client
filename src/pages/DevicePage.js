import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneDevices } from "../http/deviceApi.js";
import { observer } from "mobx-react-lite";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DevicePage = observer(() => {
  const [device, setDevice] = useState({ info: [] });

  const { id } = useParams();

  useEffect(() => {
    fetchOneDevices(id).then((data) => setDevice(data));
  }, []);

  return (
    <div className="bg-white ">
      <div className="py-10 mx-auto max-w-2xl px-4sm:px-6 lg:max-w-7xl lg:gap-x-8 lg:px-8 px-3">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              src={device.img}
              className={classNames(
                !device.img && "animate-pulse bg-gray-300",
                "h-96 w-full object-cover object-center"
              )}
            />
        </div>

        <div className="mt-4">
          <div
            className={classNames(
              !device.name && "p-5 rounded-lg animate-pulse  bg-gray-300",
              "text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            )}
          >
            {device.name}
          </div>
        </div>
        <section aria-labelledby="information-heading" className="mt-4">
          <div className="mt-4 space-y-6 text-gray-500">
            <div dangerouslySetInnerHTML={{ __html: device.description }} />
          </div>
        </section>
      </div>
    </div>
  );
});

export default DevicePage;
