// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

let shoppingCart = [];

function openInfo(evt, tabName) {
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function toUpperCase(s) {
  const words = s.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}
let searchFilter = (document.getElementById("search").value || "").trim();
function handleSearch() {
  let text = (document.getElementById("search").value || "").trim();
  searchFilter = text;

  populateListProductChoices("dietSelect", 'displayProduct');
}

// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2) {
  var s1 = document.getElementById(slct1);
  var s2 = document.getElementById(slct2);
  let displayProductHeader = document.getElementById("displayProductHeader");
  let categoryName;

  let optionArray;

  if (s1.value === "NoPreference") {
    categoryName = "all products";
    displayProductHeader.innerText = `Choose items to buy from ${categoryName}:`;
    // Display all products
    optionArray = products.map((product) => [product.name, product.price]);
  } else {
    for (let i = 0; i < s1.children.length; i++) {
      const option = s1.children[i];

      if (option.value == s1.value) {
        categoryName = option.innerText.toLowerCase();
      }
    }
    displayProductHeader.innerText = `Choose items to buy from the ${categoryName} category:`;

    // Obtain a reduced list of products based on restrictions
    optionArray = restrictListProducts(products, s1.value);
  }

  // Clear the previous content
  s2.innerHTML = "";

  // Sort the array from least to greatest based on the second element (price)
  optionArray = optionArray.sort(function (a, b) {
    return a[1] - b[1];
  }).filter(([name]) => {
    return !searchFilter || name.toLowerCase().match(searchFilter.toLowerCase())
  });

  // For each item in the array, create a checkbox element
  for (let i = 0; i < optionArray.length; i++) {
    let productNode = document.createElement("div");

    var productName = optionArray[i][0];
    var productPrice = optionArray[i][1];
    var productImage = products.find((p) => p.name === productName).image;

    // Display product image
    let img = document.createElement("img");
    img.src = productImage;
    img.alt = productName + " image";
    img.style.width = "200px"; // make sure these values are the same as displayProduct img in css
    img.style.height = "200px";

    productNode.appendChild(img);

    let a = document.createElement("div");
    a.innerHTML = `
      <img src="${productImage}" width="200px" height="200px" alt="${productName} image" >
      <div>
        <label for="basic-url" class="form-label h4">${toUpperCase(
          productName
        )} ($${productPrice})</label>
        <div class="input-group">
          <span class="input-group-text">Quantity</span>
          <input type="number" value="0" min="0" class="form-control" id="${productName}-quantity" width="100px" >
          <input type="hidden" value="${productName}" >
        </div>
      </div>
    `;
    a.className = "d-flex mb-5";

    let quantityLabel = document.createElement("label");
    quantityLabel.for = `${productName}-quantity`;
    quantityLabel.innerText = "Quantity: ";
    let quantity = document.createElement("input");
    quantity.id = `${productName}-quantity`;
    quantity.type = "number";
    quantity.min = 0;
    quantity.value = 0;
    quantity.style.width = "50px";
    quantity.style.marginRight = "10px";
    let hiddenProductName = document.createElement("input");
    hiddenProductName.type = "hidden";
    hiddenProductName.value = productName;

    productNode.appendChild(hiddenProductName);
    productNode.appendChild(quantityLabel);
    productNode.appendChild(quantity);

    // create a label for the checkbox, and also add in HTML DOM
    var label = document.createElement("span");
    label.appendChild(
      document.createTextNode(
        "Item: " + productName + " ($" + productPrice + ")"
      )
    );

    productNode.appendChild(label);

    // create a breakline node and add in HTML DOM
    s2.appendChild(a);
  }
}

// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph)
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems() {
  var ele = document.getElementById("displayProduct");
  var chosenProducts = [];

  let added = false;
  let error = false;

  // build list of selected item
  for (i = 0; i < ele.children.length; i++) {
    const child = ele.children[i];
    const productName = child.querySelector("[type='hidden']").value;
    const quantity = child.querySelector("[id$='quantity']");
    const parsedQuantity = Number.parseInt(quantity.value);

    if (parsedQuantity < 0) {
      error = true;
    } else if (parsedQuantity > 0) {
      chosenProducts.push({ productName, quantity: parsedQuantity });

      added = true;
    }

    quantity.value = 0;
  }

  if (!error) {
    var c = document.getElementById("displayCart");
    c.innerHTML = "";

    var para = document.createElement("P");
    para.innerHTML = "The contents of your cart : ";
    para.appendChild(document.createElement("br"));

    // Merges shopping cart with merged items
    for ({ productName, quantity } of chosenProducts) {
      const productInCart = shoppingCart.find(
        (p) => p.productName === productName
      );

      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        shoppingCart.push({ productName, quantity });
      }
    }

    let tbodyNode = document.createElement("tbody");

    let totalQuantity = 0;
    for ({ productName, quantity } of shoppingCart) {
      let product = products.find(({ name }) => name === productName);

      totalQuantity += quantity;
      let tableRowNode = document.createElement("tr");
      tableRowNode.innerHTML = `
        <th scope="row" width="200px"><img src="${product.image}" width="200px" height="200px" alt="${product.name} image" ></th>
        <td class="">
          <div class="h5">${toUpperCase(product.name)}</div>
          <div>Quantity: ${quantity}</div>
        </td>
        <td class="text-end" style="font-weight: bold">$${(product.price * quantity).toFixed(2)}</td>
      `;

      tbodyNode.appendChild(tableRowNode);

      para.appendChild(
        document.createTextNode(`➤ ${quantity} x ${productName}`)
      );
      para.appendChild(document.createElement("br"));
    }

    let tableNode = document.createElement("table");
    tableNode.innerHTML = `
      <table class="table">
        <thead>
          <tr>
            <th scope="col" colspan="2" class="h4">The contents of your cart</th>
            <th scope="col" class="text-end" style="font-weight: bold">Price</th>
          </tr>
        </thead>
        <tbody>
          ${tbodyNode.innerHTML}
        </tbody>
      </table>
    `;
    tableNode.className = "table w-100"

    let totalPriceNode = document.createElement("div");
    totalPriceNode.innerHTML = `Subtotal (${totalQuantity} items): <span style="font-weight: bold">$${getTotalPrice(
      shoppingCart
    ).toFixed(2)}</span>`;
    totalPriceNode.className = "text-end mb-4";

    // add paragraph and total price
    c.appendChild(tableNode);
    c.appendChild(totalPriceNode);
  }

  setTimeout(() => {
    let message = "";

    if (error) {
      message =
        "Error: Cannot add negative quantity.\n\nNo products where added to your cart.";
    } else if (added) {
      message = "Products added to your cart.";
    } else {
      message = "No products selected.";
    }

    window.alert(message);
  }, 0);
}

document.querySelector(".tablinks").click();
populateListProductChoices("dietSelect", "displayProduct");

//<!-- Signature: Quoc Dat Phung, Ayman Naciri, Alexander Azizi-Martin -->
