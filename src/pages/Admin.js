import CreateBrand from '../modals/CreateBrand'
import CreateType from '../modals/CreateType'
import CreateDevice from '../modals/CreateDevice'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'

const Admin = observer(() => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <>
        <div>
            <button className="m-1 p-1 bg-gray-100 rounded-md" onClick={() => setTypeVisible(true)}>Add type</button>
            <button className="m-1 p-1 bg-gray-100 rounded-md" onClick={() => setBrandVisible(true)}>Add brand</button>
            <button className="m-1 p-1 bg-gray-100 rounded-md" onClick={() => setDeviceVisible(true)}>Add device</button>
            <CreateBrand show={brandVisible} onHide={ () => setBrandVisible(false)} />
            <CreateType show={typeVisible} onHide={ () => setTypeVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={ () => setDeviceVisible(false)} />
        </div>
        </>
    )
})

export default Admin;