var express = require('express');
var Model = require('./model.js');
var router = express.Router();

var model = new Model();

// Envío todos los clientes con sus citas agregadas
router.get('/', (req, res) => {
	const clients = model.clients;
	res.json(clients);
});


// Agrega una cita a un cliente (indicados en el body de la peticion)
router.post('/Appointments', (req, res) => {
	const { client, appointment } = req.body;
	let result;

	// Si no se recibe en el body un cliente
	if (!client)	return res.status(400).send('the body must have a client property');

	// Si el cliente recibido no es de tipo string
	if (typeof client !== 'string' || client === '')	return res.status(400).send('client must be a string');

	// Si no se recibe una fecha en el body
	if (!appointment)	return res.status(400).send('the body must have am appointment property');

	// Si se recibe en el body un cliente y una fecha
	result = model.addAppointment(client, appointment);
	return res.status(200).json(result);
});


// Devuelve un arreglo con los nombres de los clientes
router.get('/Appointments/clients', (req, res) => {
	const result = model.getClients();
	return res.status(200).send(result);
});


// Recibe el nombre y la fecha o status (opcional)
// En caso de recibir la fecha, elimina la cita con la fecha correspondiente
// En caso de recibir el status, elimina las citas con el status correspondiente
router.get('/Appointments/:name/erase', (req, res) => {
	const { name } = req.params;
	const { date } = req.query;
	let client = model.getClients().includes(name),
	result;
	if (client === false)	return res.status(400).send('the client does not exist');

	result = model.erase(name, date);
	return res.status(200).json(result);
});


//
router.get('/Appointments/:name', (req, res) => {
	const { name } = req.params,
	{ date, option } = req.query,
	status = ['attend', 'expire', 'cancel'],
	appointments = model.getAppointments(name);	
	let result;

	// Si el cliente no existe
	if (!appointments)	return res.status(400).send('the client does not exist');

	// Obtengo las citas con la fecha recibida por parametro
	result = appointments.filter( a => a.date === date);
	
	// Si el cliente no tiene una cita con la fecha recibida por parametro
	if (result.length === 0)	return res.status(400).send('the client does not have a appointment for that date');

	// Si se desea obtener las citas con un status especifico
	if (!status.includes(option))	return res.status(400).send('the option must be attend, expire or cancel');
	else {
		result = model[option](name,date); // option es la operacion a realizar
		return res.status(200).json(result);
	}
});


router.get('/Appointments/getAppointments/:name', (req, res) => {
	const { name } = req.params,
	{ status } = req.query;
	let result;

	// Si el cliente recibido no existe
	if(!model.getClients().includes(name)) return res.status(400).send('the client does not exist');

	result = model.getAppointments(name, status);
	return res.status(200).json(result);

});

module.exports = { model, router };