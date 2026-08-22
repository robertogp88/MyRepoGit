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