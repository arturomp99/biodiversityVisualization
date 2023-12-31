export const cardResizeTimeout = 1000;

export const resizeTransitionDuration = 2000;

export const fontSize = 10;

export const navBar = {
  height: "72px",
};

export const appPaddings = {
  lg: "90px",
};

export const paragraphMargin = "16px";

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
  colorScheme: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"],
  legend: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    isPresent: true,
    margin: 10,
    fontSize: 8,
    gap: 24,
    separation: 10,
  },
  startAtZero: true,
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
