// product-feed.js

// Function to fetch product feed from the API
async function fetchProductFeed() {
    const productFeedDiv = document.getElementById('product-feed');
    productFeedDiv.innerHTML = '<p>Loading product feed...</p>';

    // In a real scenario, you might want to allow users to input the tourNumber
    const tourNumber = 'ENJO01'; // Example tour number
    const tourTitle = 'jungfernfahrt-der-viva-enjoy'; // Example tour title

    try {
        // Construct the URL based on the format mentioned in the documentation
        const url = `https://api.example.com/product-feeds/${tourNumber}_${tourTitle}.json`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayProductFeed(data.tour);
    } catch (error) {
        console.error('Error fetching product feed:', error);
        productFeedDiv.innerHTML = '<p>Error fetching product feed. Please try again later.</p>';
    }
}

// Function to display product feed
function displayProductFeed(product) {
    const productFeedDiv = document.getElementById('product-feed');
    if (product) {
        let html = `
            <div class="product-item">
                <h2>${product.title}</h2>
                <p><strong>Tour Number:</strong> ${product.tourNumber}</p>
                <p><strong>Type:</strong> ${product.type}</p>
                <p><strong>Duration:</strong> ${product.daysCount} days</p>
                <p><strong>Countries:</strong> ${product.countries.map(country => country.name).join(', ')}</p>
                <p><strong>Categories:</strong> ${product.categories.join(', ')}</p>
                ${product.teaser ? `<div class="teaser">${product.teaser}</div>` : ''}
                <h3>Itinerary:</h3>
                <ul>
                    ${product.days.map(day => `<li>${day.title} - ${day.subtitle}</li>`).join('')}
                </ul>
                ${product.ship ? `
                    <h3>Ship Information:</h3>
                    <p><strong>Name:</strong> ${product.ship.title}</p>
                    <p><strong>Capacity:</strong> ${product.ship.capacity} passengers</p>
                    <p><strong>Crew:</strong> ${product.ship.crew} members</p>
                ` : ''}
            </div>
        `;
        productFeedDiv.innerHTML = html;
    } else {
        productFeedDiv.innerHTML = '<p>No product found.</p>';
    }
}

// Function to initialize product feed functionality
function initProductFeed() {
    const fetchProductsButton = document.getElementById('fetch-products');
    if (fetchProductsButton) {
        fetchProductsButton.addEventListener('click', fetchProductFeed);
    } else {
        console.error('Fetch products button not found');
    }
}

// Initialize product feed when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initProductFeed);