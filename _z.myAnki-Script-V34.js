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





/* 🟦🟧🟫🟦🟧🟫 PREFORMATED 🟦🟧🟫🟦🟧🟫 */
/* 🟦🟧🟫🟦🟧🟫 PREFORMATED 🟦🟧🟫🟦🟧🟫 */
/* 🟦🟧🟫🟦🟧🟫 PREFORMATED 🟦🟧🟫🟦🟧🟫 */
/* EVITA EL PRIMER Y ÚLTIMO SALTO DE LIENA EN LOS ELEMENTOS QUE TENGAN EL ATRIBUTO [PRE0]... 
y TAMBIEN SUS ELEMENTOS ANIDADOS.  Tambien elmina los espacios en blanco antes y después de las etiquetas <hr> e <img>: */
(function() {
  function procesarEspacios() {
    // 1. Procesa elementos individuales (lógica de img, hr, etc.)
    const elementos = Array.from(
      document.querySelectorAll("pre, img, code, [pre0], [prex], [pre_dest], [pre_cita], [pre_x]")
    ).reverse();

    elementos.forEach(el => {
      let htmlLimpio = el.innerHTML.trim();
      htmlLimpio = htmlLimpio.replace(/(?:\r?\n|\s)+(?=<hr\b|<img\b)/gi, "");
      htmlLimpio = htmlLimpio.replace(/(<hr\b[^>]*>|<img\b[^>]*>)(?:\r?\n|\s)+/gi, "$1");
      el.innerHTML = htmlLimpio;
    });

    // 2. Elimina los espacios y saltos de línea vacíos entre bloques div consecutivos
    const contenedoresPre = document.querySelectorAll("pre");
    contenedoresPre.forEach(pre => {
      let htmlPre = pre.innerHTML;
      
      // Elimina espacios entre etiquetas de cierre y apertura (><)
      htmlPre = htmlPre.replace(/>\s+</g, '><');
      
      // NUEVO: Elimina el salto de línea sobrante justo DESPUÉS de un </div> cuando sigue texto suelto
      htmlPre = htmlPre.replace(/(<\/div>)\s*[\r\n]+\s*/gi, '$1');

      pre.innerHTML = htmlPre;
    });

    // 3. Elimina el salto de línea inicial justo después de la etiqueta de apertura en [pre_x]
    const elementosPreX = document.querySelectorAll("[pre_x]");
    elementosPreX.forEach(el => {
      el.innerHTML = el.innerHTML.replace(/^\s*[\r\n]+/, "");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", procesarEspacios);
  } else {
    procesarEspacios();
  }
})();


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


// ABRE TODOS LOS <DETAILS> (INCLUIDOS <DETAILS> ANIDADOS) QUE TIENEN EL CLOZE ACTIVO

(function openDetailsWithActiveCloze() {
    function tryOpen() {
        const cloze = document.querySelector(".cloze");
        if (!cloze) return;

        // Recorre todos los ancestros hacia arriba buscando etiquetas <details>
        let parent = cloze.parentElement;
        while (parent) {
            if (parent.tagName && parent.tagName.toLowerCase() === "details") {
                parent.open = true; // Abre tanto el hijo como todos los padres/abuelos
            }
            parent = parent.parentElement;
        }
    }

    // Primer intento inmediato
    tryOpen();

    // Reintentos para compatibilidad con AnkiMobile / WebView
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
