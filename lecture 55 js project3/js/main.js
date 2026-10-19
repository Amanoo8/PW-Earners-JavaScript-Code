
const API = "https://dummyjson.com/products?limit=0";
const CATEGORY_API = "https://dummyjson.com/products/categories";
const SEARCH_API = "https://dummyjson.com/products/search?q=phone";

const productsContainer = document.querySelector("#products-container");
const categoryFilters = document.querySelector("#category-filters");
const searchInput = document.querySelector("#search-input");
const productDetailContainer = document.querySelector("#product-detail-container");
const wishlistContainer = document.querySelector("#wishlist-container");
const wishCount = document.querySelector("#wishlist-count");
const cartP = document.querySelector("#cart-products");
const cartCount = document.querySelector("#cart-count");
const checkoutForm = document.querySelector("#checkout-form");
const checkoutItems = document.querySelector("#checkout-items");
const checkoutTotal = document.querySelector("#checkout-total");

async function fetchProducts(API) {
  try {
    const response = await fetch(API);
    const data = await response.json();

    if (productsContainer) {
      renderProducts(data.products);
    }
  } catch (error) {
    console.log(error);
  }
}

if (productsContainer) {
  fetchProducts(API);
}


function formatCategory(c) {
  return c.replace("-", " ");
}


function renderProducts(data) {
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  data.forEach(product => {
    let article = document.createElement("article");

    article.className =
      "bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition";

    let card = `
      <div class="h-48 w-full flex items-center justify-center p-3 mb-4 bg-white">
        <img 
          src="${product.images[0]}"
          alt="${product.title}" 
          class="max-h-full max-w-full object-contain" 
          loading="lazy"
        >
      </div>

      <div class="flex-grow flex flex-col">

        <span class="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
          ${formatCategory(product.category)}
        </span>

        <h2 
          class="font-semibold text-slate-900 text-sm mb-2 line-clamp-2" 
          title="${product.title}"
        >
          ${product.title}
        </h2>

        <div class="mt-auto pt-2">
          <span class="text-lg font-bold text-slate-900">
            $${product.price}
          </span>
        </div>

        <a 
          href="product-details.html?id=${product.id}"
          class="mt-4 block w-full text-center bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded transition"
        >
          View Details
        </a>

      </div>
    `;

    article.innerHTML = card;
    productsContainer.append(article);
  });
}


async function fetchCategories(dc) {
  try {
    const response = await fetch(CATEGORY_API);
    const data = await response.json();

    if (categoryFilters) {
      renderCategories(data, dc);
    }
  } catch (error) {
    console.log(error);
  }
}


if (productsContainer) {
  fetchCategories("all");
}


function renderCategories(data, dc) {
  if (!categoryFilters) return;

  categoryFilters.innerHTML = "";

  [{ name: "all", slug: "all" }, ...data].forEach(product => {

    let button = document.createElement("button");

    if (product.slug === dc) {
      button.className =
        "px-4 py-1.5 rounded-md text-sm font-medium capitalize bg-teal-700 text-white transition";
    } else {
      button.className =
        "px-4 py-1.5 rounded-md text-sm font-medium bg-white text-slate-700 capitalize border border-slate-300 hover:bg-slate-100 transition";
    }

    button.type = "button";
    button.textContent = product.name;
    button.dataset.category = product.slug;

    categoryFilters.append(button);
  });
}


if (categoryFilters) {

  categoryFilters.addEventListener("click", e => {

    const element = e.target.closest("button");

    if (!element) return;

    const text = element.dataset.category;

    if (text !== "all") {

      const CATEGORYFILTER_API =
        `https://dummyjson.com/products/category/${text}?limit=0`;

      fetchProducts(CATEGORYFILTER_API);

    } else {

      fetchProducts(API);

    }

    fetchCategories(text);
  });
}


