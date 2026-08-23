
//PARA QUE AL MOSTRARSE PREGUNTA VAYA DIRECTAMENTE AL CLOZE ACTIVO
(function () {
  function scrollToCloze() {
    const cloze = document.querySelector('.cloze');
    if (!cloze) return;

    cloze.scrollIntoView({
      behavior: 'auto',
      block: 'center'
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


// ABRE LOS "DETAILS" QUE TIENEN EL CLOZE ACTIVO
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
