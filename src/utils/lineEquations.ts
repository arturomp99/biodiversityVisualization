export interface Point {
  x: number;
  y: number;
}

export const horizontalDiagonalLine = (point0: Point, point1: Point) => {
  const path = `M${point0.y} ${point0.x}
    C ${(point0.y + point1.y) / 2} ${point0.x},
    ${(point0.y + point1.y) / 2} ${point1.x},
    ${point1.y} ${point1.x}`;

  return path;
};

export const verticalDiagonalLine = (point0: Point, point1: Point) => {
  const path = `M${point0.x} ${point0.y}
    C ${point0.x} ${(point0.y + point1.y) / 2},
    ${point1.x} ${(point0.y + point1.y) / 2},
    ${point1.x} ${point1.y}`;

  return path;
};
