import { useState } from "react";
import { observer } from "mobx-react-lite";
import {
  PlusCircleIcon,
  TagIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import CreateBrand from "../modals/CreateBrand.js";
import CreateType from "../modals/CreateType.js";
import CreateDevice from "../modals/CreateDevice.js";
import ParticipantsList from '../components/admin/ParticipantsList.js'

const Admin = observer(() => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);

  return (
    <div className="bg-white mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex space-x-2 justify-end">
          <button
            className="p-1  text-sm font-medium bg-gray-100 rounded-md flex items-center"
            onClick={() => setTypeVisible(true)}
          >
            <TagIcon className="h-5 w-5 mr-1" /> Add type
          </button>
          <button
            className=" p-1 text-sm font-medium bg-gray-100 rounded-md flex items-center"
            onClick={() => setBrandVisible(true)}
          >
            <PlusCircleIcon className="h-5 w-5 mr-1" /> Add brand
          </button>
          <button
            className=" p-1 text-sm font-medium bg-gray-100 rounded-md flex items-center"
            onClick={() => setDeviceVisible(true)}
          >
            <DevicePhoneMobileIcon className="h-5 w-5 mr-1" /> Add device
          </button>
        </div>
        <CreateBrand
          show={brandVisible}
          onHide={() => setBrandVisible(false)}
        />
        <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        <CreateDevice
          show={deviceVisible}
          onHide={() => setDeviceVisible(false)}
        />

        <ParticipantsList />
      </div>
    </div>
  );
});

export default Admin;
