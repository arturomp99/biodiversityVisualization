export const observeResize = (
  observedElement: Element,
  resizeHandler: Function
) => {
  const observer = new ResizeObserver((entries) => resizeHandler(entries));
  observer.observe(observedElement);
};
