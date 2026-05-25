/* =========================
   FILTROS DE PRODUCTOS
========================= */

const filterButtons = document.querySelectorAll(".filters button");

const productCards = document.querySelectorAll(".producto-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    /* REMOVER ACTIVE */

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    /* AGREGAR ACTIVE */

    button.classList.add("active");

    const filter = button.dataset.filter;

    /* FILTRAR PRODUCTOS */

    productCards.forEach((card) => {
      if (filter === "all" || card.classList.contains(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

/* =========================
   CARRITO DE COMPRAS
========================= */

const botonesCarrito = document.querySelectorAll(".agregar-carrito");

const listaCarrito = document.getElementById("lista-carrito");

const contadorCarrito = document.getElementById("contador-carrito");

const totalElemento = document.getElementById("total");

/* ARRAY DEL CARRITO */

let carrito = [];

let total = 0;

/* AGREGAR PRODUCTOS */

botonesCarrito.forEach((boton) => {
  boton.addEventListener("click", () => {
    const producto = boton.dataset.producto;

    const precio = parseInt(boton.dataset.precio);

    /* GUARDAR EN ARRAY */

    carrito.push({
      producto,
      precio,
    });

    /* ACTUALIZAR TOTAL */

    total += precio;

    actualizarCarrito();

    /* ANIMACION BOTON */

    boton.innerHTML = "Agregado ✓";

    boton.style.background = "#d7ff3f";

    boton.style.color = "#000";

    setTimeout(() => {
      boton.innerHTML = "Agregar al carrito";

      boton.style.background = "";

      boton.style.color = "";
    }, 1500);
  });
});

/* =========================
   ACTUALIZAR CARRITO
========================= */

function actualizarCarrito() {
  /* LIMPIAR HTML */

  listaCarrito.innerHTML = "";

  /* RECORRER PRODUCTOS */

  carrito.forEach((item, index) => {
    const li = document.createElement("li");

    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
    );

    li.innerHTML = `

            <div>

                <h6 class="mb-1">
                    ${item.producto}
                </h6>

                <small>
                    $${item.precio} MXN
                </small>

            </div>

            <button
                class="btn btn-sm btn-danger eliminar-producto"
                data-index="${index}"
            >
                <i class="fa-solid fa-trash"></i>
            </button>

        `;

    listaCarrito.appendChild(li);
  });

  /* CONTADOR */

  contadorCarrito.textContent = carrito.length;

  /* TOTAL */

  totalElemento.textContent = total.toLocaleString();

  /* ELIMINAR PRODUCTOS */

  const botonesEliminar = document.querySelectorAll(".eliminar-producto");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const index = boton.dataset.index;

      eliminarProducto(index);
    });
  });
}

/* =========================
   ELIMINAR PRODUCTO
========================= */

function eliminarProducto(index) {
  total -= carrito[index].precio;

  carrito.splice(index, 1);

  actualizarCarrito();
}

/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar = document.querySelector(".custom-navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(15, 23, 42, 0.95)";

    navbar.style.padding = "12px 0";
  } else {
    navbar.style.background = "rgba(15, 23, 42, 0.85)";

    navbar.style.padding = "18px 0";
  }
});

/* =========================
   ANIMACION SCROLL
========================= */

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".product-card").forEach((card) => {
  card.classList.add("hidden");

  observer.observe(card);
});

/* =========================
   BUSCADOR SIMPLE
========================= */

const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
  const texto = prompt("Buscar producto:");

  if (!texto) return;

  const busqueda = texto.toLowerCase();

  productCards.forEach((card) => {
    const titulo = card.querySelector("h5").textContent.toLowerCase();

    if (titulo.includes(busqueda)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

/* =========================
   FINALIZAR COMPRA
========================= */

const checkoutBtn = document.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");

    return;
  }

  alert("Gracias por tu compra ⚽🔥");

  /* RESETEAR */

  carrito = [];

  total = 0;

  actualizarCarrito();
});

/* =========================
   ESTILOS DINAMICOS
========================= */

document.querySelectorAll(".product-card").forEach((card) => {
  card.style.transition = "0.4s ease";
});

/* =========================
   CLASES ANIMACION
========================= */

const style = document.createElement("style");

style.innerHTML = `

.hidden{
    opacity:0;
    transform:translateY(40px);
    transition:all 0.8s ease;
}

.show{
    opacity:1;
    transform:translateY(0);
}

`;

document.head.appendChild(style);
