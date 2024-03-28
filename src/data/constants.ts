import L from "leaflet";

export const resizeTimeout = 10;

export const resizeTransitionDuration = 2000;

export const fontSize = 10;

export const navBar = {
  height: "72px",
  backgroundColor: "#5a995a",
  fontColor: "white",
  hoveredColor: "#446e44",
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
    title: {
      anchor: { hAxis: "end", vAxis: "middle" },
      fontColor: "black",
      fontSize: "1rem",
    },
  },
  lines: {
    strokeWidth: "1px",
    inactiveStrokeOpacity: 0.4,
  },
  colorScheme: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"],
  legend: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
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
    title: {
      anchor: { hAxis: "end", vAxis: "middle" },
      fontColor: "black",
      fontSize: "1rem",
    },
  },
  markers: { width: 10, borderRadius: 3 },
};

export const dendrogramParameters = {
  nodeParameters: {
    radius: 7,
    radiusCollapsed: 1e-5,
    color: "black",
    distinguishedColor: "#2d544a",
  },
  linkParameters: { strokeWidth: 1 },
  zoom: {
    min: 0.2,
    max: 10,
  },
  transitions: {
    collapseDuration: 1000,
    zoomEndTransitionDuration: 500,
  },
  labels: {
    fontSizeRatio: 3, // Fontsize is a function of node radius (to make it constant on zoom)
    fontColor: "#2d544a",
  },
};

export const mapChartParameters = {
  zoom: {
    maxLevel: 25,
  },
  icons: {
    default: L.icon({
      iconUrl: "https://cdn-icons-png.freepik.com/256/447/447031.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    }),
    detection: L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/3720/3720102.png",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    }),
  },
};

export const catalogParameters = {
  animalsPerPage: 10,
};

export const barChartParameters = {
  barWidth: 36,
  barsGap: 12,
  axesParameters: {
    ticks: {
      x: 4,
      y: undefined,
    },
    labels: {
      x: "Count",
      y: "Classification",
    },
    grid: false,
    title: {
      anchor: { hAxis: "end", vAxis: "middle" },
      fontColor: "black",
      fontSize: "1rem",
    },
  },
  bars: {
    inactiveColor: "#6c7a89",
  },
};
