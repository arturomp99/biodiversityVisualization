import { createRef, useEffect, useRef, useState } from "react";

export const useObserveResize = () => {
  const containerRef = createRef<HTMLDivElement>();
  const observerRef = useRef<ResizeObserver | null>(null);
  const [dimensions, setDimensions] = useState<undefined | [number, number]>(
    undefined
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeEventHandler = (resizedElement: ResizeObserverEntry[]) => {
      setDimensions([
        resizedElement[0].contentRect.width,
        resizedElement[0].contentRect.height,
      ]);
    };
    observerRef.current = new ResizeObserver((element) =>
      resizeEventHandler(element)
    );
    observerRef.current.observe(containerRef.current);

    return () => {
      // Disconnect the resize observer on unmount
      observerRef.current?.disconnect();
    };
  }, []);

  return { containerRef, dimensions };
};
