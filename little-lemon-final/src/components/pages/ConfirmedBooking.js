import React from 'react';
import './ConfirmedBooking.css';

function ConfirmedBooking() {
    return (
        <div className="confirmation">
            <div className="confirmation-box">
                <h1>Booking Confirmed!</h1>
                <div className="confirmation-icon">✓</div>
                <p>Thank you for choosing Little Lemon!</p>
                <p>Your table has been successfully reserved.</p>
                <p>You will receive a confirmation email with your booking details shortly.</p>
            </div>
        </div>
    );
}

export default ConfirmedBooking;