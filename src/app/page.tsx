import { Nav } from '@/components/nav';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Boxes,
  Code2,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
} from 'lucide-react';

const focus = [
  {
    icon: Code2,
    label: 'Backend & distributed systems',
    detail: 'Go, Java, Kafka, Kubernetes, AWS and production ownership',
  },
  {
    icon: Boxes,
    label: 'Developer tooling',
    detail: 'Building FlexDoc: OpenAPI docs, Try It and a shared renderer',
  },
  {
    icon: Sparkles,
    label: 'Founder / builder',
    detail: 'Co-founder & CTO at Prauga, exploring developer and AI infrastructure',
  },
];

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />

      <main className='flex-1'>
        <section className='relative overflow-hidden px-4 pb-16 pt-12 sm:pb-20 sm:pt-24'>
          <div className='pointer-events-none absolute left-1/2 top-16 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl' />

          <div className='container mx-auto max-w-6xl'>
            <div className='mx-auto max-w-4xl text-center'>
              <div className='mx-auto mb-7 h-28 w-28 overflow-hidden rounded-full border border-border bg-card shadow-xl sm:h-32 sm:w-32'>
                <Image
                  src='/img/portrait.jpg'
                  alt='Vishnu Rajesh'
                  width={128}
                  height={128}
                  className='h-full w-full rounded-full object-cover'
                  priority
                />
              </div>

              <div className='mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-accent/20 bg-card/70 px-3.5 py-2 text-xs leading-5 text-foreground/70 shadow-sm backdrop-blur sm:px-4 sm:text-sm'>
                <span className='h-2 w-2 rounded-full bg-emerald-500' />
                Senior Software Engineer at Epsilon · Co-founder & CTO at Prauga
              </div>

              <h1 className='text-balance text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.045em] sm:text-6xl md:text-7xl'>
                I build backend systems and{' '}
                <span className='gradient-text'>developer tools</span> that make
                complex infrastructure easier to use.
              </h1>

              <p className='mx-auto mt-7 max-w-2xl text-balance text-lg leading-8 text-foreground/65 sm:text-xl'>
                I&apos;m Vishnu Rajesh, a Bengaluru-based software engineer with 6+
                years across backend engineering, distributed systems, cloud,
                product development and open source. My current open-source focus
                is FlexDoc 2.8.
              </p>

              <div className='mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row'>
                <Link
                  href='/flexdoc'
                  className='inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-lg transition hover:-translate-y-0.5 hover:opacity-90 sm:w-auto'
                >
                  Explore FlexDoc 2.8 <ArrowRight size={16} />
                </Link>
                <Link
                  href='/experience'
                  className='inline-flex w-full items-center justify-center rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold shadow-sm backdrop-blur transition hover:border-accent/40 hover:bg-card sm:w-auto'
                >
                  Experience
                </Link>
              </div>

              <div className='mt-7 flex items-center justify-center gap-5 text-foreground/55'>
                <a
                  href='https://github.com/bluejeans117/'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='GitHub'
                  className='transition hover:text-foreground'
                >
                  <Github size={21} />
                </a>
                <a
                  href='https://www.linkedin.com/in/vishnurajesh/'
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='LinkedIn'
                  className='transition hover:text-foreground'
                >
                  <Linkedin size={21} />
                </a>
                <span className='inline-flex items-center gap-1.5 text-sm'>
                  <MapPin size={16} /> Bengaluru, India
                </span>
              </div>
            </div>

            <div className='mx-auto mt-20 grid max-w-5xl gap-4 md:grid-cols-3'>
              {focus.map(({ icon: Icon, label, detail }) => (
                <div
                  key={label}
                  className='glass-card group rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/30'
                >
                  <div className='mb-5 inline-flex rounded-xl border border-accent/15 bg-accent/10 p-2.5 text-accent'>
                    <Icon size={20} />
                  </div>
                  <h2 className='font-semibold tracking-tight'>{label}</h2>
                  <p className='mt-2 text-sm leading-6 text-foreground/60'>
                    {detail}
                  </p>
                </div>
              ))}
            </div>

            <div className='mx-auto mt-16 max-w-5xl rounded-3xl border border-accent/15 bg-card/70 p-6 shadow-xl shadow-black/5 backdrop-blur md:p-8'>
              <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
                <div>
                  <div className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent'>
                    Current build
                  </div>
                  <h2 className='text-2xl font-semibold tracking-tight'>
                    FlexDoc 2.8 — OpenAPI docs and a local API workspace
                  </h2>
                  <p className='mt-2 max-w-2xl text-sm leading-6 text-foreground/60'>
                    One canonical renderer, OpenAPI 3.0/3.1, Try It, generated code, a local API workspace and integrations across browser, Node, .NET, JVM, Python, PHP, Ruby, Go, Rust and Elixir — self-hosted, with no account or runtime CDN.
                  </p>
                </div>
                <Link
                  href='/flexdoc'
                  className='inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent/15'
                >
                  See what changed <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