if (searchInput) {

  searchInput.addEventListener("input", e => {

    let val = e.target.value;

    // If search box is empty, show all products
    if (val.trim() === "") {
      fetchProducts(API);
      return;
    }

    fetchProducts(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(val)}`
    );

  });
}


if (productsContainer) {

  productsContainer.addEventListener("click", e => {
    e.stopPropagation();
  });

}


/* =========================================================
   PRODUCT DETAILS
========================================================= */

async function fetchVeiwProduct() {

  try {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const response =
      await fetch(`https://dummyjson.com/products/${id}`);

    const data = await response.json();

    viewOneProduct(data);

  } catch (error) {

    console.log(error);

  }

}


if (productDetailContainer) {
  fetchVeiwProduct();
}


function viewOneProduct(p) {

  const view = `

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

      <div class="bg-white border border-slate-200 rounded-lg p-8 flex items-center justify-center min-h-[350px] md:min-h-[440px]">

        <img 
          src="${p.images[0]}"
          alt="${p.title}" 
          class="max-h-96 max-w-full object-contain"
        >

      </div>


      <div class="flex flex-col">

        <div>

          <span class="inline-block text-xs font-semibold text-teal-700 uppercase tracking-wider mb-2">
            ${p.category}
          </span>

        </div>


        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
          ${p.title}
        </h1>


        <div class="flex items-center gap-1 mb-4">

          <div 
            class="flex items-center" 
            aria-label="${p.rating} out of 5 stars"
          >

            <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>

            <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>

            <svg class="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>

            <svg class="w-5 h-5 text-slate-300 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>

          </div>

          <span class="ml-2 text-sm text-slate-500 font-medium">
            ${p.rating} (${p.reviews ? p.reviews.length : 0} reviews)
          </span>

        </div>


        <div class="mb-6">

          <span class="text-2xl sm:text-3xl font-bold text-slate-900">
            $${p.price}
          </span>

        </div>


        <div class="border-t border-b border-slate-200 py-6 mb-6">

          <p class="text-slate-600 text-base leading-relaxed">
            ${p.description}
          </p>

        </div>


        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">


          <div class="flex items-center border border-slate-300 rounded-md bg-white w-fit">

            <button 
              type="button" 
              id="qty-minus" 
              class="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l-md transition"
              aria-label="Decrease quantity"
            >

              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M20 12H4"
                ></path>
              </svg>

            </button>


            <span 
              id="qty-value" 
              class="w-12 text-center text-sm font-semibold text-slate-900 select-none"
            >
              1
            </span>


            <button 
              type="button" 
              id="qty-plus" 
              class="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r-md transition"
              aria-label="Increase quantity"
            >

              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>

            </button>

          </div>


          <button 
            type="button" 
            id="add-to-cart-btn" 
            class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-medium py-2.5 px-6 rounded-md shadow-sm transition"
          >

            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>

            <span>Add to Cart</span>

          </button>


          <button 
            type="button" 
            id="add-to-wishlist-btn" 
            class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-teal-700 text-teal-700 hover:bg-teal-50 font-medium py-2.5 px-6 rounded-md shadow-sm transition"
          >

            <svg 
              id="wishlist-btn-icon" 
              class="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >

              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>

            </svg>

            <span id="wishlist-btn-text">
              Add to Wishlist
            </span>

          </button>


        </div>

      </div>

    </div>
  `;


  productDetailContainer.innerHTML = "";
  productDetailContainer.innerHTML = view;


  /* =========================
     PRODUCT QUANTITY
  ========================= */

  let quantity = 1;

  const qtyValue = document.querySelector("#qty-value");
  const qtyPlus = document.querySelector("#qty-plus");
  const qtyMinus = document.querySelector("#qty-minus");


  if (qtyPlus) {

    qtyPlus.addEventListener("click", e => {

      e.stopPropagation();

      quantity++;

      qtyValue.textContent = quantity;

    });

  }


  if (qtyMinus) {

    qtyMinus.addEventListener("click", e => {

      e.stopPropagation();

      if (quantity > 1) {

        quantity--;

        qtyValue.textContent = quantity;

      }

    });

  }


  /* =========================
     ADD TO WISHLIST
  ========================= */

  const addToWish =
    document.querySelector("#add-to-wishlist-btn");


  if (addToWish) {

    addToWish.addEventListener("click", e => {

      e.stopPropagation();

      let exists = false;

      let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];


      wishlist.forEach(pro => {

        if (pro.id === p.id) {
          exists = true;
        }

      });


      if (!exists) {
        wishlist.push(p);
      }


      localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
      );


      window.location.reload();

    });

  }


  /* =========================
     ADD TO CART
  ========================= */

  const addToCart =
    document.querySelector("#add-to-cart-btn");


  if (addToCart) {

    addToCart.addEventListener("click", e => {

      e.stopPropagation();

      let exists = false;

      let cartl =
        JSON.parse(localStorage.getItem("cartl")) || [];


      cartl.forEach(c => {

        if (c.id === p.id) {
          exists = true;
        }

      });


      if (!exists) {

        cartl.push({
          ...p,
          quantity: quantity
        });

      } else {

        cartl = cartl.map(c => {

          if (c.id === p.id) {

            return {
              ...c,
              quantity: (c.quantity || 1) + quantity
            };

          }

          return c;

        });

      }


      localStorage.setItem(
        "cartl",
        JSON.stringify(cartl)
      );


      window.location.reload();

    });

  }

}


