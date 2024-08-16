const categories = {
    1: [
        { name: 'Spicy seasoned seafood noodles', price: 2.29, image: 'images/image_1.png' },
        { name: 'Salted Pasta with mushroom sauce', price: 2.69, image: 'images/image_2.png' },
        { name: 'Beef dumpling in hot and sour soup', price: 2.99, image: 'images/image_3.png' },
        { name: 'Healthy noodle with spinach leaf', price: 3.99, image: 'images/image_4.png' },
        { name: 'Hot spicy fried rice with omelet', price: 3.49, image: 'images/image_5.png' },
        { name: 'Spicy instant noodle with special omelette', price: 3.58, image: 'images/image_6.png' },
        { name: 'Grilled chicken with vegetables', price: 4.29, image: 'images/image_7.png' },
        { name: 'Roasted salmon with asparagus', price: 5.29, image: 'images/image_8.png' },
        { name: 'Chicken Caesar Salad', price: 2.29, image: 'images/image_8.png' },
        { name: 'Quinoa and black bean salad', price: 2.69, image: 'images/image_7.png' },
        { name: 'Steak and avocado salad', price: 2.99, image: 'images/image_6.png' },
        { name: 'Taco salad with beef', price: 3.99, image: 'images/image_5.png' },
        { name: 'Pasta salad with Italian dressing', price: 3.49, image: 'images/image_4.png' },
        { name: 'Caprese salad', price: 3.58, image: 'images/image_3.png' },
        { name: 'Cobb salad', price: 4.29, image: 'images/image_2.png' },
        { name: 'Greek salad', price: 5.29, image: 'images/image_1.png' }
    ],
    2: [
        { name: 'Chicken Caesar Salad', price: 2.29, image: 'images/image_8.png' },
        { name: 'Quinoa and black bean salad', price: 2.69, image: 'images/image_7.png' },
        { name: 'Steak and avocado salad', price: 2.99, image: 'images/image_6.png' },
        { name: 'Taco salad with beef', price: 3.99, image: 'images/image_5.png' },
        { name: 'Pasta salad with Italian dressing', price: 3.49, image: 'images/image_4.png' },
        { name: 'Caprese salad', price: 3.58, image: 'images/image_3.png' },
        { name: 'Cobb salad', price: 4.29, image: 'images/image_2.png' },
        { name: 'Greek salad', price: 5.29, image: 'images/image_1.png' }
    ],
    3: [
        { name: 'Margherita Pizza', price: 2.29, image: 'images/image_7.png' },
        { name: 'Pepperoni Pizza', price: 2.69, image: 'images/image_8.png' },
        { name: 'BBQ Chicken Pizza', price: 2.99, image: 'images/image_1.png' },
        { name: 'Hawaiian Pizza', price: 3.99, image: 'images/image_2.png' },
        { name: 'Meat Lover\'s Pizza', price: 3.49, image: 'images/image_1.png' },
        { name: 'Veggie Pizza', price: 3.58, image: 'images/image_3.png' },
        { name: 'Buffalo Chicken Pizza', price: 4.29, image: 'images/image_4.png' },
        { name: 'Four Cheese Pizza', price: 5.29, image: 'images/image_5.png' }
    ],
    4: [
        { name: 'Classic Cheeseburger', price: 2.29, image: 'images/image_5.png' },
        { name: 'Bacon Cheeseburger', price: 2.69, image: 'images/image_6.png' },
        { name: 'Veggie Burger', price: 2.99, image: 'images/image_7.png' },
        { name: 'BBQ Bacon Burger', price: 3.99, image: 'images/image_8.png' },
        { name: 'Mushroom Swiss Burger', price: 3.49, image: 'images/image_9.png' },
        { name: 'Avocado Burger', price: 3.58, image: 'images/image_3.png' },
        { name: 'Chicken Burger', price: 4.29, image: 'images/image_2.png' },
        { name: 'Fish Burger', price: 5.29, image: 'images/image_4.png' }
    ]
};

let currentCategory = 1;
let orderList = [];

function selectCategory(categoryNumber) {
    currentCategory = categoryNumber;
    updateMenu();
    updateCategoryHighlight();
}

function updateMenu() {
    const dishesContainer = document.querySelector('.dishes');
    dishesContainer.innerHTML = '';
    const dishes = categories[currentCategory];
    dishes.forEach(dish => {
        const dishElement = document.createElement('div');
        dishElement.className = 'dish';
        dishElement.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}" class="dish-img">
            <h3>${dish.name}</h3>
            <p>₱${dish.price.toFixed(2)}</p>
            <button onclick="addToOrder('${dish.name}', ${dish.price}, '${dish.image}')">Add to Order</button>
        `;
        dishesContainer.appendChild(dishElement);
    });
}

function updateCategoryHighlight() {
    document.querySelectorAll('.category-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index + 1 === currentCategory);
    });
}

function addToOrder(name, price, image) {
    const existingItem = orderList.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        orderList.push({ name, price, quantity: 1, image });
    }
    updateOrderList();
}

function updateOrderList() {
    const orderListContainer = document.getElementById('order-list');
    orderListContainer.innerHTML = '';
    let subtotal = 0;
    orderList.forEach(item => {
        const itemTotal = item.quantity * item.price;
        subtotal += itemTotal;
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-img-container">
                <img src="${item.image}" alt="${item.name}" class="order-img">
            </div>
            <div class="order-details">
                <p>${item.name}</p>
                <p>Qty: ${item.quantity}</p>
                <p>₱${itemTotal.toFixed(2)}</p>
            </div>
            <button class="remove-btn" onclick="removeFromOrder('${item.name}')">Remove</button>
        `;
        orderListContainer.appendChild(orderItem);
    });
    document.getElementById('subtotal').textContent = `₱${subtotal.toFixed(2)}`;
}

function removeFromOrder(name) {
    orderList = orderList.filter(item => item.name !== name);
    updateOrderList();
}

function sendOrder() {
    console.log("Order sent:", orderList);
    // Implement order sending logic here, e.g., AJAX request to the server
}

document.addEventListener('DOMContentLoaded', () => {
    updateMenu();
    updateCategoryHighlight();
});
