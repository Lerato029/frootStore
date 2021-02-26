/* ====================================|||Cart Functionality With JavaScript|||======================================== */



/*Function to display the the count on the html element when the document loads */
window.onload = function loadCartCount() {
    //cartCount is fetched from local storage then I use an if statement to check if it exists
    let produceCount = localStorage.getItem('cartCount');

    if (produceCount) {
        document.getElementById('count').textContent = produceCount;
    }
    //when the page loads i want this function to run too...
    showCart()
}

/* ==============Creating two essential array variables================ */

/* |Produce array| the array of objects for each item in the catalogue*/
let produce = [{
        name: 'Bananas',
        ticket: 'bananas',
        price: 50,
        addedToCart: 0
    },
    {
        name: 'Blueberries',
        ticket: 'blueberries',
        price: 30,
        addedToCart: 0
    },
    {
        name: 'Grapes',
        ticket: 'grapes',
        price: 60,
        addedToCart: 0
    },
    {
        name: 'Kiwi',
        ticket: 'kiwi',
        price: 80,
        addedToCart: 0
    },
    {
        name: 'Oranges',
        ticket: 'oranges',
        price: 100,
        addedToCart: 0
    },
    {
        name: 'Plums',
        ticket: 'plums',
        price: 80,
        addedToCart: 0
    }
]

//|cart variable| using the querySelectorAll to select all the cart buttons and storing them in the carts variable
let carts = document.querySelectorAll(`[data-cart]`);

/* =================================================Arrays passed in a for loop============================================== */
/* Creating a loop that will run from 0 to 5 (the length of the carts array as there are 6 products in catalogue) 
to provide the indexes of the array carts */
//when clicked the function cartCount and totalDue run. 
//Also each function called has the produce object (produce[i]) is set as its parameter)
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartCount(produce[i]);
        totalDue(produce[i]);
    })
}

/* =================================================cartCount Function============================================== */
/* produce passed here but parameter named as item */
function cartCount(item) {
    /* Storing the cartCount value in the productCount variable */
    let produceCount = localStorage.getItem('cartCount');
    produceCount = parseInt(produceCount); //convert to number

    //check if produceCount is in locale storage if true 1 will be added every time an item is added to cart
    if (produceCount) {
        localStorage.setItem('cartCount', produceCount + 1);
        document.getElementById("count").textContent = produceCount + 1; //where the count will be displayed(on nav bar)
    } else {
        localStorage.setItem('cartCount', 1); //else the key cartCount and it's value will be stored in localStorage
        document.getElementById("count").textContent = 1;
    }
    /* setProduce function is then called which will store objects and their values in local storage*/
    setProduce(item);
}

/* =================================================setProduce Function============================================== */
/* produce passed here but parameter named as item */
function setProduce(item) {
    /* storing the value of produceInCart in the variable produceInCart */
    let produceInCart = localStorage.getItem('produceInCart');

    /* In order to work with it in JS we use JSON parse to convert it*/
    produceInCart = JSON.parse(produceInCart);

    /* Check if there are any produceInCart items in the localStorage */
    if (produceInCart != null) {
        /* if statement to allow other items to be added as well */
        if (produceInCart[item.ticket] == undefined) {
            produceInCart = {
                ...produceInCart,
                [item.ticket]: item
            }
        }

        produceInCart[item.ticket].addedToCart += 1;
    } else {
        //first item added to cart
        item.addedToCart = 1;
        produceInCart = {
            [item.ticket]: item
        }
    }
    localStorage.setItem("produceInCart", JSON.stringify(produceInCart));
}

/* =================================================totalDue Function============================================== */
/* produce passed here but parameter named as item */
function totalDue(item) {
    let cartTotal = localStorage.getItem('totalDue'); //totalDue value fetched from local storage

    //if cartTotal is not null then then total is each produce items price called added to it
    if (cartTotal != null) {
        cartTotal = parseInt(cartTotal) + item.price;
        localStorage.setItem('totalDue', cartTotal);
        alert("Great your total is R" + cartTotal) //alert to show user current price
    } else {
        localStorage.setItem("totalDue", item.price); //else the total is just the price of the produce item selected
        alert("Great your total is R" + item.price)
    }
}

/* ============deliveryOptions Array of objects============= */
let deliveryOptions = [{
        name: "Collect",
        price: 20
    },
    {
        name: "Work-Days",
        price: 80
    },
    {
        name: "Weekends",
        price: 120
    },
    {
        name: "Following-Day",
        price: 240
    }
]

