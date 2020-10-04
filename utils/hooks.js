import { useState, useEffect } from "react";

/**
 * Hook for getting window size
 * @returns {object} Window width and height
 */
export function useWindowSize() {
  const isClient = typeof window === "object";
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return {
    height,
    width
  };
}

/**
 * Hook for getting header height based on window size
 * @returns {number} Header height
 */
export function useHeaderHeight() {
  const isClient = typeof window === "object";
  if (!isClient) return 0;

  const { width } = useWindowSize();
  const { screen } = window;
  const orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

  return width < 600 ? (new RegExp("landscape", "i").test(orientation) ? 48 : 56) : 64;
}

/**
 * Hook for debouncing fast-changing value
 * @param {*} value
 * @param {number} [delay = 500] - Delay before returning value
 * @returns {*}
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
