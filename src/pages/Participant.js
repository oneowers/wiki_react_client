import React, { useState, useEffect } from "react";
import { createParticipant } from "../http/participantApi.js";
import { InputField, DropdownSelect } from "../elements/index.js";
import { Link } from "react-router-dom";
import { ABOUT_ROUTE, DEVICE_ROUTE, SHOP_ROUTE } from "../utils/consts.js";
import QRCode from "qrcode.react";

const Participate = ({ show, onHide }) => {
  // Состояние для хранения текущего выбранного языка
  const [country, setCountry] = useState({
    common: "🇺🇿 O'zbekiston",
    id: "uz",
  }); // Define country state
  const [employeeName, setEmployeeName] = useState(""); // Define employeeName state
  const [companyName, setCompanyName] = useState("") // Define employee state
  const [phoneNumber, setPhoneNumber] = useState(""); // Define phoneNumber state
  const [email, setEmail] = useState(""); // Define email state
  const [success, setSuccess] = useState(false); // Define success state
  const [id, setId] = useState(0); // Define id state

  const translations = {
    uz: {
      countryOptions: [
        { common: "🇺🇿 O'zbekiston", id: "uz" },
        { common: "🇷🇺 Rossiya", id: "ru" },
        { common: "🇺🇸 AQSH", id: "us" },
        { common: "🇮🇹 Italiya", id: "it" },
        { common: "🇨🇳 Xitoy", id: "cn" },
        { common: "🇮🇷 Eron", id: "ir" },
        { common: "🇧🇾 Belarus", id: "by" },
        { common: "🇩🇪 Germaniya", id: "de" },
      ],
      participateTitle: "Chiqishga qatnashish",
      aboutExhibition: "Nazorat haqida ma'lumot",
      fullNameLabel: "To'liq ism",
      phoneNumberLabel: "Telefon raqami",
      emailLabel: "Elektron pochta",
      submitButton: "Jo'natish",
      successMessage: "Muvaffaqiyatli ro'yxatdan o'tdingiz",
      returnHomeLink: "Bosh sahifaga qaytish",
      pleaseDontClose: "Iltimos, ushbu sahifani yopmang",
      companyLabel: "Kompaniyani kiriting",
    },
    ru: {
      countryOptions: [
        { common: "🇺🇿 Узбекистан", id: "uz" },
        { common: "🇷🇺 Россия", id: "ru" },
        { common: "🇺🇸 США", id: "us" },
        { common: "🇮🇹 Италия", id: "it" },
        { common: "🇨🇳 Китай", id: "cn" },
        { common: "🇮🇷 Иран", id: "ir" },
        { common: "🇧🇾 Беларусь", id: "by" },
        { common: "🇩🇪 Германия", id: "de" },
      ],
      participateTitle: "Участвовать на выставке",
      aboutExhibition: "Информация о выставке",
      fullNameLabel: "Полное имя",
      phoneNumberLabel: "Телефонный номер",
      emailLabel: "Электронная почта",
      submitButton: "Отправить",
      successMessage: "Вы успешно зарегистрировались",
      returnHomeLink: "Вернуться на главную страницу",
      pleaseDontClose: "Пожалуйста, не закрывайте эту страницу",
      companyLabel: "Введите компанию",
    },
    us: {
      countryOptions: [
        { common: "🇺🇿 Uzbekistan", id: "uz" },
        { common: "🇷🇺 Russia", id: "ru" },
        { common: "🇺🇸 USA", id: "us" },
        { common: "🇮🇹 Italy", id: "it" },
        { common: "🇨🇳 China", id: "cn" },
        { common: "🇮🇷 Iran", id: "ir" },
        { common: "🇧🇾 Belarus", id: "by" },
        { common: "🇩🇪 Germany", id: "de" },
      ],
      participateTitle: "Participate in the exhibition",
      aboutExhibition: "About the exhibition",
      fullNameLabel: "Full name",
      phoneNumberLabel: "Phone number",
      emailLabel: "Email",
      submitButton: "Submit",
      successMessage: "You have successfully registered",
      returnHomeLink: "Return to the homepage",
      pleaseDontClose: "Please do not close this page",
      companyLabel: "Enter company",
    },
    it: {
      countryOptions: [
        { common: "🇺🇿 Uzbekistan", id: "uz" },
        { common: "🇷🇺 Russia", id: "ru" },
        { common: "🇺🇸 USA", id: "us" },
        { common: "🇮🇹 Italy", id: "it" },
        { common: "🇨🇳 China", id: "cn" },
        { common: "🇮🇷 Iran", id: "ir" },
        { common: "🇧🇾 Belarus", id: "by" },
        { common: "🇩🇪 Germany", id: "de" },
      ],
      participateTitle: "Partecipare alla mostra",
      aboutExhibition: "Informazioni sulla mostra",
      fullNameLabel: "Nome completo",
      phoneNumberLabel: "Numero di telefono",
      emailLabel: "Indirizzo email",
      submitButton: "Invia",
      successMessage: "Ti sei registrato con successo",
      returnHomeLink: "Torna alla homepage",
      pleaseDontClose: "Per favore, non chiudere questa pagina",
      companyLabel: "Inserisci azienda",
    },
    cn: {
      countryOptions: [
        { common: "🇺🇿 乌兹别克斯坦", id: "uz" },
        { common: "🇷🇺 俄罗斯", id: "ru" },
        { common: "🇺🇸 美国", id: "us" },
        { common: "🇮🇹 意大利", id: "it" },
        { common: "🇨🇳 中国", id: "cn" },
        { common: "🇮🇷 伊朗", id: "ir" },
        { common: "🇧🇾 白俄罗斯", id: "by" },
        { common: "🇩🇪 德国", id: "de" },
      ],
      participateTitle: "参加展览",
      aboutExhibition: "关于展览",
      fullNameLabel: "全名",
      phoneNumberLabel: "电话号码",
      emailLabel: "电子邮件",
      submitButton: "提交",
      successMessage: "您已成功注册",
      returnHomeLink: "返回首页",
      pleaseDontClose: "请不要关闭此页面",
      companyLabel: "输入公司",
    },
    ir: {
      countryOptions: [
        { common: "🇺🇿 ازبکستان", id: "uz" },
        { common: "🇷🇺 روسیه", id: "ru" },
        { common: "🇺🇸 آمریکا", id: "us" },
        { common: "🇮🇹 ایتالیا", id: "it" },
        { common: "🇨🇳 چین", id: "cn" },
        { common: "🇮🇷 ایران", id: "ir" },
        { common: "🇧🇾 بلاروس", id: "by" },
        { common: "🇩🇪 آلمان", id: "de" },
      ],
      participateTitle: "شرکت در نمایشگاه",
      aboutExhibition: "درباره نمایشگاه",
      fullNameLabel: "نام کامل",
      phoneNumberLabel: "شماره تلفن",
      emailLabel: "ایمیل",
      submitButton: "ارسال",
      successMessage: "شما با موفقیت ثبت نام کرده اید",
      returnHomeLink: "بازگشت به صفحه اصلی",
      pleaseDontClose: "لطفاً این صفحه را بسته نکنید",
      companyLabel: "وارد کردن شرکت",
    },
    by: {
      countryOptions: [
        { common: "🇺🇿 Узбекистан", id: "uz" },
        { common: "🇷🇺 Россия", id: "ru" },
        { common: "🇺🇸 США", id: "us" },
        { common: "🇮🇹 Италия", id: "it" },
        { common: "🇨🇳 Китай", id: "cn" },
        { common: "🇮🇷 Иран", id: "ir" },
        { common: "🇧🇾 Беларусь", id: "by" },
        { common: "🇩🇪 Германия", id: "de" },
      ],
      participateTitle: "Удзельнічаць у выставе",
      aboutExhibition: "Інфармацыя пра выставу",
      fullNameLabel: "Поўнае імя",
      phoneNumberLabel: "Тэлефонны нумар",
      emailLabel: "Электронная пошта",
      submitButton: "Адправіць",
      successMessage: "Вы паспяхова зарэгістраваліся",
      returnHomeLink: "Вярнуцца на галоўную старонку",
      pleaseDontClose: "Калі ласка, не зачыняйце гэтую старонку",
      companyLabel: "Увядзіце кампанію",
    },
    de: {
      countryOptions: [
        { common: "🇺🇿 Usbekistan", id: "uz" },
        { common: "🇷🇺 Russland", id: "ru" },
        { common: "🇺🇸 USA", id: "us" },
        { common: "🇮🇹 Italien", id: "it" },
        { common: "🇨🇳 China", id: "cn" },
        { common: "🇮🇷 Iran", id: "ir" },
        { common: "🇧🇾 Weißrussland", id: "by" },
        { common: "🇩🇪 Deutschland", id: "de" },
      ],
      participateTitle: "An der Ausstellung teilnehmen",
      aboutExhibition: "Über die Ausstellung",
      fullNameLabel: "Vollständiger Name",
      phoneNumberLabel: "Telefonnummer",
      emailLabel: "E-Mail",
      submitButton: "Einreichen",
      successMessage: "Sie haben sich erfolgreich registriert",
      returnHomeLink: "Zurück zur Startseite",
      pleaseDontClose: "Bitte schließen Sie diese Seite nicht",
      companyLabel: "Firma eingeben",
    },
  };
  

  // Функция для обработки добавления участника
  const addParticipant = async () => {
    const participant = {
      state: country.id, // Используйте выбранную страну или регион, если введен вручную
      full_name: employeeName,
      phone_number: phoneNumber,
      email: email,
      company: companyName,
    };

    try {
      const data = await createParticipant(participant);
      console.log("Participant created:", data);
      setId(data.id);
      setSuccess(true);
    } catch (error) {
      console.error("Error creating participant:", error);
    }
  };

  return (
    <div className="bg-white">
      <div className="grid w-full gap-x-6 gap-y-8 lg:gap-x-8 p-7 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {!success ? (
          <div className="col-span-12">
            <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
              {translations[country.id].participateTitle}
            </h2>
            <Link
              to={ABOUT_ROUTE}
              className="text-sm text-gray-500 underline"
              onClick={onHide}
            >
              {translations[country.id].aboutExhibition}
            </Link>
            <section aria-labelledby="options-heading" className="mt-5">
              <div className="grid w-full grid-cols-1 lg:grid-cols-12 space-x-2">
                <DropdownSelect
                  label={translations[country.id].countryLabel}
                  onChange={setCountry}
                  selected={country}
                  arrayList={translations[country.id].countryOptions}
                />
                <InputField
                  label={translations[country.id].fullNameLabel}
                  value={employeeName}
                  onChange={setEmployeeName}
                />
                <InputField
                  label={translations[country.id].phoneNumberLabel}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
                <InputField
                  label={translations[country.id].emailLabel}
                  value={email}
                  onChange={setEmail}
                />

                <InputField
                  label={translations[country.id].companyLabel}
                  value={companyName}
                  onChange={setCompanyName}
                />
              </div>
              <button
                onClick={addParticipant}
                className="
          bg-gradient-to-r from-green-800 to-green-900 hover:from-green-900 hover:to-green-900 cursor-pointer
          mt-6 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {translations[country.id].submitButton}
              </button>
            </section>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {translations[country.id].pleaseDontClose}
            <div className="rounded-lg bg-green-100 p-6 text-center">
              <p className="text-lg font-semibold">
                {translations[country.id].successMessage}
              </p>
            </div>

            <div className="mt-6">
              <QRCode
                value={`https://uzexpo.com/participants/` + id}
                size={200}
                fgColor="#000000"
                bgColor="#ffffff"
                level="H"
              />
            </div>

            <Link
              to={SHOP_ROUTE} // Предполагая, что SHOP_ROUTE определен
              className="mt-6 text-sm text-gray-500 underline"
              onClick={onHide}
            >
              {translations[country.id].returnHomeLink}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Participate;
