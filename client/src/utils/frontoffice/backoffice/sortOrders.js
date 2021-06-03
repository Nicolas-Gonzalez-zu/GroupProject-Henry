const sortOrders = (a, b) => {
  if (a.priority || (a.status === 'unassigned' && !b.priority) || !b.status === 'unassigned')
    return -1;
  if (b.priority || (b.status === 'unassigned' && !a.priority) || !a.status === 'unassigned')
    return 1;
  return 0;
};
export default sortOrders;
