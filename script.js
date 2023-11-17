const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
let bag = document.querySelector('.bag');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.fe-box');
let listCartHTML = document.querySelector('.listcart');
let iconBagSpan = document.querySelector('.bag span')

let listProducts = [];
let carts = [];

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('product');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <div id="${product.id}">
                <img src="${product.image}">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button><i class="fa-solid fa-cart-plus"></i></button>
            </div>  
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}

const initApp = () => {
    //get data from json
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();
    })
}

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

bag.addEventListener('click', () => {
    body.classList.toggle('thecart')
})

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('fa-cart-plus')){
        let product_element = positionClick.closest('.product');
        if (product_element) {
            let product_id = product_element.dataset.id;
            addToCart(product_id);
        }
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity:1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity +1;
    }
    addCartToHTML ();
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    if(carts.length > 0){
        carts.forEach(cart => {
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
            <div class="image">
                    <img src="${info.image}" height="100px" width="100px" alt=""/>
                </div>
                <div class="name">
                    Name
                </div>
                <div class="totalprice">
                    $57.99
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        listCartHTML.appendChild(newCart);
        })
    }
}

initApp();