import React, { useContext, useEffect, Fragment } from "react";
import { Context } from "../index.js";
import { Popover, Transition } from "@headlessui/react"; // Меняем Disclosure на Popover
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
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

  const handleLogout = (close) => {
    logout(user);
    if (close) close(); 
    navigate(NEWS_ROUTE);
  };

  return (
    <>
      <TopBanner />
      <div className="h-20"></div>

      <div className="fixed top-0 left-0 right-0 z-50 font-mono">
        {/* Popover автоматически закрывается при клике вне его области */}
        <Popover as="nav" className="bg-black border-b border-white/20 backdrop-blur-md">
          {({ open, close }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 lg:px-8 h-16 flex items-center justify-between">
                
                {/* --- LOGO --- */}
                <Link to={NEWS_ROUTE} className="flex items-center gap-3 group">
                  <img className="h-8 w-auto grayscale brightness-200 contrast-150 transition-all group-hover:rotate-12" src={logo} alt="WR" />
                  <div className="flex flex-col">
                    <span className="text-sm font-black tracking-tighter text-white uppercase leading-none">White_Rabbit</span>
                    <span className="text-[8px] text-white/40 tracking-[0.3em] uppercase">Hosting_Core</span>
                  </div>
                </Link>

                {/* --- DESKTOP (Скрыто на мобилках) --- */}
                <div className="hidden md:flex items-center gap-4">
                  {user.isAuth ? (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5">
                        <span className="text-[10px] text-white/70 uppercase">[User: {user.user.first_name || "Unknown"}]</span>
                      </div>
                      {user.user.role === 'ADMIN' && (
                        <Link to={ADMIN_ROUTE} className="text-[10px] font-bold text-black bg-white px-3 py-1.5 border border-white hover:bg-black hover:text-white transition-all">ADMIN_PANEL</Link>
                      )}
                      <Link to={PROFILE_ROUTE} className="text-[10px] font-bold text-white border border-white px-3 py-1.5 hover:bg-white hover:text-black transition-all">PROFILE</Link>
                      <button onClick={() => handleLogout()} className="text-[10px] font-bold text-red-500 hover:text-white border border-red-500/30 hover:bg-red-500 px-3 py-1.5 transition-all">DISCONNECT</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Link to={REGISTRATION_ROUTE} className="text-[10px] text-white/60 hover:text-white px-3 py-2">//_SIGN_UP</Link>
                      <Link to={LOGIN_ROUTE} className="text-[10px] font-bold text-black bg-white border border-white px-4 py-1.5 hover:bg-black hover:text-white transition-all">[ AUTH_SYSTEM ]</Link>
                    </div>
                  )}
                </div>

                {/* Кнопка бургера */}
                <div className="md:hidden">
                  <Popover.Button className="p-2 text-white border border-white/20 outline-none">
                    {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
                  </Popover.Button>
                </div>
              </div>

              {/* Мобильное меню */}
              <Transition
                as={Fragment}
                enter="transition duration-200 ease-out"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-150 ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
              >
                <Popover.Panel className="absolute inset-x-0 top-16 z-50 md:hidden bg-black border-b-2 border-white px-4 pb-6 pt-2 shadow-2xl">
                  {/* Оверлей внутри панели, чтобы закрывалось при клике на фон */}
                  <div className="flex flex-col gap-3 relative z-50">
                    {user.isAuth ? (
                      <>
                        <div className="text-[10px] text-white/40 mb-2 tracking-[0.2em]">&gt; STATUS: AUTHORIZED</div>
                        {user.user.role === 'ADMIN' && (
                          <Link to={ADMIN_ROUTE} onClick={() => close()} className="w-full text-center bg-white text-black py-3 text-xs font-bold uppercase">Admin Panel</Link>
                        )}
                        <Link to={PROFILE_ROUTE} onClick={() => close()} className="w-full text-center border border-white text-white py-3 text-xs font-bold uppercase">Profile</Link>
                        <button onClick={() => handleLogout(close)} className="w-full text-center border border-red-500 text-red-500 py-3 text-xs font-bold uppercase">Disconnect</button>
                      </>
                    ) : (
                      <>
                        <Link to={REGISTRATION_ROUTE} onClick={() => close()} className="w-full text-center border border-white/20 text-white py-3 text-xs font-bold uppercase">Sign Up</Link>
                        <Link to={LOGIN_ROUTE} onClick={() => close()} className="w-full text-center bg-white text-black py-3 text-xs font-bold uppercase">Login System</Link>
                      </>
                    )}
                  </div>
                </Popover.Panel>
              </Transition>

              {/* Фоновый слой, который ловит клики вне меню */}
              {open && <div className="fixed inset-0 bg-black/50 md:hidden" aria-hidden="true" />}
            </>
          )}
        </Popover>
      </div>
    </>
  );
});

export default NavBar;