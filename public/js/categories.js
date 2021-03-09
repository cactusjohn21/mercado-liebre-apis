window.addEventListener("load", function () {
  fetch("http://localhost:3000/api/products/categories/")
    .then((response) => {
      return response.json();
    })
    .then((resultado) => {
        
      let container = document.querySelector(".products-container");

      resultado.data.forEach((element) => {
        let discount = element.discount > 0 ? `<span> ${element.discount} % OFF</span>` : "";

        container.innerHTML += 
        `<div class="col-12 col-sm-6 col-lg-4">
            <section class="product-box">
               <a href="/products/detail/${element.id} ">
                  <figure class="product-box_image">
                     <img src="/images/products/${element.image}" alt="${element.name}">
                  </figure>
                  <article class="product-box_data">
                     <h2>${element.price - (element.price * element.discount) / 100} </h2>
                        ${discount}
                     <p>${element.name} </p>
                     <i class="fas fa-truck"></i>
                  </article>
               </a>
            </section>
         </div>`;
      });
    });

    let vinculo = document.querySelectorAll('.product-detail-info a')
    
      for(let i = 0; i < vinculo.length; i++) {
         vinculo[i].addEventListener('click', function(e) {

            e.preventDefault()
            
            fetch("http://localhost:3000/api/products/categories/" + vinculo[i].outerText)
               .then((response) => {
                  return response.json()
               })
               .then((resultado) => {

                  let titulo = document.getElementById('title')

                  let container1 = document.querySelector(".products-container");
                  
                  container1.innerHTML = ``
                  
                  resultado.data.forEach((element) => {
                     console.log(element);

                  titulo.innerHTML = 
                  `<h1 class="products-title"> ${element.category.name} </h1>`
                  
                  let discount = element.discount > 0 ? `<span> ${element.discount} % OFF</span>` : "";
                  
                  container1.innerHTML += 
                  `<div class="col-12 col-sm-6 col-lg-4">
                        <section class="product-box">
                           <a href="/products/detail/${element.id} ">
                              <figure class="product-box_image">
                                 <img src="/images/products/${element.image}" alt="${element.name}">
                              </figure>
                              <article class="product-box_data">
                                 <h2>${element.price - (element.price * element.discount) / 100} </h2>
                                    ${discount}
                                 <p>${element.name} </p>
                                 <i class="fas fa-truck"></i>
                              </article>
                           </a>
                        </section>
                     </div>`;
                  });
               })
         })
      }
});
