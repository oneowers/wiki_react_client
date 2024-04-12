import React, { useContext } from "react";
import { Context } from "..";
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

  
const Shop = observer(() => {
    const {device} = useContext(Context)
    const navigate = useNavigate()

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">  
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {device && device.devices.map((product) => (
                        <div onClick={() => navigate(DEVICE_ROUTE + '/' + product.id)}>
                            <div key={product.id} className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.img}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                            <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                <a href={product.href}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.name}
                                </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
  })

  export default Shop;
  