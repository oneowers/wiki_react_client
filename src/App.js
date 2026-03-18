import React, { useContext, useEffect } from "react";
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter.js';
import NavBar from './components/NavBar.js';
import Footer from './components/Footer.js';
import { observer } from 'mobx-react-lite';
import { Context } from "./index.js"; // Импортируем контекст
import { check } from './http/userApi.js';
import { toast } from "react-toastify";

const App = observer(() => {
  const { user } = useContext(Context); // Получаем доступ к стору пользователя

  useEffect(() => {
    // Вызываем проверку при первой загрузке
    check(user)
      .then((data) => {
        if (data && data.success) {
          // Если проверка прошла успешно, MobX уже обновлен внутри функции check
          toast.success("> SESSION_RESTORED: Access granted");
        }
      })
      .catch((e) => {
        toast.error("> SESSION_ERROR: Unauthorized");
      })
      .finally(() => {
        // Убираем лоадер в любом случае через небольшую паузу для эффекта
        setTimeout(() => user.setLoading(false), 800);
      });
  }, [user]);

  if (user.loading) {
    return (
      <div className="h-screen w-full bg-black flex flex-col items-center justify-center font-mono">
        <div className="relative">
          {/* Анимированный лоадер в стиле терминала */}
          <div className="text-white text-xs tracking-[0.5em] uppercase mb-4 animate-pulse">
            System_Initializing...
          </div>
          <div className="w-48 h-1 bg-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-white w-1/2 animate-[loading_1.5s_infinite_ease-in-out]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    // Добавили font-mono для всего приложения
    <div className='bg-black min-h-screen font-mono text-white selection:bg-white selection:text-black'>
      <BrowserRouter>
        <NavBar />
        <div className="min-h-[80vh]"> {/* Чтобы футер не прыгал */}
            <AppRouter />
        </div>
        <Footer />
      </BrowserRouter>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
});

export default App;