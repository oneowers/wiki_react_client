import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter.js';
import NavBar from './components/NavBar.js';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index.js';
import { check, user as userApi } from './http/userApi.js'; // Renamed to avoid naming conflict
import Footer from './components/Footer.js';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const checkData = await check();
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
        <Footer />
      </BrowserRouter>
    </div>
  );
});

export default App;
