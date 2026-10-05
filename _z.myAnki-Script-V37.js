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
    // Definimos la lista de selectores sobre los que queremos actuar (incluyendo [pre0] y el resto)
    const selectorCompleto = "pre, img, code, [pre0], [prex], [pre_dest], [pre_cita], [pre_x]";

    // 1. Aplicar estilos de texto para evitar cortes de palabras y justificar el texto
    const todosLosElementos = document.querySelectorAll(selectorCompleto);
    todosLosElementos.forEach(el => {
      // Respeta saltos de línea y espacios en blanco pero permite ajuste natural
      el.style.whiteSpace = "pre-wrap";
      // Evita que las palabras se rompan de forma forzada a mitad de sílaba
      el.style.wordBreak = "normal";
      el.style.overflowWrap = "break-word";
      // Justifica el texto en los elementos seleccionados
      el.style.textAlign = "justify";
    });

    // 2. Procesa elementos individuales en orden inverso (lógica de img, hr, etc.)
    const elementos = Array.from(
      document.querySelectorAll(selectorCompleto)
    ).reverse();

    elementos.forEach(el => {
      let htmlLimpio = el.innerHTML.trim();
      // Elimina espacios o saltos previos a etiquetas <hr> o <img>
      htmlLimpio = htmlLimpio.replace(/(?:\r?\n|\s)+(?=<hr\b|<img\b)/gi, "");
      // Elimina espacios o saltos posteriores a etiquetas <hr> o <img>
      htmlLimpio = htmlLimpio.replace(/(<hr\b[^>]*>|<img\b[^>]*>)(?:\r?\n|\s)+/gi, "$1");
      el.innerHTML = htmlLimpio;
    });

    // 3. Elimina los espacios y saltos de línea vacíos entre bloques div consecutivos dentro de <pre>
    const contenedoresPre = document.querySelectorAll("pre");
    contenedoresPre.forEach(pre => {
      let htmlPre = pre.innerHTML;
      
      // Elimina espacios entre etiquetas de cierre y apertura (><)
      htmlPre = htmlPre.replace(/>\s+</g, '><');
      
      // Elimina el salto de línea sobrante justo DESPUÉS de un </div> cuando sigue texto suelto
      htmlPre = htmlPre.replace(/(<\/div>)\s*[\r\n]+\s*/gi, '$1');

      pre.innerHTML = htmlPre;
    });

    // 4. Elimina el salto de línea inicial justo después de la etiqueta de apertura en elementos [pre_x], [pre0] o similares
    const elementosPreX = document.querySelectorAll("[pre_x], [pre0]");
    elementosPreX.forEach(el => {
      el.innerHTML = el.innerHTML.replace(/^\s*[\r\n]+/, "");
    });
  }

  // Comprueba el estado de carga del documento para ejecutar la función en el momento adecuado
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
