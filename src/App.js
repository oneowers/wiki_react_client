import logo from './logo.svg';
import './index.css';
import  {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './http/userApi';

const App = observer (() =>{
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      check().then(data =>{
        user.setUser(true)
        user.setIsAuth(true)
      }).finally(()=>setLoading(false))
    }, 0)
  }, [])

  if(loading){
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-b-2 border-gray-200 w-8 h-8"></div>
    </div>
  }

  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
