// This is a wrapper for the API functions that are loaded from the external script

export function fetchAPI(date) {
    // If the global fetchAPI is not available, return some default times for testing
    if (typeof window.fetchAPI === 'undefined') {
        console.warn('fetchAPI not found, using mock data');
        return [
            '17:00',
            '18:00',
            '19:00',
            '20:00'
        ];
    }
    return window.fetchAPI(date);
}

export function submitAPI(formData) {
    // If the global submitAPI is not available, return true for testing
    if (typeof window.submitAPI === 'undefined') {
        console.warn('submitAPI not found, using mock response');
        return true;
    }
    return window.submitAPI(formData);
}