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

// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2) {
  var s1 = document.getElementById(slct1);
  var s2 = document.getElementById(slct2);
  let displayProductHeader = document.getElementById("displayProductHeader");
  let categoryName;
  for (let i = 0; i < s1.children.length; i++) {
    const option = s1.children[i];

    if (option.value == s1.value) {
      categoryName = option.innerText.toLowerCase();
    }
  }
  displayProductHeader.innerText = `Choose items to buy from the ${categoryName} category:`;

  // s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
  s2.innerHTML = "";

  // obtain a reduced list of products based on restrictions
  var optionArray = restrictListProducts(products, s1.value);

  //sort the array from least the greatest based on the second element (price)
  optionArray.sort(function (a, b) {
    return a[1] - b[1];
  });

  // for each item in the array, create a checkbox element, each containing information such as:
  // <input type="checkbox" name="product" value="Bread">
  // <label for="Bread">Bread/label><br>

  for (i = 0; i < optionArray.length; i++) {
    let productNode = document.createElement("div");

    var productName = optionArray[i][0];
    var productPrice = optionArray[i][1];

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
    s2.appendChild(productNode);
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
    para.innerHTML = "You selected : ";
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

    for ({ productName, quantity } of shoppingCart) {
      para.appendChild(document.createTextNode(`${quantity} x ${productName}`));
      para.appendChild(document.createElement("br"));
    }

    // add paragraph and total price
    c.appendChild(para);
    c.appendChild(
      document.createTextNode("Total Price is $" + getTotalPrice(shoppingCart).toFixed(2))
    );
  }

  setTimeout(() => {
    let message = "";

    if (error) {
      message =
        "Error: Cannot add negative quantity.\n\nNo products where added to the cart.";
    } else if (added) {
      message = "Products added to the cart.";
    } else {
      message = "No products selected.";
    }

    window.alert(message);
  }, 0);
}

document.querySelector(".tablinks").click();
populateListProductChoices("dietSelect", "displayProduct");

//<!-- Signature: Quoc Dat Phung, Ayman Naciri, Aleander Azizi-Martin -->
