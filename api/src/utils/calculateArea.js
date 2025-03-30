export const calculateArea = (params) => {
  const [rad, hei] = params.split('/');
  const area = (2 * Math.PI * parseFloat(rad) * parseFloat(hei)) / 1000000;
  return area;
};
