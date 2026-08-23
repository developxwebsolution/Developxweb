import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { Service } from "@/data/services";
import type { Project } from "@/data/portfolio";
import type { Testimonial } from "@/data/testimonials";
import type { City } from "@/data/cities";
import { ICONS } from "./icon-map";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon];
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group card-raised relative flex flex-col gap-4 overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo hover:shadow-xl hover:shadow-indigo-soft/50"
    >
      <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-soft text-indigo">
        <Icon className="size-5" />
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-ink">{service.shortName}</h3>
        <p className="mt-2 text-sm leading-6 text-ink-soft">{service.summary}</p>
      </div>
      <span className="mt-auto flex items-center gap-1 text-sm font-medium text-indigo opacity-0 transition-opacity group-hover:opacity-100">
        Learn more <ArrowRight className="size-3.5" />
      </span>
    </Link>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group card-raised flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div
  className="flex h-40 items-center justify-between p-6"
  style={
    project.image
      ? { backgroundImage: `url(${project.image})`, backgroundSize: "cover", backgroundPosition: "center" }
      : { background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)` }
  }
>
        <span className="font-mono text-xs uppercase tracking-wider text-ink-soft">{project.industry.replace("-", " & ")}</span>
        <span className="font-mono text-xs text-ink-soft">{project.year}</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-lg font-semibold text-ink">{project.name}</h3>
        <p className="text-sm leading-6 text-ink-soft">{project.summary}</p>
        <div className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-indigo opacity-0 transition-opacity group-hover:opacity-100">
          View case study <ArrowRight className="size-3.5" />
        </div>
      </div>
    </Link>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="card-raised flex h-full flex-col gap-4 p-6">
      <div className="flex gap-0.5 text-amber">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-amber" />
        ))}
      </div>
      <p className="text-sm leading-6 text-ink">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-auto flex items-center gap-3 pt-2">
        <div className="flex size-9 items-center justify-center rounded-full bg-indigo-soft font-display text-sm font-semibold text-indigo">
          {t.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-ink">{t.name}</p>
          <p className="text-xs text-ink-soft">{t.role}, {t.company} · {t.city}</p>
        </div>
      </div>
    </div>
  );
}

export function CityCard({ city }: { city: City }) {
  return (
    <Link
      href={`/web-development-company-${city.slug}`}
      className="group card-raised flex items-center justify-between p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo"
    >
      <div>
        <h3 className="font-display text-base font-semibold text-ink">{city.name}</h3>
        <p className="mt-1 text-xs text-ink-soft">{city.state}</p>
      </div>
      <ArrowRight className="size-4 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-indigo" />
    </Link>
  );
}
