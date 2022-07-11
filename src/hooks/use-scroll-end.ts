import { useCallback, useEffect, useState } from "react";

// Margin added to make scroll smooth (especially on mobile)
const useScrollEnd = (margin = 300) => {
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollTop, offsetHeight } = document.documentElement;
    setIsScrollEnd(innerHeight + scrollTop > offsetHeight - margin);
  }, [margin]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return isScrollEnd;
};

export default useScrollEnd;
