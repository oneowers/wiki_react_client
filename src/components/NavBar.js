import React, { useContext, useEffect } from "react";
import { Context } from "../index.js";
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts.js";
import { fetchTypes } from "../http/deviceApi.js";
import NavButton from "../elements/NavButton"; // Импортируем нашу кнопку
import logo from "./logo.png";
import TopBanner from "./TopBanner.js";

const NavBar = observer(() => {
  const { user, device } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
  }, [device]);

  return (
    <>
      <TopBanner />
      <div className="h-24 md:h-28"></div>

      <div className="fixed top-4 left-0 right-0 z-50 px-4">
        <Disclosure as="nav" className="mx-auto max-w-7xl">
          {({ open }) => (
            <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl transition-all">
              <div className="px-6 lg:px-8 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link to={SHOP_ROUTE} className="flex items-center gap-3 group">
                  <img className="h-12 w-auto transition-transform group-hover:scale-110" src={logo} alt="Logo" />
                  <span className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Estrella' }}>
                    White Rabbit
                  </span>
                </Link>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-3">
                  {user.isAuth && user.user.role !== "GHOST" ? (
                    <NavButton to={LOGIN_ROUTE} variant="emerald">
                      Dashboard
                    </NavButton>
                  ) : (
                    <>
                      <NavButton to={REGISTRATION_ROUTE} variant="ghost">
                        ✨ Get Started
                      </NavButton>
                      <NavButton to={LOGIN_ROUTE} variant="white">
                        🔑 Sign In
                      </NavButton>
                    </>
                  )}
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                  <Disclosure.Button className="p-2 text-gray-400 hover:text-white">
                    {open ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
                  </Disclosure.Button>
                </div>
              </div>

              {/* Mobile Menu */}
              <Transition
                enter="transition duration-200 ease-out"
                enterFrom="opacity-0 -translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-150 ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-4"
              >
                <Disclosure.Panel className="md:hidden px-6 pb-8 pt-2">
                  <div className="flex flex-col gap-3">
                    {user.isAuth && user.user.role !== "GHOST" ? (
                      <NavButton to={LOGIN_ROUTE} variant="emerald" fullWidth>Dashboard</NavButton>
                    ) : (
                      <>
                        <NavButton to={REGISTRATION_ROUTE} variant="ghost" fullWidth>✨ Get Started</NavButton>
                        <NavButton to={LOGIN_ROUTE} variant="white" fullWidth>🔑 Sign In</NavButton>
                      </>
                    )}
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      </div>
    </>
  );
});

export default NavBar;