import { products } from "./product-list.js";
export { addCart, remove, showCart, loadCart}

let cart = [];
let numCart = document.querySelector("#num"); //รับ id numCart
//Function for adding product---------------------
function addCart(event) {
    let id = event.target.id; // รับ Id ของ button
    let check = cart.find(value => { return value.id == id }) //ใช้ find ในการหาสินค้าในตะกร้า
    if (check != undefined) { //ถ้าไม่พบสินค้าในตะกร้า
        let checkStock = products.find(value => {return value.id == check.id}) //เทียบสินค้าที่อยู่ในตะกร้าและที่เหลือใน Stock
        if(check.quantity < checkStock.stock){
            check.quantity++ // ถ้าเป็น True ให้เพิ่มจำนวนสินค้า
            saveCart(); // เรียกใช้ function saveCart
        }else{
            alert('Out of Stock')
        }
    } else {
        cart.push({ id: id, quantity: 1 }) //กรณีเป็น False ให้เพิ่ม id และจำนวนสินค้าภายในตะกร้า
        alert(` " ${id} " added in your cart`); // แสดง alert
        saveCart(); // เรียกใช้ function saveCart
    }
    console.log(cart)
    numCart.innerHTML = numProductInCart() //ส่ง numCart ให้แสดง DOM 
}


function saveCart() {
    console.log(JSON.stringify(cart));
    localStorage.setItem('shoppingCart',JSON.stringify(cart)); // เก็บสินค้าใน cart ลงใน localStorage โดยแปลงให้เป็น JSON
}


function loadCart() {
    let cartLoad = JSON.parse(localStorage.getItem('shoppingCart')); // รับ shoppingCart ที่อยู่ใน localStorage
    cart = cartLoad != null ? cartLoad : []; //ถ้าใน cartLoad ไม่เท่ากับ null ให้แปลง cartLoad กลับมาเป็น Array Object
    numCart.innerHTML = cartLoad != null ? cartLoad.reduce((count, item) => count + item.quantity, 0) : 0;
}
loadCart();

//----------- เก่า ----------------
// function loadCart() {
//     let cartLoad = JSON.parse(localStorage.getItem('shoppingCart')); // รับ shoppingCart ที่อยู่ใน localStorage
//     let InCart = localStorage.getItem('InCarts'); // รับ InCarts ที่อยู่ใน localStorage
//     cart = cartLoad != null ? cartLoad : []; //ถ้าใน cartLoad ไม่เท่ากับ null ให้แปลง cartLoad กลับมาเป็น Array Object
//     numCart.innerHTML = InCart != null ? InCart : 0; //ถ้ามีสินค้าในตะกร้าให้ส่งไปให้ DOM แสดง
// }



function numProductInCart() {
    let numProduct = cart.reduce((count, cartItem) => count + cartItem.quantity, 0); //นับจำนวนสินค้าในตะกร้า
    return numProduct;
}

// function numProductInCart() {
//     let numProduct = cart.reduce((count, cartItem) => count + cartItem.quantity, 0); //นับจำนวนสินค้าในตะกร้า
//     localStorage.setItem('InCarts',numProduct);
//     return numProduct;
// }



//Clear Product.
const del = document.querySelector('#delete')
del.addEventListener('click',remove)
function remove() {
    cart = [];
    localStorage.removeItem('shoppingCart'); // ลบ shoppingCart ที่อยู่ใน localStorage
    alert('Remove product in cart.')
    numCart.textContent = cart.length;
}



//Show product in cart.
const showProduct = document.querySelector('#show')
showProduct.addEventListener('click', showCart);
function showCart() {
    if (cart.length == 0) {
        alert('Cart is empty!!')
    } else {
        let alertText = '';
        cart.forEach(product => { alertText += `ProductID: ${product.id} Unit: ${product.quantity}\n`})
        alert("this is your product\n" + alertText);
        // for (let read of cart) {
        //     alertText += "ProductID: " + read.id + "  "
        //     alertText += "Unit: " + read.quantity + "\n";
        // }
    }
}