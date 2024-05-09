import { XMarkIcon } from '@heroicons/react/20/solid'
import { ABOUT_ROUTE } from '../utils/consts'
import { Link } from 'react-router-dom'
import Participate from '../modals/Participate'
import { useState, useEffect } from 'react';

export default function TopBanner() {
  const [participateVisible, setParticipateVisible] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const exhibitionDate = new Date("2024-05-21"); // Установите дату и время начала выставки
    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = exhibitionDate - now;
      if (difference <= 0) {
        clearInterval(intervalId);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-800 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#15b11a] to-[#009936] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#15b11a] to-[#009936] opacity-30"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-lg font-medium leading-6 text-white">
          <strong className="font-semibold">Leather 2024</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          Присоединяйтесь к нам в Экспо с 21 по 23 мая, осталось до выставки: 
        </p>
        <div className="flex items-center text-white">
          <span className="mr-1 font-semibold">{countdown.days}</span>д
          <span className="mx-1 font-semibold">{countdown.hours}</span>ч
          <span className="mx-1 font-semibold">{countdown.minutes}</span>м
          <span className="mx-1 font-semibold">{countdown.seconds}</span>с
        </div>
        <Link
          className="flex-none rounded-full bg-white px-3.5 py-1 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          onClick={() => setParticipateVisible(true)}
        >
          Участвовать <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-gray-100" aria-hidden="true" />
        </button>
      </div>
    </div>
    <Participate show={participateVisible} onHide={ () => setParticipateVisible(false)} />
    </>
  )
}
