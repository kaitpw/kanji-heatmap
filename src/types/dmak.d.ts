// src/types/dmak.d.ts

declare module "dmak" {
  interface DMAKOptions {
    element?: string | HTMLElement;
    autoplay?: boolean;
    stroke?: {
      order?: boolean;
      width?: number;
      color?: string;
      gradient?: unknown;
    };
    animation?: {
      duration?: number;
      delay?: number;
      step?: (element: unknown, pos: number) => void;
    };
    paths?: {
      data?: string;
      missing?: string;
    };
    history?: {
      flip?: boolean;
    };
    debug?: boolean;
    drawn?: (index: number, drawing: unknown) => void;
    completed?: () => void;
  }

  class DMAK {
    constructor(kanji: string, options?: DMAKOptions);

    // Methods
    play(): DMAK;
    pause(): DMAK;
    stop(): DMAK;
    erase(index?: number): DMAK;
    eraseAll(): DMAK;
    draw(index?: number): DMAK;
    reset(): DMAK;
  }

  export default DMAK;
}

declare module "raphael" {
  interface RaphaelPaper {
    // Define paper methods as needed
    rect(x: number, y: number, width: number, height: number): RaphaelElement;
    circle(x: number, y: number, r: number): RaphaelElement;
    path(pathString: string): RaphaelElement;
    // Add more methods as needed
  }

  interface RaphaelElement {
    attr(attributes: object): RaphaelElement;
    animate(
      attributes: object,
      duration: number,
      easing?: string,
      callback?: () => void
    ): RaphaelElement;
    // Add more methods as needed
  }

  function Raphael(
    element: HTMLElement | string,
    width: number,
    height: number
  ): RaphaelPaper;
  function Raphael(
    element: HTMLElement | string,
    width: number,
    height: number,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    callback: Function
  ): RaphaelPaper;
  function Raphael(
    x: number,
    y: number,
    width: number,
    height: number
  ): RaphaelPaper;
  function Raphael(
    x: number,
    y: number,
    width: number,
    height: number,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    callback: Function
  ): RaphaelPaper;
  function Raphael(parentId: string): RaphaelPaper;

  export default Raphael;
}
