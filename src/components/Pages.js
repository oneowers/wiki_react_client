import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '..'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
    }

const Pages = observer(() => {
    const {device} = useContext(Context)
    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i+1)
    }
  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8 ">
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div className="-mt-px flex w-0 flex-1">
            <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
            <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Previous
            </a>
        </div>
        <div className="hidden md:-mt-px md:flex">

            {pages.map(page => 
                <div
                key={page}
                onClick={() => device.setPage(page)}
                className={classNames(device.page === page ? 
                    "border-indigo-500 text-indigo-600 hover:border-indigo-500 hover:text-indigo-600" : 
                    "border-transparent cursor-pointer",
                    "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                )}
                >
                {page}
                </div>
            )}
            {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
            
            <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
            ...
            </span>

            <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
            8
            </a>
            
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
            <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
            Next
            <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </a>
        </div>
        </nav>
    </div>
  )
})

export default Pages;
