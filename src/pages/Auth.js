import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { Context } from "..";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    
    const click = async () => {
      try {
        let data;
        if(isLogin){
          data = await login(phoneNumber, password)
  
        }else{
          data = await registration(phoneNumber, password)
        }
        user.setUser(user)
        user.setIsAuth(true)
        navigate(SHOP_ROUTE)
      }catch(e){
        alert(e.response.data.message)
      }
    }
    
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isLogin ? <>Sign in to your account</> : <>Autorization</>}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                Телефон номер
              </label>
              <div className="mt-2">
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  autoComplete="phone-number"
                  required
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Пароль
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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