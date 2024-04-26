import logo from './logo.svg';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check, user as userApi } from './http/userApi'; // Renamed to avoid naming conflict
import { toast } from 'react-toastify';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const checkData = await check();
        if (checkData.success) {
          user.setIsAuth(true);
          localStorage.setItem('token', checkData.data.token)
        }
        
        const userData = await userApi();
        if (userData.success) {
          user.setUser(userData.data.user);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full border-b-2 border-gray-200 w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
});

export default App;
