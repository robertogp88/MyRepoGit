

/* 🟠🟠🟠 GENERAL - GENERAL 🟠🟠🟠*/
/* 🟠🟠🟠 GENERAL - GENERAL 🟠🟠🟠*/
/* 🟠🟠🟠 GENERAL - GENERAL 🟠🟠🟠*/

// PARA MOSTRAR LO OCULTADO AL HACER TAP. HAY CÓDIGO .CSS

function toggleTexto(elemento) {
  elemento.classList.toggle("mostrado");
}



// CÓDIGO JS PARA DESLIZAR Y BUSCAR EN TODOS LOS MAZOS MEDIANTE ACTION USER 1

(function(){
  function ua1() {
    // Elimina enlaces previos s los hubiera
    const old = document.getElementById('ankiSearchLink');
    if (old) old.remove();

    // Crea el enlace con el esquema de búsqueda vacío
    const link = document.createElement('a');
    link.href = 'anki://x-callback-url/search?query=';
    link.id = 'ankiSearchLink';
    link.style.display = 'none';
    document.body.appendChild(link);

    // Simula un clic (esto sí lo permite iOS)
    link.click();
  }

  // Asocia la función al User Action 1
  window.userJs1 = ua1;
})();




/* 🟦🟧🟫🟦🟧🟫 PRE-FORMATED 🟦🟧🟫🟦🟧🟫 */
/* 🟦🟧🟫🟦🟧🟫 PRE-FORMATED 🟦🟧🟫🟦🟧🟫 */
/* 🟦🟧🟫🟦🟧🟫 PRE-FORMATED 🟦🟧🟫🟦🟧🟫 */

// PARA QUE NO HAYA UN SALTO DE LINEA EN LA PRIMERA LÍNEA EN LAS ETIQUETS <SCRIPT> CON CÓDIGO HTML PLANO
  document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("script.codigo-HTML").forEach(el => {
    // Elimina el primer salto de línea si existe al inicio del texto
    el.textContent = el.textContent.replace(/^\r?\n/, "");
  });
});



// PARA QUE NO HAYA UN SALTO DE LINEA EN LA PRIMERA LÍNEA EN LAS ETIQUETS <CODE> CON CÓDIGO HTML PLANO
  document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("code").forEach(el => {
    // Elimina únicamente el primer salto de línea y la indentación inicial si la hay
    el.innerHTML = el.innerHTML.replace(/^\r?\n/, "");
  });
});


// PARA QUE NO HAYA UN SALTO DE LINEA EN LA PRIMERA LÍNEA EN LAS ETIQUETS <PRE> CON CÓDIGO HTML PLANO
  document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre").forEach(el => {
    // Elimina únicamente el primer salto de línea y la indentación inicial si la hay
    el.innerHTML = el.innerHTML.replace(/^\r?\n/, "");
  });
});



// PARA QUE NO HAYA UN SALTO DE LINEA EN LA PRIMERA LÍNEA y LA ÚLTIMA EN LAS ETIQUETS <IMG> CON CÓDIGO HTML PLANO
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("pre").forEach(el => {
    let html = el.innerHTML
      .replace(/^\s*\r?\n/, "")       // Elimina el primer salto inicial
      .replace(/(\r?\n\s*)+$/, "");   // Elimina los saltos finales
      
    // Busca cualquier etiqueta <img> y elimina el salto de línea y espacios de después
    html = html.replace(/(<img\b[^>]*>)\s*\r?\n\s*/gi, "$1");
    
    el.innerHTML = html;
  });
});









/* 🟩🟨🟩🟨🟩🟨 CLOZES - CLOZES - CLOZES 🟩🟨🟩🟨🟩🟨*/
/* 🟩🟨🟩🟨🟩🟨 CLOZES - CLOZES - CLOZES 🟩🟨🟩🟨🟩🟨*/
/* 🟩🟨🟩🟨🟩🟨 CLOZES - CLOZES - CLOZES 🟩🟨🟩🟨🟩🟨*/

// PARA QUE AL MOSTRARSE LA PREGUNTA VAYA DIRECTAMENTE AL CLOZE ACTIVO

