var url = new URL(window.location.href);
var product_id = url.searchParams.get("p");
var currentObj = null
fetch(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${product_id}`).then(res => res.json()).then(productData => {

    // Add Name
    document.getElementById("productView").setAttribute("img", productData.photos[0])
    document.getElementsByTagName("h1")[0].innerHTML = productData.name;
    // Add Brand Name
    document.getElementsByTagName("h4")[0].innerHTML = productData.brand;
    // Add Price
    document.getElementsByTagName(
        "h4"
    )[1].innerHTML = `Price: Rs <span style="color: #009688; font-weight: bold">${productData.price}</span>`;

    // Add Description

    document.getElementsByTagName(
        "h4"
    )[2].innerHTML = `Description <br> <span style="margin-top: 20px;font-size: 16px;font-weight: 300;color: #86939e;">${productData.description}</span>`;

    document.getElementsByTagName("h4")[3].innerHTML = `Product Preview`;

    // Add Product Preview Pics

    var productPics = document.createElement("div");
    productPics.setAttribute("id", "productPics");
    productDetails.appendChild(productPics);

    var activeImg = "img0";
    // add pics and set Event Click listenrs
    productData.photos.forEach((item, i) => {
        var img = document.createElement("img");
        img.classList.add("imageStyle");
        img.setAttribute("id", `img${i}`);
        img.src = item;
        if (i == 0) img.classList.add("active");
        document.getElementById("productPics").appendChild(img);
        img.addEventListener("click", () => {
            document.getElementById(activeImg).classList.remove("active");
            img.classList.add("active");
            document.getElementById("productView").setAttribute("src", item);
            activeImg = `img${i}`;
        });

    });
    var buy = document.createElement("input");
    buy.setAttribute("type", "button");
    buy.setAttribute("value", "Add to Cart");
    buy.classList.add("buy-button");
    buy.addEventListener("click", () => {
        window.alert(`${productData.name} is added to your cart`);
    });
    productDetails.appendChild(buy);

});
var productList = window.localStorage.getItem('product-list');
productList = productList === null || productList === '' ? [] : productList;
productList = productList.length > 0 ? JSON.parse(productList) : [];
var totalCount = 0;
for (var i = 0; i < productList.length; i++) {
    totalCount = totalCount + productList[i].count;
}
$('#cart-total').html(totalCount);

$("#add-to-cart").click(function () {
    $('#add-to-cart').addClass('bigger');
    setTimeout(function () {
        $('#add-to-cart').removeClass('bigger');
    }, 200)



    console.log(productList);

    var foundAtPos = -1;
    for (var i = 0; i < productList.length; i++) {
        if (parseInt(productList[i].id) == parseInt(currentObj.id)) {
            foundAtPos = i;
        }
    }

    if (foundAtPos > -1) {
        productList[foundAtPos].count = productList[foundAtPos].count + 1;
        console.log(productList[foundAtPos].count);
        window.localStorage.setItem('product-list', JSON.stringify(productList));
    } else {
        currentObj.count = 1;
        productList.push(currentObj);
        console.log(productList);
        window.localStorage.setItem('product-list', JSON.stringify(productList));
    }
    var totalCount = 0;
    for (var i = 0; i < productList.length; i++) {
        totalCount = totalCount + productList[i].count;
    }
    $('#cart-total').html(totalCount);
});
