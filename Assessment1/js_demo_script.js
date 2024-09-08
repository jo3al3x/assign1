// Define the topMovies array
const topMovies = [
    { title: "The Shawshank Redemption", year: 1994, image_url: "https://www.filmsite.org/posters/shawshankredemption.jpg" },
    { title: "The Godfather", year: 1972, image_url: "https://www.filmsite.org/posters/godfather.jpg" },
    { title: "The Dark Knight", year: 2008, image_url: "https://www.filmsite.org/posters/darkknight.jpg" },
    { title: "Pulp Fiction", year: 1994, image_url: "https://www.filmsite.org/posters/pulpfiction.jpg" }
];

let autoSlideIndex = 0;
let slideshowInterval;

function setActive(button, demoId) {
    // Remove 'active' class from all buttons
    document.querySelectorAll('.demo-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add 'active' class to clicked button
    button.classList.add('active');

    // Hide all demo sections
    document.querySelectorAll('.demo-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected demo section
    const selectedSection = document.getElementById(demoId + 'Content');
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Clear any existing interval
    clearInterval(slideshowInterval);

    // Start slideshow if Demo 1 is selected
    if (demoId === 'demo1') {
        autoSlideIndex = 0;
        updateSlide();
        startSlideshow();
    }
}

function updateSlide() {
    document.getElementById("auto-slide-title").innerHTML = topMovies[autoSlideIndex].title;
    document.getElementById("auto-slide-year").innerHTML = topMovies[autoSlideIndex].year;
    document.getElementById("auto-slide-image").src = topMovies[autoSlideIndex].image_url;
}

function startSlideshow() {
    slideshowInterval = setInterval(() => {
        autoSlideIndex = (autoSlideIndex + 1) % topMovies.length;
        updateSlide();
    }, 2000);
}

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.demo-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            setActive(this, this.id);
        });
    });
});


//Slideshow: Manual
let slideIndex = 0;//Initial slide = 0
function nextSlide() {
	//Change the slide_index
	if (slideIndex < topMovies.length - 1) {
		slideIndex++;
	} else {
		slideIndex = 0;
	}
	//Change the title, year and image source accordingly
	document.getElementById("manual-slide-title").innerHTML = topMovies[slideIndex].title;
  document.getElementById("manual-slide-year").innerHTML = topMovies[slideIndex].year;
	document.getElementById("manual-slide-image").src = topMovies[slideIndex].image_url;	
}

function previousSlide() {
	//Change the slide_index
	if (slideIndex > 0) {
		slideIndex--;
	} else {
		slideIndex = topMovies.length - 1;
	}
	//Change the title, year and image source accordingly
	document.getElementById("manual-slide-title").innerHTML = topMovies[slideIndex].title;
	document.getElementById("manual-slide-image").src = topMovies[slideIndex].image_url;		
}



/* Demo 2 section *************/

document.addEventListener('DOMContentLoaded', function() {
    const bgColorSelect = document.getElementById('bgColor');
    const textColorSelect = document.getElementById('textColor');
    const textSizeSelect = document.getElementById('textSize');
    const customizableContent = document.getElementById('customizableContent');

    function updateCustomization() {
        customizableContent.style.backgroundColor = bgColorSelect.value;
        customizableContent.style.color = textColorSelect.value;
        
        switch(textSizeSelect.value) {
            case 'small':
                customizableContent.style.fontSize = '14px';
                break;
            case 'medium':
                customizableContent.style.fontSize = '16px';
                break;
            case 'large':
                customizableContent.style.fontSize = '18px';
                break;
        }
    }

    bgColorSelect.addEventListener('change', updateCustomization);
    textColorSelect.addEventListener('change', updateCustomization);
    textSizeSelect.addEventListener('change', updateCustomization);

    // Initial call to set default styles
    updateCustomization();
});


let users = [];

// Check if user is already logged in
function checkLoginStatus() {
  const username = getCookie("username");
  if (username) {
    document.getElementById("message").textContent = `Welcome back, ${username}!`;
    document.getElementById("signUpSection").style.display = "none";
    document.getElementById("signInSection").style.display = "none";
  }
}

function signUp() {
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;
  
  if (users.some(user => user.username === username)) {
    document.getElementById("message").textContent = "Username already exists!";
  } else {
    users.push({ username, password });
    document.getElementById("message").textContent = "Account created successfully!";
  }
}

function signIn() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    document.getElementById("message").textContent = `Welcome, ${username}!`;
    setCookie("username", username, 1); // Set cookie for 1 day
    document.getElementById("signUpSection").style.display = "none";
    document.getElementById("signInSection").style.display = "none";
  } else {
    document.getElementById("message").textContent = "Invalid username or password!";
  }
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