/* =========================================================
   WISHLIST
========================================================= */

if (wishlistContainer) {

  let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];


  wishlist.forEach((p, index) => {

    let wishDiv = document.createElement("div");


    wishDiv.className =
      "p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between";


    const wish = `

      <div class="flex items-center gap-4 w-full sm:w-auto flex-1 min-w-0">

        <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-200 rounded p-1.5 flex items-center justify-center shrink-0">

          <img 
            src="${p.images[0]}" 
            alt="${p.title}"
            class="max-h-full max-w-full object-contain"
          >

        </div>


        <div class="min-w-0 flex-1">

          <a 
            href="product-details.html?id=${p.id}" 
            class="text-sm font-semibold text-slate-900 hover:text-teal-700 line-clamp-2 transition"
            title="${p.title}"
          >
            ${p.title}
          </a>

          <p class="text-sm font-bold text-slate-900 mt-1">
            $${p.price}
          </p>

        </div>

      </div>


      <div class="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-end">

        <button 
          type="button"
          data-id="${p.id}"
          class="wishlist-add-cart-btn inline-flex items-center justify-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded transition shadow-sm"
        >

          <svg 
            class="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>

          <span>Add to Cart</span>

        </button>


        <button 
          type="button" 
          data-id="${index}"
          class="wishlist-remove-btn inline-flex items-center justify-center gap-1.5 text-slate-500 hover:text-red-600 border border-slate-300 hover:border-red-300 text-sm font-medium py-2 px-3 rounded transition"
          title="Remove from Wishlist"
        >

          <svg 
            class="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4v3M4 7h16"
            ></path>
          </svg>

          <span>Remove from Wishlist</span>

        </button>

      </div>

    `;


    wishDiv.innerHTML = wish;

    wishlistContainer.append(wishDiv);

  });


  /* =========================
     REMOVE FROM WISHLIST
  ========================= */

  const removeBtn =
    document.querySelectorAll(".wishlist-remove-btn");


  removeBtn.forEach(Btn => {

    Btn.addEventListener("click", e => {

      e.stopPropagation();

      let index =
        Number(e.currentTarget.dataset.id);


      deleteElementFromStorage(
        "wishlist",
        index
      );


      window.location.reload();

    });

  });


  /* =========================
     WISHLIST -> CART
  ========================= */

  const wishCartBtn =
    document.querySelectorAll(".wishlist-add-cart-btn");


  wishCartBtn.forEach(Btn => {

    Btn.addEventListener("click", e => {

      e.stopPropagation();

      const id =
        Number(e.currentTarget.dataset.id);


      const product =
        wishlist.find(p => p.id === id);


      if (!product) return;


      let cartl =
        JSON.parse(localStorage.getItem("cartl")) || [];


      let exists = false;


      cartl.forEach(c => {

        if (c.id === product.id) {
          exists = true;
        }

      });


      if (!exists) {

        cartl.push({
          ...product,
          quantity: 1
        });

      }


      localStorage.setItem(
        "cartl",
        JSON.stringify(cartl)
      );


      window.location.reload();

    });

  });

}


