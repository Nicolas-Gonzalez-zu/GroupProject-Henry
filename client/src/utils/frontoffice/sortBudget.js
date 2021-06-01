const orderBudget = (a, b) => {
  if (a.status && !b.status) return -1;
  if (b.status && !a.status) return 1;
  return 0;
};
export default orderBudget;

export const sortBudgetName = (a, b) => {
  console.log(a.name);
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};

export const sortBudgetAmount = (a, b) => {
  const numberA = Number(a.amount);
  const numberB = Number(b.amount);
  if (numberA < numberB) return -1;
  if (numberA > numberB) return 1;
  return 0;
};
