import { useContext, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Context } from "../index.js";
import { fetchDevices } from "../http/deviceApi.js";
import Footer from "../components/Footer.js";
import VideoSection from "../components/VideoSection.js";
import Participate from "../modals/Participate.js";
import { Link } from "react-router-dom";
import { ReactComponent as VectorSvg } from "./Vector.svg";
import marlboro from '../photos/marlboro.png'

import DeviceGrid from "../components/DeviceGrid.js";
import Grid from "./Grid.js";
import { SHOP_ROUTE } from "../utils/consts.js";

export default function About() {
  const { device } = useContext(Context);
  const [participateVisible, setParticipateVisible] = useState(false);
  
  useEffect(() => {
    fetchDevices().then((data) => device.setDevices(data.rows));
  }, []);

  return (
    <>
      <div className="bg-black">
          <VectorSvg 
            preserveAspectRatio="none"
            className="absolute -top-28 left-0 w-full opacity-0"
          />

        <main className="isolate">
          <div className="relative isolate -z-10">
            <Grid/>
            <div className="overflow-hidden">
              <div className="mx-auto max-w-7xl px-6 pb-32 pt-10 sm:pt-0 lg:px-8 lg:pt-0">
                <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                  <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <h1 
                    className="text-7xl mb-7 font-bold tracking-tight text-white sm:text-8xl"
                    style={{ fontFamily: 'Estrella' }}
                  >
                    Elevate Your Style
                  </h1>
                    <p className="relative mt-6 text-lg leading-8 text-gray-300 sm:max-w-md lg:max-w-none" style={{ fontFamily: 'Northing' }}>
                    Step into the future of fashion. Bold, sleek, 
                    and effortlessly modern—our collection is 
                    designed for those who set trends, not follow 
                    them. Premium fabrics, cutting-edge designs, 
                    and a statement in every piece.
                    </p>
                  </div>
                  <div className="mt-12 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-10 lg:pl-0">
                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                      <div className="relative">
                        <img
                          src={marlboro}
                          className="aspect-[2/3] w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1613482184972-f9c1022d0928?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-black/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                      </div>
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1557673862-a2a470406a30?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-black/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                      </div>
                    </div>
                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1605797062177-0dfba57c72fe?q=80&w=2454&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-black/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                      </div>
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1602250523342-d2212b96a297?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-black/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Participate
          show={participateVisible}
          onHide={() => setParticipateVisible(false)}
        />
      </div>
    </>
  );
}