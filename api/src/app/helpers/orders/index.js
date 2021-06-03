const db = require('../../../db/models');

const createOrder = async (invoice) => {
  const customer = await db.Customer.findByPk(invoice.customer_id);
  const priority = customer.plan_id !== 2;
  const newOrder = {
    id: Number(invoice.id),
    invoice_id: Number(invoice.id),
    assigned_user_id: null,
    customer_id: invoice.customer_id,
    status: 'unassigned',
    start_date: null,
    end_date: null,
    priority,
  };
  const createdOrder = await db.Order.create(newOrder);
  if (createdOrder) return createdOrder;
  return false;
};

const generateOrderOrUpgrade = async (merchantOrder, invoice) => {
  const services = merchantOrder.body.items.map((s) => Number(s.id));
  await invoice.addServices(services);
  if (services.includes(1)) {
    await db.Customer.update({ plan_id: 1 }, { where: { user_id: invoice.customer_id } });
    return 'customer upgraded';
  }
  const createdOrder = await createOrder(invoice);
  if (createdOrder) return createdOrder;
  return false;
};

module.exports = { createOrder, generateOrderOrUpgrade };