/* =========================================================
   DELETE FROM LOCAL STORAGE
========================================================= */

function deleteElementFromStorage(key, index) {

  const storageData =
    localStorage.getItem(key);


  if (!storageData) return;


  const array =
    JSON.parse(storageData);


  array.splice(index, 1);


  localStorage.setItem(
    key,
    JSON.stringify(array)
  );

}


/* =========================================================
   WISHLIST COUNT
========================================================= */

let WLArray =
  JSON.parse(localStorage.getItem("wishlist")) || [];


if (wishCount) {

  wishCount.textContent =
    WLArray.length;

}


/* =========================================================
   CART
========================================================= */

if (cartP) {

  let cartl =
    JSON.parse(localStorage.getItem("cartl")) || [];


  cartl.forEach((p, index) => {

    let div =
      document.createElement("div");


    div.className =
      "product p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between";


    let quantity =
      p.quantity || 1;


    let cp = `

      <div class="flex items-center gap-4 w-full sm:w-auto flex-1 min-w-0">

        <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-slate-200 rounded p-1.5 flex items-center justify-center shrink-0">

          <img 
            src="${p.images[0]}"
            alt="${p.title}"
            class="max-h-full max-w-full object-contain"
          >

        </div>


        <div class="min-w-0 flex-1">

          <a 
            href="product-details.html?id=${p.id}"
            class="text-sm font-semibold text-slate-900 hover:text-teal-700 line-clamp-2 transition"
            title="${p.title}"
          >
            ${p.title}
          </a>

          <p class="text-xs text-slate-500 mt-1">
            $${p.price} each
          </p>

        </div>

      </div>


      <div class="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto shrink-0">


        <div class="flex items-center border border-slate-300 rounded bg-white">

          <button 
            type="button"
            data-index="${index}"
            class="cart-qty-minus p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l transition"
            aria-label="Decrease quantity"
          >

            <svg 
              class="w-3.5 h-3.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2"
                d="M20 12H4"
              ></path>
            </svg>

          </button>


          <span class="qt w-8 text-center text-xs font-semibold text-slate-800 select-none">
            ${quantity}
          </span>


          <button 
            type="button"
            data-index="${index}"
            class="cart-qty-plus p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r transition"
            aria-label="Increase quantity"
          >

            <svg 
              class="w-3.5 h-3.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>

          </button>

        </div>


        <div class="w-20 text-right">

          <span class="text-sm font-bold text-slate-900">
            $${(p.price * quantity).toFixed(2)}
          </span>

        </div>


        <button 
          type="button"
          data-index="${index}"
          class="cart-wishlist-btn text-slate-400 hover:text-teal-700 p-1.5 rounded transition"
          title="Add to Wishlist"
          aria-label="Add to Wishlist"
        >

          <svg 
            class="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >

            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>

          </svg>

        </button>


        <button 
          type="button"
          data-index="${index}"
          class="cart-remove-btn text-slate-400 hover:text-red-600 p-1.5 rounded transition"
          title="Remove from cart"
          aria-label="Remove item"
        >

          <svg 
            class="del w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >

            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4v3M4 7h16"
            ></path>

          </svg>

        </button>


      </div>

    `;


    div.innerHTML = cp;

    cartP.append(div);

  });


  /* =========================
     REMOVE CART ITEM
  ========================= */

  const cart =
    document.querySelectorAll(".cart-remove-btn");


  cart.forEach(c => {

    c.addEventListener("click", e => {

      e.stopPropagation();

      let index =
        Number(e.currentTarget.dataset.index);


      deleteElementFromStorage(
        "cartl",
        index
      );


      window.location.reload();

    });

  });


  /* =========================
     PLUS QUANTITY
  ========================= */

  const cartPlus =
    document.querySelectorAll(".cart-qty-plus");


  cartPlus.forEach(btn => {

    btn.addEventListener("click", e => {

      e.stopPropagation();

      const index =
        Number(e.currentTarget.dataset.index);


      let cartl =
        JSON.parse(localStorage.getItem("cartl")) || [];


      if (!cartl[index]) return;


      cartl[index].quantity =
        (cartl[index].quantity || 1) + 1;


      localStorage.setItem(
        "cartl",
        JSON.stringify(cartl)
      );


      window.location.reload();

    });

  });


  /* =========================
     MINUS QUANTITY
  ========================= */

  const cartMinus =
    document.querySelectorAll(".cart-qty-minus");


  cartMinus.forEach(btn => {

    btn.addEventListener("click", e => {

      e.stopPropagation();

      const index =
        Number(e.currentTarget.dataset.index);


      let cartl =
        JSON.parse(localStorage.getItem("cartl")) || [];


      if (!cartl[index]) return;


      if ((cartl[index].quantity || 1) > 1) {

        cartl[index].quantity--;

        localStorage.setItem(
          "cartl",
          JSON.stringify(cartl)
        );

        window.location.reload();

      }

    });

  });


  /* =========================
     CART -> WISHLIST
  ========================= */

  const cartWishlist =
    document.querySelectorAll(".cart-wishlist-btn");


  cartWishlist.forEach(btn => {

    btn.addEventListener("click", e => {

      e.stopPropagation();

      const index =
        Number(e.currentTarget.dataset.index);


      let cartl =
        JSON.parse(localStorage.getItem("cartl")) || [];


      if (!cartl[index]) return;


      const product =
        cartl[index];


      let wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];


      let exists = false;


      wishlist.forEach(w => {

        if (w.id === product.id) {
          exists = true;
        }

      });


      if (!exists) {

        wishlist.push(product);

        localStorage.setItem(
          "wishlist",
          JSON.stringify(wishlist)
        );

      }


      window.location.reload();

    });

  });

}


