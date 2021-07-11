

// async function getData(url) {

//     // Storing response
//     const response = await fetch(url);

//     // Storing data in form of JSON
//     var data = await response.json();
//     console.log(data);
//     console.log(typeof data)
//     return data;
// }
// var productList = getData("https://5d76bf96515d1a0014085cf9.mockapi.io/product");


var clothes = document.getElementById("clothingCards");
sessionStorage.setItem("x", "uiosfuio");
var accessory = document.getElementById("accessoriesCards");
let productData = [];
fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
  .then(res => res.json())
  .then(data => {
    var productList = data;
    productData = data;
    productList.forEach((item, i) => {
      var render = `<div class="card">
            <a id="item${i}" href="./productDetail.html">
              <div class="img">
                <img src="` + item.preview + `" />
              </div>
              <div class="details">
                <h3>` + item.name + `</h3>
                <h4>` + item.brand + `</h4>
                <h5>` + item.price + `</h5>
              </div>
              </a>
            </div >`
      if (item.isAccessory)
        accessory.innerHTML += render;
      if (!item.isAccessory)
        clothes.innerHTML += render;
      // var link = document.getElementById(`item${i}`);
      // link.addEventListener('click', event => {
      //   sessionStorage.setItem("item", item);
      // })
    })
  });


var productList = window.localStorage.getItem('product-list');
productList = productList === null || productList === '' ? [] : productList;
productList = productList.length > 0 ? JSON.parse(productList) : [];
var totalCount = 0;
for (var i = 0; i < productList.length; i++) {
  totalCount = totalCount + productList[i].count;
}
$('#cart-total').html(totalCount);
