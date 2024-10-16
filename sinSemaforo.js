    let pedidos = {
        electrodomesticoA: 25,
        electrodomesticoB: 30
    };

    async function procesarPedido(producto, cantidad) {
        console.log(`Procesando pedido para ${producto}: ${cantidad} unidades.`);
        agregarLog(`Procesando pedido para ${producto}: ${cantidad} unidades.`);

        // Simular un pequeño retraso
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100)); // Retraso aleatorio

        if (pedidos[producto] + cantidad >= 0) {
            pedidos[producto] -= cantidad;

            console.log(`Pedido procesado. Nuevo pedido para ${producto}: ${pedidos[producto]} unidades.`);
            agregarLog(`Pedido procesado. Nuevo stock para ${producto}: ${pedidos[producto]} unidades.`);

        } else {
            console.log(`No hay suficiente stock para ${producto}. Pedido no procesado.`);
            agregarLog(`No hay suficiente stock para ${producto}. Pedido no procesado.`);
        }

        actualizarStockUI();
    }

    // Simulación de pedidos concurrentes
    async function realizarPedidos() {
        await Promise.all([
            procesarPedido('electrodomesticoA', 2), 
            procesarPedido('electrodomesticoA', 4),
            procesarPedido('electrodomesticoB', 1),
        ]);
    }

    //realizarPedidos();
