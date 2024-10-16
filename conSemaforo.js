    class Semaphore {
        constructor() {
            this.queue = [];
            this.count = 1; // Controla el acceso de una sola operación a la vez
        }
        
        wait() {
            return new Promise((resolve) => {
                this.queue.push(resolve);
                this.tryAcquire();
            });
        }

        signal() {
            this.count++;
            while (this.count > 0 && this.queue.length > 0) {
                const resolve = this.queue.shift();
                resolve();
                this.count--;
            }
        }

        tryAcquire() {
            if (this.count > 0) {
                this.count--;
                const resolve = this.queue.shift();
                if (resolve) resolve();
            }
        }
    }

    let pedidos = {
        electrodomesticoA: 25,
        electrodomesticoB: 30
    };

    const semaforo = new Semaphore();

    async function procesarPedido(producto, cantidad) {
        await semaforo.wait(); // Espera a que el semáforo permita acceso

        console.log(`Procesando pedido para ${producto}: ${cantidad} unidades.`);

        // Simular un pequeño retraso
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100)); // Retraso aleatorio

        if (pedidos[producto] - cantidad >= 0) {
            pedidos[producto] -= cantidad;
            agregarLog(`Pedido procesado para ${producto}: ${cantidad} unidades. Nuevo stock: ${pedidos[producto]}.`);
        } else {
            agregarLog(`No hay suficiente stock para ${producto}. Pedido no procesado.`);
        }
        actualizarStockUI();
        semaforo.signal(); // Libera el semáforo
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
