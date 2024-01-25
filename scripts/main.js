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
		price: 1.99
	},
	{
		name: "bread",
		organic: false, 
		vegan: true,
		glutenFree: false,
		lactoseFree: false,
		diabetic: false,
		price: 2.35
	},
	{
		name: "salmon",
		organic: true, 
		vegan: false,
		glutenFree: true,
		lactoseFree: true,
		diabetic: true,
		price: 10.00
	},
	{
		name: "ice cream",
		organic: true, 
		vegan: false,
		glutenFree: true,
		lactoseFree: true,
		diabetic: true,
		price: 3.50
	},
	{
		name: "salad",
		organic: true, 
		vegan: true,
		glutenFree: true,
		lactoseFree: true,
		diabetic: true,
		price: 4.50
	},
	{
		name: "cereal",
		organic: true, 
		vegan: true,
		glutenFree: true,
		lactoseFree: true,
		diabetic: false,
		price: 5.50
	},
	{
		name: "blueberry",
		organic: true, 
		vegan: true,
		glutenFree: true,
		lactoseFree: true,
		diabetic: false,
		price: 6.70
	},
	{
		name: "soy sauce",
		organic: false, 
		vegan: true,
		glutenFree: true,
		lactoseFree: true,
		diabetic: false,
		price: 2.60
	},
	{
		name: "soda drink",
		organic: false, 
		vegan: false,
		glutenFree: true,
		lactoseFree: true,
		diabetic: false,
		price: 1.30
	},
	{
		name: "milk",
		organic: true, 
		vegan: false,
		glutenFree: true,
		lactoseFree: false,
		diabetic: false,
		price: 5.80
	}

];
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
	let product_names = [];
	for (let i=0; i<prods.length; i+=1) {
		if ((restriction == "Vegan") && (prods[i].vegan == true)){
			product_names.push([prods[i].name, prods[i].price]);
		}
		else if ((restriction == "Organic") && (prods[i].organic == true)){
			product_names.push([prods[i].name, prods[i].price]);
		}
		else if ((restriction == "NonOrganic") && (prods[i].organic == false)){
			product_names.push([prods[i].name, prods[i].price]);
		}
		else if ((restriction == "GlutenFree") && (prods[i].glutenFree == true)){
			product_names.push([prods[i].name, prods[i].price]);
		}
		else if ((restriction == "LactoseFree") && (prods[i].lactoseFree == true)){
			product_names.push([prods[i].name, prods[i].price]);
		}
		else if ((restriction == "Diabetic") && (prods[i].diabetic == true)){
			product_names.push([prods[i].name, prods[i].price]);
		}
	}
	return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return totalPrice;
}

//<!-- Signature: Quoc Dat Phung, Ayman Naciri, Isam Karroum -->