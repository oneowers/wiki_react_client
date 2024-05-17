// Modal.js
import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Modal = ({ show, onHide, children }) => {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center"
        onClose={onHide}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-50"/>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all">
            <div className="relative flex flex-col items-center p-6 sm:p-8">
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                onClick={onHide}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              {children}
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
