document.addEventListener("DOMContentLoaded", () => {
  const menu = [
    { name: "아이스 카페 아메리카노", price: 4100, image: "./img/americano.jpg" },
    { name: "아이스 카페라떼", price: 4600, image: "./img/latte.jpg" },
    { name: "아이스 카푸치노", price: 4500, image: "./img/cafuchino.jpg" },
    { name: "아이스 카라멜 마끼아또", price: 5500, image: "./img/caramel.jpg" },
    { name: "더블 칩 프라푸치노", price: 6200, image: "./img/더블 에스프레소 칩 프라푸치노.jpg" },
    { name: "에스프레소 프라푸치노", price: 6500, image: "./img/에스프레소 프라푸치노.jpg" },
    { name: "자바 칩 프라푸치노", price: 6600, image: "./img/자바 칩 프라푸치노.jpg" },
    { name: "카라멜 프라푸치노", price: 6700, image: "./img/카라멜 프라푸치노.jpg" },
  ];
  let order = {};
  let totalPrice = 0;
  const menuContainer = document.getElementById("menu");
  const orderList = document.getElementById("order-list");
  const totalPriceElement = document.getElementById("total-price");
  const submitOrderButton = document.getElementById("submit-order");
  const prdUl = document.getElementsByClassName("prd_list");
  menu.forEach(function (product, index) {
    if (index >= 0 && index <= 3) {
      prdUl[0].innerHTML += `
  <li id="parti_list">
      <div class="prd_img">
          <span>
              <img src="${product.image}" alt="${product.name}" />
              <div class="img_text">
                  <p>￦${product.price}</p>
              </div>
          </span>
      </div>
      <div class="prd_text">
          <p>${product.name}</p>
          <button class="order-add" data-index="${index}">주문 추가</button>
      </div>
  </li>`;
    } else if (index >= 4 && index <= 7) {
      prdUl[1].innerHTML += `
  <li id="parti_list">
      <div class="prd_img">
          <span>
              <img src="${product.image}" alt="${product.name}" />
              <div class="img_text">
                  <p>￦${product.price}</p>
              </div>
          </span>
      </div>
      <div class="prd_text">
          <p>${product.name}</p>
          <button class="order-add" data-index="${index}">주문 추가</button>
      </div>
  </li>`;
    }
  });
  menuContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      let addMenu = menu[event.target.getAttribute("data-index")];
      if (order[addMenu.name] === undefined) {
        order[addMenu.name] = {
          price: addMenu.price,
          quantity: 1,
        };
      } else {
        order[addMenu.name].quantity += 1;
      }
      totalPrice += addMenu.price;
    }
    console.log(order);
    updateOrderList();
  });
  // 주문 내역 업데이트 함수
  function updateOrderList() {
    orderList.innerHTML = "";
    for (let itemName in order) {
      const orderItem = order[itemName];
      const menuItem = menu.find((item) => item.name === itemName);
      const orderItemElement = document.createElement("li");
      orderItemElement.innerHTML = `
              <div class="item-order">
              <img class="item-img" src="${menuItem.image}" alt="${itemName}">
              <div class="item-info">
                  <div>${itemName}</div>
                  <div>￦${orderItem.price.toLocaleString()}</div>
                  <div class="item-quantity">
                      <button class="quantity-down" data-item="${itemName}">-</button>
                      ${orderItem.quantity}
                      <button class="quantity-up" data-item="${itemName}">+</button>
                  </div>
              </div>
          </div>
          `;
      orderList.appendChild(orderItemElement);
    }
    totalPriceElement.textContent = totalPrice.toLocaleString();
  }
  // 아이템 삭제 로직
  orderList.addEventListener("click", (event) => {
    const itemName = event.target.getAttribute("data-item");
    console.log(order);
    if (event.target.classList.contains("quantity-up")) {
      console.log("up");
      order[itemName].quantity += 1;
      totalPrice += order[itemName].price;
      updateOrderList();
    } else if (event.target.classList.contains("quantity-down")) {
      if (order[itemName].quantity === 1) {
        console.log("delete");
        totalPrice -= order[itemName].price;
        delete order[itemName];
      } else {
        console.log("down");
        order[itemName].quantity -= 1;
        totalPrice -= order[itemName].price;
      }
      updateOrderList();
    }
  });
  // 주문 제출 로직
  submitOrderButton.addEventListener("click", () => {
    if (Object.keys(order).length > 0) {
      alert("주문해 주셔서 감사합니다!");
      order = {};
      totalPrice = 0;
      updateOrderList();
    } else {
      alert("주문 내역이 비어 있습니다!");
    }
  });
});
