import React, { useContext, useEffect } from "react";
import TypeBar from "../components/TypeBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchBrands, fetchTypes, fetchDevices } from "../http/deviceApi";

const Shop = observer(() => {
  const {device} = useContext(Context)

  useEffect(() =>{
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices().then(data => device.setDevices(data.rows))
  }, [])

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <TypeBar/>
            <DeviceList />
        </div>
    )
  })

  export default Shop;
  