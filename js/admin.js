import {
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    addNewProduct,
  } from "../api/products.js";
  import { mapProductToAdminTableRow } from "../utils/layout.js";
  
  const productsTableBody = document.getElementById("products-table").querySelector("tbody");
  
  document.addEventListener("DOMContentLoaded", displayProducts);
  
  async function displayProducts() {
    const products = await getAllProducts();
    productsTableBody.innerHTML = products.map(mapProductToAdminTableRow).join("");
  }
  
  // Save new product
  const form = document.getElementById("product-form");
  const nameInput = document.getElementById("name");
  const priceInput = document.getElementById("price");
  const imageUrlInput = document.getElementById("image-url");
  const descriptionInput = document.getElementById("description"); // Changed to description
  const saveProductBtn = document.getElementById("save-btn");
  
  let currentEditableProductId;
  let editMode = false;
  
  saveProductBtn.addEventListener("click", saveProduct);
  
  async function saveProduct(event) {
    event.preventDefault();
  
    const product = {
      name: nameInput.value,
      price: Number(priceInput.value),
      imageURL: imageUrlInput.value,
      description: descriptionInput.value, // Corrected to use description
    };
  
    if (editMode) {
      const editedProduct = await updateProduct(product, currentEditableProductId);
      if (editedProduct !== null) {
        form.reset();
        await displayProducts();
        editMode = false;
      }
    } else {
      const newProduct = await addNewProduct(product);
      if (newProduct !== null) {
        form.reset();
        await displayProducts();
      }
    }
  }
  
  productsTableBody.addEventListener("click", handleActions);
  
  async function handleActions(event) {
    if (event.target.classList.contains("edit-btn")) {
      currentEditableProductId = event.target.getAttribute("data-productId");
      const currentProduct = await getProductById(currentEditableProductId);
  
      nameInput.value = currentProduct.name;
      priceInput.value = currentProduct.price;
      imageUrlInput.value = currentProduct.imageURL;
      descriptionInput.value = currentProduct.description; // Corrected to use description
      editMode = true;
    } else if (event.target.classList.contains("delete-btn")) {
      const id = event.target.getAttribute("data-productId");
      await deleteProduct(id);
      await displayProducts();
    }
  }
  