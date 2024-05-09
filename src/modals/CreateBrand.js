import React from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";
import { createBrand } from "../http/deviceApi";
import { InputField, Modal } from "../elements";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CreateBrand = ({ show, onHide }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("bg-green-100 text-green-700");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);


  const addBrand = () => {
    createBrand({ name, color, description, cover_image: file }).then((data) => {
      setName("");
      setColor("");
      setDescription("");
      setFile(null)
      onHide();
    });
  };



  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <div className="  w-full items-start gap-x-6 gap-y-8">
        <div className="">
          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
            Создать новый тип
          </h2>

          <section aria-labelledby="options-heading" className="mt-10">
            <div>
              <InputField
                label="Названия типа"
                value={name}
                onChange={setName}
              />

              <InputField
                label="Брендовый цвет компании"
                value={color}
                onChange={setColor}
              />

              <InputField
                type="textarea"
                label="Описания компании"
                value={description}
                onChange={setDescription}
              />

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

              {name != "" && (
                <span
                  aria-hidden="true"
                  className={classNames(
                    `text-sm font-bold uppercase text-center  ${color} px-4 py-0.5 rounded-full`
                  )}
                >
                  {name}
                </span>
              )}
              <div
                onClick={addBrand}
                className="cursor-pointer mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Добавить
              </div>
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default CreateBrand;
