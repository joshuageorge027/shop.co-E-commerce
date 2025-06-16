function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartSection = document.getElementById("cart-section");
  const orderSummary = document.getElementById("order-summary");
  


  cartSection.innerHTML = "";

  if (cart.length === 0) {
    // cart image
    const cartImg = document.createElement("img");
    cartImg.src = "./image/shop-cart.png";
    cartImg.alt = "Empty Cart";
    cartImg.style.display = "block";
    cartImg.style.margin = "0 auto";
    cartImg.style.width = "35px";
    cartImg.style.marginTop = "40px";

    // Empty message
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Your cart is empty!";
    emptyMessage.style.textAlign = "center";
    emptyMessage.style.fontSize = "23px";
    emptyMessage.style.color = "grey";
    emptyMessage.style.fontWeight = "500";
    emptyMessage.style.marginTop = "4px";
  

    // Start Shopping button
    const startBtn = document.createElement("button");
    startBtn.textContent = "Start Shopping";
    startBtn.style.display = "block";
    startBtn.style.margin = "10px auto";
    startBtn.style.padding = "1rem 3rem";
    startBtn.style.backgroundColor = "black";
    startBtn.style.color = "white";
    startBtn.style.border = "none";
    startBtn.style.borderRadius = "25px";
    startBtn.style.cursor = "pointer";
    startBtn.style.fontSize = "16px";
    startBtn.onclick = function () {
      window.location.href = "shop.html";
    };

    if (orderSummary) {
      orderSummary.style.display = "none";
    }

    cartSection.appendChild(cartImg);
    cartSection.appendChild(emptyMessage);
    cartSection.appendChild(startBtn);
    return;
  }

  cart.forEach((item, index) => {
    const container = document.createElement("div");
    container.className = "cart-item";
    container.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="135" style="border-radius: 8px;">
      <div>
        <h3>${item.name}</h3>
        <p>Size: ${item.size}</p>
        <p>Color: ${item.color}</p>
         <div class="price-qty-row">
        <h4 class="main-price">$${item.price}</h4>
        <div class="quantity-controls">
          <button onclick="changeQuantity(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </div>
      </div>
    </div>
  </div>
      <img 
  src="./image/delete.png" 
  alt="Delete" 
  class="delete" 
  data-index="${index}" 
  style="width: 22px; cursor: pointer;" 
/>

    `;

    cartSection.appendChild(container);
  });
  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
  });

  // Calculate order summary values
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  // Update the DOM
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("discount").textContent = `-$${discount.toFixed(2)}`;
  document.getElementById("delivery-fee").textContent = `$${deliveryFee}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;

  if (cart.length > 0 && orderSummary) {
  orderSummary.style.display = "block";
  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("discount").textContent = `-$${discount.toFixed(2)}`;
  document.getElementById("delivery-fee").textContent = `$${deliveryFee}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}


  // Quantity - event listeners
  document.querySelectorAll(".increase").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      changeQuantity(index, 1);
    });
  });

  document.querySelectorAll(".decrease").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      changeQuantity(index, -1);
    });
  });

  // Delete - event listeners
  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      removeItem(index);
    });
  });
}

function changeQuantity(index, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index]) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

if (cart.length > 0) {
  let subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  let discount = subtotal * 0.2;
  let delivery = 15;
  let total = subtotal - discount + delivery;

  const summary = document.createElement("div");
  summary.className = "order-summary";
  summary.innerHTML = `
    <h3>Order Summary</h3>
    <p>Subtotal: <span>$${subtotal.toFixed(2)}</span></p>
    <p>Discount (-20%): <span style="color:red;">-$${discount.toFixed(
      2
    )}</span></p>
    <p>Delivery Fee: <span>$${delivery}</span></p>
    <hr>
    <p style="font-size: 18px;"><strong>Total: </strong><span><strong>$${total.toFixed(
      2
    )}</strong></span></p>
    <button style="margin-top:10px; padding: 10px 20px; background: black; color: white; border: none; border-radius: 6px; cursor: pointer;">
      Go to Checkout →
    </button>
  `;
  cartSection.appendChild(summary);
}
