import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const TypeBar = observer(() => {
    const {device} = useContext(Context)

    return (
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8 ">
        <nav className="flex space-x-4" aria-label="Tabs">
          {device.brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => device.setSelectedBrand(brand)}
              className={classNames(
                brand.id === device.selectedBrand.id ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                'rounded-md px-3 py-2 text-sm font-medium bg-gray-50'
              )}
              aria-current={brand.current ? 'page' : undefined}
            >
              {brand.name}
            </button>
          ))}
        </nav>
    </div>
    )
})
  

export default TypeBar;


{/* <div key={product.id} className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
            src={product.imageSrc}
            alt={product.imageAlt}
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
        </div> */}