 alert("V14 CARGADO");

// resto de tu código...
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
    // Elimina enlaces previos si los hubiera
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

/* EVITA EL PRIMER Y ÚLTIMO SALTO DE LIENA EN LOS ELEMENTOS QUE TENGAN EL ATRIBUTO [PRE0]... 
y TAMBIEN SUS ELEMENTOS ANIDADOS.  Tambien elmina los espacios en blanco antes y después de las etiquetas <hr> e <img>: */

document.addEventListener("DOMContentLoaded", () => {
  // Selecciona <pre>, [pre0], [pre_dest] y [pre_cita], procesándolos de dentro hacia afuera (.reverse())
  const elementos = Array.from(document.querySelectorAll("pre, img, code, [pre0], [pre_dest], [pre_cita]")).reverse();

  elementos.forEach(el => {
    // 1. Limpiamos espacios y saltos de línea iniciales y finales habituales
    let htmlLimpio = el.innerHTML.trim();

    // 2. Eliminamos los espacios y saltos de línea tanto ANTES como DESPUÉS de <hr> o <img>
    // - Primera parte: elimina saltos/espacios antes de la etiqueta y deja la etiqueta ($2)
    htmlLimpio = htmlLimpio.replace(/[\r?\n]+\s*(<hr\b[^>]*>|<img\b[^>]*>)/gi, "$1");
    
    // - Segunda parte: elimina saltos/espacios después de la etiqueta manteniendo la etiqueta ($1)
    htmlLimpio = htmlLimpio.replace(/(<hr\b[^>]*>|<img\b[^>]*>)\s*[\r?\n]+/gi, "$1");

    el.innerHTML = htmlLimpio;
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
      block: 'center'
      //block: 'start'

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
