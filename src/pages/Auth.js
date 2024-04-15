import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration, sendVerificationSms, verifyCodeSms } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { Context } from "..";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [codeSended, setCodeSended] = useState(false)

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft(Math.ceil((Date.now()-timer  ) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }, [timer]);

    const resendVerificationCode = async () => {
      const formatedPhoneNumber = "+998" + phoneNumber.replace(/-/g, '');
      const request_sms = await sendVerificationSms(formatedPhoneNumber);
      if(request_sms.success){
        setCodeSended(true);
        const currentTime = new Date();
        setTimer(currentTime.getTime());
      }
      toast(request_sms.message)
    };

    const handleCodeChange = (e) => {
      // Добавляем ограничение, чтобы код состоял из 5 цифр
      const newCode = e.target.value.replace(/\D/g, '').slice(0, 4);
      setCode(newCode);
    };

    const formatPhoneNumber = (input) => {
      const cleanedInput = input.replace(/\D/g, '');
      let formattedNumber = '';
      for (let i = 0; i < cleanedInput.length; i++) {
        if (i === 2 || i === 5 || i === 7) {
          formattedNumber += '-';
        }
        formattedNumber += cleanedInput[i];
      }
      return formattedNumber;
    };
  
    const handlePhoneNumberChange = (event) => {
      const input = event.target.value;
      const formattedNumber = formatPhoneNumber(input);
      setPhoneNumber(formattedNumber);
      setIsValidPhoneNumber(/^\d{2}-\d{3}-\d{2}-\d{2}$/.test(formattedNumber));
    };
    
    const click = async () => {
      const formatedPhoneNumber = "+998" + phoneNumber.replace(/-/g, '');
      if (!codeSended) {
        let request_get_token;
        if (isLogin) {
          request_get_token = await login(formatedPhoneNumber, password, user);
          toast(request_get_token.message)
          if (request_get_token.success) navigate(SHOP_ROUTE)
        } else {
          request_get_token = await registration(formatedPhoneNumber, password);
          if(request_get_token.success){
            const request_sms = await sendVerificationSms(formatedPhoneNumber);
            if(request_sms.success){
              setCodeSended(true);
              const currentTime = new Date();
              setTimer(currentTime.getTime());
            }
            console.log(request_sms)
            toast(request_sms.message)
          }else{
            toast.error(request_get_token.message)
          }
        }
      } else {
          const response = await verifyCodeSms(formatedPhoneNumber, code, user);
          toast(response.message);
          if (response.success) navigate(SHOP_ROUTE)
      }
    };
    
    const inputBorderColor = isValidPhoneNumber ? 'border-indigo-300' : 'border-red-500';
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isLogin ? <>Войдите в свою учетную запись</> : <>Авторизация</>}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <fieldset disabled={codeSended}>
            <div>
              <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                Номер телефона
              </label>
              <div className={`relative mt-2 rounded-md shadow-sm ${inputBorderColor}`}>
                  <div className="absolute inset-y-0 left-0 flex items-center">
                      <label htmlFor="country" className="sr-only">
                          Country
                      </label>
                      <select id="country" name="country" autoComplete="country"
                          className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-1 text-gray-500 focus:outline-none sm:text-sm">
                          <option>+998</option>
                      </select>
                  </div>
                  <input id="text" name="text" type="text" autoComplete="text" required
                      value={phoneNumber} onChange={handlePhoneNumberChange}
                      className={`focus:outline-none focus:ring block w-full rounded-md border-0
                      py-1.5 pl-20 text-gray-900 ring-1 ${ isValidPhoneNumber
                      ? 'focus:ring-indigo-500 ring-indigo-500' : 'focus:ring-red-500 ring-red-500' }
                      text-sm leading-6`} />
                  {!isValidPhoneNumber && (
                  <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 30 20">
                          <g>
                              <path fill="none" d="M0 0h24v24H0z" />
                              <path
                                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" />
                          </g>
                      </svg>
                  </div>
                  )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Пароль
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Забыли пароль?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            </fieldset>
            {codeSended &&
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="code" className="block text-sm font-medium leading-6 text-gray-900">
                  Введите код, который пришел вам на номер
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="code"
                  name="code"
                  type="text"
                  autoComplete="off"
                  required
                  value={code}
                  autocomplete="one-time-code"
                  onChange={handleCodeChange}
                  maxLength={5} // Устанавливаем максимальную длину вводимого кода
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="text-sm">
              {}
              {timeLeft < user.timerSms ? (
                <p className="font-semibold text-sm text-gray-500">
                  Можете отправить код повторно через {user.timerSms - timeLeft} секунд
                </p>
              ) : (
                <p className="font-semibold text-sm text-gray-500">
                  Не пришел код?{' '}
                  <button type="button" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" onClick={resendVerificationCode}>
                    Отправить повторно
                  </button>
                </p>
              )}

              </div>
            </div>}

            <div>
              <div
                onClick={click}
                className=" cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLogin ? <>Войти</> : <>Регистрация</>}
              </div>
            </div>
          </form>


          {isLogin ? 
          <p className="mt-10 text-center text-sm text-gray-500">
            Нет аккаунта?{' '}
            <Link to={REGISTRATION_ROUTE} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Зарегистрируйся!
            </Link>
          </p>
          :
          <p className="mt-10 text-center text-sm text-gray-500">
            Есть аккаунт?{' '}
            <Link to={LOGIN_ROUTE} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Войдите!
            </Link>
          </p>}
        </div>
      </div>
    )
})

export default Auth;