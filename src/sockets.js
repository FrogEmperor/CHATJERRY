module.exports = function(io){

let animales = ["perro","gato","canguro","ballena","perico","salmon","oso","cocodrilo","puerco","tortuga","hormiga","tigre","pollo","cangrejo","zorro"];
let color = ["#0000FF","#8A2BE2","#A52A2A","#DC143C","#9932CC","#FF1493"]
let nusuarios=[];
let ncolores=[];

io.on('connection', socket =>{
	// creando nombre de usuario y color
	let indiceA = Math.floor(Math.random()*(animales.length));
	let indiceC = Math.floor(Math.random()*(color.length));
	let numero = Math.floor(Math.random()*(10000));
	socket.usuario = animales[indiceA] + numero;
	nusuarios.push(socket.usuario);
	socket.color = color[indiceC];
	ncolores.push(socket.color);

	// nuevo usuario en los mensajes
	io.sockets.emit('coneccion', {
			usuario: socket.usuario,
			status: "CONECTADO"
		});

	// poner usuario en cuadro de usuarios
	io.sockets.emit('usuario', {
		usuarios: nusuarios,
		colores: ncolores
	});

	// enviar los mensajes
	socket.on('enviar mensaje', data =>{
		io.sockets.emit('mensaje nuevo', {
			msg: data,
			usuario: socket.usuario,
			clr: socket.color
		});
	});

	// desconectar
	socket.on('disconnect', ()=>{
    	// mensaje de desconectado en chat
    	io.sockets.emit('coneccion', {
			usuario: socket.usuario,
			status: "DESCONECTADO"
		});

    	// eliminar informacion ddel usuario
    	let indiceB = nusuarios.indexOf(socket.usuario);
    	nusuarios.splice(indiceB, 1);
    	ncolores.splice(indiceB, 1);
    	io.sockets.emit('usuario', {
			usuarios: nusuarios,
			colores: ncolores
		});
    });

});
}