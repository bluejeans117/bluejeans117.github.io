import { Nav } from '@/components/nav';
import { ArrowUpRight, Github, Layers3, PackageOpen, Smartphone, Wrench } from 'lucide-react';

const projects = [
  {
    title: 'FlexDoc',
    label: 'Prauga · Open source developer tooling',
    description:
      "Prauga's self-hosted OpenAPI documentation renderer and API explorer. FlexDoc 2.2 spans React, Node, Spring Boot, CLI/static export, Go, Python and Rust around one canonical renderer, request engine and Try It → API Client workflow.",
    tech: ['TypeScript', 'React', 'OpenAPI', 'CLI', 'Polyglot adapters'],
    href: '/flexdoc',
    github: 'https://github.com/prauga/flexdoc',
    icon: Layers3,
  },
  {
    title: 'Prauga',
    label: 'Company · Product & engineering',
    description:
      'Software products and engineering work spanning backend services, Flutter applications, cloud infrastructure, developer tooling and experimental platform ideas.',
    tech: ['Go', 'Flutter', 'AWS', 'GCP', 'Kubernetes'],
    href: 'https://prauga.com',
    icon: Wrench,
  },
  {
    title: 'PVOT / Linux platform work',
    label: 'Systems · Product exploration',
    description:
      'Linux-first platform experiments around desktop/mobile convergence, Android containerization and an AOSP-based launcher experience.',
    tech: ['Linux', 'AOSP', 'Android', 'Debian', 'Rust'],
    icon: Smartphone,
  },
  {
    title: 'Evolution X',
    label: 'Open source · Android',
    description:
      'Contributions to the Android custom-ROM ecosystem and related open-source device/platform work.',
    tech: ['AOSP', 'Android', 'Linux'],
    href: 'https://evolution-x.org/',
    github: 'https://github.com/Evolution-X/',
    icon: PackageOpen,
  },
  {
    title: 'Project 404',
    label: 'Open source · Android',
    description:
      'Earlier Android open-source platform work and community contribution.',
    tech: ['AOSP', 'Android'],
    href: 'https://project404.co/',
    github: 'https://github.com/P-404/',
    icon: PackageOpen,
  },
  {
    title: 'OP Auth',
    label: 'Open source · Authentication',
    description:
      'An earlier authentication-focused open-source project from my broader backend and platform work.',
    tech: ['Authentication', 'Backend'],
    href: 'https://github.com/bluejeans117/OPAuth',
    github: 'https://github.com/bluejeans117/OPAuth',
    icon: Github,
  },
];

export default function Work() {
  return (
    <main className='flex min-h-screen flex-col'>
      <Nav />
      <div className='container mx-auto max-w-6xl px-4 py-12 sm:py-16'>
        <header className='max-w-3xl'>
          <div className='text-xs font-semibold uppercase tracking-[0.2em] text-accent'>Projects</div>
          <h1 className='mt-3 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl'>
            Things I&apos;ve built, contributed to, or am still figuring out.
          </h1>
          <p className='mt-5 text-base leading-7 text-foreground/62'>
            A mix of current product work, developer tooling, backend/platform experiments and long-running open-source interests.
          </p>
        </header>

        <section className='mt-12 grid gap-5 md:grid-cols-2'>
          {projects.map(({ icon: Icon, ...project }, index) => (
            <article key={project.title} className={`glass-card rounded-2xl p-6 ${index === 0 ? 'md:col-span-2 md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-8 md:p-8' : ''}`}>
              <div>
                <div className='mb-5 inline-flex rounded-xl bg-accent/10 p-2.5 text-accent'><Icon size={20} /></div>
                <div className='text-xs font-semibold uppercase tracking-[0.16em] text-foreground/45'>{project.label}</div>
                <h2 className='mt-2 text-2xl font-semibold tracking-tight'>{project.title}</h2>
                <p className='mt-3 max-w-3xl text-sm leading-6 text-foreground/62'>{project.description}</p>
                <div className='mt-5 flex flex-wrap gap-2'>
                  {project.tech.map((item) => (
                    <span key={item} className='rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-foreground/60'>{item}</span>
                  ))}
                </div>
              </div>
              <div className={`mt-6 flex flex-wrap gap-3 ${index === 0 ? 'md:mt-0 md:flex-col' : ''}`}>
                {project.href && (
                  project.href.startsWith('/') ? (
                    <a href={project.href} className='inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90'>View project <ArrowUpRight size={14} /></a>
                  ) : (
                    <a href={project.href} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90'>View project <ArrowUpRight size={14} /></a>
                  )
                )}
                {project.github && (
                  <a href={project.github} target='_blank' rel='noopener noreferrer' className='inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition hover:border-accent/30'><Github size={14} /> Source</a>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
