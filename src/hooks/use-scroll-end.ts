import { useCallback, useEffect, useState } from "react";

const checkScrollEnd = (margin: number) => {
  const { innerHeight } = window;
  const { scrollTop, offsetHeight } = document.documentElement;
  return innerHeight + scrollTop > offsetHeight - margin;
};

// Margin added to make scroll smooth (especially on mobile)
const useScrollEnd = (margin = 300) => {
  const [isScrollEnd, setIsScrollEnd] = useState(checkScrollEnd(margin));
  const handleScroll = useCallback(() => {
    setIsScrollEnd(checkScrollEnd(margin));
  }, [margin]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return isScrollEnd;
};

export default useScrollEnd;
