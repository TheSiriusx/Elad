// Configuración de múltiples webhooks de Discord
const DISCORD_WEBHOOKS = [
    {
        url: 'https://discord.com/api/webhooks/1567919915040776263/Zkai-anfqHHE3KCvQztXxN5XKS1Hx7_QLLuX2O5i9hNWwa4KGPmQm35fQDWCdXyvH-jA',
        name: 'Webhook Principal'
    },
    {
        url: 'https://discord.com/api/webhooks/1567919915040776263/Zkai-anfqHHE3KCvQztXxN5XKS1Hx7_QLLuX2O5i9hNWwa4KGPmQm35fQDWCdXyvH-jA',
        name: 'Webhook Secundario'
    }
];

async function obtenerIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error al obtener la IP:', error);
        return 'No detectada';
    }
}

async function enviarADiscord(mensaje) {
    try {
        const promesasEnvio = [];

        // Crear un embed para mejor formato en Discord
        const embed = {
            title: "Notificación del Sistema",
            description: mensaje,
            color: 5814783, // Color azul (#00AEEF en decimal)
            timestamp: new Date().toISOString()
        };

        // Recorrer cada webhook configurado
        DISCORD_WEBHOOKS.forEach(webhook => {
            // Ignorar webhooks vacíos o de ejemplo
            if (!webhook.url || webhook.url.includes('AQUÍ_VA')) return;

            const payload = {
                content: "",
                embeds: [embed],
                username: "Sistema de Notificaciones",
                avatar_url: "https://example.com/avatar.png" // Opcional
            };

            const promesa = fetch(webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            promesasEnvio.push(promesa);
        });

        // Ejecutar todos los envíos en paralelo de manera simultánea
        await Promise.all(promesasEnvio);
        return true;
    } catch (error) {
        console.error('Error al enviar a Discord:', error);
        return false;
    }
}

function obtenerFechaHora() {
    return new Date().toLocaleString('es-VE', { timeZone: 'America/Caracas' });
}