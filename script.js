const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => { //полученная коллекция объектов из функции
                this.goods = data;
                this.render();
            });
        this.summa();
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', item.render());
            // block.innerHTML += item.render();
        }


    }
    summa() {
        let summa = 0;
        this.goods.forEach(function (item) {
            summa += item.price;
        })
        console.log(summa);
        const blockForSum = document.querySelector('.products-sum');
        blockForSum.insertAdjacentHTML('beforeend', `Сумма всех товаров: ${summa}`);
    }
}
class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="products-item">
        <img src="${this.img}">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <button class = "buy-btn"> Купить</button>
        </div>`;

    }
}

let list = new ProductList();

class Basket {
    constructor(container = '.productsInBasket') {
        this.container = container;
        this.goods = [];
        this._getProductsInBasket()
            .then(data => { //полученная коллекция объектов из функции
                this.goods = data.contents;
                this.render();
            });
        // this.summa();
    }
    _getProductsInBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    //добавить товар
    addGood() {

    }
    //удалить товар
    removeGood() {

    }
    //изменить товар
    changeGood() {

    }
    //вывод товаров
    render() {
        const blockBasket = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ElementBasket(product);
            blockBasket.insertAdjacentHTML('beforeend', item.render());
        }
    }
}
class ElementBasket {
    //вывести товар, верстка товаров
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
        this.quantity = product.quantity;
    }
    render() {
        return `<div class="productinBasket">
        <img src="${this.img}">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <p>${this.quantity}</p>
        </div>`;

    }
    // _getProductsInBasket() {
    //     return fetch(`${API}/getBasket.json`)
    //         .then(result => result.json())
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }


}
let listInBasket = new Basket;