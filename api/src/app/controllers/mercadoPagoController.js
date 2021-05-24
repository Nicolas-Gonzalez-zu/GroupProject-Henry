const mercadopago = require('mercadopago');
const server = require('express').Router();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

server.post('/', async (req, res) => {
  const { services, user, orderId } = req.body;

  const items =
    services &&
    services.map((service) => ({
      title: service.name,
      id: service.id,
      quantity: 1,
      //   quantity: Number(service.orderLine.quantity),
      unit_price: service.price,
    }));

  const preference = {
    items,
    payer: {
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
    },
    // back_urls: {
    // success: `http://localhost:3000/cart?email=${user.email}&orderId=${orderId}`,
    // },
    // auto_return: 'approved',
    marketplace: 'E-conomy',
  };

  const response = await mercadopago.preferences.create(preference);
  res.json(response);
});
server.post('/mp_test', async (req, res) => {
  console.log(req.body);
  res.status(200).send('received');
});
server.post('/mp_prod', async (req, res) => {
  console.log(req.body);
  res.status(200).send('received');
});

server.get('/mp_prod', async (req, res) => {
  console.log(req.body);
  res.status(200).send('received');
});

module.exports = server;
