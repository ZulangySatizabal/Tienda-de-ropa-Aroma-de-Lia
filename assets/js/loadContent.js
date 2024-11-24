document.addEventListener("DOMContentLoaded", function () {
    async function loadContent() {
        const headerResponse = await fetch('../../pages/header.html');
        const footerResponse = await fetch('../../pages/footer.html');
        
        // Comprobar si ambas respuestas son correctas
        if (!footerResponse.ok) {
            console.error('Error al cargar footer.html');
            return;
        }
        
        // Cargar el contenido del footer
        const footerData = await footerResponse.text();
        const footerElement = document.getElementById('footer');
        
        // Insertar el footer solo si el elemento con id 'footer' existe
        if (footerElement) {
            footerElement.innerHTML = footerData;
        } else {
            console.warn('El div con id "footer" no se encontró.');
        }

        // Cargar el contenido del header solo si el div con id "header" existe
        if (headerResponse.ok) {
            const headerData = await headerResponse.text();
            const headerElement = document.getElementById('header');
            
            // Insertar el header solo si el elemento con id 'header' existe
            if (headerElement) {
                headerElement.innerHTML = headerData;
            } else {
                console.warn('El div con id "header" no se encontró.');
            }
        } else {
            console.error('Error al cargar header.html');
        }
    }

    loadContent();
});
