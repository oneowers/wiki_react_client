// Participate.js
import React, { useState, useContext, useEffect } from "react";
import { Context } from "..";
import { createDevice, fetchDevices } from "../http/deviceApi";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Modal, InputField, DropdownSelect } from "../elements";
import { fetchCountries } from "../http/countryesApi";
import { Link } from "react-router-dom";
import { ABOUT_ROUTE } from "../utils/consts";

const Participate = ({ show, onHide }) => {
  const [country, setCountry] = useState("");
  const [countryes, setCountryes] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    fetchCountries().then((data) => setCountryes(data));
  }, []);

  const addDevice = () => {
    const formData = new FormData();
    formData.append("country", country);
    formData.append("companyName", companyName);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("employeeName", employeeName);

    createDevice(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide}>
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-12 lg:col-span-12">
          <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
            Участвовать на выставке
          </h2>
          <Link
            to={ABOUT_ROUTE}
            className="text-sm text-gray-500 underline"
            onClick={onHide}
          >
            Информация о выставке
          </Link>

          <section aria-labelledby="options-heading" className="mt-5">
            <div className="grid w-full grid-cols-12 space-x-2">
              <DropdownSelect
                label="Выбрать страну"
                onChange={setCountry}
                selected={country}
                arrayList={countryes}
              />
              <InputField
                label="Название компании"
                value={companyName}
                onChange={setCompanyName}
                required
              />
              <InputField label="Адрес" value={address} onChange={setAddress} />
              <InputField label="E-mail" value={email} onChange={setEmail} />
              <InputField label="Телефон" value={phone} onChange={setPhone} />
              <InputField
                label="Имя сотрудника"
                value={employeeName}
                onChange={setEmployeeName}
              />
            </div>

            <div className="grid w-full grid-cols-12 gap-2">
              {Array(1, 2, 3, 4).map((number, index) => (
                <div
                  key={index}
                  className="relative my-4 sm:col-span-6 lg:col-span-3"
                >
                  <div
                    className="border border-gray-300 rounded-md"
                    style={{
                      backgroundImage:
                        "url('https://sc04.alicdn.com/kf/UTB8HHIEA9nEXKJk43Ubq6zLppXaC.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px", // Set your desired height
                    }}
                  >
                    <div className="absolute bottom-1 w-full p-2">
                      <div className="rounded-full bg-white/70 grid grid-cols-12 p-2">
                      <button className="bg-white text-gray-800 w-full py-1 rounded-full shadow-md col-span-4">
                        -
                      </button>
                      <span className="text-black font-bold text-xl mx-2 col-span-4 text-center">
                        0
                      </span>
                      <button className="bg-white text-gray-800 w-full py-1 rounded-full shadow-md col-span-4">
                        +
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              onClick={addDevice}
              className="
                bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-600 cursor-pointer
                mt-6 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Отправить
            </div>
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default Participate;