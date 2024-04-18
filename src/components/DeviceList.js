import React, { useContext } from "react";
import { Context } from "..";
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

  
const Shop = observer(() => {
    const {device} = useContext(Context)
    const navigate = useNavigate()

    return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 xl:gap-x-8">
        {device && device.devices.map((product) => (
           <div onClick={() => navigate(DEVICE_ROUTE + '/' + product.id)} key={product.id} className="bg-white p-3 rounded-lg group relative flex flex-col items-start">
           <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-40 mb-4">
               <img
                   src={product.img}
                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"
               />
           </div>
           <div className="flex flex-col justify-between">
                    <h3 className="text-sm font-medium uppercase text-center text-pink-700 bg-pink-200 px-2 py-0.5 rounded-full">
                       <a href={product.href}>
                           <span aria-hidden="true" className="absolute inset-0" />
                           {device.brands[product.brandId-1] && device.brands[product.brandId-1].name}
                       </a>
                   </h3>
               <div>
                   
                   
               </div>
           </div>
           <p className="ml-1 mt-1 font-bold text-lg text-black">{product.name}</p>
       </div>       
        ))}
    </div>

    )
  })

  export default Shop;
  