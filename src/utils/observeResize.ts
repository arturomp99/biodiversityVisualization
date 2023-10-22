type ResizeHandlerType = (entries: ResizeObserverEntry[]) => void;

export const observeResize = (
  observedElement: Element,
  resizeHandler: ResizeHandlerType
) => {
  const observer = new ResizeObserver((entries) => resizeHandler(entries));
  observer.observe(observedElement);
};
