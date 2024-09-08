let cart = [];

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>R$ ${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItems.appendChild(row);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = total.toFixed(2);
}

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));

        addToCart({ name, price });
    });
});

document.getElementById("checkout-btn").addEventListener('click', function() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
    } else {
        alert("Compra finalizada! Total: R$ " + document.getElementById("cart-total").innerText);
        cart = [];
        updateCart();
    }
});


function clearCart() {
    cart = [];
    updateCart(); 
}


document.getElementById("clear-cart-btn").addEventListener('click', function() {
    clearCart();
    alert("Carrinho limpo com sucesso!");
});

