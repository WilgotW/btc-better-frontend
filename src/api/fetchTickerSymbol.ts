import React from 'react'

export default async function fetchTickerSymbol() {
    const key = "cjs2vcpr01qionifch3gcjs2vcpr01qionifch40";
    const query = "gold";

    try {
        const response = await fetch(`https://finnhub.io/api/v1/search?q=${query}&token=${key}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
        // Handle errors here
    }
}