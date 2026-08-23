
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

