/**
 * 404 copy. Short, and it routes rather than apologises.
 *
 * The status line reads as a routing failure because that is what it is, and
 * because routing is the thing this business does: a request arrived, there
 * was nowhere to send it, and the honest recovery is to say where everything
 * actually went. The reference blocks dress this up as a terminal printout or
 * a radar sweep with an inert search box; a search field that searches nothing
 * is the same lie as a mailto: dressed up as a contact form.
 */
const notFound = {
  code: "404",
  /** Sits beside the code in the eyebrow. Not a sentence — a readout. */
  status: "No route",
  title: "That page does not exist.",
  body: "It may have moved, or the link may have been mistyped. Everything this site has is one of the links below.",
  backHome: "Back to the homepage",
  linksLabel: "Where everything actually is",

  /** A broken link inside this site is Ellery's to fix, so it says so. */
  report: {
    title: "If a link on this site sent you here",
    body: "That one is ours to correct. Tell support which page you came from and it gets fixed.",
    cta: "Contact and hours",
  },
};

export default notFound;
