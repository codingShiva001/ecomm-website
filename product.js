
const products = [
  {
    id: 1,
    name: "Benches",
    price: 9999,
    image: "images/benches.jpg",
    description:
      "Modern wooden bench with premium finish and durable quality.",
      rating: 4.8,
      oldPrice: 14999,
    inStock: true
    
    
  },

  {
    id: 2,
    name: "Chairs",
    price: 12999,
    image: "images/chair.jpg",
    description:
      "Elegant dining chair designed for comfort and modern interiors.",
      rating: 4,
      oldPrice: 16999,
    inStock: true
  },

  {
    id: 3,
    name: "Sofas",
    price: 24999,
    image: "images/sofas.jpg",
    description:
      "Luxury sofa set with soft cushions and stylish contemporary design.",
      rating: 5/5,
      oldPrice: 39999,
    inStock: false
  },

  {
    id: 4,
    name: "Tables",
    price: 14999,
    image: "images/tables.jpg",
    description:
      "Premium wooden table perfect for dining and workspace setups.",
      rating: 4.8,
      oldPrice: 19999,
    inStock: true
  },

  {
    id: 5,
    name: "Desks",
    price: 18999,
    image: "images/desks.jpg",
    description:
      "Minimal modern desk with spacious surface and sleek aesthetics.",
      rating: 4/5,
      oldPrice: 24999,
    inStock: true
  },

  {
    id: 6,
    name: "Stools",
    price: 6999,
    image: "images/stools.jpg",
    description:
      "Compact stylish stool crafted for comfort and everyday utility.",
      rating: 4.8,
      oldPrice: 7999,
    inStock: false
  },

  {
    id: 7,
    name: "Armchairs",
    price: 15999,
    image: "images/arms chair.jpg",
    description:
      "Comfortable armchair with soft fabric and premium wooden finish.",
      rating: 4.8,
      oldPrice: 19999,
    inStock: true
  },

  {
    id: 8,
    name: "Shelves",
    price: 11999,
    image: "images/shelves.jpg",
    description:
      "Modern storage shelves with elegant design and large capacity.",
      rating: 4.8,
      oldPrice: 19999,
    inStock: true
  }
];
const selectedId = localStorage.getItem("selectedProductId");

const product = products.find ( item => item.id == selectedId );
const productDetails = document.getElementById("productDetails");

productDetails.innerHTML = `
  
  <div class="details-container">

    <img src="${product.image}">

    <div class="details-info">

      <h1>${product.name}</h1>

      <h2>₹${product.price}</h2>

      <p>${product.description}</p>
      <p>
  <span class="old-price">
    ₹${product.oldPrice}
  </span>

  ₹${product.price}
</p>
     <p class="rating">⭐ ${product.rating}</p>

      <h3>
        ${product.inStock
          ? "In Stock"
          : "Out Of Stock"}
      </h3>
<div class="qty-box">

  <button onclick="changeQty(-1)">-</button>

  <span id="qty">1</span>

  <button onclick="changeQty(1)">+</button>

</div>
  <div class="button-group">
 <button class="buy-btn" onclick="buyNow()">
  Order Now
</button>
  <button class="cart-btn" onclick="addToCart()">Add To Cart</button>
  <button class="remove-btn" onclick="removeFromCart()">Remove</button>
</div>

    </div>

  </div>
`;
let qty = 1;

function changeQty(val){

  qty += val;

  if(qty < 1){
    qty = 1;
  }

  if(qty > 10){
    qty = 10;
  }

  document.getElementById("qty")
    .textContent = qty;
}
function addToCart(){

 let cart =
 JSON.parse(
   localStorage.getItem("cart")
 ) || [];

 const existingProduct =
 cart.find(
   item => item.id === product.id
 );

 if(existingProduct){

   existingProduct.qty += qty;

 } else {

   cart.push({
     ...product,
     qty
   });

 }

 localStorage.setItem(
   "cart",
   JSON.stringify(cart)
 );

 alert("Added to Cart");
}
function removeFromCart(){

 let cart =
 JSON.parse(
   localStorage.getItem("cart")
 ) || [];

 cart =
 cart.filter(
   item => item.id !== product.id
 );

 localStorage.setItem(
   "cart",
   JSON.stringify(cart)
 );

 alert("Removed");
}
function buyNow(){

  const buyProduct = {
    ...product,
    qty: qty
  };

  localStorage.setItem(
    "buyNowProduct",
    JSON.stringify(buyProduct)
  );

  window.location.href = "checkout.html";
}