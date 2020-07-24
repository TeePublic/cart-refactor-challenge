import './style.css'
import $ from 'jquery'
import Products from './products.json'

// Todo
//  - Replacing var with const and let
//  - Extract createProductElement
//  - Extract addToCart
//  - Separate out styles from generating html elements
//  - Create classes/components for CreateProduct, CreateCartItem etc
//  - Use document.querySelector instead of Jquery to find elements
//  - Use lodash for iteration

function addProducts () {
  $.each(Products, function (index, value) {
    // Iterate through products.json and create a product element with options
    const productEl = createProductElement(value)

    productEl.appendChild(createProductHeader(value))

    var productPriceEl = createProductPrice(value)

    productEl.appendChild(productPriceEl)

    var productOptionsEl = createProductOptions(value)

    productEl.appendChild(productOptionsEl)

    var addToCartBtn = createAddToCart()

    addListenerToCartBtn(addToCartBtn)

    productEl.appendChild(addToCartBtn)

    $('.items').append(productEl)
  })
}

// map over products create

function addListenerToCartBtn (addToCartBtn) {
  addToCartBtn.addEventListener('click', (event) => {
    disableAddToCartBtn(event)

    const header = event.target.parentElement.firstChild
    const price = header.nextSibling

    const cartItems = $('.cart-items')
    const cartItemEl = createCartItemEl(header, price)

    cartItems.append(cartItemEl)

    let total = 0
    document.querySelectorAll('.item-price').forEach((value, key, parent) => {
      total += parseInt(value.innerHTML.replace(/\$/g, ''))
    })

    const totalEl = document.getElementsByClassName('cart-total')[0]
    totalEl.textContent = '$' + total.toFixed(2)
  })
}

function disableAddToCartBtn (event) {
  event.target.textContent = 'In Cart'
  event.target.classList += ' added'
  event.target.disabled = true
}

function createCartItemEl (header, price) {
  var cartItemEl = document.createElement('li')
  cartItemEl.style.display = 'flex'
  cartItemEl.style.flexDirection = 'row'
  cartItemEl.style.alignItems = 'center'
  cartItemEl.style.justifyContent = 'space-between'
  cartItemEl.style.textTransform = 'capitalize'
  var cartItemHeaderEl = document.createElement('p')
  var cartItemPriceEl = document.createElement('p')
  cartItemHeaderEl.textContent = header.textContent
  cartItemPriceEl.textContent = price.textContent
  cartItemEl.appendChild(cartItemHeaderEl)
  cartItemEl.appendChild(cartItemPriceEl)
  $(price).addClass('item-price')
  return cartItemEl
}

function createAddToCart () {
  var addToCartBtn = document.createElement('button')
  addToCartBtn.textContent = 'Add to Cart'
  addToCartBtn.classList.add('add-to-cart')
  return addToCartBtn
}

function createProductOptions (value) {
  var productOptionsEl = document.createElement('ul')
  $.each(value.options, function (key, value) {
    var productOptionEl = document.createElement('li')

    var productOptionTypeEl = document.createElement('strong')
    var productOptionType = key
    productOptionTypeEl.textContent = productOptionType
    productOptionsEl.appendChild(productOptionTypeEl)

    var productOptionValueEl = document.createElement('span')
    var productOptionValue = value
    productOptionValueEl.textContent = ': ' + productOptionValue

    productOptionEl.appendChild(productOptionTypeEl)
    productOptionEl.appendChild(productOptionValueEl)
    productOptionsEl.appendChild(productOptionEl)
  })
  return productOptionsEl
}

function createProductPrice (value) {
  const productPriceEl = document.createElement('p')
  const productPrice = value.price.toFixed(2)
  productPriceEl.innerHTML = '$' + productPrice
  return productPriceEl
}

function createProductHeader (value) {
  const productHeader = document.createElement('h3')
  const productType = value.product_type
  const productId = value.id
  productHeader.innerHTML = productType + ' ' + productId
  return productHeader
}

function createProductElement (product) {
  const productEl = document.createElement('div')
  productEl.classList.add('item')
  return productEl
}

// document.body.appendChild(products());

document.addEventListener('DOMContentLoaded', () => {
  addProducts()
})
