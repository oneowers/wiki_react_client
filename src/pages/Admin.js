import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { PlusCircleIcon, TagIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import CreateBrand from '../modals/CreateBrand';
import CreateType from '../modals/CreateType';
import CreateDevice from '../modals/CreateDevice';

const Admin = observer(() => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    return (
        <div className='bg-white '>
            <div className='mx-auto max-w-7xl pt-5'>
                <button className="p-1  text-xl font-medium bg-gray-100 rounded-md flex items-center" onClick={() => setTypeVisible(true)}>
                    <TagIcon className="h-6 w-6 mr-1" /> Add type
                </button>
                <button className="mt-1 p-1 text-xl font-medium bg-gray-100 rounded-md flex items-center" onClick={() => setBrandVisible(true)}>
                    <PlusCircleIcon className="h-6 w-6 mr-1" /> Add brand
                </button>
                <button className="mt-1 p-1 text-xl font-medium bg-gray-100 rounded-md flex items-center" onClick={() => setDeviceVisible(true)}>
                    <DevicePhoneMobileIcon className="h-6 w-6 mr-1" /> Add device
                </button>
                <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
                <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
                <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
            </div>
        </div>
    );
});

export default Admin;
