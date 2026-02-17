import ReactGA from "react-ga4";

export const initGA = () => {
  // Replace with your actual Measurement ID
  ReactGA.initialize("G-XZY4TK63EJ");
};

export const trackPage = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};