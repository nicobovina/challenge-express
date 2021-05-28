/*
Modulo MODEL.

Funcionalidades:
- Agregar clientes y citas
- Modificar estados de las citas de los clientes
- Mostrar lista de clientes
- Mostrar lista de citas del cliente

*/

function Model(){
	this.clients = {};
}

Model.prototype.reset = function(){
	this.clients = {};
}

// Falta agregar funcionalidad en el caso que la cita que quiera agregar ya se encuentre agregada
// Recibe un nombre del cliente y una cita
// Agrega la cita al cliente (con el status pending)
// Devuelve la nueva cita
Model.prototype.addAppointment = function(client, appointment){
	const newAppointment = {...appointment, status: 'pending'};
	
	if (this.clients.hasOwnProperty(client))	this.clients[client].push(newAppointment);
	else 	this.clients = {...this.clients, [client]: [newAppointment]};

	return newAppointment;
}

// Recibe un nombre de cliente y una cita
// Modifica el status de la cita a attended
// Devuelve la cita
Model.prototype.attend = function(name, date){
	if (this.clients.hasOwnProperty(name)){
		let dateFound = this.clients[name].find( c => c.date === date);
		dateFound.status = 'attended';
		return dateFound;
	} else {
		return undefined;
	}
}

// Recibe un nombre de cliente y una cita
// Modifica el status de la cita a attended
// Devuelve la cita
Model.prototype.expire = function(name, date){
	if (this.clients.hasOwnProperty(name)){
		let dateFound = this.clients[name].find( c => c.date === date);
		dateFound.status = 'expired';
		return dateFound;
	} else {
		return undefined;
	}
}

// Recibe un nombre de cliente y una cita
// Modifica el status de la cita a attended
// Devuelve la cita
Model.prototype.cancel = function(name, date){
	if (this.clients.hasOwnProperty(name)){
		let dateFound = this.clients[name].find( c => c.date === date);
		dateFound.status = 'cancelled';
		return dateFound;
	} else {
		return undefined;
	}
}

// Mejorar funcionalidad parseando el arg
// Recibe nombre de cliente y una fecha o status(opcional)
// Retorna un arreglo de las citas eliminadas (en caso que se le pasó el status),
// o la cita eliminada (en caso que se le pasó la fecha)
Model.prototype.erase = function(name, arg = ''){
	let status = ['pending', 'attended', 'expired', 'cancelled'];
	let result;
	if (this.clients.hasOwnProperty(name)){
		if (arg === '')	return 'Ingrese la cita o el status';
		if ( status.includes(arg) ){
			result = this.clients[name].filter( d => d.status === arg );
			this.clients[name] = this.clients[name].filter( d => d.status !== arg );
			return result;
		}
		let dateToErase = this.clients[name].findIndex( d => d.date === arg);
		if (dateToErase === -1) {
			return undefined;
		} else {
			result = this.clients[name].splice(dateToErase,1);
			return result;
		}
	}
	else { 
		return undefined;
	}
}


// Recibe el nombre de un cliente y un status (opcional)
// Retorna las citas del cliente, y si recibe un status,
// retorna las citas con ese status
Model.prototype.getAppointments = function(name, status = ''){
	if (this.clients.hasOwnProperty(name)){
		if (status === '')	return this.clients[name];
		else return this.clients[name].filter( d => d.status === status );
	}

	return undefined;
}

Model.prototype.getClients = function(){
	return Object.keys(this.clients);
}

module.exports = Model;