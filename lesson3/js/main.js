const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                 this.goods = data;
                 this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }
    // calcSum(){
    //     return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    // }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
//            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class Basket {
    constructor(container = '.header__basket') {
        this.container = container;
        this.products = [];
        this.basketProducts()
        .then(data => {
            this.products = data.contents;
            this.render()
        })
    }

    basketProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        const block1 = document.querySelector(this.container);
        for (let product of this.products){
            const productObj = new basketProduct(product);
            block1.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

class basketProduct {
    constructor(product, img = 'https://via.placeholder.com/100x75'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }


    render(){
        return `<div class="header__basket-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <h3>Quantity:${this.quantity}</h3>
                    <p>${this.price} $</p>
                </div>
                <div class="header__basket-item-info">
                    <h3 class="header__basket-item-price">${this.price * this.quantity} $</h3>
                    <button class="header__del-btn">X</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();
let basket12 = new Basket();
let basketCart = document.querySelector('.header__basket');
let basketBtn = document.querySelector('.btn-cart').addEventListener('click', function(event){
    if (basketCart.getAttribute('style') === "display: none;") {
        basketCart.setAttribute('style', 'display: block;')
    } 
    else {
        basketCart.setAttribute('style', 'display: none;')
    }
})

