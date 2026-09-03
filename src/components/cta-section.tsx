import { Container } from "./container";
import { Button } from "./ui";
import { site } from "@/data/site";

export function CtaSection({
  title = "Have a project in mind?",
  description = "Tell us what you're building. We'll reply within one business day with a clear scope and a fixed quote — no discovery-call runaround.",
}: {
  title?: string;
  description?: string;
}) {
  return (
   <section className="relative overflow-hidden border-y border-line bg-ink py-20">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div
        className="absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "linear-gradient(120deg, #4338CA, #0891A8)" }}
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="max-w-lg text-sm leading-6 text-white">{description}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="primary" className=" hover:brightness-95">
            Start your project
          </Button>
          <Button href={site.phoneHref} variant="secondary" className="border-white/15  hover:border-white/40" icon={false}>
            Call {site.phone}
          </Button>
        </div>
      </Container>
    </section>
  );
}
