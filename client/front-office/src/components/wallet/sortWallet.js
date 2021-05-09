const orderWallet = (a, b) => {
  if (a.status && !b.status) return -1;
  if (b.status && !a.status) return 1;
  return 0;
};
export default orderWallet;
