function placeOrder(){

  document.body.innerHTML = `

    <div class="success-box">

      <div class="tick">✓</div>

      <h1>Order Placed!</h1>

     <p>
  Thank you for choosing SD Interiors.
  Your order has been placed successfully.
  We will deliver it to your doorstep as soon as possible.
</p>

    </div>

  `;

  localStorage.removeItem(
    "cart"
  );

  setTimeout(()=>{

    window.location.href =
    "index.html";

  },2500);

}
const buyProduct = JSON.parse(localStorage.getItem("buyNowProduct"));

if(buyProduct){

  const box = document.querySelector(".checkout-box");

  box.innerHTML = `
    <h1>Checkout</h1>

    <p><b>Product:</b> ${buyProduct.name}</p>
    <p><b>Price:</b> ₹${buyProduct.price}</p>
    <p><b>Qty:</b> ${buyProduct.qty}</p>
    <p><b>Total:</b> ₹${buyProduct.price * buyProduct.qty}</p>

    <input type="text" placeholder="Full Name">
    <input type="text" placeholder="Address">
    <select>
      <option>Cash on Delivery</option>
      <option>UPI</option>
      <option>Card</option>
    </select>

    <button onclick="placeOrder()">Place Order</button>
  `;
}