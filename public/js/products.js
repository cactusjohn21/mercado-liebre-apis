window.addEventListener("load", function () {
    fetch("http://localhost:3000/api/products/latest")
      .then((response) => {
        return response.json();
      })
      .then((resultado) => {
        console.log(resultado);
  
        let container = document.querySelector("#latest-products");
  
        resultado.data.forEach((element) => {
          let discount = element.discount > 0 ? `<span> ${element.discount} % OFF</span>` : "";
          container.innerHTML += 
          `<div class="col-12 col-sm-6 col-lg-3">
              <section class="product-box">
                  <a href="/products/detail/${element.id}">
                      <figure class="product-box_image">
                          <img src="/images/products/${element.image}" alt="${element.name}">
                      </figure>
                      <article class="product-box_data">
                          <h2>${element.price - (element.price * element.discount) / 100}</h2>
                              ${discount}
                          <p> ${element.name} </p>
                          <i class="fas fa-truck"></i>
                      </article>
                  </a>
              </section>
          </div>`;
        });
      });
  
    fetch("http://localhost:3000/api/products/offers")
      .then((response) => {
        return response.json();
      })
      .then((resultado) => {
        console.log(resultado.data);
        let containerOffer = document.querySelector("#offers-products");
  
        resultado.data.forEach((element) => {
          containerOffer.innerHTML += 
          `<div class="col-12 col-sm-6 col-lg-3">
              <section class="product-box">
                  <a href="/products/detail/${element.id}">
                      <figure class="element-box_image">
                          <img src="/images/products/${element.image}" alt=" ${element.name} ">
                      </figure>
                      <article class="element-box_data">
                          <h2>${element.price - (element.price * element.discount) / 100} </h2>
                          <span>${element.discount} % OFF</span>
                          <p> ${element.name} </p>
                          <i class="fas fa-truck"></i>
                      </article>
                  </a>
              </section>
          </div>`;
        });
      });
  });
  