function pizza(cb1) {
    console.log("Give me a pizza");
    setTimeout(() => {
        let pric = 500;
        cb1(pric);
    }, 1000);
}
function price(pric,cb2) {
    console.log(`Give me ${pric} rupees`);
    cb2();
    
}
pizza(function (pric) {
    price(pric,function () {
        addToCart(function () {

        })
    })
});
function addToCart() {
    setTimeout(() => {
        console.log("Adding pizza to cart");
    }, 2000)
    setTimeout(() => {
        console.log("pizza added to cart");
    }, 3000)
}