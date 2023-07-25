const calculateDough = (T, scale, BFP, DW, WWFP, hydration, SP, starter) => {

  const BF = scale*(BFP*DW/T);
  const WWF = scale*(WWFP*DW/T);
  const W = scale*(hydration*DW/T);
  const S = Number((scale*(SP*DW/T)).toFixed(2));
  const starterWeight = scale*(starter*DW/T);

  return { BF, WWF, W, S, starterWeight };
};

export default calculateDough;
