import './style.css';
import $ from "jquery";
import Products from './products.json'

function addProducts() {
  $.each(Products, function( index, value ) {
    var productEl = document.createElement('div');
    productEl.classList.add('item')

    var productHeader = document.createElement('h3');
    var productType = value.product_type;
    var productId = value.id;
    productHeader.innerHTML = productType + ' ' + productId;
    productEl.appendChild(productHeader)
    var productPriceEl = document.createElement('p');
    var productPrice = value.price.toFixed(2);
    productPriceEl.innerHTML = '$' + productPrice;
    productEl.appendChild(productPriceEl);
    var productOptionsEl = document.createElement('ul');
    $.each(value.options, function( key, value ) {
      var productOptionEl = document.createElement('li')

      var productOptionTypeEl = document.createElement('strong')
      var productOptionType = key;
      productOptionTypeEl.textContent = productOptionType;
      productOptionsEl.appendChild(productOptionTypeEl)

      var productOptionValueEl = document.createElement('span')
      var productOptionValue = value;
      productOptionValueEl.textContent = ': ' + productOptionValue;

      productOptionEl.appendChild(productOptionTypeEl)
      productOptionEl.appendChild(productOptionValueEl)
      productOptionsEl.appendChild(productOptionEl)
    });
    productEl.appendChild(productOptionsEl)

    var addToCartBtn = document.createElement('button')
    addToCartBtn.textContent = 'Add to Cart'
    addToCartBtn.classList.add('add-to-cart')

    addToCartBtn.addEventListener('click', () => {
      event.target.textContent = 'In Cart'
      event.target.classList += ' added'
      event.target.disabled = true;
      var product = event.target.parentElement;
      var header = product.firstChild;
      var price = header.nextSibling;

      var cartItems = $('.cart-items');
      var cartItemEl = document.createElement('li');
      cartItemEl.style.display = 'flex';
      cartItemEl.style.flexDirection = 'row';
      cartItemEl.style.alignItems = 'center';
      cartItemEl.style.justifyContent = 'space-between';
      var cartItemHeaderEl = document.createElement('p');
      var cartItemPriceEl = document.createElement('p');
      cartItemHeaderEl.textContent = header.textContent;
      cartItemPriceEl.textContent = price.textContent;
      cartItemEl.appendChild(cartItemHeaderEl);
      cartItemEl.appendChild(cartItemPriceEl);
      $(price).addClass('item-price');

      cartItems.append(cartItemEl)

      var total = 0;
      $('.item-price').each(function() {
        var price = parseInt(this.innerHTML.replace(/\$/g, ''));
        total += price
      })
      var totalEl = document.getElementsByClassName('cart-total')[0];
      totalEl.textContent = total;
    })

    productEl.appendChild(addToCartBtn)

    $('.items').append(productEl)

  });
}

// document.body.appendChild(products());

document.addEventListener('DOMContentLoaded', () => {
  addProducts()
});
