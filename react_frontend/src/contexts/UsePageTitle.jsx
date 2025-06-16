import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Home - Be_Lyke_Ck";
    } else if (location.pathname === "/order") {
      document.title = "Orders - Be_Lyke_Ck";
    } else if (location.pathname === "/buy") {
      document.title = "Buy Now - Be_Lyke_Ck";
    } else if (location.pathname === "/fav") {
        document.title = "Favorites - Be_Lyke_Ck";
    } else if (location.pathname === "/cart") {
        document.title = "Cart - Be_Lyke_Ck";
    }
    else {
      document.title = "Be_Lyke_Ck"; 
    }
  }, [location]);

  return null;
}

export default usePageTitle;
