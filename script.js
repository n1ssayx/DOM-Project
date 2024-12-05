// Select all necessary elements
const totalPriceElement = document.querySelector('.total');
const productCards = document.querySelectorAll('.card-body');

// Function to update the total price
function updateTotalPrice() {
    let totalPrice = 0;
    productCards.forEach((card) => {
        const quantity = parseInt(card.querySelector('.quantity').textContent, 10) || 0;
        const unitPrice = parseInt(card.querySelector('.unit-price').textContent.replace('$', ''), 10) || 0;
        totalPrice += quantity * unitPrice;
    });
    totalPriceElement.textContent = `${totalPrice}$`;
}

// Add event listeners to all product cards
productCards.forEach((card) => {
    const plusButton = card.querySelector('.fa-plus-circle');
    const minusButton = card.querySelector('.fa-minus-circle');
    const trashButton = card.querySelector('.fa-trash-alt');
    const heartButton = card.querySelector('.fa-heart');
    const quantityElement = card.querySelector('.quantity');

    if (plusButton.dataset.initialized) return;
    plusButton.dataset.initialized = 'true';

    plusButton.addEventListener('click', () => {
        console.log('Plus button clicked');
        let quantity = parseInt(card.querySelector('.quantity').textContent, 10) || 0;
        quantity++;
        card.querySelector('.quantity').textContent = quantity;
        updateTotalPrice();
    });

    minusButton.addEventListener('click', () => {
        console.log('Minus button clicked');
        let quantity = parseInt(card.querySelector('.quantity').textContent, 10) || 0;
        if (quantity > 0) {
            quantity--;
            card.querySelector('.quantity').textContent = quantity;
            updateTotalPrice();
        }
    });

    // Delete item
    trashButton.addEventListener('click', () => {
        card.remove(); // Remove the entire product card
        updateTotalPrice();
    });

    // Like/Unlike item
    heartButton.addEventListener('click', () => {
        const currentColor = getComputedStyle(heartButton).getPropertyValue('color');
        console.log('Current computed color:', currentColor);

        if (currentColor === 'rgb(0, 0, 0)') { // Black in RGB
            heartButton.style.setProperty('color', 'red'); // Set to red
        } else {
            heartButton.style.setProperty('color', 'black'); // Set to black
        }

        console.log('New inline color:', heartButton.style.getPropertyValue('color'));
    });
    
    
    
    
});


// Initial total price calculation
updateTotalPrice();
