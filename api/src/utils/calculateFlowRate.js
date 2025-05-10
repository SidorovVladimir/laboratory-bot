export const calculateFlowRate = (params, ctx) => {
  let flowRate;

  if (ctx.session.flowRate.state === 'waiting_flowRate_rectangular') {
    const [v, a, b] = params.split('/');
    flowRate = parseFloat(v) * ((parseFloat(a) * parseFloat(b)) / 1000) * 3.6;
  }
  if (ctx.session.flowRate.state === 'waiting_flowRate_circular') {
    const [v, d] = params.split('/');
    flowRate =
      parseFloat(v) *
      ((1 / 4) * Math.PI * Math.pow(parseFloat(d) / 1000, 2)) *
      3600;
  }
  return flowRate;
};
