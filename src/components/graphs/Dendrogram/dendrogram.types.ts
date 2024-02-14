import { InternMap } from "d3";
import { CleanDataFileHeaders } from "src/data/data.types";

export interface TreeNode<T> {
  new (data: T): this;
  x: number;
  y: number;
  x0?: number;
  y0?: number;
  children?: this[];
  expanded?: boolean;
  childrenNodes?: SVGGElement[];
  parentNode?: SVGGElement;
  action?: "collapse" | "expand" | undefined;
  data: T;
  readonly depth: number;
  readonly height: number;
  parent: this | null;
  readonly value?: number | undefined;
  readonly id?: string | undefined;
  ancestors(): this[];
  descendants(): this[];
  leaves(): this[];
  find(filter: (node: this) => boolean): this | undefined;
  path(target: this): this[];
  links(): Array<d3.HierarchyLink<T>>;
  sum(value: (d: T) => number): this;
  count(): this;
  sort(compare: (a: this, b: this) => number): this;
  [Symbol.iterator](): Iterator<this>;
  each<T = undefined>(
    func: (this: T, node: this, index: number, thisNode: this) => void,
    that?: T
  ): this;
  eachAfter<T = undefined>(
    func: (this: T, node: this, index: number, thisNode: this) => void,
    that?: T
  ): this;
  eachBefore<T = undefined>(
    func: (this: T, node: this, index: number, thisNode: this) => void,
    that?: T
  ): this;
  copy(): this;
}

export type TreeDataType = InternMap<
  string | string[],
  InternMap<
    string | string[],
    InternMap<
      string | string[],
      InternMap<
        string | string[],
        InternMap<
          string | string[],
          InternMap<
            string | string[],
            InternMap<
              string | string[],
              Record<CleanDataFileHeaders, string | string[]>[]
              // TODO: THIS IS HARDCODED
            >
          >
        >
      >
    >
  >
>;
