export function mapProductToCard(product) {
    return `
          <div class="card flex-col  items-center justify-around gap-20">
              <div class="info  flex-col items-center gap-20">
                  <div class="img">
                      <img src=${product.imageURL} alt="">
                  </div>
                  <div class="name">
                      <h4>${product.name}</h4>
                  </div>
                  <div class="price">${product.price} lei</div>
              </div>
              <button class="add-to-cart">Adauga in cos</button>
          </div>
      `;
  }
  
  export function mapProductToAdminTableRow(product) {
    return `
          <tr>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td><img width="50px" src=${product.imageURL} /></td>
              <td>${product.description} </td>
              <td>
                  <button class="edit-btn" data-productId=${product.id}>Edit</button>
              </td>
              <td>
                  <button class="delete-btn" data-productId=${product.id}>Delete</button>
              </td>
          </tr>
      `;
  }