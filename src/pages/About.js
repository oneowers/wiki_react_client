import { useContext, useEffect, useState } from "react";
import { Context } from "../index.js";
import { fetchDevices } from "../http/deviceApi.js";
import Participate from "../modals/Participate.js";
import { observer } from "mobx-react-lite";
import Grid from "./Grid.js";
import HostingVisualGrid from "../elements/HostingVisualGrid.jsx";
import NavButton from "../elements/NavButton";

const About = observer(() => {
  const { device } = useContext(Context);
  const [participateVisible, setParticipateVisible] = useState(false);

  useEffect(() => {
    fetchDevices().then((data) => device.setDevices(data.rows));
  }, [device]);

  return (
    <div className="bg-black min-h-screen overflow-hidden relative">
      {/* Фоновые градиенты: Технологичный изумрудный и холодный белый */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <main className="relative isolate">
        <Grid />

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pt-32 lg:px-8 flex flex-col lg:flex-row items-center gap-16">

          {/* Текстовый блок: Хостинг Контент */}
          <div className="w-full lg:w-1/2 z-10 flex flex-col items-start">

            {/* Статус системы */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] mb-10 tracking-[0.2em] uppercase font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Network Status: Optimal
            </div>

            {/* Заголовок: Теперь текст не пересекается */}
            <h1
              className="text-6xl md:text-8xl text-white leading-[1.15] tracking-tight"
              style={{ fontFamily: 'Estrella' }}
            >
              <span className="bg-clip-text bg-gradient-to-r text-white">
                Beyond The Cloud
              </span>
            </h1>

            {/* Описание Хостинга */}
            <p
              className="mt-8 text-base md:text-lg leading-relaxed text-gray-400 max-w-sm md:max-w-md uppercase tracking-[0.05em]"
              style={{ fontFamily: 'Northing' }}
            >
              High-performance bare metal and cloud solutions.
              Deploy your infrastructure in seconds on a global
              network engineered for 99.99% uptime and zero latency.
            </p>

            {/* Кнопки */}
            <div className="mt-12 flex flex-wrap gap-5">
              <NavButton variant="white" onClick={() => setParticipateVisible(true)}>
                START DEPLOYING
              </NavButton>
              <NavButton variant="ghost">
                DOCUMENTATION
              </NavButton>
            </div>
          </div>

          {/* Сетка изображений: Технологичные объекты (Server/Tech Aesthetic) */}
          <HostingVisualGrid />
        </div>
      </main>

      <Participate
        show={participateVisible}
        onHide={() => setParticipateVisible(false)}
      />
    </div>
  );
});

export default About;