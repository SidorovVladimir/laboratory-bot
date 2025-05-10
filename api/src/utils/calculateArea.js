export const calculateArea = (params) => {
  const [d, h] = params.split('/');
  const area = (Math.PI * parseFloat(d) * parseFloat(h)) / 1000000;
  return area;
};
