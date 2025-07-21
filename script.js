const products = [
  {
    id: 1,
    name: "T-Shirt",
    price: 499,
    img: "images/T-shirt.jpg"
  },
  {
    id: 2,
    name: "Sneakers",
    price: 1799,
    img: "images/SNEAKERS.jpg"
  },
  {
    id: 3,
    name: "Headphones",
    price: 899,
    img: "images/HEADPHONES.jpg"
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 1299,
    img: "images/WATCH.jpg"
  }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItems = document.getElementById("cart-items");
const searchInput = document.getElementById("search");

// Render products
function renderProducts(productArray) {
  productList.innerHTML = "";
  productArray.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  const item = cart.find(p => p.id === productId);
  if (item) {
    item.quantity += 1;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  cartItems.innerHTML = "";
  cart.forEach(item => {
    cartItems.innerHTML += `
      <div>
        ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}
      </div>
    `;
  });
}

function clearCart() {
  cart = [];
  updateCart();
}

// Toggle cart sidebar
document.getElementById("cart-icon").addEventListener("click", () => {
  cartSidebar.classList.toggle("active");
});

// Search
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  renderProducts(filtered);
});

renderProducts(products);
