import React from "react";

export default function isMobile() {
  const [width, setWidth] = React.useState(0);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return React.useMemo(() => width < 768, [width]);
}
