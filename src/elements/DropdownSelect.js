import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const DropdownSelect = ({ label, onChange, selected, arrayList }) => {
  return (
    <div className="my-4 pl-2 sm:col-span-12 lg:col-span-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Menu as="div" className="mt-1 relative inline-block text-left w-full">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm border border-gray-300 hover:bg-gray-50">
            {selected.common || "Выбрать страну"}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-y-auto">
            <div className="py-1">
              {arrayList.map((countryItem) => (
                <Menu.Item key={countryItem.id}>
                  <button
                    onClick={() => onChange(countryItem)}
                    className={
                      countryItem.id === selected.id
                        ? "bg-gray-50 text-gray-900 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full truncate overflow-ellipsis"
                        : "text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full truncate overflow-ellipsis"
                    }
                  >
                    <div className="flex">
                      {/* <img className="w-8 h-5 mr-3" src={countryItem.flags.png} alt={countryItem.name.common}/> */}
                      {countryItem.common}
                    </div>
                  </button>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownSelect;
