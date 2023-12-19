export const cardResizeTimeout = 1000;
export const resizeTransitionDuration = 2000;
export const fontSize = 10;
export const graphMargin = {
  top: fontSize,
  bottom: 4 * fontSize,
  left: 6 * fontSize,
  right: fontSize,
};
export const lineChartParameters = {
  axesParameters: {
    ticks: {
      x: 4,
      y: 4,
    },
    labels: {
      x: "Time (s)",
      y: "--",
    },
    grid: true,
  },
};

export const timeLineParameters = {
  axesParameters: {
    ticks: {
      x: 4,
      y: 4,
    },
    labels: {
      x: "Time (s)",
      y: "--",
    },
    grid: false,
  },
};

export const dendrogramParameters = {
  nodeParameters: {
    radius: 7,
  },
  zoom: {
    min: 0.2,
    max: 10,
  },
};

export const mapChartParameters = {
  zoom: {
    min: 0.5,
    max: 10000,
  },
};
