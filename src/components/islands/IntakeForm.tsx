import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";
import {
  eligibility,
  fees,
  monthlyEquivalent,
  shipping,
  sla,
  treatments,
  usd,
  type Treatment,
} from "@/config/pricing";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, ArrowRight, Info, TriangleAlert } from "lucide-react";

/**
 * THE INTAKE — one island, on purpose.
 *
 * Radix context does not cross an island boundary, so every step, every
 * control and the rail that reports on them live in this single file. The
 * alternative (a component per step) would break the Select and the
 * ToggleGroups the moment they were mounted separately.
 *
 * Three rules this component is written to keep:
 *
 * 1. It is HONEST ABOUT BEING A DEMONSTRATION. There is no endpoint on this
 *    static site, so there is no submit button anywhere in it. The last step
 *    is a review summary and a notice saying nothing was sent or stored. A
 *    disabled "submit" that silently did nothing would be worse than no
 *    button at all.
 * 2. It NEVER RETURNS A VERDICT. It reports what the published thresholds in
 *    `eligibility` say and what a clinician will see flagged. It does not
 *    approve, pre-approve, qualify or decline, because deciding is the
 *    clinician's job and an administrator computing eligibility is the exact
 *    thing the corporate-practice rules forbid.
 * 3. EVERY VISIBLE STRING ARRIVES AS A PROP, from `d.start.form` in
 *    StartPage.astro. Every figure comes from `src/config/pricing.ts`, which
 *    this island imports directly so the running total, the supply table and
 *    the pricing page cannot drift apart.
 */

type FormCopy = Dictionary["start"]["form"];

export interface IntakeStateOption {
  code: string;
  name: string;
  /** A clinician licensed in this state is available. Derived from `coverage`. */
  available: boolean;
  /** Alaska and Hawaii: the carrier surcharge applies and is passed through. */
  remote: boolean;
}

const ALL_STEPS = [
  "state",
  "goal",
  "about",
  "conditions",
  "history",
  "meds",
  "supply",
  "review",
] as const;
type StepId = (typeof ALL_STEPS)[number];

/** Keys into `copy.steps.conditions.items`, in the order they are shown. */
const CONDITION_IDS = [
  "hypertension",
  "type2",
  "prediabetes",
  "dyslipidaemia",
  "apnoea",
  "cardiovascular",
  "nafld",
  "pcos",
  "osteoarthritis",
] as const;
type ConditionId = (typeof CONDITION_IDS)[number];

/** Keys into `copy.steps.history.items`. The first three are the ones on the
    labelling; `cancer` is the one that sets compounded sermorelin aside. */
const HISTORY_IDS = [
  "thyroid",
  "pancreatitis",
  "pregnancy",
  "gallbladder",
  "gastroparesis",
  "cancer",
  "eatingDisorder",
] as const;
type HistoryId = (typeof HISTORY_IDS)[number];

type Goal = "metabolic" | "longevity" | "both";
type Sex = "female" | "male" | "other";
type Supply = "one" | "three";

interface Answers {
  state: string;
  goal: Goal | "";
  age: string;
  sex: Sex | "";
  heightFt: string;
  heightIn: string;
  weightLb: string;
  conditions: ConditionId[];
  conditionsNone: boolean;
  history: HistoryId[];
  historyNone: boolean;
  medications: string;
  allergies: string;
  supply: Supply | "";
}

const EMPTY: Answers = {
  state: "",
  goal: "",
  age: "",
  sex: "",
  heightFt: "",
  heightIn: "",
  weightLb: "",
  conditions: [],
  conditionsNone: false,
  history: [],
  historyNone: false,
  medications: "",
  allergies: "",
  supply: "",
};

/** `"Step {n} of {total}"` — the dictionary holds the sentence, not the maths. */
const fill = (template: string, values: Record<string, string | number>): string =>
  Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, String(value)),
    template,
  );

