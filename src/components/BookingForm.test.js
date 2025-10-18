import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from './BookingForm';
import '@testing-library/jest-dom';

describe('BookingForm', () => {
    const mockProps = {
        availableTimes: ['17:00', '18:00', '19:00'],
        updateTimes: jest.fn(),
        submitForm: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('HTML5 Validation Attributes', () => {
        test('date input has required attributes', () => {
            render(<BookingForm {...mockProps} />);
            const dateInput = screen.getByLabelText(/choose date/i);
            
            expect(dateInput).toHaveAttribute('required');
            expect(dateInput).toHaveAttribute('type', 'date');
            expect(dateInput).toHaveAttribute('min', new Date().toISOString().split('T')[0]);
        });

        test('time select has required attributes', () => {
            render(<BookingForm {...mockProps} />);
            const timeSelect = screen.getByLabelText(/choose time/i);
            
            expect(timeSelect).toHaveAttribute('required');
            expect(timeSelect.tagName).toBe('SELECT');
        });

        test('guests input has required attributes', () => {
            render(<BookingForm {...mockProps} />);
            const guestsInput = screen.getByLabelText(/number of guests/i);
            
            expect(guestsInput).toHaveAttribute('required');
            expect(guestsInput).toHaveAttribute('type', 'number');
            expect(guestsInput).toHaveAttribute('min', '1');
            expect(guestsInput).toHaveAttribute('max', '10');
        });

        test('occasion select has required attributes', () => {
            render(<BookingForm {...mockProps} />);
            const occasionSelect = screen.getByLabelText(/occasion/i);
            
            expect(occasionSelect).toHaveAttribute('required');
            expect(occasionSelect.tagName).toBe('SELECT');
        });
    });

    describe('JavaScript Validation Functions', () => {
        describe('Date Validation', () => {
            test('rejects empty date', () => {
                render(<BookingForm {...mockProps} />);
                const dateInput = screen.getByLabelText(/choose date/i);
                
                fireEvent.blur(dateInput);
                expect(screen.getByText('Date is required')).toBeInTheDocument();
            });

            test('rejects past date', () => {
                render(<BookingForm {...mockProps} />);
                const dateInput = screen.getByLabelText(/choose date/i);
                const pastDate = new Date();
                pastDate.setDate(pastDate.getDate() - 1);
                
                fireEvent.change(dateInput, { target: { value: pastDate.toISOString().split('T')[0] } });
                fireEvent.blur(dateInput);
                expect(screen.getByText('Date cannot be in the past')).toBeInTheDocument();
            });

            test('accepts valid future date', () => {
                render(<BookingForm {...mockProps} />);
                const dateInput = screen.getByLabelText(/choose date/i);
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 1);
                
                fireEvent.change(dateInput, { target: { value: futureDate.toISOString().split('T')[0] } });
                fireEvent.blur(dateInput);
                expect(screen.queryByText('Date cannot be in the past')).not.toBeInTheDocument();
                expect(screen.queryByText('Date is required')).not.toBeInTheDocument();
            });
        });

        describe('Guests Validation', () => {
            test('rejects less than 1 guest', () => {
                render(<BookingForm {...mockProps} />);
                const guestsInput = screen.getByLabelText(/number of guests/i);
                
                fireEvent.change(guestsInput, { target: { value: '0' } });
                fireEvent.blur(guestsInput);
                expect(screen.getByText('Must have at least 1 guest')).toBeInTheDocument();
            });

            test('rejects more than 10 guests', () => {
                render(<BookingForm {...mockProps} />);
                const guestsInput = screen.getByLabelText(/number of guests/i);
                
                fireEvent.change(guestsInput, { target: { value: '11' } });
                fireEvent.blur(guestsInput);
                expect(screen.getByText('Maximum 10 guests allowed')).toBeInTheDocument();
            });

            test('accepts valid number of guests', () => {
                render(<BookingForm {...mockProps} />);
                const guestsInput = screen.getByLabelText(/number of guests/i);
                
                fireEvent.change(guestsInput, { target: { value: '4' } });
                fireEvent.blur(guestsInput);
                expect(screen.queryByText('Must have at least 1 guest')).not.toBeInTheDocument();
                expect(screen.queryByText('Maximum 10 guests allowed')).not.toBeInTheDocument();
            });
        });

        describe('Form Submission', () => {
            test('submit button is disabled when form is invalid', () => {
                render(<BookingForm {...mockProps} />);
                const submitButton = screen.getByText(/make your reservation/i);
                
                // Initially the form should be disabled as no fields are touched
                expect(submitButton).toBeDisabled();
            });

            test('submit button is enabled when form is valid', async () => {
                render(<BookingForm {...mockProps} />);
                const dateInput = screen.getByLabelText(/choose date/i);
                const timeSelect = screen.getByLabelText(/choose time/i);
                const guestsInput = screen.getByLabelText(/number of guests/i);
                const occasionSelect = screen.getByLabelText(/occasion/i);
                const submitButton = screen.getByText(/make your reservation/i);

                // Fill in valid data
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 1);
                
                fireEvent.change(dateInput, { target: { value: futureDate.toISOString().split('T')[0] } });
                fireEvent.blur(dateInput);
                
                fireEvent.change(timeSelect, { target: { value: '17:00' } });
                fireEvent.blur(timeSelect);
                
                fireEvent.change(guestsInput, { target: { value: '4' } });
                fireEvent.blur(guestsInput);
                
                fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });
                fireEvent.blur(occasionSelect);

                // Now the submit button should be enabled
                expect(submitButton).not.toBeDisabled();
            });

            test('calls submitForm with correct data when form is submitted', async () => {
                render(<BookingForm {...mockProps} />);
                const dateInput = screen.getByLabelText(/choose date/i);
                const timeSelect = screen.getByLabelText(/choose time/i);
                const guestsInput = screen.getByLabelText(/number of guests/i);
                const occasionSelect = screen.getByLabelText(/occasion/i);
                const submitButton = screen.getByText(/make your reservation/i);

                // Fill in valid data
                const futureDate = new Date();
                futureDate.setDate(futureDate.getDate() + 1);
                const testDate = futureDate.toISOString().split('T')[0];
                
                fireEvent.change(dateInput, { target: { value: testDate } });
                fireEvent.blur(dateInput);
                
                fireEvent.change(timeSelect, { target: { value: '17:00' } });
                fireEvent.blur(timeSelect);
                
                fireEvent.change(guestsInput, { target: { value: '4' } });
                fireEvent.blur(guestsInput);
                
                fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });
                fireEvent.blur(occasionSelect);

                // Submit the form
                fireEvent.click(submitButton);

                // Verify submitForm was called with correct data
                expect(mockProps.submitForm).toHaveBeenCalledWith({
                    date: testDate,
                    time: '17:00',
                    guests: 4,
                    occasion: 'Birthday'
                });
            });
        });
    });
});