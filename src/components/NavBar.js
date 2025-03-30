import React, { useContext, useEffect } from "react";
import { Context } from "../index.js";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SETTINGS_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts.js";
import { fetchTypes } from "../http/deviceApi.js";
import { logout } from "../http/userApi.js";
import logo1 from "./uzexpo.png";
import logo from "./logo.png";
import TopBanner from "./TopBanner.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = observer(() => {
  const { user, device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
  }, []);

  return (
    <>
<TopBanner />
<div className=" mt-28"></div>
<div className="fixed top-3 left-1/2 -translate-x-1/2 w-full max-w-[95%] z-50">
  <Disclosure as="nav" className="bg-black/80 backdrop-blur-lg border border-white/0 rounded-full mx-auto max-w-7xl">
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="relative flex h-16 items-center justify-between">
        {/* Mobile menu button */}
        <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
          <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-white/10 hover:text-white focus:outline-none">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
          </Disclosure.Button>
        </div>

        {/* Logo centered horizontally */}
        <div className="flex flex-1 justify-center md:justify-start">
          <Link to={SHOP_ROUTE} className="flex items-center gap-3">
            <img 
              className=" h-16 w-auto transition-transform hover:scale-105" 
              src={logo} 
              alt="Global expo" 
            />
            <p
            className="text-7xl font-bold tracking-tight text-white sm:text-5xl"
            style={{ fontFamily: 'Estrella' }}
            >
              White Rabbit
            </p>
          </Link>
          
        </div>

        {/* Right side elements */}
<div className="absolute right-0 flex items-center gap-4">
  {user.isAuth && user.user.role !== "GHOST" ? (
    <div className="flex items-center gap-3">
      <Link
        to={LOGIN_ROUTE}
        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-sm font-medium text-white shadow-sm hover:shadow-md transition-all"
      >
        Dashboard
      </Link>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <Link
        to={REGISTRATION_ROUTE}
        className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-all hover:drop-shadow-xl"
      >
        ✨ Get Started
      </Link>
      <Link
        to={LOGIN_ROUTE}
        className="px-5 py-2.5 rounded-full bg-white  hover:drop-shadow-xl text-sm font-medium text-black drop-shadow-xl transition-all"
      >
        🔑 Sign In
      </Link>
    </div>
  )}
</div>
      </div>
    </div>
  </Disclosure>
</div>
    </>
  );
});

export default NavBar;
