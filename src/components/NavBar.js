import React, { useContext, useEffect } from "react";
import { Context } from "..";
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
} from "../utils/consts";
import { fetchTypes } from "../http/deviceApi";
import { logout } from "../http/userApi";
import logo1 from "./uzexpo.png";
import logo from "./logo.png";
import TopBanner from "./TopBanner";

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
      <Disclosure as="nav" className="bg-white">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:py-10 py-2">
    <div className="relative flex h-16 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center md:hidden lg:hidden">
        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <span className="absolute -inset-0.5" />
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
        </Disclosure.Button>
      </div>
      <div className="flex flex-1 sm:items-stretch lg:justify-start md:ml-0 lg:ml-0 ml-11">
      <Link to={SHOP_ROUTE} className="flex flex-shrink-0 items-center">
          <img className="h-24 w-auto hidden md:block lg:block" src={logo} alt="Global expo" />
          <img className="h-12 w-auto lg:hidden md:hidden " src={logo1} alt="Global expo" />
        </Link>
      </div>
      <div className="">
      {user.isAuth && user.user.role !== "GHOST" ? (
        <div className="space-x-3 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {/* {console.log(user.user.role)} */}
          {user.user.role === "ADMIN" && (
            <Link
              to={ADMIN_ROUTE}
              className="text-sm font-medium relative rounded-md bg-gray-100 p-2 text-black hover:text-gray-700 focus:outline-none"
            >
              Admin
            </Link>
          )}

          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={
                    user.user && user.user.profile_image
                      ? user.user.profile_image
                      : "https://amu.edu.kz/upload/default-avatar.jpg"
                  }
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  <Link
                    to={PROFILE_ROUTE}
                    className={classNames(
                      "block px-4 py-2 text-sm text-gray-900 w-full "
                    )}
                  >
                    {console.log(user)}
                    {user.user.first_name
                      ? user.user.first_name
                      : "Профиль"}
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to={SETTINGS_ROUTE}
                    className={classNames(
                      "block px-4 py-2 text-sm text-gray-900 w-full "
                    )}
                  >
                    Настройки
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    onClick={() => logout(user)}
                    className={classNames(
                      "block px-4 py-2 text-sm text-gray-900 w-full "
                    )}
                  >
                    Выйти
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <div className="absolute inset-y-0 right-0 flex space-x-4 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <Link
            to={REGISTRATION_ROUTE}
            className="text-sm font-medium relative rounded-md bg-gray-100 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Зарегистрироваться
          </Link>
          <Link
            to={LOGIN_ROUTE}
            className="text-sm font-medium relative rounded-md bg-gray-100 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            Войти
          </Link>
        </div>
      )}
      {/* Contact Information */}
      <div className="hidden lg:block md:block mt-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-4 text-sm text-gray-600">
        <p>Контактный телефон: +998 (71) 207-95-55</p>
        <p>Телефон доверия: +998 (71) 267 53 64</p>
      </div>
      </div>
    </div>
      <div className="md:hidden lg:hidden mt-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-4 text-sm text-gray-600">
        <p>Контактный телефон: +998 (71) 207-95-55</p>
        <p>Телефон доверия: +998 (71) 267 53 64</p>
      </div>
  </div>
</Disclosure>


      <div className="hidden lg:block relative isolate items-center gap-x-6 overflow-hidden bg-gray-800 px-6 py-1 sm:px-3.5 sm:before:flex-1">
        <div
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#15b11a] to-[#009936] opacity-30"
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
          />
        </div>
        <div
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#15b11a] to-[#009936] opacity-30"
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl flex flex-wrap items-center gap-x-4 gap-y-2">
          {device.types.map((item) => (
            <button
              key={item.id}
              onClick={() => device.setSelectedType(item)}
              className={classNames(
                item.id === device.selectedType.id
                  ? "text-gray-100"
                  : "text-gray-200 hover:text-gray-00",
                "rounded-md px-3 py-2 text-md font-semibold"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
});

export default NavBar;
