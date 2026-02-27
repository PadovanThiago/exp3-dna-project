import { useEffect } from "react";

const DeckRedirect = () => {
  useEffect(() => {
    window.location.href = "/deck/index.html";
  }, []);

  return null;
};

export default DeckRedirect;
