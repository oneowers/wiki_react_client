import React, { useContext, useEffect } from "react";
import TypeBar from "../components/TypeBar";
import DeviceList from "../components/DeviceList";
import PreviewDeviceList from "../components/PreviewDeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchBrands, fetchTypes, fetchDevices } from "../http/deviceApi";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const {device} = useContext(Context)

  useEffect(() =>{
    fetchBrands().then(data => device.setBrands(data))
  }, [])

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedType.id, device.selectedBrand.id, ])

    return (
      <div className="flex flex-row">
        <div class="basis-1/6 hidden lg:block">
          <TypeBar/>
        </div>
        <div class="basis-6/6 lg:basis-3/6">
          <div className="mt-6 h-full">
            <PreviewDeviceList />
          </div>
        </div>
        <div class="basis-2/6 hidden lg:block">
          <div className=" m-5 rounded-lg  mt-6 h-full">
            <DeviceList />
          </div>
        </div>
      </ div>
    )
  })

  export default Shop;
  