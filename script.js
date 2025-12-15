// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const clickClear = document.getElementById("clear-cart-btn");
const cartDiv = document.getElementById("cart-list");

let cart= JSON.parse(sessionStorage.getItem("cart")) || [];


function saveCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
	
    products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} `;
		
	let button = document.createElement("button");
	button.innerText = "Add To Cart";
	button.addEventListener("click" , ()=>{addToCart(product.id)});
		
	li.appendChild(button);
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
	cartDiv.innerHTML="";

	if(cart.length === 0) return;


	for(let i=0; i<cart.length; i++){
		let item=cart[i];

		let cartList = document.createElement("li");
		cartList.textContent=`${item.name} - $${item.price} `;

		cartDiv.appendChild(cartList);
	}


	saveCart();
}

// Add item to cart

function addToCart(productId) {
	let product=products.find(p => (p.id === productId));

	if(product){
		cart.push(product);
		saveCart();
		renderCart();
	}
}

// Remove item from cart
function removeFromCart(productId) {
	const index = cart.findIndex(item => item.id === productId);
	if(index !== -1){
	cart.splice(index,1);
	renderCart();
	}
}

// Clear cart
function clearCart() {
	cart=[];
	renderCart();
}

// Initial render
renderProducts();
renderCart();
clickClear.addEventListener("click" ,clearCart);
