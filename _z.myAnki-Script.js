    (function() {
        // Seleccionamos todos los divs que contienen el texto sucio
        var elementos = document.querySelectorAll('.contenido-limpio');
        elementos.forEach(function(el) {
            // Quitamos las etiquetas de cloze para que sea legible
			// y envolvemos el texto del cloze en un span para apicar el estilo .cloze-limpio a los clozes inactivos
            el.innerHTML = el.innerHTML.replace(/\{\{c\d+::(.+?)(?:::.+?)?\}\}/g, '<span class="cloze-limpio">$1</span>');
        });
    })();
