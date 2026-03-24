import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import UserStore from './store/UserStore.js';
import DeviceStore from './store/DeviceStore.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
const GOOGLE_CLIENT_ID = "481273126997-moiqio6g2beh4gch727rjmfnag11keqc.apps.googleusercontent.com";

root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
  }}>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      toastClassName={() =>
        "relative flex p-1 min-h-10 border-2 border-white bg-black text-white font-mono text-xs uppercase tracking-tighter shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)] mb-4 overflow-hidden"
      }
      bodyClassName={() => "flex items-center p-3"}
      progressClassName="bg-white"
    />
  </Context.Provider>
  </GoogleOAuthProvider>
);

reportWebVitals();
