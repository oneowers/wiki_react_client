import React, { useContext, useEffect } from "react";
import { Context } from "../index.js";
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import { 
  LOGIN_ROUTE, 
  REGISTRATION_ROUTE, 
  NEWS_ROUTE, 
  PROFILE_ROUTE, 
  ADMIN_ROUTE 
} from "../utils/consts.js";
import { fetchTypes } from "../http/deviceApi.js";
import { logout } from "../http/userApi.js";
import logo from "./logo.png";
import TopBanner from "./TopBanner.js";

const NavBar = observer(() => {
  const { user, device } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
  }, [device]);

  const handleLogout = () => {
    logout(user);
    navigate(NEWS_ROUTE);
  };

  return (
    <>
      <TopBanner />
      {/* Отступ под фиксированным банером */}
      <div className="h-20"></div>

      <div className="fixed top-0 left-0 right-0 z-50 font-mono">
        <Disclosure as="nav" className="bg-black border-b border-white/20 backdrop-blur-md">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 lg:px-8 h-16 flex items-center justify-between">
                
                {/* --- LOGO AREA --- */}
                <Link to={NEWS_ROUTE} className="flex items-center gap-3 group">
                  <div className="relative">
                    <img className="h-8 w-auto grayscale brightness-200 contrast-150 transition-all group-hover:rotate-12" src={logo} alt="WR" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black tracking-tighter text-white uppercase leading-none">
                      White_Rabbit
                    </span>
                    <span className="text-[8px] text-white/40 tracking-[0.3em] uppercase">
                      Hosting_Core
                    </span>
                  </div>
                </Link>

                {/* --- DESKTOP NAVIGATION --- */}
                <div className="hidden md:flex items-center gap-4">
                  {user.isAuth ? (
                    <div className="flex items-center gap-4">
                      {/* USERNAME INDICATOR */}
                      <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5">
                        <div className="w-1.5 h-1.5 bg-white animate-pulse" />
                        <span className="text-[10px] text-white/70 uppercase">
                          [User: {user.user.first_name || "Unknown"}]
                        </span>
                      </div>

                      {/* ADMIN PANEL (If Admin) */}
                      {user.user.role === 'ADMIN' && (
                        <Link 
                          to={ADMIN_ROUTE} 
                          className="text-[10px] font-bold text-black bg-white px-3 py-1.5 border border-white hover:bg-black hover:text-white transition-all"
                        >
                          ADMIN_PANEL
                        </Link>
                      )}

                      {/* PROFILE */}
                      <Link 
                        to={PROFILE_ROUTE} 
                        className="text-[10px] font-bold text-white border border-white px-3 py-1.5 hover:bg-white hover:text-black transition-all"
                      >
                        PROFILE
                      </Link>

                      {/* LOGOUT */}
                      <button 
                        onClick={handleLogout}
                        className="text-[10px] font-bold text-red-500 hover:text-white border border-red-500/30 hover:bg-red-500 px-3 py-1.5 transition-all"
                      >
                        DISCONNECT
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Link 
                        to={REGISTRATION_ROUTE} 
                        className="text-[10px] text-white/60 hover:text-white tracking-widest px-3 py-2"
                      >
                        //_SIGN_UP
                      </Link>
                      <Link 
                        to={LOGIN_ROUTE} 
                        className="text-[10px] font-bold text-black bg-white border border-white px-4 py-1.5 hover:bg-black hover:text-white transition-all"
                      >
                        [ AUTH_SYSTEM ]
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <Disclosure.Button className="p-2 text-white border border-white/20">
                    {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
                  </Disclosure.Button>
                </div>
              </div>

              {/* --- MOBILE MENU PANEL --- */}
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="opacity-0 -translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-75 ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-2"
              >
                <Disclosure.Panel className="md:hidden bg-black border-b-2 border-white px-4 pb-6 pt-2">
                  <div className="flex flex-col gap-3">
                    {user.isAuth ? (
                      <>
                        <div className="text-[10px] text-white/40 mb-2">AUTH_ID: {user.user.first_name}</div>
                        {user.user.role === 'ADMIN' && (
                          <Link to={ADMIN_ROUTE} className="w-full text-center bg-white text-black py-3 text-xs font-bold uppercase">Admin Panel</Link>
                        )}
                        <Link to={PROFILE_ROUTE} className="w-full text-center border border-white text-white py-3 text-xs font-bold uppercase">Profile</Link>
                        <button onClick={handleLogout} className="w-full text-center border border-red-500 text-red-500 py-3 text-xs font-bold uppercase">Disconnect</button>
                      </>
                    ) : (
                      <>
                        <Link to={REGISTRATION_ROUTE} className="w-full text-center border border-white/20 text-white py-3 text-xs font-bold uppercase">Sign Up</Link>
                        <Link to={LOGIN_ROUTE} className="w-full text-center bg-white text-black py-3 text-xs font-bold uppercase">Login System</Link>
                      </>
                    )}
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
});

export default NavBar;