import React from "react"
import { Routes, Route } from 'react-router-dom'
import {TrainProvider} from '../Context/TrainContext'
import AddTrainForm from "../Components/AddTrainForm"
import UpdateTrainForm from "../Components/UpdateTrainForm"
import GetTrains from "../Components/getTrains"

const AdminRoute = () => {
    return (
        <>

            <TrainProvider>
                <Routes>
                    <Route path="/admin/getTrains" element={<GetTrains />} />
                    <Route path="/admin/addtrain" element={<AddTrainForm />} />
                    <Route path="/admin/updatetrain/:tid" element={<UpdateTrainForm />} />
                </Routes>
            </TrainProvider>
        </>

    )
}
export default AdminRoute