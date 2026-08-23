
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

  // Ejecutar de inmediato y por si acaso un reintento mínimo
  scrollToCloze();
  setTimeout(scrollToCloze, 50);
})();
