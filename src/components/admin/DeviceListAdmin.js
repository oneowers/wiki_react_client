import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../index.js";
import { fetchDevices, deleteDevice } from "../../http/deviceApi.js";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import UpdateDevice from "../../modals/UpdateDevice.js";

const DeviceListAdmin = observer(() => {
  const { device } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const loadDevices = () => {
    setLoading(true);
    // Fetching up to 100 devices for the admin panel overview
    fetchDevices(null, null, 1, 100).then((data) => {
      device.setDevices(data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadDevices();
  }, [device]);

  const handleDelete = async (id) => {
    if (window.confirm("WARNING: Are you sure you want to PERMANENTLY delete this hardware node?")) {
      try {
        await deleteDevice(id);
        loadDevices();
      } catch (e) {
        alert(e.response?.data?.message || "Error deleting device");
      }
    }
  };

  const openUpdateModal = (id) => {
    setSelectedDeviceId(id);
    setUpdateModalVisible(true);
  };

  if (loading) {
    return (
        <div className="p-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-white animate-pulse" />
            <div className="text-[10px] uppercase text-white/50 tracking-widest">Running_Query...</div>
        </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="uppercase tracking-widest text-[10px] text-white/40 border-b border-white/20 bg-black sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">Node_ID</th>
              <th scope="col" className="px-6 py-3">Schematics</th>
              <th scope="col" className="px-6 py-3">Alias</th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">Brand_&_Type</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {device.devices.rows?.map((d) => (
              <tr key={d.id} className="border-b border-white/10 hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 font-bold text-white/60 text-[10px]">
                  {d.id.toString().padStart(4, "0")}
                </td>
                <td className="px-6 py-4">
                  <div className="h-10 w-10 border border-white/20 bg-black overflow-hidden relative">
                    <img
                        src={d.img ? (d.img.startsWith('http') ? d.img : process.env.REACT_APP_API_URL + d.img) : ''}
                        className="h-full w-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        alt={d.name}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-white font-bold uppercase tracking-widest text-xs">
                  {d.name}
                </td>
                <td className="px-6 py-4 text-[9px] text-white/50 uppercase hidden sm:table-cell">
                  <div><span className="text-white/30">B/</span> {device.brands.find(b => b.id === d.brandId)?.name || d.brandId}</div>
                  <div><span className="text-white/30">T/</span> {device.types.find(t => t.id === d.typeId)?.name || d.typeId}</div>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => openUpdateModal(d.id)}
                    className="inline-flex items-center gap-1 border border-white/30 px-3 py-1.5 text-[9px] uppercase hover:bg-white hover:text-black transition-all"
                  >
                    <PencilSquareIcon className="h-3 w-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="inline-flex items-center gap-1 border border-red-900/50 text-red-500 px-3 py-1.5 text-[9px] uppercase hover:bg-red-900 hover:text-white transition-all"
                  >
                    <TrashIcon className="h-3 w-3" /> Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {device.devices.rows?.length === 0 && (
          <div className="text-center py-10 text-[10px] text-white/30 uppercase tracking-widest border-b border-white/10">
            No_Hardware_Nodes_Found
          </div>
        )}
      </div>

      <UpdateDevice 
         show={updateModalVisible} 
         onHide={() => setUpdateModalVisible(false)} 
         deviceId={selectedDeviceId}
         onUpdated={loadDevices}
      />
    </div>
  );
});

export default DeviceListAdmin;
