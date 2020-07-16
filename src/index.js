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
      var product = event.target.parentElement;
      var header = product.firstChild;

      var cartItems = $('.cart-items');
      var cartItemEl = document.createElement('li')
      cartItemEl.textContent = header.textContent;

      cartItems.append(cartItemEl)
    })
    productEl.appendChild(addToCartBtn)

    $('.items').append(productEl)
  });
}

// document.body.appendChild(products());

document.addEventListener('DOMContentLoaded', () => {
  addProducts()
});