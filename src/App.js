import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter.js';
import NavBar from './components/NavBar.js';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { check } from './http/userApi.js';
import Footer from './components/Footer.js';

const App = observer(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await check();
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
      <div className="rabbit-loader">
        <span className="rabbit-label">Loading</span>
        <div className="rabbit-dots">
          <span /><span /><span />
        </div>
      </div>
    );
  }

  return (
    <div className='bg-black absolute w-full' style={{ fontFamily: 'Northing' }}>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </div>
  );
});

export default App;