const productsContainer = document.querySelector('#productsMainContainer');
const productsBasket = document.querySelector('#productsBasketContainer');

const items = [
    {
        counter: 1,
        id: '1',
        title: 'Калифорния хит',
        price: 300,
        weight: 180,
        itemsInBox: 6,
        img: 'california-hit.jpg'
    },
    {

        counter: 1,
        id: '2',
        title: 'Калифорния темпура',
        price: 250,
        weight: 205,
        itemsInBox: 6,
        img: 'california-tempura.jpg'
    },
    {

        counter: 1,
        id: '3',
        title: 'Запечченный ролл "Калифорния"',
        price: 230,
        weight: 182,
        itemsInBox: 6,
        img: 'zapech-california.jpg'
    },
    {

        counter: 1,
        id: '4',
        title: 'филадельфия',
        price: 320,
        weight: 230,
        itemsInBox: 6,
        img: 'philadelphia.jpg'
    }
];

const state = {
    items: items,
    cart: []
};

function renderItem(item) {
    const markup = `<div class="col-md-6">
    <div class="card mb-4" data-productid="${item.id}">
        <img class="product-img" src="img/roll/${item.img}" alt="${item.title}">
        <div class="card-body text-center">
            <h4 class="item-title">${item.title}</h5>
                <p> <small class="text-muted">${item.itemsInBox} шт.</small> </p>
                <div class="details-wrapper">
                    <div class="items">
                        <div class="items__control" data-click="minus">-</div>
                        <div class="items__current" data-count>${item.counter}</div>
                        <div class="items__control" data-click="plus">+</div>
                    </div>
                    <div class="price">
                        <div class="price__weight">${item.weight}г.</div>
                        <div class="price__currency">${item.price} ₽</div>
                    </div>
                </div>
                <button type="button" class="btn btn-block btn-outline-warning" data-click="basket">+ в корзину</button>
        </div>
    </div>
</div>`;

    productsContainer.insertAdjacentHTML('beforeend', markup);
}

state.items.forEach(renderItem);

function renderItemInBasket(item) {
    const markup = `<div class="cart-item">

    
    <div class="cart-item__top" data-productid="${item.id}">
        <div class="cart-item__img">
            <img src="img/roll/${item.img}" alt="${item.title}">
        </div>
        
        <div class="cart-esc">
            <img src="img/esc16.png" alt="esc" data-click="esc">
        </div>
        
        <div class="cart-item__desc">
            <div class="cart-item__title">${item.title}</div>
            <div class="cart-item__weight">${item.itemsInBox} шт. / ${item.weight}г.</div>
            <div class="cart-item__details">
                <div class="items items--small">
                    <div class="items__control" data-click="minus">-</div>
                    <div class="items__current" data-count>${item.counter}</div>
                    <div class="items__control" data-click="plus">+</div>
                </div>
                <div class="price">
                    <div class="price__currency" id="itemPrice"></div>
                </div>
            </div>
        </div>       
        
    </div>
</div>`;

    productsBasket.insertAdjacentHTML('afterbegin', markup);
}

