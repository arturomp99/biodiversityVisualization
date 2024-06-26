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
  colorScheme: [
    "rgb(82,239,153)",
    "rgb(45,116,122)",
    "rgb(167,220,249)",
    "rgb(77,118,196)",
    "rgb(35,219,225)",
    "rgb(22,123,43)",
    "rgb(192,224,135)",
    "rgb(101,61,40)",
    "rgb(217,94,34)",
    "rgb(136,20,72)",
    "rgb(246,187,134)",
    "rgb(255,0,135)",
    "rgb(236,16,47)",
    "rgb(216,111,146)",
    "rgb(244,212,3)",
    "rgb(162,124,89)",
    "rgb(115,240,46)",
    "rgb(105,27,158)",
    "rgb(247,197,241)",
    "rgb(171,118,242)",
  ],
  detailInteraction: {
    unhoveredOpacity: "0.2",
  },
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
    colorable: (markerHtmlStyles: string) =>
      L.divIcon({
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, -36],
        html: `<span style="${markerHtmlStyles}" />`,
      }),
  },
  iconsData: {
    detection: {
      url: "https://cdn-icons-png.flaticon.com/512/3720/3720102.png",
    },
  },
};

export const catalogParameters = {
  animalsPerPage: 10,
  gbifImagesCount: 5,
};

export const barChartParameters = {
  barWidth: 36,
  barsGap: 12,
  barsGapFactor: 1.4,
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

export const histogramParameters = {
  axesParameters: {
    ticks: {
      x: 4,
      y: 4,
    },
    labels: {
      x: "Date",
      y: "Observations",
    },
    grid: false,
    title: {
      anchor: { hAxis: "end", vAxis: "middle" },
      fontColor: "black",
      fontSize: "1rem",
    },
  },
  thresholds: 15,
  stacked: {
    colorScheme: [
      "rgb(222,138,44)",
      "rgb(121,157,16)",
      "rgb(147,128,115)",
      "rgb(57,146,131)",
      "rgb(19,68,36)",
      "rgb(55,181,31)",
      "rgb(96,46,1)",
    ],
  },
};

export const gaugeChartParameters = {
  barWidth: 16,
};