(function () {
  function scrollToCloze() {
    const cloze = document.querySelector('.cloze');
    if (!cloze) return;

    cloze.scrollIntoView({
      behavior: 'auto',
    //   block: 'center'
      block: 'start'

    });
  }

  // Espera a que Anki termine de renderizar
  setTimeout(scrollToCloze, 0);
})();



// MOSTRAR CLOZES INACTIVOS EN LOS CAMPOS FUERA DE REPASO 

(function() {
    // Seleccionamos todos los divs que contienen el texto sucio
    var elementos = document.querySelectorAll('.contenido-limpio');
    elementos.forEach(function(el) {
        // Quitamos las etiquetas de cloze para que sea legible
        // y envolvemos el texto del cloze en un span para apicar el estilo .cloze-limpio a los clozes inactivos
        el.innerHTML = el.innerHTML.replace(/\{\{c\d+::(.+?)(?:::.+?)?\}\}/g, '<span class="cloze-limpio">$1</span>');
    });
})();


// ABRE LOS <DETAILS QUE TIENEN EL CLOZE ACTIVO> 

(function openDetailsWithActiveCloze() {
    function tryOpen() {
        const cloze = document.querySelector(".cloze");
        if (!cloze) return;

        const details = cloze.closest("details");
        if (details) {
            details.open = true;
        }
    }

    // Primer intento inmediato
    tryOpen();

    // Reintento breve (AnkiMobile lo necesita)
    setTimeout(tryOpen, 50);
    setTimeout(tryOpen, 150);
})();






/* 🟧🟥🟧🟥🟧🟥 SUMMARY "SMR9" - SUMMARY "SMR9" 🟧🟥🟧🟥🟧🟥 */
/* 🟧🟥🟧🟥🟧🟥 SUMMARY "SMR9" - SUMMARY "SMR9" 🟧🟥🟧🟥🟧🟥 */
/* 🟧🟥🟧🟥🟧🟥 SUMMARY "SMR9" - SUMMARY "SMR9" 🟧🟥🟧🟥🟧🟥 */

// ETIQUETA SUMMARY CON "smr9" EN BORDE INFERIOR DCHO y CONTRACCIÓN C. CLIC/TAP
function initSmr9Labels() {

    document.querySelectorAll("summary[smr9]").forEach(summary => {

        const details = summary.parentElement;
        if (!details || details.querySelector(".smr9-label")) return;

        const label = document.createElement("div");
        label.className = "smr9-label";
        label.textContent = "▲ " + summary.textContent.trim();

        label.onclick = function(e) {

            e.preventDefault();
            e.stopPropagation();

            const wasOpen = details.open;
            const start = details.offsetHeight;

            if (wasOpen) {

                details.style.height = start + "px";
                details.style.overflow = "hidden";

                requestAnimationFrame(() => {

                    details.open = false;

                    const end = summary.offsetHeight;

                    details.style.height = start + "px";

                    requestAnimationFrame(() => {
                        details.style.height = end + "px";
                    });

                });

            } else {

                details.open = true;

                const end = details.scrollHeight;

                details.style.height = summary.offsetHeight + "px";
                details.style.overflow = "hidden";

                requestAnimationFrame(() => {
                    details.style.height = end + "px";
                });

            }

            const onEnd = () => {

                details.style.height = "";
                details.style.overflow = "";

                if (wasOpen) {
                    summary.scrollIntoView({
                        behavior: "instant",
                        block: "start"
                    });
                }

                details.removeEventListener("transitionend", onEnd);
            };

            details.addEventListener("transitionend", onEnd);

        };

        details.appendChild(label);

    });

}

document.readyState === "complete"
    ? initSmr9Labels()
    : window.addEventListener("load", initSmr9Labels);

/* 🟧🟥🟧🟥🟧🟥 FINAL: SUMMARY "SMR9" - SUMMARY "SMR9" 🟧🟥🟧🟥🟧🟥 */
/* 🟧🟥🟧🟥🟧🟥 FINAL: SUMMARY "SMR9" - SUMMARY "SMR9" 🟧🟥🟧🟥🟧🟥 */
/* 🟧🟥🟧🟥🟧🟥 FINAL: SUMMARY "SMR9" - SUMMARY "SMR9" 🟧🟥🟧🟥🟧🟥 */
