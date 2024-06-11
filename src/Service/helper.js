// src/helpers/localStorageHelpers.js

// Function to get data from localStorage
export const getData = (key) => {
    let data = JSON.parse(localStorage.getItem(key));
    return data ? data : [];
};

// Function to set data to localStorage
export const setData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