function updateStateCart(id, type) {
    state.items.forEach((item) => {
        if (item.id === id) {
            const itemIndex = state.items.indexOf(item);  //индекс лота в state.items
            const inBasketIndex = inBasket (item);      //индекс лота в state.cart
            const clone = {};
            for (var key in item) {
                clone[key] = item[key];
            }

            if (inBasketIndex + 1 && type === 'plus') {
                state.cart[inBasketIndex].counter += 1;
            } else if (inBasketIndex + 1 && type === 'minus'){
                if (state.cart[inBasketIndex].counter - 1) {
                    state.cart[inBasketIndex].counter--;
                }
            } else if (inBasketIndex + 1 && type === 'del'){
                state.cart[inBasketIndex].counter = 0;
                // state.cart.splice(inBasketIndex,1);      //удалили из state.cart
                // productsBasket.querySelector('[data-productid="' + item.id + '"]').innerHTML = '';
            } else if (inBasketIndex + 1) {
                state.cart[inBasketIndex].counter += item.counter;
            } else {
                state.cart.push(clone);
                document.querySelector('#notEmptyBasket').style.display = 'block';
                document.querySelector('#productsEmptyBasketContainer').style.display = 'none';
                renderItemInBasket(clone);
            }

            updateBasketViewCounter(state.cart[inBasket (item)]);
            state.items[itemIndex].counter = 1;
            itemUpdateViewCounter(item);
            document.querySelector('#totalPrice').innerText = getTotalPrice();
            if (getTotalPrice() < 1000) {
                document.querySelector('#delivery').innerText = '300 ₽';
                document.querySelector('#delivery').classList.remove('free')
            } else {
                document.querySelector('#delivery').innerText = 'бесплатно';
                document.querySelector('#delivery').classList.add('free')
            }
            checkForZero();
        }
    });
}
function checkForZero () {
    for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].counter == 0) {
            productsBasket
                .querySelector('[data-productid="' + state.cart[i].id + '"]')
                .innerHTML = '';
            state.cart.splice(inBasket (state.cart[i]),1);
        }
    }
    if (state.cart.length == 0) {
        document.querySelector('#notEmptyBasket').style.display = 'none';
        document.querySelector('#productsEmptyBasketContainer').style.display = 'block';
    }
}

function inBasket(item) {
    for(let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === item.id) {
            return i;
        }
    }
    return -1;
}

function getTotalPrice() {
    let price = 0;
    for(let i = 0; i < state.cart.length; i++) {
        price += state.cart[i].price * state.cart[i].counter;
    }
    return price;
}

function getItemPrice(item) {
    return item.counter * item.price;
}

function itemUpdateCounter(id, type) {
    state.items.forEach((item) => {
        if (item.id === id) {
            if (type === 'plus') {
                state.items[state.items.indexOf(item)].counter++;
            }
            if (type === 'minus') {
                if (state.items[state.items.indexOf(item)].counter - 1) {
                    state.items[state.items.indexOf(item)].counter--;
                }
            }
            itemUpdateViewCounter(item);
        }
    })
}

function itemUpdateViewCounter(item) {
    productsContainer
        .querySelector('[data-productid="' + item.id + '"]')
        .querySelector('[data-count]')
        .innerText = item.counter;
}

function updateBasketViewCounter(item) {
    productsBasket
        .querySelector('[data-productid="' + item.id + '"]')
        .querySelector('[data-count]')
        .innerText = item.counter;
    productsBasket
        .querySelector('[data-productid="' + item.id + '"]')
        .querySelector('#itemPrice')
        .innerText = getItemPrice(item) + ' ₽';
}

productsContainer.addEventListener('click', (e) => {

    if (e.target.matches('[data-click="minus"]')) {
        const id = e.target.closest('[data-productid]').dataset.productid;
        itemUpdateCounter(id, 'minus');
    }
    if (e.target.matches('[data-click="plus"]')) {
        const id = e.target.closest('[data-productid]').dataset.productid;
        itemUpdateCounter(id, 'plus');
    }
    if (e.target.matches('[data-click="basket"]')) {
        const id = e.target.closest('[data-productid]').dataset.productid;
        updateStateCart(id);
    }
});

productsBasket.addEventListener('click', (e) => {

    if (e.target.matches('[data-click="minus"]')) {
        const id = e.target.closest('[data-productid]').dataset.productid;
        updateStateCart(id, 'minus');
    }
    if (e.target.matches('[data-click="plus"]')) {
        const id = e.target.closest('[data-productid]').dataset.productid;
        updateStateCart(id, 'plus');
    }
    if (e.target.matches('[data-click="esc"]')) {
        const id = e.target.closest('[data-productid]').dataset.productid;
        updateStateCart(id, 'del');
    }

});