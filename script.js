// Hamburger menu toggle
const cartCount = document.getElementById("cartCount");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const cartBox = document.getElementById("cartBox");
const cartWrapper = document.querySelector(".cart-wrapper");
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("suggestionsBox");
const clearSearch = document.getElementById("clearSearch");
const form = document.querySelector(".contact-section form");
const successMsg = document.getElementById("successMsg");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Testimonials
const testimonials = document.querySelectorAll(".testimonial-card");

const showTestimonials = () => {
  const triggerBottom = window.innerHeight - 100;
  testimonials.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      card.classList.add("show");
    }
  });
};

window.addEventListener("scroll", showTestimonials);
window.addEventListener("load", showTestimonials);

// Smooth scroll nav
document.querySelectorAll('nav ul li a, header a.btn-primary').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// PRODUCTS
const products = [
  { id: 1, name: "Benches", price: 9999, image: "images/benches.jpg" },
  { id: 2, name: "Chairs", price: 12999, image: "images/chair.jpg" },
  { id: 3, name: "Sofas", price: 24999, image: "images/sofas.jpg" },
  { id: 4, name: "Tables", price: 14999, image: "images/tables.jpg" },
  { id: 5, name: "Desks", price: 18999, image: "images/desks.jpg" },
  { id: 6, name: "Stools", price: 6999, image: "images/stools.jpg" },
  { id: 7, name: "Armchairs", price: 15999, image: "images/arms chair.jpg" },
  { id: 8, name: "Shelves", price: 11999, image: "images/shelves.jpg" }
];

// SAFE SCROLL FUNCTION (iPhone FIX)
function scrollToCard(card) {
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const absoluteY = rect.top + window.pageYOffset;
  const offset = absoluteY - 120;

  window.scrollTo({
    top: offset,
    behavior: "smooth"
  });
}

// DISPLAY PRODUCTS
const productGrid = document.getElementById("productGrid");

function displayProducts(list = products) {
  productGrid.innerHTML = "";
  productGrid.className = "product-grid";

  if (list.length === 1) {
    productGrid.className = "product-grid single-product";
  } else if (list.length > 1 && list.length < products.length) {
    productGrid.className = "product-grid multi-products";
  }

  list.forEach(product => {
    productGrid.innerHTML += `
      <div class="product-card" onclick="openProductDetails(${product.id})">
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>₹${product.price}</p>
        <button class="btn-primary"
          onclick="event.stopPropagation(); addToCart(${product.id});">
          Add To Cart
        </button>
      </div>
    `;
  });
}

displayProducts();
renderCart();
updateCartCount();

// CART FUNCTIONS (unchanged)
function addToCart(id){ /* same as yours */ }
function renderCart(){ /* same as yours */ }
function removeFromCart(event,id){ /* same as yours */ }

cartWrapper.addEventListener("click", (e) => {
  e.stopPropagation();
  cartBox.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!cartWrapper.contains(e.target) &&
      !e.target.closest(".cart-item button")) {
    cartBox.classList.remove("show");
  }
});

// SEARCH LOGIC (FIXED)
searchInput.addEventListener("input", () => {

  const searchValue = searchInput.value.toLowerCase().trim();

  clearSearch.style.display = searchValue ? "flex" : "none";

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue)
  );

  displayProducts(searchValue === "" ? products : filteredProducts);

  if (searchValue === "") {
    suggestionsBox.style.display = "none";
    return;
  }

  // SCROLL FIRST CARD (FIXED)
  if (filteredProducts.length >= 1) {
    setTimeout(() => {
      const card = document.querySelector(".product-card");
      scrollToCard(card);

      if (card) {
        card.classList.add("highlight");
        setTimeout(() => card.classList.remove("highlight"), 1000);
      }
    }, 150);
  }

  // SUGGESTIONS
  suggestionsBox.innerHTML = "";

  filteredProducts.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.textContent = product.name;

    div.addEventListener("click", () => {
      searchInput.value = product.name;
      displayProducts([product]);
      suggestionsBox.style.display = "none";

      setTimeout(() => {
        const card = document.querySelector(".product-card");
        scrollToCard(card);

        if (card) {
          card.classList.add("highlight");
          setTimeout(() => card.classList.remove("highlight"), 1000);
        }
      }, 150);
    });

    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = filteredProducts.length ? "block" : "none";
});

// CLEAR SEARCH
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  displayProducts(products);
  suggestionsBox.innerHTML = "";
  suggestionsBox.style.display = "none";
  clearSearch.style.display = "none";
});

// OTHER FUNCTIONS
function openProductDetails(id){
  localStorage.setItem("selectedProductId", id);
  window.location.href = "product.html";
}

function updateCartCount(){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((t,i)=>t+i.qty,0);
  document.getElementById("cartCount").textContent = totalQty;
}

function goToCheckout(){
  window.location.href = "checkout.html";
}

// FORM
form.addEventListener("submit", (e) => {
  e.preventDefault();
  successMsg.style.display = "block";

  successMsg.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  setTimeout(() => successMsg.style.display = "none", 3000);
  form.reset();
});