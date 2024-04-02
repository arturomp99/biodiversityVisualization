export const getHistogramThresholdsArray = (
  extent: [Date, Date],
  thresholds: NonNullable<number>
) => {
  if (!extent[0] || !extent[1]) {
    return;
  }
  const minDate = extent[0].getTime();

  const maxDate = extent[1].getTime();
  const extentDate = maxDate - minDate;
  const thresholdsStep = extentDate / thresholds;

  const thresholdsArray = [...Array(thresholds)].map((_, index) => {
    const elapsedDate = thresholdsStep * index;
    return new Date(minDate + elapsedDate);
  });

  return thresholdsArray;
};
