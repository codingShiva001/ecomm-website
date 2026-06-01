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

// Testimonial scroll animation
const testimonials = document.querySelectorAll(".testimonial-card");

const showTestimonials = () => {
  const triggerBottom = window.innerHeight - 100;
  testimonials.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerBottom) {
      card.classList.add("show");
    }
  });
}

window.addEventListener("scroll", showTestimonials);
window.addEventListener("load", showTestimonials);

// Smooth scroll for nav links
document.querySelectorAll('nav ul li a, header a.btn-primary').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const products = [
  {
    id: 1,
    name: "Benches",
    price: 9999,
    image: "images/benches.jpg"
  },
  {
    id: 2,
    name: "Chairs",
    price: 12999,
    image: "images/chair.jpg"
  },
  {
    id: 3,
    name: "Sofas",
    price: 24999,
    image: "images/sofas.jpg"
  },
  {
    id: 4,
    name: "Tables",
    price: 14999,
    image: "images/tables.jpg"
  },
  {
    id: 5,
    name: "Desks",
    price: 18999,
    image: "images/desks.jpg"
  },
  {
    id: 6,
    name: "Stools",
    price: 6999,
    image: "images/stools.jpg"
  },
  {
    id: 7,
    name: "Armchairs",
    price: 15999,
    image: "images/arms chair.jpg"
  },
  {
    id: 8,
    name: "Shelves",
    price: 11999,
    image: "images/shelves.jpg"
  }
];

const productGrid = document.getElementById("productGrid");

function displayProducts(list = products) {

  productGrid.innerHTML = "";

  productGrid.className = "product-grid";

  if (list.length === 1) {
    productGrid.className = "product-grid single-product";
  }

  else if (list.length > 1 && list.length < products.length) {
    productGrid.className = "product-grid multi-products";
  }

  list.forEach(product => {
    productGrid.innerHTML += `
      <div class="product-card" onclick="openProductDetails(${product.id})">
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>₹${product.price}</p>
      <button class="btn-primary"
onclick="
event.stopPropagation();
addToCart(${product.id});
">
Add To Cart
</button>
          
      </div>
    `;
  });

}
displayProducts();
renderCart();
updateCartCount();

function addToCart(id){

  let cart =
  JSON.parse(
    localStorage.getItem("cart")
  ) || [];

  const product =
  products.find(
    item => item.id === id
  );

  const existingProduct =
  cart.find(
    item => item.id === id
  );

  if(existingProduct){

    existingProduct.qty++;

  }else{

    cart.push({
      ...product,
      qty:1
    });

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();

  renderCart();
}


function renderCart(){

  let cart =
  JSON.parse(
    localStorage.getItem("cart")
  ) || [];

  cartBox.innerHTML = "";

  if(cart.length === 0){

    cartBox.innerHTML =
    "<p>Cart is empty</p>";

    return;
  }

  let total = 0;

  cart.forEach(item => {

    total += item.price * item.qty;

    cartBox.innerHTML += `

      <div class="cart-item">

        <span>
          ${item.name}
          (x${item.qty})
          - ₹${item.price}
        </span>

        <button onclick=
        "removeFromCart(event,
        ${item.id})">

          ❌

        </button>

      </div>

    `;
  });

  cartBox.innerHTML += `

    <div class="cart-total">

      Total:
      ₹${total}

    </div>
    <button class="checkout-btn"
onclick="goToCheckout()">

Proceed To Checkout

</button>

  `;
}

function removeFromCart(
  event,
  id
){

  event.stopPropagation();

  let cart =
  JSON.parse(
    localStorage.getItem("cart")
  ) || [];

  cart =
  cart.filter(
    item => item.id !== id
  );

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  renderCart();

  updateCartCount();

  cartBox.classList.add(
    "show"
  );
}


// open / close cart
cartWrapper.addEventListener("click", (e) => {
  e.stopPropagation();
  cartBox.classList.toggle("show");
});


// outside click = close
document.addEventListener("click", (e) => {

  if (
    !cartWrapper.contains(e.target) &&
    !e.target.closest(".cart-item button")
  ) {
    cartBox.classList.remove("show");
  }

});

renderCart();

searchInput.addEventListener("input", () => {

  const searchValue =
    searchInput.value.toLowerCase().trim();

  clearSearch.style.display =
    searchValue ? "flex" : "none";


  // filter products
  const filteredProducts =
    products.filter(product =>
      product.name
        .toLowerCase()
        .includes(searchValue)
    );


  // display products
  displayProducts(
    searchValue === ""
      ? products
      : filteredProducts
  );


  // hide if empty
  if (searchValue === "") {
    suggestionsBox.style.display =
      "none";
    return;
  }


  // scroll first matched product
  const cards =
    document.querySelectorAll(
      ".product-card"
    );

  if (
    filteredProducts.length >= 1
  ) {

    const card = cards[0];
if (window.innerWidth > 768){
    setTimeout(() => {

      card.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      card.classList.add(
        "highlight"
      );

      setTimeout(() => {
        card.classList.remove(
          "highlight"
        );
      }, 1000);

    }, 150);
  }
  }


  // clear old suggestions
  suggestionsBox.innerHTML = "";


  // create suggestions
  filteredProducts.forEach(product => {

    const div =
      document.createElement("div");

    div.classList.add(
      "suggestion-item"
    );

    div.textContent =
      product.name;

    div.addEventListener(
      "click", () => {

        searchInput.value =
          product.name;

        displayProducts(
          [product]
        );

        suggestionsBox.style.display =
          "none";

        const card =
          document.querySelector(
            ".product-card"
          );

        setTimeout(() => {

          card.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

          card.classList.add(
            "highlight"
          );

          setTimeout(() => {
            card.classList.remove(
              "highlight"
            );
          }, 1000);

        }, 150);

      });

    suggestionsBox.appendChild(div);

  });


  suggestionsBox.style.display =
    filteredProducts.length
      ? "block"
      : "none";

});
clearSearch.addEventListener("click", () => {

  searchInput.value = "";

  displayProducts(products);

  suggestionsBox.innerHTML = "";
  suggestionsBox.style.display = "none";

  clearSearch.style.display = "none";

});
function openProductDetails(id){

  localStorage.setItem("selectedProductId", id);

  window.location.href = "product.html";

}
function updateCartCount(){

 let cart =
 JSON.parse(
   localStorage.getItem("cart")
 ) || [];

 const totalQty =
 cart.reduce(
   (total,item) =>
   total + item.qty,
   0
 );

 document.getElementById(
   "cartCount"
 ).textContent = totalQty;
}
function goToCheckout(){

  window.location.href =
  "checkout.html";

}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  successMsg.style.display = "block";

  // 🔥 IMPORTANT: scroll to message
  successMsg.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  setTimeout(() => {
    successMsg.style.display = "none";
  }, 3000);

  form.reset();
});
