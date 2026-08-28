/**
 * The default-locale dictionary, composed from one module per page plus three
 * shared ones.
 *
 * WHY THIS IS SPLIT (the template ships a single `en.ts`): this site has
 * fourteen routes and the copy is the bulk of the work. One file would be
 * ~1,500 lines and the only file every task touches. Split by page, a change
 * to the pricing page's copy cannot conflict with a change to an article's.
 *
 * The i18n contract is unchanged and still enforced: `Dictionary = typeof en`
 * in `src/i18n/index.ts`, and this object is deliberately NOT `as const`, so
 * leaf values widen to `string` and any locale added later must replicate the
 * full key structure or fail `astro check`. Add a language with `/add-locale`,
 * which will mirror this directory rather than a single file.
 *
 * This module must not annotate itself with `Dictionary` — that is the type
 * it defines, and the reference would be circular.
 */
import common from "./common";
import meta from "./meta";
import programs from "./programs";
import home from "./home";
import weightLoss from "./weightLoss";
import longevity from "./longevity";
import howItWorks from "./howItWorks";
import pricingPage from "./pricingPage";
import start from "./start";
import learn from "./learn";
import faq from "./faq";
import contact from "./contact";
import legal from "./legal";
import notFound from "./notFound";

const en = {
  ...common,
  meta,
  programs,
  home,
  weightLoss,
  longevity,
  howItWorks,
  pricingPage,
  start,
  learn,
  faq,
  contact,
  legal,
  notFound,
};

export default en;
