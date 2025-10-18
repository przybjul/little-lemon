import React, { useState } from 'react';
import './BookingForm.css';

function BookingForm({ availableTimes, updateTimes, submitForm }) {
    // State variables for form fields
    const [date, setDate] = useState('');
    const [time, setTime] = useState('17:00');
    const [guests, setGuests] = useState(1);
    const [occasion, setOccasion] = useState('Birthday');

    // State for form validation
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Validation rules
    const validateField = (name, value) => {
        switch (name) {
            case 'date':
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const selectedDate = new Date(value);
                if (!value) return 'Date is required';
                if (selectedDate < today) return 'Date cannot be in the past';
                return '';
            case 'time':
                if (!value) return 'Time is required';
                return '';
            case 'guests':
                if (!value) return 'Number of guests is required';
                if (value < 1) return 'Must have at least 1 guest';
                if (value > 10) return 'Maximum 10 guests allowed';
                return '';
            case 'occasion':
                if (!value) return 'Occasion is required';
                return '';
            default:
                return '';
        }
    };

    // Handle blur events for touched state
    const handleChange = (name, value) => {
        if (name === 'date') {
            setDate(value);
            updateTimes(value);
        } else if (name === 'time') {
            setTime(value);
        } else if (name === 'guests') {
            setGuests(value);
        } else if (name === 'occasion') {
            setOccasion(value);
        }
        // walidujemy tylko zmienione pole
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    // Handle blur events for touched state
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {
            date: validateField('date', date),
            time: validateField('time', time),
            guests: validateField('guests', guests),
            occasion: validateField('occasion', occasion)
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTouched({
            date: true,
            time: true,
            guests: true,
            occasion: true
        });

        if (validateForm()) {
            const formData = { date, time, guests, occasion };
            try {
                const success = await submitForm(formData);
                if (success) {
                    console.log('Booking submitted successfully');
                } else {
                    console.error('Failed to submit booking');
                }
            } catch (error) {
                console.error('Error submitting booking:', error);
            }
        }
    };

    return (
        <div className="booking-form">
            <form
                onSubmit={handleSubmit}
                noValidate
                aria-labelledby="booking-form-title"
                aria-describedby="booking-form-desc"
            >
                <h2 id="booking-form-title" className="form-title">Table Reservation</h2>
                <p id="booking-form-desc" className="form-description">
                    Please fill in the details below to make your reservation. All fields are required.
                </p>

                <div id="form-errors" className="sr-only" aria-live="polite">
                    {Object.values(errors).filter(error => error).join('. ')}
                </div>

                <fieldset>
                    <legend>Reservation Details</legend>

                    <div className="form-field" role="group" aria-labelledby="date-label">
                        <label id="date-label" htmlFor="res-date">Choose date</label>
                        <input
                            type="date"
                            id="res-date"
                            name="date"
                            value={date}
                            onChange={(e) => handleChange('date', e.target.value)}
                            onBlur={handleBlur}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className={touched.date && errors.date ? 'error' : ''}
                            aria-invalid={touched.date && errors.date ? 'true' : 'false'}
                            aria-describedby={touched.date && errors.date ? 'date-error' : undefined}
                            aria-required="true"
                        />
                        {touched.date && errors.date && (
                            <span id="date-error" className="error-message" role="alert">
                                {errors.date}
                            </span>
                        )}
                    </div>

                    <div className="form-field" role="group" aria-labelledby="time-label">
                        <label id="time-label" htmlFor="res-time">Choose time</label>
                        <select
                            id="res-time"
                            name="time"
                            value={time}
                            onChange={(e) => handleChange('time', e.target.value)}
                            onBlur={handleBlur}
                            required
                            className={touched.time && errors.time ? 'error' : ''}
                            aria-invalid={touched.time && errors.time ? 'true' : 'false'}
                            aria-describedby={touched.time && errors.time ? 'time-error' : undefined}
                            aria-required="true"
                        >
                            <option value="">Select a time</option>
                            {availableTimes.map(timeOption => (
                                <option key={timeOption} value={timeOption}>{timeOption}</option>
                            ))}
                        </select>
                        {touched.time && errors.time && (
                            <span id="time-error" className="error-message" role="alert">
                                {errors.time}
                            </span>
                        )}
                    </div>

                    <div className="form-field" role="group" aria-labelledby="guests-label">
                        <label id="guests-label" htmlFor="guests">Number of guests</label>
                        <input
                            type="number"
                            id="guests"
                            name="guests"
                            value={guests}
                            onChange={(e) => handleChange('guests', parseInt(e.target.value) || '')}
                            onBlur={handleBlur}
                            placeholder="1"
                            min="1"
                            max="10"
                            required
                            className={touched.guests && errors.guests ? 'error' : ''}
                            aria-invalid={touched.guests && errors.guests ? 'true' : 'false'}
                            aria-describedby={touched.guests && errors.guests ? 'guests-error' : 'guests-hint'}
                            aria-required="true"
                        />
                        <span id="guests-hint" className="input-hint">Enter a number between 1 and 10</span>
                        {touched.guests && errors.guests && (
                            <span id="guests-error" className="error-message" role="alert">
                                {errors.guests}
                            </span>
                        )}
                    </div>

                    <div className="form-field" role="group" aria-labelledby="occasion-label">
                        <label id="occasion-label" htmlFor="occasion">Occasion</label>
                        <select
                            id="occasion"
                            name="occasion"
                            value={occasion}
                            onChange={(e) => handleChange('occasion', e.target.value)}
                            onBlur={handleBlur}
                            required
                            className={touched.occasion && errors.occasion ? 'error' : ''}
                            aria-invalid={touched.occasion && errors.occasion ? 'true' : 'false'}
                            aria-describedby={touched.occasion && errors.occasion ? 'occasion-error' : undefined}
                            aria-required="true"
                        >
                            <option value="">Select an occasion</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                        </select>
                        {touched.occasion && errors.occasion && (
                            <span id="occasion-error" className="error-message" role="alert">
                                {errors.occasion}
                            </span>
                        )}
                    </div>
                </fieldset>

                <button
                    type="submit"
                    className="submit-button"
                    aria-label="Submit reservation request"
                >
                    Make Your reservation
                </button>
            </form>
        </div>
    );
}

export default BookingForm;