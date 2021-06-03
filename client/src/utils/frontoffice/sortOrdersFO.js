export const orderById = (a, b) => {
  if (a.id < b.id) return -1;
  if (b.id < a.id) return 1;
  return 0;
};

export const orderByPriority = (a, b) => {
  if (a.priority && !b.priority) return -1;
  if (b.priority && !a.priority) return 1;
  return 0;
};

export const orderByStartDate = (a, b) => new Date(a.start_date) - new Date(b.start_date);
