import React from "react";
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import { createType } from "../http/deviceApi.js";

const CreateType = ({show, onHide}) => {
    const [name, setName] = useState('');

    const addType = () => {
        createType({name: name}).then(data => {
            setName('')
            onHide()
        })
    }

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onHide}>
                <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                        <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        enterTo="opacity-100 translate-y-0 md:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 md:scale-100"
                        leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                        <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                            <div className="rounded-md relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                            <button
                                type="button"
                                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                                onClick={() => onHide()}
                            >
                                <span className="sr-only">Close</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            <div className=" grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                                <img src="https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg" className="object-cover object-center" />
                                </div>
                                <div className="sm:col-span-8 lg:col-span-7">
                                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">Создать новую категорию</h2>

                                <section aria-labelledby="options-heading" className="mt-10">
                                    <div>
                                        <div className="my-4">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Названия категории
                                            </label>
                                            <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={name}
                                            onChange={e=> setName(e.target.value)}
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md border border-gray-300 px-3 py-2"
                                            required
                                            />
                                        </div>

                                    <div
                                    onClick={addType}
                                        className="cursor-pointer mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Добавить
                                    </div>
                                    </div>
                                </section>
                                </div>
                            </div>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default CreateType;