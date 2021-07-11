var url = new URL(window.location.href);
var product_id = url.searchParams.get("p");
var currentObj = null
fetch(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${product_id}`).then(res => res.json()).then(productData => {

    // Add Name
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

    // currentObj = productData;
    // var main_image = document.getElementById("main-image");
    // main_image.src = productData.photos[0];
    // var product_name = document.getElementById("product-name");
    // product_name.textContent = productData.name;
    // var product_brand = document.getElementById("product-brand");
    // product_brand.textContent = productData.brand;
    // var price_color = document.getElementById("price-color");
    // price_color.textContent = productData.price;
    // var product_description = document.getElementById("product-description");
    // product_description.textContent = productData.description;
    // var product_images = document.getElementsByClassName("product-images");
    // var product_images = product_images[0];
    // for (var i = 0; i < productData.photos.length; i++) {
    //     var image_div = document.createElement("img");
    //     image_div.src = productData.photos[i];
    //     image_div.id = "product-image-" + i;
    //     image_div.className = "clickable";
    //     image_div.onclick = imgClick;
    //     product_images.appendChild(image_div);
    // }
    // function imgClick() {
    //     imgClicked = document.getElementById(this.id);
    //     clickable_images = document.getElementsByClassName("clickable");
    //     for (var img of clickable_images) {
    //         img.classList.remove("clicked");
    //     }
    //     imgClicked.classList.add("clicked");
    //     main_image.src = imgClicked.src;
    // }
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



// var productData = sessionStorage.getItem("item");


// console.log(productData == null);


// var productDetails = document.getElementById("productDetails");

// console.log(productData.length);

// // Add Name
// document.getElementsByTagName("h1")[0].innerHTML = productData.name;
// // Add Brand Name
// document.getElementsByTagName("h4")[0].innerHTML = productData.brand;
// // Add Price
// document.getElementsByTagName(
//     "h4"
// )[1].innerHTML = `Price: Rs <span style="color: #009688; font-weight: bold">${productData.price}</span>`;

// // Add Description

// document.getElementsByTagName(
//     "h4"
// )[2].innerHTML = `Description <br> <span style="margin-top: 20px;font-size: 16px;font-weight: 300;color: #86939e;">${productData.description}</span>`;

// document.getElementsByTagName("h4")[3].innerHTML = `Product Preview`;

// // Add Product Preview Pics

// var productPics = document.createElement("div");
// productPics.setAttribute("id", "productPics");
// productDetails.appendChild(productPics);

// var activeImg = "img0";
// // add pics and set Event Click listenrs
// productData.photos.forEach((item, i) => {
//     var img = document.createElement("img");
//     img.classList.add("imageStyle");
//     img.setAttribute("id", `img${i}`);
//     img.src = item;
//     if (i == 0) img.classList.add("active");
//     document.getElementById("productPics").appendChild(img);
//     img.addEventListener("click", () => {
//         document.getElementById(activeImg).classList.remove("active");
//         img.classList.add("active");
//         document.getElementById("productView").setAttribute("src", item);
//         activeImg = `img${i}`;
//     });
// });

// // add buy buton
// var buy = document.createElement("input");
// buy.setAttribute("type", "button");
// buy.setAttribute("value", "Add to Cart");
// buy.classList.add("buy-button");
// buy.addEventListener("click", () => {
//     window.alert(`${productData.name} is added to your cart`);
// });
// productDetails.appendChild(buy);
