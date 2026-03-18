import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, NEWS_ROUTE } from "../utils/consts.js";
import logo from "../components/logo.png";
import {
  login,
  registration,
  sendVerificationSms,
  verifyCodeSms,
} from "../http/userApi.js";
import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { toast } from "react-toastify";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [codeSended, setCodeSended] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Math.ceil((Date.now() - timer) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatPhoneNumber = (input) => {
    const cleanedInput = input.replace(/\D/g, "");
    let formattedNumber = "";
    for (let i = 0; i < cleanedInput.length; i++) {
      if (i === 2 || i === 5 || i === 7) formattedNumber += "-";
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
    const formatedPhoneNumber = "+998" + phoneNumber.replace(/-/g, "");
    if (!codeSended) {
      let res;
      if (isLogin) {
        res = await login(formatedPhoneNumber, password, user);
        if (res.success) navigate(NEWS_ROUTE);
      } else {
        res = await registration(formatedPhoneNumber, password, firstName, user);
        if (res.success) {
          const sms = await sendVerificationSms(formatedPhoneNumber);
          if (sms.success) {
            setCodeSended(true);
            setTimer(Date.now());
          }
        }
      }
      // Styled Toast
      res.success 
        ? toast.success(`> STATUS: OK. ${res.message}`) 
        : toast.error(`> ERROR: ACCESS_DENIED. ${res.message}`);
        
    } else {
      const response = await verifyCodeSms(formatedPhoneNumber, code, user);
      
      response.success 
        ? toast.success(`> AUTH_COMPLETE: ${response.message}`) 
        : toast.error(`> ERROR: INVALID_TOKEN. ${response.message}`);

      if (response.success) navigate(NEWS_ROUTE);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col justify-center items-center px-6 selection:bg-white selection:text-black">
      {/* Background Grid Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Terminal Header Area */}
        <div className="border-2 border-white p-1 mb-8">
          <div className="bg-white text-black px-3 py-1 flex justify-between items-center font-bold text-xs uppercase tracking-tighter">
            <span>{isLogin ? "Session_Init" : "Registry_New_Node"}</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>V.2.0.4</span>
            </div>
          </div>

          <div className="p-6 bg-black border-t-2 border-white flex flex-col items-center">
            {/* --- TERMINAL LOGO --- */}
            <div className="relative mb-6 group">

              <img
                className="relative h-16 w-auto grayscale"
                src={logo}
                alt="System Logo"
              />

              </div>

            <h2 className="text-2xl font-black uppercase tracking-widest text-center mb-2">
              {isLogin ? "Auth_Required" : "Create_ID"}
            </h2>
            <p className="text-[10px] text-white/40 text-center uppercase tracking-widest">
              Enter credentials to establish secure link
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="space-y-6">
          <div className={`${codeSended ? "opacity-30 pointer-events-none" : "opacity-100"} transition-opacity duration-500`}>

            {!isLogin && (
              <div className="mb-4">
                <label className="block text-[10px] uppercase text-white/50 mb-1">&gt; node_alias</label>
                <input
                  type="text"
                  placeholder="FIRST_NAME"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-transparent border-b border-white/30 focus:border-white py-2 outline-none text-sm transition-colors"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-[10px] uppercase text-white/50 mb-1">&gt; phone_identifier</label>
              <div className="flex items-center border-b border-white/30 focus-within:border-white transition-colors">
                <span className="text-sm pr-2 text-white/60">+998</span>
                <input
                  type="text"
                  placeholder="00-000-00-00"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="w-full bg-transparent py-2 outline-none text-sm tracking-widest"
                />
              </div>
              {!isValidPhoneNumber && (
                <span className="text-[9px] text-red-500 mt-1 uppercase">Error: invalid_format</span>
              )}
            </div>

            <div>
              <label className="block text-[10px] uppercase text-white/50 mb-1">&gt; access_key</label>
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/30 focus:border-white py-2 outline-none text-sm transition-colors"
              />
            </div>
          </div>

          {/* SMS Verification Area */}
          {codeSended && (
            <div className="border border-white p-4 animate-[slideIn_0.3s_ease-out]">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] uppercase text-white font-bold">Verify_One_Time_Pass</label>
                <span className="text-[10px] text-white/40">ID: SMS_{Math.floor(Math.random() * 9000)}</span>
              </div>
              <input
                type="text"
                placeholder="[ 0 0 0 0 ]"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="w-full bg-white text-black font-bold text-center py-3 outline-none tracking-[1em] text-xl"
              />
              <div className="mt-3 text-[10px] text-center uppercase tracking-tighter">
                {timeLeft < user.timerSms ? (
                  <span className="text-white/40">Request cooldown: {user.timerSms - timeLeft}s</span>
                ) : (
                  <button onClick={() => setCodeSended(false)} className="underline hover:text-white transition-colors">
                    Re-request access code
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Execute Button */}
          <button
            onClick={click}
            className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-black hover:text-white border-2 border-white transition-all duration-300"
          >
            {isLogin ? "[ Execute_Login ]" : "[ Initialize_Registry ]"}
          </button>

          {/* Switch Link */}
          <div className="text-center mt-6">
            <Link
              to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}
              className="text-[10px] uppercase text-white/40 hover:text-white border-b border-transparent hover:border-white transition-all pb-1 tracking-widest"
            >
              {isLogin ? "// No_account? _Register" : "// Existing_node? _Login"}
            </Link>
          </div>
        </div>

        {/* Footer Technical Metadata */}
        <div className="mt-12 opacity-20 flex justify-between text-[8px] uppercase tracking-[0.2em] font-bold">
          <span>Terminal_v2.0</span>
          <span>Local_Time: {new Date().toLocaleTimeString()}</span>
          <span>Encryption: AES_256</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
});

export default Auth;