/* =================================================addDelivery Function============================================== */
function addDelivery() {

    let deliverySelected = ''; //variable to store delivery option name
    let delivery; //variable to store the price

    /* The deliveryOptions object name values are used to allocate each object to each html radio input field through the
    find() method - if the input field has been checked. the object is then stored in a variable.*/
    if (document.getElementById("Collect").checked === true) {
        let collect = deliveryOptions.find(delivery => delivery.name === "Collect")
        deliverySelected = collect.name
        delivery = collect.price
    }
    if (document.getElementById("Work-Days").checked === true) {
        let workDays = deliveryOptions.find(delivery => delivery.name === "Work-Days")
        deliverySelected = workDays.name
        delivery = workDays.price
    }
    if (document.getElementById("Weekends").checked === true) {
        let weekends = deliveryOptions.find(delivery => delivery.name === "Weekends")
        deliverySelected = weekends.name
        delivery = weekends.price
    }
    if (document.getElementById("Following-Day").checked === true) {
        let followingDay = deliveryOptions.find(delivery => delivery.name === "Following-Day")
        deliverySelected = followingDay.name
        delivery = followingDay.price
    } else if (deliverySelected === "") {
        alert("Please select a delivery option") //else statement to let user know they should check an option
    }

    //if deliverySelected variable is not an empty string the alert pops up and the price is stored in the local storage
    if (deliverySelected != "") {
        alert("Great your delivery option | " + deliverySelected + " | has added the to cart !");
        localStorage.setItem('delivery', JSON.stringify(delivery));
        window.location.reload(); //page will also reload to show the updated cart
    }
} //End of Add Delivery

/* =================================================checkCoupon Function============================================== */
function checkCoupon() {
    let redeem = "OFF10"; //the coupon code
    let coupon = redeem.trim("OFF10"); //trim method to remove white space from sides of the string

    //storing the value entered in the html input field
    let input = document.getElementById('code').value;

    //if statement to check if code from user is correct and the same as string coupon (code is case sensitive)
    if (input === coupon) {
        alert("Great! Coupon applied, you will get 10% OFF!")
        localStorage.setItem("Coupon", 0.10) //10% is 10 divided by 100
        window.location.reload();
    } else {
        alert("Coupon not applied... Please try again")
    }
}

/* =================================================showCart Function============================================== */
function showCart() {
    //values from local storage to be displayed on cart and converted to numbers through the JSON parse method
    let produceInCart = localStorage.getItem('produceInCart');
    produceInCart = JSON.parse(produceInCart);

    let delivery = localStorage.getItem('delivery');
    delivery = JSON.parse(delivery);

    let coupon = localStorage.getItem('Coupon');
    coupon = JSON.parse(coupon);

    let cartTotal = localStorage.getItem('totalDue');
    cartTotal = JSON.parse(cartTotal);
    cartTotal = cartTotal + delivery //delivery amount added to cartTotal here incase coupon is applied

    //fetching html element where all content created in this function will be appended to
    let cartContainer = document.querySelector(".produceItems");

    //check if cartContainer element, the produceInCart objects and delivery are present...
    if (produceInCart && cartContainer) {
        //loop through objects...produceInCart through map method
        Object.values(produceInCart).map(item => {
            //each item will be appended to the cart container element in this manner
            cartContainer.innerHTML +=
                `<div class="item-header">
                    <div class="itemTitle">
                        <img src="./images-catalogue/${item.ticket}.jpg">
                        <span>${item.name}</span>
                    </div>
                    <div class="price">R${item.price}.00</div>
                    <div class="quantity">
                        <span>${item.addedToCart}</span>
                    </div>
                    <div class="total">
                        R${item.addedToCart * item.price},00
                    </div>
                </div>`
        });
        //append delivery price if it exists
        if (delivery){
            cartContainer.innerHTML += 
                `<div class="item-header">
                    <div class="itemTitle"> 
                        <span>Delivery</span>
                    </div>
                    <div class="price"></div>
                    <div class="quantity">
                    </div>
                    <div class="total">
                        R${delivery},00
                    </div>
                </div>`
        }
        //append coupon which is multiplied by 100 to get the percentage if it exists
        if (coupon){
            cartContainer.innerHTML +=
                `<div class="item-header">
                    <div class="itemTitle"> 
                        <span>Coupon</span>
                    </div>
                    <div class="price"></div>
                    <div class="quantity">
                    </div>
                    <div class="total">
                        -${coupon*100}%
                    </div>
                </div>`
        }
        //append the cartTotal where it subtracts the cartTotal*coupon to apply the coupon
        cartContainer.innerHTML +=
            `<div class="total-header">
                <h4 class="totalTitle">
                    Cart Total:
                </h4>
                <h4 class="total">
                    R${cartTotal - cartTotal*coupon },00
                </h4>
            </div>
            <div class="order">
                <a href="contact-us.html" class="btn btn-sm" onclick="confirmPurchase()" >Confirm</a>
                <a href="home.html" style="color:black" class="btn btn-sm" onclick="cancelPurchase()" >Cancel</a>
            </div>`
    } //End of if (produceInCart && cartContainer) if statement                            
} //End of Show Cart


/* =================================================confirm and cancel Purchase Functions============================================== */
function confirmPurchase() {

    /* will be 47 plus the unique code generated through the Date.now() method 
    which returns the number of milliseconds passed since 01-01-1970  */
    let referenceNum = "47" + Date.now();
    alert("Order confirmed! Your reference number is: " + referenceNum);

    //cart will be cleared and page will be reloaded
    localStorage.clear();
    window.location.reload();

}

function cancelPurchase() {
    alert("Order canceled");

    //cart will be cleared and page will be reloaded
    localStorage.clear();
    window.location.reload();
}