checkLoginStatus();


/**** Demo 4 section */

// Existing product data
const products = [
  { id: 1, title: "GGPC RTX 4060 Ti Gaming PC", image: "https://www.pbtech.co.nz/imgprod/W/K/WKSGGPC10428__1.jpg?h=56598360", price: 2183.85, description: "Intel Core i7 12700F 12 Cores / 20 Threads - 32GB RGB RAM - 1TB NVMe SSD - NVIDIA GeForce RTX4060Ti 8GB Graphics - AX WiFi 6 + Bluetooth - Windows 11 Home" },
  { id: 2, title: "GGPC RTX 3050 Gaming Upgrade Box", image: "https://www.pbtech.co.nz/imgprod/W/K/WKSGGPC40021__1.jpg?h=2955173915", price: 1149.00, description: "Intel Core i5 12400F 6 Cores / 12 Threads - 16GB RAM - 500GB SSD - NVIDIA GeForce RTX3050 Graphics - AX WiFi + Bluetooth - No Operating System" },
  { id: 3, title: "GGPC RTX 3050 Gaming PC", image: "https://www.pbtech.co.nz/imgprod/W/K/WKSGGPC10021__1.jpg?h=3865455039", price: 1378.85, description: "AMD Ryzen 5 5500 6 Cores / 12 Threads - 16GB RAM - 500GB NVMe SSD - NVIDIA GeForce RTX3050 6GB Graphics - AC WiFi + Bluetooth - Windows 11 Home" },
  { id: 4, title: "MSI NVIDIA GeForce RTX 4060 GAMING X MLG Edition 8GB OC GDDR6", image: "https://www.pbtech.co.nz/imgprod/V/G/VGAMSI440604__1.jpg?h=1565990512", price: 629.99, description: "GeForce RTX™ 4060 GAMING X 8G MLG" },
  { id: 5, title: "ASUS DUAL NVIDIA GeForce RTX 4060 OC 8GB GDDR6 Graphics Card", image: "https://www.pbtech.co.nz/imgprod/V/G/VGAASU340600A__1.jpg?h=115499182", price: 559.99, description: "ASUS Dual GeForce RTX™ 4060 V2 OC Edition 8GB GDDR6" },
  { id: 6, title: "PNY NVIDIA Geforce RTX 4060 Ti XLR8 Gaming VERTO EPIC-X RGB Overclocked Graphics Card", image: "https://www.pbtech.co.nz/imgprod/V/G/VGAPNY14162__1.jpg?h=3526351767", price: 749.99, description: "PNY NVIDIA Geforce RTX 4060 Ti XLR8 Gaming VERTO EPIC-X RGB Overclocked Graphics Card" },
];

// Existing product data remains the same

// Existing product data remains the same

let cart = [];

function renderProducts() {
  const productGrid = document.querySelector('.product-grid');
  productGrid.innerHTML = ''; // Clear existing content
  products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.className = 'product';
      productElement.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <div class="product-info">
              <h3>${product.title}</h3>
              <p>$${product.price.toFixed(2)}</p>
              <p class="product-description">${product.description}</p>
              <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
      `;
      productGrid.appendChild(productElement);
  });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCart();
        updateCartCount();
    }
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
          <div class="cart-item-info">
              <span>${item.title} - $${item.price.toFixed(2)}</span>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(li);
      total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length > 0 ? 'inline' : 'none';
    }
}

function toggleCart() {
    const cartPopup = document.querySelector('.cart-popup');
    if (cartPopup) {
        cartPopup.style.display = cartPopup.style.display === 'none' ? 'block' : 'none';
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    updateCartCount();
}

function removeAllFromCart() {
    cart = [];
    updateCart();
    updateCartCount();
}

// Initialize Demo 4
function initializeDemo4() {
    renderProducts();
    
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', toggleCart);
    }

    const removeAllButton = document.getElementById('remove-all-btn');
    if (removeAllButton) {
        removeAllButton.addEventListener('click', removeAllFromCart);
    }

    const closeCartButton = document.getElementById('close-cart-btn');
    if (closeCartButton) {
        closeCartButton.addEventListener('click', toggleCart);
    }
}



// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.demo-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            setActive(this, this.id);
            if (this.id === 'demo4') {
                initializeDemo4();
            }
        });
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    document.querySelector('.cart-icon').addEventListener('click', toggleCart);
    document.querySelector('.remove-all-btn').addEventListener('click', removeAllItems);
});