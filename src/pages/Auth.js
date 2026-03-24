import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, NEWS_ROUTE } from "../utils/consts.js";
import logo from "../components/logo.png";
import {
  login,
  registration,
  sendVerificationSms,
  verifyCodeSms,
  googleAuth
} from "../http/userApi.js";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const codeInputRef = useRef(null);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    firstName: "",
    code: ""
  });

  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timeout = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timeout);
  }, [timeLeft]);

  useEffect(() => {
    if (isCodeSent && codeInputRef.current) {
      codeInputRef.current.focus();
    }
  }, [isCodeSent]);

  const formatPhoneNumber = (input) => {
    const digits = input.replace(/\D/g, "");
    const match = digits.match(/^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) return "";
    return [match[1], match[2], match[3], match[4]].filter(Boolean).join("-");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      setIsValidPhone(/^\d{2}-\d{3}-\d{2}-\d{2}$/.test(formatted));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const res = await googleAuth(tokenResponse.access_token, user);
        if (res.success) {
          toast.success("> GOOGLE_AUTH: SUCCESS");
          navigate(NEWS_ROUTE);
        } else {
          toast.error(`> ERROR: ${res.message}`);
        }
      } catch (e) {
        toast.error("> ERROR: CONNECTION_FAILED");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => toast.error(`> ERROR: USER_REJECTED`),
  });

  const handleSubmit = async () => {
    if (!isValidPhone || !formData.phoneNumber || !formData.password) {
      return toast.warning("> SYSTEM: INVALID_CREDENTIALS");
    }

    const fullPhone = "+998" + formData.phoneNumber.replace(/-/g, "");
    setIsLoading(true);

    try {
      if (!isCodeSent) {
        let res;
        if (isLogin) {
          res = await login(fullPhone, formData.password, user);
          if (res.success) navigate(NEWS_ROUTE);
        } else {
          res = await registration(fullPhone, formData.password, formData.firstName, user);
          if (res.success) {
            const sms = await sendVerificationSms(fullPhone);
            if (sms.success) {
              setIsCodeSent(true);
              setTimeLeft(user.timerSms || 60);
            }
          }
        }
        res.success ? toast.success(`> ${res.message}`) : toast.error(`> ${res.message}`);
      } else {
        const res = await verifyCodeSms(fullPhone, formData.code, user);
        if (res.success) {
          toast.success("> AUTH_COMPLETE");
          navigate(NEWS_ROUTE);
        } else {
          toast.error(`> INVALID_CODE: ${res.message}`);
        }
      }
    } catch (err) {
      toast.error("> SYSTEM_FAILURE: INTERNAL_ERROR");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col justify-center items-center pb-20 selection:bg-white selection:text-black">
      <div className="fixed inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="w-full max-w-sm relative z-10">
        
        {/* Логотип с новой анимацией сканирования при загрузке */}
        <div className="flex flex-col items-center mb-16 relative">
          <div className="relative">
            <img 
              className={`h-20 w-auto grayscale transition-all duration-700 ${isLoading ? 'brightness-150 blur-[1px]' : 'opacity-100'}`} 
              src={logo} 
              alt="Logo" 
            />
            {isLoading && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent h-1/2 w-full animate-scanline border-b border-white/50" />
                <div className="absolute -inset-2 border border-white/20 animate-ping opacity-20" />
              </>
            )}
          </div>
          <h2 className={`text-3xl font-black uppercase tracking-widest mt-5 text-center transition-opacity ${isLoading ? 'animate-pulse' : ''}`}>
            {isLoading ? "Processing..." : (isLogin ? "Auth_Required" : "Create_ID")}
          </h2>
        </div>

        <div className="space-y-6">
          <div className={`${isCodeSent ? "opacity-30 pointer-events-none" : "opacity-100"} transition-all duration-500`}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-[10px] uppercase text-white/50 mb-1">&gt; node_alias</label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="FIRST_NAME"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="custom-input w-full bg-transparent border-b border-white/30 focus:border-white py-2 outline-none text-sm transition-colors"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-[10px] uppercase text-white/50 mb-1">&gt; phone_identifier</label>
              <div className={`flex items-center border-b ${isValidPhone ? 'border-white/30' : 'border-red-500'} focus-within:border-white transition-colors`}>
                <span className="text-sm pr-2 text-white/60">+998</span>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="00-000-00-00"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="custom-input w-full bg-transparent py-2 outline-none text-sm tracking-[0.2em]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase text-white/50 mb-1">&gt; access_key</label>
              <input
                name="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleInputChange}
                className="custom-input w-full bg-transparent border-b border-white/30 focus:border-white py-2 outline-none text-sm transition-colors"
              />
            </div>
          </div>

          {isCodeSent && (
            <div className="border border-white p-4 bg-white/5 animate-[slideIn_0.3s_ease-out]">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] uppercase text-white font-bold">Verify_One_Time_Pass</label>
                <span className="text-[8px] animate-pulse">WAITING_FOR_INPUT...</span>
              </div>
              <input
                ref={codeInputRef}
                type="text"
                placeholder="0000"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                className="w-full bg-white text-black font-bold text-center py-3 outline-none tracking-[1em] text-xl"
              />
              <div className="mt-3 text-[10px] text-center uppercase">
                {timeLeft > 0 ? (
                  <span className="text-white/40">Request cooldown: {timeLeft}s</span>
                ) : (
                  <button onClick={() => { setIsCodeSent(false); setFormData(p => ({ ...p, code: "" })); }} 
                          className="underline hover:text-white transition-colors text-red-400">
                    Re-request access code
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3 pt-4">
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className={`relative overflow-hidden w-full py-4 font-black uppercase tracking-[0.3em] text-xs border-2 border-white transition-all duration-300
                ${isLoading ? 'bg-black text-white cursor-not-allowed opacity-50' : 'bg-white text-black hover:bg-black hover:text-white'}`}
            >
              {isLoading && (
                <div className="absolute inset-0 bg-white/10 animate-progress-loading" style={{ width: '30%' }} />
              )}
              <span className="relative z-10">
                {isLoading ? "Executing_Kernel..." : isLogin ? "[ Execute_Login ]" : "[ Initialize_Registry ]"}
              </span>
            </button>

            <div className="flex items-center justify-between opacity-30 py-2">
              <span className="w-[40%] border-b border-white"></span>
              <span className="text-[10px] font-bold">OR</span>
              <span className="w-[40%] border-b border-white"></span>
            </div>

            <button
              disabled={isLoading}
              onClick={() => loginWithGoogle()}
              className="w-full py-3 bg-transparent text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-black border border-white/50 transition-all flex justify-center items-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              {isLoading ? "OAUTH_SYNC..." : "[ OAUTH_GOOGLE ]"}
            </button>
          </div>

          <div className="text-center mt-8">
            <Link
              to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}
              className="text-[10px] uppercase text-white/40 hover:text-white border-b border-transparent hover:border-white transition-all pb-1 tracking-widest"
            >
              {isLogin ? "// No_account? _Register" : "// Existing_node? _Login"}
            </Link>
          </div>
        </div>

        <div className="mt-16 opacity-20 flex justify-between text-[8px] uppercase tracking-[0.2em] font-bold">
          <span>Terminal_v2.0</span>
          <span className="animate-pulse">Status: Online</span>
          <span>Encryption: AES_256</span>
        </div>
      </div>

      <style jsx="true">{`
  /* Стилизация Auto-fill: Hacker Green Mode */
  .custom-input:-webkit-autofill,
  .custom-input:-webkit-autofill:hover, 
  .custom-input:-webkit-autofill:focus {
    /* Цвет текста: классический терминальный зеленый */
    -webkit-text-fill-color: #00FF41; 
    
    /* Фон инпута: оставляем черным, перекрывая системный цвет */
    -webkit-box-shadow: 0 0 0px 1000px black inset;
    
    /* Добавляем легкое свечение тексту для эффекта монитора */
    text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
    
    /* Задержка, чтобы браузер не вернул стандартные стили */
    transition: background-color 5000s ease-in-out 0s;
    
    /* Принудительный шрифт */
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  }

  /* Цвет курсора (каретки) тоже делаем зеленым при фокусе на автозаполнении */
  .custom-input {
    caret-color: white;
  }
  .custom-input:focus {
    caret-color: #00FF41;
  }

  /* Анимация сканирующей линии на логотипе */
  @keyframes scanline {
    0% { top: -10%; opacity: 0; }
    50% { opacity: 1; }
    100% { top: 110%; opacity: 0; }
  }

  /* Анимация полоски внутри кнопки */
  @keyframes progress {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  .animate-scanline {
    animation: scanline 1.5s linear infinite;
  }

  .animate-progress-loading {
    position: absolute;
    animation: progress 2s linear infinite;
    /* Зеленый индикатор загрузки под стать стилю */
    background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.3), transparent);
    width: 100%;
    height: 100%;
  }

  @keyframes slideIn {
    from { transform: translateY(10px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`}</style>
    </div>
  );
});

export default Auth;