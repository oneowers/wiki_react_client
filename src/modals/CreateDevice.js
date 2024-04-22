import React, { Fragment, useState, useContext, useEffect } from "react";
import { convertToRaw } from "draft-js";
import { Context } from "..";
import {
  Disclosure,
  Menu,
  Dialog,
  RadioGroup,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { createDevice, fetchBrands, fetchDevices } from "../http/deviceApi";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CreateDevice = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [brandField, setBrand] = useState(null);
  const [typeField, setType] = useState(null);
  const [info, setInfo] = useState([]);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices().then((data) => device.setDevices(data.rows));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const handleInputChange = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const handleDelete = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

//   const getEditorHtml = () => {
//     const contentState = editorState.getCurrentContent();
//     const rawContentState = convertToRaw(contentState);
//     const html = draftToHtml(rawContentState);
//     return html;
//   };

const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", brandField.id);
    formData.append("typeId", typeField.id);
    formData.append("info", JSON.stringify(info));

    // Получаем содержимое редактора
    const contentState = editorState.getCurrentContent();
    // Преобразуем содержимое редактора в HTML-разметку
    const descriptionHtml = draftToHtml(convertToRaw(contentState));
    formData.append("description", descriptionHtml);

    createDevice(formData).then((data) => onHide());
};

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
                    
                    <div className="sm:col-span-12 lg:col-span-12">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        Создать новый продукт
                      </h2>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <div>
                          <div className="space-x-3">
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                  {(typeField && typeField.name) ||
                                    "Вибрать категорию"}
                                  <ChevronDownIcon
                                    className="-mr-1 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
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
                                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    {device.types.map((type) => (
                                      <Menu.Item>
                                        <item
                                          onClick={() => setType(type)}
                                          key={type}
                                          className={classNames(
                                            typeField &&
                                              typeField.name === type.name
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                                          )}
                                        >
                                          {type.name}
                                        </item>
                                      </Menu.Item>
                                    ))}
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                  {(brandField && brandField.name) ||
                                    "Вибрать тип"}
                                  <ChevronDownIcon
                                    className="-mr-1 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
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
                                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    {device.brands.map((brand) => (
                                      <Menu.Item>
                                        <item
                                          onClick={() => setBrand(brand)}
                                          key={brand}
                                          className={classNames(
                                            brandField &&
                                              brandField.name === brand.name
                                              ? "bg-gray-100 text-gray-900"
                                              : "text-gray-700",
                                            "block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
                                          )}
                                        >
                                          {brand.name}{" "}
                                          {brandField == brand.name}
                                        </item>
                                      </Menu.Item>
                                    ))}
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                          </div>
                          <div className="my-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Названия
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md border border-gray-300 px-3 py-2"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="price"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Цена
                            </label>
                            <input
                              type="number"
                              id="price"
                              name="price"
                              value={price}
                              onChange={(e) => setPrice(Number(e.target.value))}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md border border-gray-300 px-3 py-2"
                              required
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="photo"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Фотография
                            </label>
                            <input
                              type="file"
                              id="photo"
                              name="photo"
                              onChange={selectFile}
                              accept="image/*"
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md border border-gray-300 px-3 py-2"
                            />
                          </div>
                          <div className="my-4">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Контент
                            </label>
                            <Editor
                              editorState={editorState}
                              onEditorStateChange={setEditorState}
                              wrapperClassName="wrapper-class"
                              editorClassName="editor-class"
                              toolbarClassName="toolbar-class"
                            />
                          </div>

                          <button
                            onClick={addInfo}
                            className="text-sm font-medium inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                          >
                            Добавить поле для описании
                          </button>
                          {info.map((item, index) => (
                            <div
                              key={item.number}
                              className="flex items-center my-2"
                            >
                              <input
                                type="text"
                                placeholder="Name"
                                value={item.title}
                                name="title"
                                onChange={(e) =>
                                  handleInputChange(
                                    "title",
                                    e.target.value,
                                    item.number
                                  )
                                }
                                className="mr-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md border border-gray-300 px-3 py-2"
                              />
                              <input
                                type="text"
                                placeholder="Value"
                                value={item.description}
                                name="description"
                                onChange={(e) =>
                                  handleInputChange(
                                    "description",
                                    e.target.value,
                                    item.number
                                  )
                                }
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md border border-gray-300 px-3 py-2"
                              />
                              <button
                                onClick={() => handleDelete(item.number)}
                                className="ml-2 py-1text-sm font-medium inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                              >
                                Delete
                              </button>
                            </div>
                          ))}

                          <div
                            onClick={addDevice}
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
  );
};

export default CreateDevice;
