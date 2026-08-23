
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
