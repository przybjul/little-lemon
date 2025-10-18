import React, { useReducer } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import ConfirmedBooking from "./pages/ConfirmedBooking";
import { fetchAPI, submitAPI } from '../utils/api';

// Initialize times function
export const initializeTimes = () => {
    // Get today's date
    const today = new Date();
    // Format date as required by the API (YYYY-MM-DD)
    const dateString = today.toISOString().split('T')[0];
    // Fetch available times for today
    return fetchAPI(dateString);
};

// Reducer function for available times
export const timesReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            // Fetch available times for the selected date
            return fetchAPI(action.payload);
        default:
            return state;
    }
};

function Main() {
    const [availableTimes, dispatch] = useReducer(timesReducer, [], initializeTimes);
    const navigate = useNavigate();

    const updateTimes = (date) => {
        dispatch({ type: 'UPDATE_TIMES', payload: date });
    };

    const submitForm = async (formData) => {
        const success = await submitAPI(formData);
        if (success) {
            navigate('/booking-confirmed');
            return true;
        }
        return false;
    };

    return (
        <main>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/booking" element={
                    <BookingPage 
                        availableTimes={availableTimes}
                        updateTimes={updateTimes}
                        submitForm={submitForm}
                    />
                } />
                <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
                <Route path="/menu" element={<h1>Menu Page (Coming Soon)</h1>} />
                <Route path="/about" element={<h1>About Page (Coming Soon)</h1>} />
                <Route path="/contact" element={<h1>Contact Page (Coming Soon)</h1>} />
            </Routes>
        </main>
    );
}

export default Main;