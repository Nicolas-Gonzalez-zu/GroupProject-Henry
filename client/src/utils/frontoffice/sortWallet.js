export const orderWallet = (a, b) => {
  if (a.status && !b.status) return -1;
  if (b.status && !a.status) return 1;
  return 0;
};

export const sortWalletName = (a, b) => {
  console.log('entre al sort');
  const aa = a.name.toLowerCase();
  const bb = b.name.toLowerCase();
  if (aa < bb) return -1;
  if (bb < aa) return 1;
  return 0;
};

export const sortWalletBalance = (a, b) => {
  if (a.balance < b.balance) return -1;
  if (a.balance > b.balance) return 1;
  return 0;
};

export const sortID = (a, b) => {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
};
