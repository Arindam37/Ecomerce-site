// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const dom= new JSDOM(cart.hbs)
// let cards = dom.window.document.querySelectorAll('.add-cart');
// const express=require('express');
// const router=express.Router();
// router.get('/cart',(req,res)=>{
//     res.render('cart');
// });
// const jsdom = require('jsdom');

// // Yep, we've got QuerySelector turned on
// jsdom.defaultDocumentFeatures = {
//   QuerySelector: true
// };


let cards = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Choclate Shake',
        tag: 'choclateshake',
        price: 160,
        inCart: 0,
    },
    {
        name: 'Kit Kat Shake',
        tag: 'kitkatshake',
        price: 150,
        inCart: 0,
    },
    {
        name: 'Oreo Shake',
        tag: 'oreoshake',
        price: 110,
        inCart: 0,
    },
    {
        name: 'Aerated Drinks',
        tag: 'aerated drinks',
        price: 80,
        inCart: 0,
    },
    {
        name: 'Cheese Burger',
        tag: 'cheeseburger',
        price: 50,
        inCart: 0,
    },
    {
        name: 'French Fries',
        tag: 'frenchfries',
        price: 40,
        inCart: 0,
    },
    {
        name: 'Maggie',
        tag: 'maggie',
        price: 20,
        inCart: 0,
    },
    {
        name: 'Cold Drink',
        tag: 'coke',
        price: 30,
        inCart: 0,
    }
]



for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', () => {
        console.log('clicked');
        cardNumbers(products[i]);
        totalCost(products[i]);
    })



}
function spanNumbersOnLoad() {
    let productNumbers = localStorage.getItem('cardNumbers');
    if (productNumbers) {
        document.querySelector('.carte span').textContent = productNumbers;
    }
}
function cardNumbers(product) {

    let productNumbers = localStorage.getItem('cardNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cardNumbers', productNumbers + 1);
        document.querySelector('.carte span').textContent = productNumbers + 1;
        //  document.getElementById('.apple span').textContent=productNumbers+1;
    }
    else {
        localStorage.setItem('cardNumbers', 1);
        document.querySelector('.carte span').textContent = 1;
        //document.getElementById('.apple span').textContent=1;
    }
    setItems(product);

}




function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }

        cartItems[product.tag].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }

    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    console.log('cost is', cartCost);
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

    console.log('caost is', product.price);
}
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    // localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    let productContainer = document.querySelector(".products");
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <img src="./images/images.jpeg">
            <span>${item.name}</span>
            
            <div class="price">₹${item.price}.00</div>
            <div class="quantity">${item.inCart}</div>
            <div class="total">₹${item.inCart * item.price}.00</div>
            </div>
            
             `;
        });
        // productContainer.innerHTML+=`
        // `
    }
}
function totalBill(){
    let cartCost = localStorage.getItem('totalCost');
    if (cartCost) {
        document.querySelector('.totalCostContainer span').textContent = cartCost;
    }


}


spanNumbersOnLoad();
displayCart();
totalBill();
module.exports=router;