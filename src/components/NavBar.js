import React, { useContext, useEffect } from "react";
import { Context } from "..";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { fetchTypes } from "../http/deviceApi";
import { logout } from "../http/userApi";



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = observer(() => {
  const {user, device} = useContext(Context)

  useEffect(() =>{
    fetchTypes().then(data => device.setTypes(data))
  }, [])


    return (
        <Disclosure as="nav" className="bg-gray-950">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link to={SHOP_ROUTE} className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {device.types.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => device.setSelectedType(item)}
                        className={classNames(
                          item.id === device.selectedType.id ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-900 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            {user.isAuth && user.user.role != "GHOST" ?
              <div className="space-x-3 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user.user.role == "ADMIN" && <Link
                  to={ADMIN_ROUTE}
                  className="text-sm font-medium relative rounded-md bg-gray-950 p-2 text-gray-400 hover:text-white hover:bg-gray-900 focus:outline-none"
                >
                    Admin
                </Link>} 
                
                <button
                  className="relative rounded-full bg-gray-950 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-950 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
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
                          <button
                            href="#"
                            className={classNames('block px-4 py-2 text-sm text-gray-900 w-full ')}
                          >
                            Профиль
                          </button>
                      </Menu.Item>
                      <Menu.Item>
                          <button
                            href="#"
                            className={classNames('block px-4 py-2 text-sm text-gray-900 w-full ')}
                          >
                            Настройки
                          </button>
                      </Menu.Item>
                      <Menu.Item>
                          <button
                            onClick={() => logout(user)}
                            className={classNames('block px-4 py-2 text-sm text-gray-900 w-full ')}
                          >
                            Выйти
                          </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              :
              <div className="absolute inset-y-0 right-0 flex space-x-4 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link
                  to={REGISTRATION_ROUTE}
                  className="text-sm font-medium relative rounded-md bg-gray-950 p-2 text-gray-400 hover:text-white hover:bg-gray-900 focus:outline-none"
                >
                    Зарегистрироватся
                </Link>
                <Link
                  to={LOGIN_ROUTE}
                  className="text-sm font-medium relative rounded-md bg-gray-950 p-2 text-gray-400 hover:text-white hover:bg-gray-900 focus:outline-none"
                >
                    Войти
                </Link>
              </div>
            }

            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {device.types.map((item) => (
                <Disclosure.Button
                  key={item.id}
                  as="button"
                  onClick={() => device.setSelectedType(item)}
                  className={classNames(
                    item.id === device.selectedType.id ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-900 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
    </Disclosure>
    )
});

export default NavBar;  