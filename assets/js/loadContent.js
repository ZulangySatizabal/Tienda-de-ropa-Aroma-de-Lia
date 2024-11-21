async function loadContent() {
    const headerResponse = await fetch('../../pages/header.html');
    const footerResponse = await fetch('../../pages/footer.html');
    
    if (!headerResponse.ok) {
        console.error('Error al cargar header.html');
        return;
    }
    if (!footerResponse.ok) {
        console.error('Error al cargar footer.html');
        return;
    }
    
    const headerData = await headerResponse.text();
    const footerData = await footerResponse.text();
    
    // Insertar los contenidos en los elementos con id "header" y "footer"
    document.getElementById('header').innerHTML = headerData;
    document.getElementById('footer').innerHTML = footerData;
}

loadContent();
