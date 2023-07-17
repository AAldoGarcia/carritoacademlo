function cart (db, printProducts) {
    let cart = [];
    // Elemetos del DOM
    const productsDOM = document.querySelector('.products__container');
    const notifyDOM = document.querySelector('.notify');
    const cartDOM = document.querySelector('.cart__body');
    const countDOM = document.querySelector('.cart__count--item');
    const totalDOM = document.querySelector('.cart__total');
    const checkoutDOM = document.querySelector('.btn--buy');


    
    

    // Funciones
    function printCart () {
        let htmlCart = '';

        if (cart.length === 0) {
            htmlCart += 
            `<div class="cart__empty">
                <i class='bx bx-cart-add'></i>
                <p class="cart__empy--text">No hay productos en el carrito</p>
            </div>
            `
            notifyDOM.classList.remove('show--notify')

        }else {
            for (const item of cart){
             const product = db.find(p => p.id === item.id) 
             htmlCart +=`
             <article class="article">
                <div class="article__image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="article__content">
                    <h3 class="article__title">${product.name}</h3>
                    <span class="article__price">$${product.price}</span>
                    <div class="article__quantify">
   
                        <button type="button" class="article__quantify-btn article--minus" data-id="${item.id}">
                            <i class='bx bx-minus'></i>
                        </button>
                        <span class="article__quantify-text">${item.qty}</span>
   
                        <button type="button" class="article__quantify-btn article--plus" data-id="${item.id}">
                            <i class='bx bx-plus'></i>
                        </button>
                    </div>
                    <button type="button" class="article__btn remove-from-cart" data-id="${item.id}">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
           </article>`   
            }
            notifyDOM.classList.add('show--notify')
        }
        cartDOM.innerHTML = htmlCart
        notifyDOM.innerHTML = showItemsCount();
        countDOM.innerHTML = showItemsCount();
        totalDOM.innerHTML = showTotal();
    }
    
    function addToCart (id, qty = 1) {
        const itenFinded = cart.find(i => i.
        id === id)
        if (itenFinded) {
            itenFinded.qty += qty 
        }else {
            cart.push({id, qty});
        }

        printCart()
    }

   

    function removeFrontCard( id, qty = 1) {
        const itenFinded = cart.find(i => i.id === id)
        const result = itenFinded.qty - qty
        if (result > 0) {
            itenFinded.qty -= qty
        }else {
            cart = cart.filter(i => i.id !== id)
        }
        printCart ()
    }
   

    function deleteFronCart(id) {
        cart = cart.filter(i => i.id !== id)
        printCart ()
    }
    

    function showItemsCount() {
        let suma = 0
        for ( const item of cart ) {
            suma += item.qty
        }
        return suma
    }

    function showTotal() {
       let total = 0 
       for ( const item of cart ) {
        const productFinded = db.find(p => p.id === item.id)
        total += item.qty * productFinded.price
       }
       return total
    }

    function checkout() {
      for ( const item of cart ) {
        const productFinded = db.find(p => p.id === item.id)
        productFinded.quantity -= item.qty
      }
      cart = [];
      printCart() 
      printProducts()
      window.alert('Gracias por su compra') 
    }

    printCart ()

    //Eventos
    productsDOM.addEventListener('click', function (e){
        if (e.target.closest('.add--to--cart')){
            const id = +e.target.closest('.add--to--cart').dataset.id
            addToCart(id)
        }
    })

    cartDOM.addEventListener('click', function (e) {
        if (e.target.closest('.article--minus')){
            const id = +e.target.closest('.article--minus').dataset.id
            removeFrontCard(id)
        }
        if (e.target.closest('.article--plus')){
            const id = +e.target.closest('.article--plus').dataset.id
            addToCart(id)
        }
        if (e.target.closest('.remove-from-cart')){
            const id = +e.target.closest('.remove-from-cart').dataset.id
            deleteFronCart(id)
        }
    })

    checkoutDOM.addEventListener('click', function(e){
        checkout()
    })



    
}
export default cart 