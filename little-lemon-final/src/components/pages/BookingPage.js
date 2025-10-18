import React from 'react';
import BookingForm from '../BookingForm';
import '../BookingPage.css';

function BookingPage({ availableTimes, updateTimes, submitForm }) {
    return (
        <div className="booking-page">
            <div className="booking-hero">
                <h1>Reserve a Table</h1>
                <p>Experience the perfect blend of traditional recipes with a modern twist at Little Lemon. 
                   Book your table now and prepare for an unforgettable dining experience.</p>
            </div>
            <div className="booking-container">
                <BookingForm 
                    availableTimes={availableTimes}
                    updateTimes={updateTimes}
                    submitForm={submitForm}></BookingForm>
                <div className="booking-info">
                    <h2>Reservation Guidelines</h2>
                    <ul>
                        <li>Reservations are available up to 30 days in advance</li>
                        <li>For parties larger than 10, please call us directly</li>
                        <li>A credit card is not required to hold your reservation</li>
                        <li>Special requests can be noted in the occasion field</li>
                        <li>We have a 15-minute grace period for reservations</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BookingPage;