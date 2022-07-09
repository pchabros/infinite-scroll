import { useEffect, useState } from "react";

const useScrollEnd = () => {
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const handleScroll = () => {
    const { innerHeight } = window;
    const { scrollTop, offsetHeight } = document.documentElement;
    setIsScrollEnd(innerHeight + scrollTop === offsetHeight);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return isScrollEnd;
};

export default useScrollEnd;
