function togglePricing() {
    const toggle = document.getElementById('toggle');
    const priceValues = document.querySelectorAll('.price-value');
    
    priceValues.forEach(price => {
        const monthly = price.getAttribute('data-monthly');
        const annual = price.getAttribute('data-annual');
        price.textContent = toggle.checked ? `$${monthly}` : `$${annual}`;
    });
}