/* =========================================================
   CART COUNT
========================================================= */

let cartArray =
  JSON.parse(localStorage.getItem("cartl")) || [];


if (cartCount) {

  cartCount.textContent =
    cartArray.length;

}
// =========================
// CART TOTAL
// =========================
let orderTotal = 0;

cartArray.forEach(item => {
    orderTotal += Number(item.price) * (Number(item.quantity) || 1);
});

const totalAmount = document.querySelector(".ta");

if (totalAmount) {
    totalAmount.textContent = `₹${orderTotal.toFixed(2)}`;
}


// =========================
// CHECKOUT BUTTON
// =========================

const checkoutBtn = document.querySelector("#checkout-btn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const cart =
            JSON.parse(localStorage.getItem("cartl")) || [];

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Save the order total before clearing cart
        const total =
            cart.reduce((sum, item) => {
                return sum + Number(item.price) * (Number(item.quantity) || 1);
            }, 0);

        // Clear cart
        localStorage.removeItem("cartl");

        // Update cart count
        if (cartCount) {
            cartCount.textContent = "0";
        }

        // Update total
        if (totalAmount) {
            totalAmount.textContent = "₹0.00";
        }

        alert(`Order placed successfully!\nTotal Amount: ₹${total.toFixed(2)}`);

        window.location.href = "index.html";
    });
}
/* =========================================================
   INIT
========================================================= */

function init() {}
