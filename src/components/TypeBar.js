import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const TypeBar = observer(() => {
    const {device} = useContext(Context)

    return (
      <div className="bg-white m-5 rounded-lg  mt-6 px-6 py-4 h-full">
        <span className=" sr-only bg-red-200 text-red-800 bg-green-200 text-green-800 bg-indigo-200 text-indigo-800 bg-yellow-200 text-yellow-800 bg-orange-200 text-orange-800 bg-blue-200 text-blue-800"></span>
        <div className="text-2xl font-medium mb-5">UzCharmExpo LeatherGoods2024</div>
        <div className="flex space-y-1 flex-col">
            {device.brands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => device.setSelectedBrand(brand)}
                className={classNames(
                  brand.id === device.selectedBrand.id ? 'text-indigo-500' : 'text-gray-500 hover:text-gray-700',
                  'rounded-md font-medium cursor-pointer'
                )}
                aria-current={brand.current ? 'page' : undefined}
              >
                 <span
                        aria-hidden="true"
                        className={classNames(
                          `text-sm font-bold uppercase text-center ${brand.color} px-4 py-0.5 rounded-full`
                        )}
                      >
                          {brand.name}
                      </span>
              </div>
            ))}
      </div>
    </div>
    )
})
  

export default TypeBar;

