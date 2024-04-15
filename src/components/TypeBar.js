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
        <div className="text-3xl font-medium mb-5">Leathers 2024</div>
        <div className="flex space-y-2 flex-col">
            {device.brands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => device.setSelectedBrand(brand)}
                className={classNames(
                  brand.id === device.selectedBrand.id ? 'text-indigo-500' : 'text-gray-500 hover:text-gray-700',
                  'rounded-md py-2 font-medium cursor-pointer'
                )}
                aria-current={brand.current ? 'page' : undefined}
              >
                {brand.name}
              </div>
            ))}
      </div>
    </div>
    )
})
  

export default TypeBar;

