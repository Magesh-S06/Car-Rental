import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Home - Clash Cars";
    } else if (location.pathname === "/order") {
      document.title = "Orders - Clash Cars";
    } else if (location.pathname === "/buy") {
      document.title = "Buy Now - Clash Cars";
    } else if (location.pathname === "/fav") {
        document.title = "Favorites - Clash Cars";
    } else if (location.pathname === "/cart") {
        document.title = "Cart - Clash Cars";
    }
    else {
      document.title = "Clash Cars"; 
    }
  }, [location]);

  return null;
}

export default usePageTitle;
