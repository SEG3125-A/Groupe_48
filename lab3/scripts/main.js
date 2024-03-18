/*
const VEGAN = "vegan";
const NORMAL = "normal";
const GLUTEN_FREE = "gluten free";
const LACTOSE_FREE = "lactose free";
const DIABETIC  = "diabetic";
*/

// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products

// organic, vegan, glutenfree, lactosefree, diabetic
var products = [
  {
    name: "brocoli",
    organic: true,
    vegan: true,
    glutenFree: true,
    lactoseFree: true,
    diabetic: true,
    price: 1.99,
    image: "images/broccoli.jpg",
  },
  {
    name: "bread",
    organic: false,
    vegan: true,
    glutenFree: false,
    lactoseFree: false,
    diabetic: false,
    price: 2.35,
    image: "images/bread.jpg",
  },
  {
    name: "salmon",
    organic: true,
    vegan: false,
    glutenFree: true,
    lactoseFree: true,
    diabetic: true,
    price: 10.0,
    image: "images/salmon.jpg",
  },
  {
    name: "ice cream",
    organic: true,
    vegan: false,
    glutenFree: true,
    lactoseFree: true,
    diabetic: true,
    price: 3.5,
    image: "images/icecream.png",
  },
  {
    name: "salad",
    organic: true,
    vegan: true,
    glutenFree: true,
    lactoseFree: true,
    diabetic: true,
    price: 4.5,
    image: "images/salad.jpg",
  },
  {
    name: "cereal",
    organic: true,
    vegan: true,
    glutenFree: true,
    lactoseFree: true,
    diabetic: false,
    price: 5.5,
    image: "images/cereal.jpg",
  },
  {
    name: "blueberry",
    organic: true,
    vegan: true,
    glutenFree: true,
    lactoseFree: true,
    diabetic: false,
    price: 6.7,
    image: "images/blueberry.jpg",
  },
  {
    name: "soy sauce",
    organic: false,
    vegan: true,
    glutenFree: true,
    lactoseFree: true,
    diabetic: false,
    price: 2.6,
    image: "images/soysauce.png",
  },
  {
    name: "soda drink",
    organic: false,
    vegan: false,
    glutenFree: true,
    lactoseFree: true,
    diabetic: false,
    price: 1.3,
    image: "images/soda.jpg",
  },
  {
    name: "milk",
    organic: true,
    vegan: false,
    glutenFree: true,
    lactoseFree: false,
    diabetic: false,
    price: 5.8,
    image: "images/milk.jpg",
  },
];

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
  if (restriction === "NoPreference") {
    // For "All products" category, return all products
    return prods.map(product => [product.name, product.price]);
  }

  let product_names = [];
  for (let i = 0; i < prods.length; i += 1) {
    if (restriction == "Vegan" && prods[i].vegan == true) {
      product_names.push([prods[i].name, prods[i].price]);
    } else if (restriction == "Organic" && prods[i].organic == true) {
      product_names.push([prods[i].name, prods[i].price]);
    } else if (restriction == "NonOrganic" && prods[i].organic == false) {
      product_names.push([prods[i].name, prods[i].price]);
    } else if (restriction == "GlutenFree" && prods[i].glutenFree == true) {
      product_names.push([prods[i].name, prods[i].price]);
    } else if (restriction == "LactoseFree" && prods[i].lactoseFree == true) {
      product_names.push([prods[i].name, prods[i].price]);
    } else if (restriction == "Diabetic" && prods[i].diabetic == true) {
      product_names.push([prods[i].name, prods[i].price]);
    }
  else if (restriction == "NoPreference") {
    product_names.push([prods[i].name, prods[i].price]);
  }
}
return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
  totalPrice = 0;
  for (const { productName, quantity } of chosenProducts) {
    let product = products.find(({ name }) => name === productName);
    if (product) {
      totalPrice += product.price * quantity;
    }
  }
  return totalPrice;
}

//<!-- Signature: Quoc Dat Phung, Ayman Naciri, Alexander Azizi-Martin -->
