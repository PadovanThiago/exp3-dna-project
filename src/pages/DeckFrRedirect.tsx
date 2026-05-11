import { useEffect } from "react";

const DeckFrRedirect = () => {
  useEffect(() => {
    window.location.href = "/deck-fr/index.html";
  }, []);

  return null;
};

export default DeckFrRedirect;
