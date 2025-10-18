import { initializeTimes, timesReducer } from './Main';
import { fetchAPI } from '../utils/api';

// Mock the API module
jest.mock('../utils/api');

describe('Booking Functions', () => {
    const mockAvailableTimes = [
        '17:00',
        '18:00',
        '19:00',
        '20:00'
    ];

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
        // Set up the fetchAPI mock to return our test data
        fetchAPI.mockImplementation((date) => mockAvailableTimes);
    });

    describe('initializeTimes function', () => {
        test('should fetch and return available times for today', () => {
            // Arrange & Act
            const initialTimes = initializeTimes();

            // Assert
            expect(fetchAPI).toHaveBeenCalled();
            expect(initialTimes).toEqual(mockAvailableTimes);
            
            // Verify the date passed to fetchAPI is today's date
            const calledWithDate = fetchAPI.mock.calls[0][0];
            const today = new Date().toISOString().split('T')[0];
            expect(calledWithDate).toBe(today);
        });
    });

    describe('timesReducer function', () => {
        test('should fetch new times when receiving UPDATE_TIMES action', () => {
            // Arrange
            const initialState = mockAvailableTimes;
            const testDate = '2025-10-18';
            const action = { 
                type: 'UPDATE_TIMES', 
                payload: testDate
            };

            // Act
            const newState = timesReducer(initialState, action);

            // Assert
            expect(fetchAPI).toHaveBeenCalledWith(testDate);
            expect(newState).toEqual(mockAvailableTimes);
        });

        test('should return current state for unknown action', () => {
            // Arrange
            const initialState = mockAvailableTimes;
            const action = { 
                type: 'UNKNOWN_ACTION'
            };

            // Act
            const newState = timesReducer(initialState, action);

            // Assert
            expect(fetchAPI).not.toHaveBeenCalled();
            expect(newState).toEqual(initialState);
        });
    });
});