const orders = [
    { customer: "Juan", food: "Burger", price: 120 },
    { customer: "Maria", food: "Pizza", price: 250 },
    { customer: "Pedro", food: "Fries", price: 80 },
    { customer: "Ana", food: "Burger", price: 120 }
];

// Get customers who ordered Burger
const burgerOrders = orders.filter(order => order.food === "Burger");

console.log("Customers who ordered Burger:");

burgerOrders.forEach(order => {
    console.log(order.customer);
});

// Get only the names of all customers
const customerNames = orders.map(order => order.customer);

console.log("\nAll Customers:");
console.log(customerNames);