const toNumber = (raw: string): number => {
  const parsed = Number(raw.trim());
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

/** A price range across the preparations a clinician could choose from. */
const range = (low: number, high: number): string =>
  low === high ? usd(low) : `${usd(low)}–${usd(high)}`;

/* ------------------------------------------------------------------ */
/* Small shared pieces. Same file, so Radix context is intact.        */
/* ------------------------------------------------------------------ */

/** The mono micro-label the whole site uses for a labelling job. */
function Micro({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("label text-muted-foreground", className)}>{children}</p>;
}

/** A step heading. `tabIndex={-1}` so focus can be moved here on advance. */
function StepHeading({
  eyebrow,
  title,
  lead,
  headingRef,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="max-w-2xl">
      <p className="label text-brand-700 dark:text-brand-400">{eyebrow}</p>
      <h3 ref={headingRef} tabIndex={-1} className="display-3 mt-3 outline-none">
        {title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{lead}</p>
    </div>
  );
}

/** A checkbox row: `Field orientation="horizontal"` + Checkbox + FieldLabel,
    which is the composition the primitives are built for. */
function CheckRow({
  id,
  label,
  checked,
  onChange,
  symbol,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  symbol?: string;
}) {
  return (
    <Field orientation="horizontal" className="items-start gap-3">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(next) => onChange(next === true)}
        className="mt-0.5 size-[18px] rounded-[3px]"
      />
      <FieldLabel htmlFor={id} className="text-[0.9375rem] leading-relaxed font-normal">
        {label}
        {symbol ? <sup className="ml-0.5 text-muted-foreground">{symbol}</sup> : null}
      </FieldLabel>
    </Field>
  );
}

/* ------------------------------------------------------------------ */

export default function IntakeForm({
  copy,
  states,
  gating,
  links,
}: {
  copy: FormCopy;
  states: IntakeStateOption[];
  /** `d.gating.short`, rendered wherever a price is. Never rewritten here. */
  gating: string;
  links: { pricing: string; howItWorks: string };
}) {
  const uid = useId();
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [notifyEmail, setNotifyEmail] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const stateTriggerRef = useRef<HTMLButtonElement>(null);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  /* --- Which steps exist --------------------------------------------- */

  const goal = answers.goal;
  const metabolic = goal === "metabolic" || goal === "both";
  const longevity = goal === "longevity" || goal === "both";

  // The weight-related conditions only exist to meet the lower BMI threshold,
  // so they are asked only when the metabolic program is in scope. Before the
  // goal is answered the step is counted anyway: a total that shrinks by one
  // when you choose "longevity" is honest, whereas one that grows reads as a
  // funnel that was hiding a step.
  const steps: StepId[] = useMemo(
    () => ALL_STEPS.filter((step) => step !== "conditions" || goal === "" || metabolic),
    [goal, metabolic],
  );

  const boundedIndex = Math.min(stepIndex, steps.length - 1);
  const step = steps[boundedIndex];

  const selectedState = states.find((option) => option.code === answers.state);
  const blocked = selectedState !== undefined && !selectedState.available;

  /* --- Measurements --------------------------------------------------- */

  const age = toNumber(answers.age);
  const feet = toNumber(answers.heightFt);
  const inches = answers.heightIn.trim() === "" ? 0 : toNumber(answers.heightIn);
  const pounds = toNumber(answers.weightLb);
  const totalInches = Number.isFinite(feet) && Number.isFinite(inches) ? feet * 12 + inches : Number.NaN;

  const bmi =
    Number.isFinite(totalInches) && totalInches >= 36 && Number.isFinite(pounds) && pounds >= 50
      ? (703 * pounds) / (totalInches * totalInches)
      : null;

  /* --- Prices --------------------------------------------------------- */

  const relevant: Treatment[] = useMemo(
    () =>
      treatments.filter((item) =>
        answers.goal === "" ? false : answers.goal === "both" ? true : item.program === answers.goal,
      ),
    [answers.goal],
  );

  const priceAt = (item: Treatment, supply: Supply): number =>
    supply === "three" ? item.threeMonth : item.oneMonth;
  const monthlyAt = (item: Treatment, supply: Supply): number =>
    supply === "three" ? monthlyEquivalent(item) : item.oneMonth;

  const supply = answers.supply === "" ? null : answers.supply;
  const medPrices = supply ? relevant.map((item) => priceAt(item, supply)) : [];
  const medLow = medPrices.length ? Math.min(...medPrices) : null;
  const medHigh = medPrices.length ? Math.max(...medPrices) : null;

  const shippingCost = selectedState?.remote ? shipping.remoteSurcharge : shipping.standardCost;
  const elleryside = fees.visit + fees.admin + shippingCost;

  const costLines = [
    {
      key: "visit",
      item: copy.steps.review.rows.visit.item,
      dest: copy.steps.review.rows.visit.dest,
      amount: usd(fees.visit),
      symbol: "",
    },
    {
      key: "medication",
      item: copy.steps.review.rows.medication.item,
      dest: copy.steps.review.rows.medication.dest,
      amount: medLow !== null && medHigh !== null ? range(medLow, medHigh) : copy.steps.review.atCost,
      symbol: "‡",
    },
    {
      key: "shipping",
      item: copy.steps.review.rows.shipping.item,
      dest: copy.steps.review.rows.shipping.dest,
      amount: shippingCost === 0 ? copy.steps.review.included : usd(shippingCost),
      symbol: "",
    },
    {
      key: "admin",
      item: copy.steps.review.rows.admin.item,
      dest: copy.steps.review.rows.admin.dest,
      amount: usd(fees.admin),
      symbol: "†",
    },
  ];

  const total =
    medLow !== null && medHigh !== null
      ? range(elleryside + medLow, elleryside + medHigh)
      : `${usd(elleryside)} + ${copy.steps.review.atCost}`;

  /* --- Navigation ----------------------------------------------------- */

  // Focus the new step's heading rather than the first control: a heading
  // announces where you are, a control announces only itself. Skipped on the
  // first render so the island never steals focus on page load.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [boundedIndex, blocked]);

  function validate(current: StepId): Partial<Record<string, string>> {
    const found: Partial<Record<string, string>> = {};
    if (current === "state" && answers.state === "") {
      found.state = copy.steps.state.error;
    }
    if (current === "goal" && answers.goal === "") {
      found.goal = copy.steps.goal.error;
    }
    if (current === "about") {
      if (!Number.isFinite(age) || age <= 0) {
        found.age = copy.steps.about.errors.age;
      } else if (age < eligibility.minAge) {
        found.age = fill(copy.steps.about.errors.ageMin, { n: eligibility.minAge });
      }
      if (answers.sex === "") found.sex = copy.steps.about.errors.sex;
      if (!Number.isFinite(feet) || feet <= 0 || !Number.isFinite(inches) || inches < 0) {
        found.heightFt = copy.steps.about.errors.height;
      }
      if (!Number.isFinite(pounds) || pounds <= 0) {
        found.weightLb = copy.steps.about.errors.weight;
      }
    }
    if (current === "supply" && answers.supply === "") {
      found.supply = copy.steps.supply.error;
    }
    return found;
  }

  function advance() {
    if (blocked) return;
    const found = validate(step);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});
    setStepIndex(Math.min(boundedIndex + 1, steps.length - 1));
  }

  function goBack() {
    setErrors({});
    setStepIndex(Math.max(boundedIndex - 1, 0));
  }

  function restart() {
    setAnswers(EMPTY);
    setNotifyEmail("");
    setErrors({});
    setStepIndex(0);
  }

  const stepNumber = boundedIndex + 1;
  const counter = fill(copy.a11y.stepCounter, { n: stepNumber, total: steps.length });
  const progress = Math.round((stepNumber / steps.length) * 100);
  // Proportional to the published intake duration rather than invented.
  const minutesLeft = Math.max(
    1,
    Math.round((sla.intakeMinutes * (steps.length - boundedIndex)) / steps.length),
  );

  /* --- Review rows ---------------------------------------------------- */

  const reviewLabels = copy.steps.review.labels;
  const listOf = (labels: string[], none: boolean): string =>
    labels.length > 0
      ? labels.join(", ")
      : none
        ? copy.steps.review.noneReported
        : copy.steps.review.empty;

  const answerRows: { key: string; label: string; value: string; figure?: boolean }[] = [
    { key: "state", label: reviewLabels.state, value: selectedState?.name ?? copy.steps.review.empty },
    {
      key: "goal",
      label: reviewLabels.goal,
      value: answers.goal === "" ? copy.steps.review.empty : copy.steps.goal.options[answers.goal].label,
    },
    {
      key: "age",
      label: reviewLabels.age,
      value: answers.age === "" ? copy.steps.review.empty : `${answers.age} ${copy.steps.about.ageUnit}`,
      figure: true,
    },
    {
      key: "sex",
      label: reviewLabels.sex,
      value: answers.sex === "" ? copy.steps.review.empty : copy.steps.about.sexOptions[answers.sex],
    },
    {
      key: "height",
      label: reviewLabels.height,
      value:
        answers.heightFt === ""
          ? copy.steps.review.empty
          : `${answers.heightFt} ${copy.steps.about.heightFtUnit} ${answers.heightIn === "" ? "0" : answers.heightIn} ${copy.steps.about.heightInUnit}`,
      figure: true,
    },
    {
      key: "weight",
      label: reviewLabels.weight,
      value:
        answers.weightLb === ""
          ? copy.steps.review.empty
          : `${answers.weightLb} ${copy.steps.about.weightUnit}`,
      figure: true,
    },
    {
      key: "bmi",
      label: reviewLabels.bmi,
      value: bmi === null ? copy.steps.review.empty : bmi.toFixed(1),
      figure: true,
    },
    ...(metabolic
      ? [
          {
            key: "conditions",
            label: reviewLabels.conditions,
            value: listOf(
              answers.conditions.map((id) => copy.steps.conditions.items[id]),
              answers.conditionsNone,
            ),
          },
        ]
      : []),
    {
      key: "history",
      label: reviewLabels.history,
      value: listOf(
        answers.history.map((id) => copy.steps.history.items[id]),
        answers.historyNone,
      ),
    },
    {
      key: "medications",
      label: reviewLabels.medications,
      value: answers.medications.trim() === "" ? copy.steps.review.empty : answers.medications.trim(),
    },
    {
      key: "allergies",
      label: reviewLabels.allergies,
      value: answers.allergies.trim() === "" ? copy.steps.review.empty : answers.allergies.trim(),
    },
    {
      key: "supply",
      label: reviewLabels.supply,
      value: supply === null ? copy.steps.review.empty : copy.steps.supply.options[supply],
      figure: false,
    },
  ];

  /* --- Rail ----------------------------------------------------------- */

  const rail = (
    <aside
      aria-label={copy.a11y.railLabel}
      className="panel bg-background p-5 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1"
    >
      <p className="label text-brand-700 dark:text-brand-400">{copy.rail.title}</p>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
        <div>
          <Micro>{copy.rail.stepLabel}</Micro>
          <p className="figure mt-1.5 text-2xl">
            {stepNumber}
            <span className="text-base text-muted-foreground">/{steps.length}</span>
          </p>
        </div>
        <div>
          <Micro>{copy.rail.timeLabel}</Micro>
          <p className="figure mt-1.5 text-2xl text-glow-700 dark:text-glow-500">
            {minutesLeft}
            <span className="label ml-1 align-middle">{copy.rail.timeUnit}</span>
          </p>
        </div>
      </div>

      <Progress
        value={progress}
        aria-label={copy.a11y.progressLabel}
        className="mt-5 h-[3px] rounded-none [&_[data-slot=progress-indicator]]:motion-reduce:transition-none"
      />

      <Separator className="mt-6" />

      <Micro className="mt-6">{copy.rail.costLabel}</Micro>
      <dl className="mt-3 grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-1">
        {costLines.map((line) => (
          <div
            key={line.key}
            className="flex items-baseline justify-between gap-3 border-b border-border py-2.5"
          >
            <dt className="text-[0.8125rem] leading-snug text-muted-foreground">{line.item}</dt>
            <dd className="figure shrink-0 text-[0.8125rem] whitespace-nowrap">
              {line.amount}
              {line.symbol ? <sup className="ml-0.5 text-muted-foreground">{line.symbol}</sup> : null}
            </dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-3 border-b border-border py-2.5 sm:col-span-2 lg:col-span-1">
          <dt className="text-[0.8125rem] font-semibold">{copy.steps.review.totalLabel}</dt>
          <dd className="figure shrink-0 text-[0.8125rem] font-semibold whitespace-nowrap">{total}</dd>
        </div>
      </dl>

      {supply === null && (
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{copy.rail.costPending}</p>
      )}
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{copy.rail.notCharged}</p>

      <div className="mt-6 hidden lg:block">
        <Micro>{copy.rail.stagesLabel}</Micro>
        <ol className="mt-3 flex flex-col">
          {steps.map((id, index) => (
            <li
              key={id}
              aria-current={index === boundedIndex ? "step" : undefined}
              className={cn(
                "flex items-baseline gap-3 border-t border-border py-2",
                index === boundedIndex ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "figure text-[0.6875rem]",
                  index === boundedIndex
                    ? "text-glow-700 dark:text-glow-500"
                    : "text-muted-foreground",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[0.8125rem] leading-snug">{copy.steps[id].eyebrow}</span>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );

  /* --- Steps ---------------------------------------------------------- */

  const stateCopy = copy.steps.state;
  const available = states.filter((option) => option.available);
  const unavailable = states.filter((option) => !option.available);

  const stepState = (
    <>
      <StepHeading
        eyebrow={stateCopy.eyebrow}
        title={stateCopy.title}
        lead={stateCopy.lead}
        headingRef={headingRef}
      />
      <FieldGroup className="mt-8 max-w-md">
        <Field data-invalid={errors.state ? true : undefined}>
          <FieldLabel htmlFor={`${uid}-state`}>{stateCopy.label}</FieldLabel>
          {/* `name` is set because this Select lives inside a <form>: Radix
              mirrors the value into a hidden native control, and one without a
              name is a DevTools issue on every page load. */}
          <Select name="state" value={answers.state} onValueChange={(value) => set("state", value)}>
            <SelectTrigger
              id={`${uid}-state`}
              ref={stateTriggerRef}
              aria-invalid={errors.state ? true : undefined}
              aria-describedby={errors.state ? `${uid}-state-error` : undefined}
              /* `data-[size=default]:h-11`, not `h-11`: the primitive's own
                 height is a data-attribute variant, which outranks a plain
                 utility on specificity no matter what order they merge in. */
              className="w-full rounded-[3px] text-[0.9375rem] data-[size=default]:h-11"
            >
              <SelectValue placeholder={stateCopy.placeholder} />
            </SelectTrigger>
            <SelectContent
              position="popper"
              align="start"
              className="rounded-[3px] motion-reduce:animate-none"
            >
              <SelectGroup>
                <SelectLabel className="label px-2 py-2 text-muted-foreground">
                  {stateCopy.groupAvailable}
                </SelectLabel>
                {available.map((option) => (
                  <SelectItem key={option.code} value={option.code} className="rounded-[3px]">
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="label px-2 py-2 text-muted-foreground">
                  {stateCopy.groupUnavailable}
                </SelectLabel>
                {unavailable.map((option) => (
                  <SelectItem key={option.code} value={option.code} className="rounded-[3px]">
                    {option.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldDescription>{stateCopy.description}</FieldDescription>
          <FieldError id={`${uid}-state-error`}>{errors.state}</FieldError>
        </Field>
      </FieldGroup>

      {selectedState?.remote && !blocked && (
        <Alert className="mt-6 max-w-2xl rounded-[3px] border-border bg-card p-4">
          <Info />
          <AlertTitle className="figure text-[0.9375rem]">
            {usd(shipping.remoteSurcharge)}
            <span className="label ml-2 align-middle text-muted-foreground">
              {shipping.remoteDays}
            </span>
          </AlertTitle>
          <AlertDescription>{stateCopy.remoteNote}</AlertDescription>
        </Alert>
      )}

      {blocked && selectedState && (
        <div className="panel mt-8 max-w-2xl bg-background p-6">
          <p className="label text-brand-700 dark:text-brand-400">{copy.steps.blocked.eyebrow}</p>
          <h4 className="subhead mt-3 text-lg">{copy.steps.blocked.title}</h4>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
            {fill(copy.steps.blocked.body, { state: selectedState.name })}
          </p>

          <Separator className="my-6" />

          <Micro>{copy.steps.blocked.listLabel}</Micro>
          <FieldGroup className="mt-3 max-w-md">
            <Field>
              <FieldLabel htmlFor={`${uid}-notify`}>{copy.steps.blocked.emailLabel}</FieldLabel>
              <div className="flex flex-wrap items-center gap-2">
                <Input
                  id={`${uid}-notify`}
                  type="email"
                  autoComplete="email"
                  value={notifyEmail}
                  onChange={(event) => setNotifyEmail(event.target.value)}
                  className="h-11 w-full max-w-64 rounded-[3px] text-[0.9375rem]"
                />
                {/* Disabled, and the note under it says why. There is no list
                    and no endpoint, so a live button would be a lie the rest
                    of this page is written to avoid. */}
                <button type="button" disabled className="btn-outline opacity-55">
                  {copy.steps.blocked.emailButton}
                </button>
              </div>
              <FieldDescription>{copy.steps.blocked.emailNote}</FieldDescription>
            </Field>
          </FieldGroup>

          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={() => stateTriggerRef.current?.focus()}
              className="btn-outline"
            >
              {copy.steps.blocked.change}
            </button>
            <a
              href={links.pricing}
              className="text-sm font-semibold text-brand-700 dark:text-brand-400"
            >
              {copy.steps.blocked.alternative}
            </a>
          </p>
        </div>
      )}
    </>
  );

  const goalCopy = copy.steps.goal;
  const goalOrder: Goal[] = ["metabolic", "longevity", "both"];
  const goalSymbol: Record<Goal, string> = { metabolic: "‡", longevity: "¶", both: "‡" };

  const stepGoal = (
    <>
      <StepHeading
        eyebrow={goalCopy.eyebrow}
        title={goalCopy.title}
        lead={goalCopy.lead}
        headingRef={headingRef}
      />
      <FieldGroup className="mt-8 max-w-2xl">
        <Field data-invalid={errors.goal ? true : undefined}>
          <FieldLabel id={`${uid}-goal-label`} className="text-sm">
            {goalCopy.label}
          </FieldLabel>
          <ToggleGroup
            type="single"
            value={answers.goal}
            onValueChange={(value) => value && set("goal", value as Goal)}
            aria-labelledby={`${uid}-goal-label`}
            aria-invalid={errors.goal ? true : undefined}
            className="w-full flex-wrap gap-2"
          >
            {goalOrder.map((id) => (
              <ToggleGroupItem
                key={id}
                value={id}
                className="h-auto min-w-32 flex-1 rounded-[3px] border border-border px-4 py-3 text-[0.9375rem] font-semibold text-foreground data-[state=on]:border-brand-600 data-[state=on]:bg-brand-600 data-[state=on]:text-brand-50 aria-pressed:bg-brand-600"
              >
                {goalCopy.options[id].label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {answers.goal !== "" && (
            <FieldDescription>
              {goalCopy.options[answers.goal].note}
              <sup className="ml-0.5">{goalSymbol[answers.goal]}</sup>
            </FieldDescription>
          )}
          <FieldError>{errors.goal}</FieldError>
        </Field>
      </FieldGroup>
    </>
  );

  const aboutCopy = copy.steps.about;
  const sexOrder: Sex[] = ["female", "male", "other"];

  const thresholdText =
    bmi === null
      ? null
      : !metabolic
        ? aboutCopy.thresholdLongevity
        : bmi >= eligibility.bmiAlone
          ? fill(aboutCopy.thresholdAlone, { n: eligibility.bmiAlone })
          : bmi >= eligibility.bmiWithCondition
            ? fill(aboutCopy.thresholdWithCondition, {
                alone: eligibility.bmiAlone,
                with: eligibility.bmiWithCondition,
              })
            : aboutCopy.thresholdBelow;

  const stepAbout = (
    <>
      <StepHeading
        eyebrow={aboutCopy.eyebrow}
        title={aboutCopy.title}
        lead={aboutCopy.lead}
        headingRef={headingRef}
      />
      <FieldGroup className="mt-8 max-w-2xl">
        <Field data-invalid={errors.age ? true : undefined}>
          <FieldLabel htmlFor={`${uid}-age`}>{aboutCopy.ageLabel}</FieldLabel>
          <div className="flex items-baseline gap-2">
            <Input
              id={`${uid}-age`}
              inputMode="numeric"
              autoComplete="off"
              value={answers.age}
              onChange={(event) => set("age", event.target.value)}
              aria-invalid={errors.age ? true : undefined}
              aria-describedby={errors.age ? `${uid}-age-error` : undefined}
              className="figure size-11 rounded-[3px] px-0 text-center text-base"
            />
            <span className="label text-muted-foreground">{aboutCopy.ageUnit}</span>
          </div>
          <FieldError id={`${uid}-age-error`}>{errors.age}</FieldError>
        </Field>

        <Field data-invalid={errors.sex ? true : undefined}>
          <FieldLabel id={`${uid}-sex-label`}>{aboutCopy.sexLabel}</FieldLabel>
          <ToggleGroup
            type="single"
            value={answers.sex}
            onValueChange={(value) => value && set("sex", value as Sex)}
            aria-labelledby={`${uid}-sex-label`}
            aria-invalid={errors.sex ? true : undefined}
            className="w-full flex-wrap gap-2"
          >
            {sexOrder.map((id) => (
              <ToggleGroupItem
                key={id}
                value={id}
                className="h-11 rounded-[3px] border border-border px-4 text-[0.9375rem] font-semibold text-foreground data-[state=on]:border-brand-600 data-[state=on]:bg-brand-600 data-[state=on]:text-brand-50 aria-pressed:bg-brand-600"
              >
                {aboutCopy.sexOptions[id]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <FieldDescription>{aboutCopy.sexNote}</FieldDescription>
          <FieldError>{errors.sex}</FieldError>
        </Field>

        <Field data-invalid={errors.heightFt ? true : undefined}>
          <FieldLabel htmlFor={`${uid}-height-ft`}>{aboutCopy.heightLabel}</FieldLabel>
          <div className="flex items-baseline gap-3">
            <div className="flex items-baseline gap-2">
              <Input
                id={`${uid}-height-ft`}
                inputMode="numeric"
                autoComplete="off"
                value={answers.heightFt}
                onChange={(event) => set("heightFt", event.target.value)}
                aria-invalid={errors.heightFt ? true : undefined}
                aria-describedby={errors.heightFt ? `${uid}-height-error` : undefined}
                className="figure size-11 rounded-[3px] px-0 text-center text-base"
              />
              <span className="label text-muted-foreground">{aboutCopy.heightFtUnit}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <Input
                id={`${uid}-height-in`}
                inputMode="numeric"
                autoComplete="off"
                aria-label={`${aboutCopy.heightLabel} — ${aboutCopy.heightInUnit}`}
                value={answers.heightIn}
                onChange={(event) => set("heightIn", event.target.value)}
                aria-invalid={errors.heightFt ? true : undefined}
                className="figure size-11 rounded-[3px] px-0 text-center text-base"
              />
              <span className="label text-muted-foreground">{aboutCopy.heightInUnit}</span>
            </div>
          </div>
          <FieldError id={`${uid}-height-error`}>{errors.heightFt}</FieldError>
        </Field>

        <Field data-invalid={errors.weightLb ? true : undefined}>
          <FieldLabel htmlFor={`${uid}-weight`}>{aboutCopy.weightLabel}</FieldLabel>
          <div className="flex items-baseline gap-2">
            <Input
              id={`${uid}-weight`}
              inputMode="numeric"
              autoComplete="off"
              value={answers.weightLb}
              onChange={(event) => set("weightLb", event.target.value)}
              aria-invalid={errors.weightLb ? true : undefined}
              aria-describedby={errors.weightLb ? `${uid}-weight-error` : undefined}
              className="figure h-11 w-20 rounded-[3px] text-center text-base"
            />
            <span className="label text-muted-foreground">{aboutCopy.weightUnit}</span>
          </div>
          <FieldError id={`${uid}-weight-error`}>{errors.weightLb}</FieldError>
        </Field>
      </FieldGroup>

      {/* BMI, live. A figure the reader is meant to check, so it is set at
          reading size in the mono face rather than tucked into a caption. */}
      <div className="panel mt-8 max-w-2xl bg-background p-6">
        <Micro>{aboutCopy.bmiLabel}</Micro>
        <p aria-live="polite" className="mt-2">
          {bmi === null ? (
            <span className="text-[0.9375rem] text-muted-foreground">{aboutCopy.bmiPending}</span>
          ) : (
            <span className="figure text-4xl">{bmi.toFixed(1)}</span>
          )}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{aboutCopy.bmiNote}</p>

        {thresholdText && (
          <>
            <Separator className="my-5" />
            <Micro>{aboutCopy.thresholdLabel}</Micro>
            <p className="mt-2 text-sm leading-relaxed">{thresholdText}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {aboutCopy.thresholdInfo}
            </p>
          </>
        )}

        {Number.isFinite(age) && age > 0 && age < eligibility.minAge && (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {fill(aboutCopy.ageMinNote, { n: eligibility.minAge })}
          </p>
        )}
        {longevity && Number.isFinite(age) && age >= eligibility.minAge && age < eligibility.minAgeSermorelin && (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {fill(aboutCopy.sermorelinAgeNote, { n: eligibility.minAgeSermorelin })}
            <sup className="ml-0.5">¶</sup>
          </p>
        )}
      </div>
    </>
  );

  const conditionsCopy = copy.steps.conditions;
  const toggleCondition = (id: ConditionId, next: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      conditionsNone: false,
      conditions: next ? [...prev.conditions, id] : prev.conditions.filter((item) => item !== id),
    }));
  };

  const stepConditions = (
    <>
      <StepHeading
        eyebrow={conditionsCopy.eyebrow}
        title={conditionsCopy.title}
        lead={conditionsCopy.lead}
        headingRef={headingRef}
      />
      <FieldSet className="mt-8 max-w-2xl">
        <FieldLegend variant="label">{conditionsCopy.legend}</FieldLegend>
        <FieldDescription>{copy.nav.optional}</FieldDescription>
        <FieldGroup data-slot="checkbox-group" className="gap-3">
          {CONDITION_IDS.map((id) => (
            <CheckRow
              key={id}
              id={`${uid}-cond-${id}`}
              label={conditionsCopy.items[id]}
              checked={answers.conditions.includes(id)}
              onChange={(next) => toggleCondition(id, next)}
            />
          ))}
          <Separator />
          <CheckRow
            id={`${uid}-cond-none`}
            label={conditionsCopy.none}
            checked={answers.conditionsNone}
            onChange={(next) =>
              setAnswers((prev) => ({
                ...prev,
                conditionsNone: next,
                conditions: next ? [] : prev.conditions,
              }))
            }
          />
        </FieldGroup>
      </FieldSet>

      {answers.conditions.length > 0 &&
        bmi !== null &&
        bmi >= eligibility.bmiWithCondition &&
        bmi < eligibility.bmiAlone && (
          <Alert className="mt-6 max-w-2xl rounded-[3px] border-border bg-card p-4">
            <Info />
            <AlertTitle className="figure text-[0.9375rem]">
              {eligibility.bmiWithCondition}
              <span className="label ml-2 align-middle text-muted-foreground">
                {conditionsCopy.lowerThresholdLabel}
              </span>
            </AlertTitle>
            <AlertDescription>{conditionsCopy.lowerThresholdNote}</AlertDescription>
          </Alert>
        )}
    </>
  );

  const historyCopy = copy.steps.history;
  const historySymbol: Partial<Record<HistoryId, string>> = { thyroid: "§", pancreatitis: "§" };
  const toggleHistory = (id: HistoryId, next: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      historyNone: false,
      history: next ? [...prev.history, id] : prev.history.filter((item) => item !== id),
    }));
  };

  const stepHistory = (
    <>
      <StepHeading
        eyebrow={historyCopy.eyebrow}
        title={historyCopy.title}
        lead={historyCopy.lead}
        headingRef={headingRef}
      />
      <FieldSet className="mt-8 max-w-2xl">
        <FieldLegend variant="label">{historyCopy.legend}</FieldLegend>
        <FieldDescription>{copy.nav.optional}</FieldDescription>
        <FieldGroup data-slot="checkbox-group" className="gap-3">
          {HISTORY_IDS.map((id) => (
            <CheckRow
              key={id}
              id={`${uid}-hist-${id}`}
              label={historyCopy.items[id]}
              symbol={historySymbol[id]}
              checked={answers.history.includes(id)}
              onChange={(next) => toggleHistory(id, next)}
            />
          ))}
          <Separator />
          <CheckRow
            id={`${uid}-hist-none`}
            label={historyCopy.none}
            checked={answers.historyNone}
            onChange={(next) =>
              setAnswers((prev) => ({
                ...prev,
                historyNone: next,
                history: next ? [] : prev.history,
              }))
            }
          />
        </FieldGroup>
      </FieldSet>

      {/* Neutral by construction: it reports that a clinician will read this
          first. It does not and must not report an outcome. */}
      {answers.history.length > 0 && (
        <Alert className="mt-6 max-w-2xl rounded-[3px] border-border bg-card p-4">
          <TriangleAlert />
          <AlertTitle>{historyCopy.flaggedTitle}</AlertTitle>
          <AlertDescription>
            {historyCopy.flaggedBody}
            {answers.history.includes("cancer") && longevity ? (
              <p className="mt-3">
                {historyCopy.cancerNote}
                <sup className="ml-0.5">¶</sup>
              </p>
            ) : null}
          </AlertDescription>
        </Alert>
      )}
    </>
  );

  const medsCopy = copy.steps.meds;

  const stepMeds = (
    <>
      <StepHeading
        eyebrow={medsCopy.eyebrow}
        title={medsCopy.title}
        lead={medsCopy.lead}
        headingRef={headingRef}
      />
      <FieldGroup className="mt-8 max-w-2xl">
        <Field>
          <FieldLabel htmlFor={`${uid}-meds`}>{medsCopy.medsLabel}</FieldLabel>
          <Textarea
            id={`${uid}-meds`}
            rows={4}
            value={answers.medications}
            placeholder={medsCopy.medsPlaceholder}
            onChange={(event) => set("medications", event.target.value)}
            className="rounded-[3px] text-[0.9375rem]"
          />
          <FieldDescription>{medsCopy.medsNote}</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor={`${uid}-allergies`}>{medsCopy.allergiesLabel}</FieldLabel>
          <Textarea
            id={`${uid}-allergies`}
            rows={3}
            value={answers.allergies}
            placeholder={medsCopy.allergiesPlaceholder}
            onChange={(event) => set("allergies", event.target.value)}
            className="rounded-[3px] text-[0.9375rem]"
          />
          <FieldDescription>{medsCopy.allergiesNote}</FieldDescription>
        </Field>
      </FieldGroup>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {medsCopy.blankNote}
      </p>
    </>
  );

  const supplyCopy = copy.steps.supply;
  const supplyOrder: Supply[] = ["one", "three"];

  const stepSupply = (
    <>
      <StepHeading
        eyebrow={supplyCopy.eyebrow}
        title={supplyCopy.title}
        lead={supplyCopy.lead}
        headingRef={headingRef}
      />
      <FieldGroup className="mt-8 max-w-3xl">
        <Field data-invalid={errors.supply ? true : undefined}>
          <FieldLabel id={`${uid}-supply-label`}>{supplyCopy.label}</FieldLabel>
          <ToggleGroup
            type="single"
            value={answers.supply}
            onValueChange={(value) => value && set("supply", value as Supply)}
            aria-labelledby={`${uid}-supply-label`}
            aria-invalid={errors.supply ? true : undefined}
            className="w-full flex-wrap gap-2"
          >
            {supplyOrder.map((id) => (
              <ToggleGroupItem
                key={id}
                value={id}
                className="h-11 min-w-40 rounded-[3px] border border-border px-4 text-[0.9375rem] font-semibold text-foreground data-[state=on]:border-brand-600 data-[state=on]:bg-brand-600 data-[state=on]:text-brand-50 aria-pressed:bg-brand-600"
              >
                {supplyCopy.options[id]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <FieldError>{errors.supply}</FieldError>
        </Field>
      </FieldGroup>

      {supply !== null && relevant.length > 0 && (
        <div className="mt-8 max-w-3xl">
          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="label h-auto px-0 py-3 text-muted-foreground">
                  {supplyCopy.header.item}
                </TableHead>
                <TableHead className="label h-auto px-0 py-3 text-right text-muted-foreground">
                  {supplyCopy.header.price}
                </TableHead>
                <TableHead className="label h-auto px-0 py-3 text-right text-muted-foreground">
                  {supplyCopy.header.monthly}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relevant.map((item) => (
                <TableRow key={item.id} className="border-border hover:bg-transparent">
                  <TableCell className="px-0 py-3.5 text-[0.9375rem] whitespace-normal">
                    {item.display}
                    <sup className="ml-0.5 text-muted-foreground">‡</sup>
                  </TableCell>
                  <TableCell className="figure px-0 py-3.5 text-right text-[0.9375rem]">
                    {usd(priceAt(item, supply))}
                  </TableCell>
                  <TableCell className="figure px-0 py-3.5 text-right text-[0.9375rem] text-muted-foreground">
                    {usd(monthlyAt(item, supply))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{supplyCopy.note}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{gating}</p>
          <p className="panel mt-6 bg-background p-5 text-sm leading-relaxed">
            {supplyCopy.concession}
          </p>
        </div>
      )}
    </>
  );

  const reviewCopy = copy.steps.review;

  const stepReview = (
    <>
      <StepHeading
        eyebrow={reviewCopy.eyebrow}
        title={reviewCopy.title}
        lead={reviewCopy.lead}
        headingRef={headingRef}
      />

      <h4 className="subhead mt-10 text-lg">{reviewCopy.answersTitle}</h4>
      <Table className="mt-4 border-collapse">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="label h-auto w-[42%] px-0 py-3 text-muted-foreground">
              {reviewCopy.answersHeader.question}
            </TableHead>
            <TableHead className="label h-auto px-0 py-3 text-muted-foreground">
              {reviewCopy.answersHeader.answer}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {answerRows.map((row) => (
            <TableRow key={row.key} className="border-border align-top hover:bg-transparent">
              <TableCell className="px-0 py-3.5 align-top text-[0.9375rem] whitespace-normal">
                {row.label}
              </TableCell>
              <TableCell
                className={cn(
                  "px-0 py-3.5 align-top text-[0.9375rem] whitespace-pre-line",
                  row.figure && "figure",
                  row.value === reviewCopy.empty && "text-muted-foreground",
                )}
              >
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h4 className="subhead mt-14 text-lg">{reviewCopy.costTitle}</h4>
      <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">
        {reviewCopy.costLead}
      </p>

      <Table className="mt-6 border-collapse">
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="label h-auto px-0 py-3 text-muted-foreground">
              {reviewCopy.costHeader.item}
            </TableHead>
            <TableHead className="label h-auto px-0 py-3 text-right text-muted-foreground">
              {reviewCopy.costHeader.amount}
            </TableHead>
            <TableHead className="label hidden h-auto px-0 py-3 pl-8 text-muted-foreground sm:table-cell">
              {reviewCopy.costHeader.dest}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {costLines.map((line) => (
            <TableRow key={line.key} className="border-border align-top hover:bg-transparent">
              <TableCell className="px-0 py-4 align-top whitespace-normal">
                <span className="subhead">{line.item}</span>
                {/* Below sm the destination column is dropped, so the sentence
                    rides under the line name instead of being lost. */}
                <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground sm:hidden">
                  {line.dest}
                </span>
              </TableCell>
              <TableCell className="figure px-0 py-4 text-right align-top text-[0.9375rem] whitespace-nowrap">
                {line.amount}
                {line.symbol ? <sup className="ml-0.5 text-muted-foreground">{line.symbol}</sup> : null}
              </TableCell>
              <TableCell className="hidden px-0 py-4 pl-8 align-top text-sm leading-relaxed whitespace-normal text-muted-foreground sm:table-cell">
                {line.dest}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="border-border bg-transparent">
          <TableRow className="border-0 hover:bg-transparent">
            <TableCell className="px-0 py-4 align-top">
              <span className="subhead">{reviewCopy.totalLabel}</span>
            </TableCell>
            <TableCell className="figure px-0 py-4 text-right align-top text-base whitespace-nowrap">
              {total}
            </TableCell>
            <TableCell className="hidden px-0 py-4 pl-8 align-top text-sm leading-relaxed whitespace-normal text-muted-foreground sm:table-cell">
              {reviewCopy.totalNote}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:hidden">
        {reviewCopy.totalNote}
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{gating}</p>

      <div className="panel mt-10 bg-background p-6">
        <p className="label text-brand-700 dark:text-brand-400">{reviewCopy.refundTitle}</p>
        <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed">{reviewCopy.refundBody}</p>
      </div>

      {/* The end of the flow. There is no submit button, because there is
          nothing to submit to, and a button that pretended otherwise would
          undo everything the rest of this page claims. */}
      <div className="mt-6 rounded-lg bg-brand-800 p-6 text-brand-50">
        <p className="label text-brand-300">
          <span className="figure mr-2">◇</span>
          {reviewCopy.demoTitle}
        </p>
        <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-brand-50/80">
          {reviewCopy.demoBody}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button type="button" onClick={restart} className="btn-outline-invert">
            {copy.nav.restart}
          </button>
          <a
            href={links.pricing}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-50"
          >
            {reviewCopy.linkPricing}
            <ArrowRight className="size-4" />
          </a>
          <a
            href={links.howItWorks}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-50"
          >
            {reviewCopy.linkHowItWorks}
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </>
  );

  const panes: Record<StepId, React.ReactNode> = {
    state: stepState,
    goal: stepGoal,
    about: stepAbout,
    conditions: stepConditions,
    history: stepHistory,
    meds: stepMeds,
    supply: stepSupply,
    review: stepReview,
  };

  const isLast = step === "review";

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_19rem] lg:gap-12">
      {rail}

      <form
        noValidate
        aria-label={copy.a11y.formLabel}
        onSubmit={(event) => {
          event.preventDefault();
          advance();
        }}
        className="panel bg-background p-6 sm:p-8 lg:col-start-1 lg:row-start-1"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
          {/* Announced on advance. The visible text and the announcement are
              the same string, so there is no second, drifting copy of it. */}
          <p aria-live="polite" className="figure text-xs text-muted-foreground">
            {counter}
          </p>
          {blocked && (
            <Badge variant="outline" className="label rounded-[3px] border-border px-2">
              {copy.steps.blocked.eyebrow}
            </Badge>
          )}
        </div>

        <div className="pt-8">{panes[step]}</div>

        {/* Back and Continue only. On the last step there is nothing to submit,
            and the reset lives inside the demo notice that explains it. */}
        <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-6">
          {boundedIndex > 0 && (
            <button type="button" onClick={goBack} className="btn-outline">
              <ArrowLeft className="size-4" />
              {copy.nav.back}
            </button>
          )}
          {!isLast && !blocked && (
            <button type="submit" className="btn-solid">
              {steps[boundedIndex + 1] === "review" ? copy.nav.toReview : copy.nav.next}
              <ArrowRight className="size-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
