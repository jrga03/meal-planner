import { useState, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Hook for getting window size
 * @returns {object} Window width and height
 */
export function useWindowSize() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  let handleResize;
  if (typeof window !== "undefined") {
    handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
  }

  useEffect(() => {
    if (handleResize) {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  const { width } = useWindowSize();

  const isClient = typeof window === "object";
  if (!isClient) return 0;

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

/**
 * Hook that listens to `next/router` `'routeChangeStart'` events and prevents changing
 * to a requested URL when `shouldPreventRouteChange` is `true`.
 *
 * @param {boolean} shouldPreventRouteChange Whether to prevent all Next.js route changes or not.
 * @param {Function} [onRouteChangePrevented] Callback function called when route change was prevented (optional).
 */
export function usePreventRouteChangeIf(shouldPreventRouteChange, onRouteChangePrevented) {
  const router = useRouter();

  useEffect(() => {
    const routeChangeStart = (url) => {
      if (router.asPath !== url && shouldPreventRouteChange) {
        router.events.emit("routeChangeError");
        onRouteChangePrevented && onRouteChangePrevented(url);
        // Following is a hack-ish solution to abort a Next.js route change
        // as there's currently no official API to do so
        // See https://github.com/zeit/next.js/issues/2476#issuecomment-573460710
        throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
      }
    };

    router.events.on("routeChangeStart", routeChangeStart);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
    };
  }, [onRouteChangePrevented, router.asPath, router.events, shouldPreventRouteChange]);
}

export default usePreventRouteChangeIf;
