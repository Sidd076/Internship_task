
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const productContainer = document.getElementById('product-container');
    data.products.forEach((product, index) => {
      productContainer.innerHTML += `
        <div class="product">
          <img src="${product.imageURL}" alt="${product.name}">
          <div class="product-info">
            <p class="product-title">${product.name}</p>
            <p class="product-desc">${product.description}</p>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-discounted-price" style="display: none;"></p>
            <button class="btn" onclick="calculateDiscountedPrice(${product.price}, ${index})">Apply Discount</button>
          </div>
        </div>
      `;
    });
  })
  .catch(error => console.error('Error fetching product data:', error));

      function calculateDiscountedPrice(originalPrice, productIndex) {
          const discounts = [0.2, 0.3, 0.4];
          const minPrice = 20;
  
          // Check if the original price is missing or not a number
          if (isNaN(originalPrice)) {
              alert("Invalid product price.");
              return;
          }
  
          originalPrice = parseFloat(originalPrice);

          if (originalPrice <= 0) {
              alert("Product price must be greater than 0.");
              return;
          }
  
          if (productIndex < 0 || productIndex >= discounts.length) {
              alert("Invalid product index.");
              return;
          }
  
          let discountedPrice;
  
          
          if (originalPrice < minPrice) {
              discountedPrice = originalPrice;
          } else {
              discountedPrice = originalPrice - originalPrice * discounts[productIndex];
          }
  
          const discountedPriceElement = document.querySelectorAll(".product-discounted-price")[productIndex];
          discountedPriceElement.textContent = `$${discountedPrice.toFixed(2)}`;
          discountedPriceElement.style.display = "block";
      }
  
          function validateDiscountConfig() {
          const customDiscountInputs = document.querySelectorAll(".custom-discount-input");
          const customMinCostInput = document.querySelector(".custom-min-cost-input");
  
          for (const input of customDiscountInputs) {
              const discountRate = parseFloat(input.value);
              if (isNaN(discountRate) || discountRate < 0 || discountRate > 1) {
                  alert("Custom discount rate must be a number between 0 and 1.");
                  input.value = "";
                  return;
              }
          }
  
          const minCost = parseFloat(customMinCostInput.value);
          if (isNaN(minCost) || minCost < 0) {
              alert("Custom minimum item cost must be a positive number.");
              customMinCostInput.value = "";
              return;
          }
  
          
          const customDiscountRates = Array.from(customDiscountInputs, input => parseFloat(input.value));
          const minCostInput = parseFloat(customMinCostInput.value);
  
          
          const productPrices = document.querySelectorAll(".product-price");
          productPrices.forEach((priceElement, index) => {
              const originalPrice = parseFloat(priceElement.textContent.replace("$", ""));
              if (!isNaN(originalPrice) && originalPrice >= minCostInput && index < customDiscountRates.length) {
                  const discountedPrice = originalPrice - originalPrice * customDiscountRates[index];
                  const discountedPriceElement = document.querySelectorAll(".product-discounted-price")[index];
                  discountedPriceElement.textContent = `$${discountedPrice.toFixed(2)}`;
                  discountedPriceElement.style.display = "block";
              }
          });
      }
  