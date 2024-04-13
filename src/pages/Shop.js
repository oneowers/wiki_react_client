import React, { useContext, useEffect } from "react";
import TypeBar from "../components/TypeBar";
import DeviceList from "../components/DeviceList";
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
      <>
        <TypeBar/>
        <DeviceList />
        <Pages/>
      </>
    )
  })

  export default Shop;
  