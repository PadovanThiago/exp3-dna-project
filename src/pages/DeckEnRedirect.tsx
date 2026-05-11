import { useEffect } from "react";

const DeckEnRedirect = () => {
  useEffect(() => {
    window.location.href = "/deck-en/index.html";
  }, []);

  return null;
};

export default DeckEnRedirect;
