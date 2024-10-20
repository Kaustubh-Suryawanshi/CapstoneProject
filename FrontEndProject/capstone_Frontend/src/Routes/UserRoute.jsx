import React from "react"
import { Routes, Route } from 'react-router-dom'
import LoginPage from "../Components/LoginPage"
import SignupPage from "../Components/SignupPage"
import TrainList from "../Components/TrainList"
import { TrainProvider } from "../Context/TrainContext"
import PassengerDetails from "../Components/PassengerDetails"
import { BookingDetailsProvider } from "../Context/BookingDetailsContext"
import BookingDetails from "../Components/BookingDetails"
import Profile from "../Components/Profile"
import Homepage from "../Components/Homepage"
import SearchTrainsComponent from "../Components/SearchTrainsComponent"

const UserRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/profile" element={<Profile/>}/>
            </Routes>

            <TrainProvider>
                <Routes>
                    <Route path="/trains" element={<TrainList />} />
                    <Route path="/search" element={<SearchTrainsComponent/>}/>
                    <Route path="/user/addBooking/:tid" element={<PassengerDetails/>}/>
                </Routes>
            </TrainProvider>
            <BookingDetailsProvider>
                <Routes>
                    <Route path="/user/getbookings" element={<BookingDetails/>}/>
                </Routes>
            </BookingDetailsProvider>
        </>

    )
}
export default UserRoute