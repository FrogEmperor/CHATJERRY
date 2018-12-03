const socket = io();

// Obteniendo form
const mensajeform = document.getElementById('mensaje-form');
const submitmensaje = document.getElementById('mensaje-submit');
const mensaje = document.getElementById('mensaje'); 
const chat = document.getElementById('chat');



// obteniendo div de usuarios
const usuarioMostrar = document.getElementById('usuarios');

// eventos
function imprimirMensaje(e) {
  e.preventDefault();
  socket.emit('enviar mensaje', mensaje.value);
  mensaje.value="";
  // Here use ajax to submit the value
}
submitmensaje.addEventListener("click", imprimirMensaje);

socket.on('coneccion', data => {
	chat.innerHTML += "<b> <font color='red'>" + data.usuario + " SE HA " + data.status + " </font></br>";
	chat.scrollTop = chat.scrollHeight;
});

// imprimir mensaje nuevo en el chat
socket.on('mensaje nuevo', data => {
	chat.innerHTML += "<b><tagname style='color:" +  data.clr + "'>" + data.usuario + "</tagname>:</b> " + data.msg + "</br>";
	chat.scrollTop = chat.scrollHeight;
});

// Mostrar todos los usuarios
socket.on('usuario', data => {
	usuarioMostrar.innerHTML = "";
	for(i=0;i<data.usuarios.length;i++){
	usuarioMostrar.innerHTML += '<tagname style="color:' + data.colores[i] + '">' + data.usuarios[i] + '</tagname></br>';
	}
});