var clothes = document.getElementById("clothingCards");
var accessory = document.getElementById("accessoriesCards");
let productData = [];
fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
  .then(res => res.json())
  .then(data => {
    var productList = data;
    productData = data;
    productList.forEach((item, i) => {
      var render = `<div class="card">
            <a id="item${i}" href="https://vivekverma-ally.github.io/Shoplane_Website/productDetail.html?p=${item.id}">
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
