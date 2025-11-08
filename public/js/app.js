// Frontend JavaScript for Handloom Products Platform

// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
};

// DOM Elements
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginCloseBtn = document.querySelector('#loginModal .close');
const signupCloseBtn = document.querySelector('#signupModal .close');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const productsList = document.getElementById('productsList');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

// Modal Functions
function openLoginModal() {
  if(loginModal) loginModal.style.display = 'block';
}

function closeLoginModal() {
  if(loginModal) loginModal.style.display = 'none';
}

function openSignupModal() {
  if(signupModal) signupModal.style.display = 'block';
}

function closeSignupModal() {
  if(signupModal) signupModal.style.display = 'none';
}

// Event Listeners for Modal Buttons
if (loginBtn) loginBtn.addEventListener('click', openLoginModal);
if (signupBtn) signupBtn.addEventListener('click', openSignupModal);
if (loginCloseBtn) loginCloseBtn.addEventListener('click', closeLoginModal);
if (signupCloseBtn) signupCloseBtn.addEventListener('click', closeSignupModal);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === loginModal) closeLoginModal();
  if (event.target === signupModal) closeSignupModal();
});

// Login Form Submission
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Login successful!');
        closeLoginModal();
        location.reload();
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  });
}

// Signup Form Submission
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Signup successful!');
        closeSignupModal();
        location.reload();
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup');
    }
  });
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('You have been logged out');
    location.reload();
  });
}

// Load Products
async function loadProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Display Products
function displayProducts(products) {
  if (!productsList) return;
  
  productsList.innerHTML = '';
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">$${product.price}</p>
      <p class="category">${product.category}</p>
      <p class="description">${product.description}</p>
      <button class="add-to-cart-btn" data-product-id="${product._id}">Add to Cart</button>
    `;
    productsList.appendChild(productCard);
  });

  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => addToCart(e.target.dataset.productId));
  });
}

// Add to Cart
function addToCart(productId) {
  console.log('Added product to cart:', productId);
  alert('Product added to cart!');
}

// Search functionality
if (searchInput) {
  searchInput.addEventListener('input', () => {
    console.log('Searching for:', searchInput.value);
  });
}

// Filter functionality
if (categoryFilter) {
  categoryFilter.addEventListener('change', () => {
    console.log('Filtering by category:', categoryFilter.value);
  });
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadProducts);
} else {
  loadProducts();
}
