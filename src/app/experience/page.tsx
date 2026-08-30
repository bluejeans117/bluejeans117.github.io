import { Nav } from '@/components/nav';

const experience = [
  {
    company: 'Epsilon',
    location: 'Bengaluru, India',
    title: 'Senior Software Engineer — Backend',
    period: 'Mar 2026 — Present',
    summary:
      'Backend and platform engineering across high-throughput ad-tech systems, with increasing ownership across services, reliability and production delivery.',
    highlights: [
      'Own and drive backend work across multiple ad-stack components, from implementation through reviews, canaries, production rollout and follow-up.',
      'Work with Kafka consumers, HBase-backed systems, AWS infrastructure and production observability at high message volumes.',
      'Driving reliability and platform improvements including retry behavior, validation, alerting and cost/right-sizing work.',
      'Growing toward end-to-end technical ownership and subject-matter expertise across core services.',
    ],
  },
  {
    company: 'Prauga Private Limited',
    location: 'Bengaluru, India',
    title: 'Co-founder & CTO',
    period: '2024 — Present',
    summary:
      'Building products, developer infrastructure and software services with a small engineering team.',
    highlights: [
      'Lead product and technology decisions across backend, mobile, cloud and infrastructure work.',
      'Built and explored products spanning developer tooling, collaborative applications and Linux/Android platform work.',
      'Created FlexDoc as an open-source OpenAPI documentation renderer and API explorer; FlexDoc 2.0 now uses one canonical renderer across React, Node integrations and Spring Boot.',
    ],
  },
  {
    company: 'Netsmart India',
    location: 'Bengaluru, India',
    title: 'Senior Software Engineer',
    period: 'Aug 2025 — Mar 2026',
    summary:
      'Product engineering across web and backend systems in a healthcare technology environment.',
    highlights: [
      'Worked across application defects and product delivery in a large healthcare software codebase.',
      'Contributed across frontend and backend concerns while operating within enterprise release and quality processes.',
    ],
  },
  {
    company: 'VaidhyaMegha / Samyama.ai',
    location: 'Bengaluru & Hyderabad, India',
    title: 'Software Engineer → Lead / Consultant',
    period: 'Oct 2020 — Aug 2024',
    summary:
      'Progressed from software engineer to technical lead/consultant while building client systems, internal platforms and cloud-native services.',
    highlights: [
      'Designed Java and Go services for authentication, access management and service-gateway patterns.',
      'Led platform migrations to AWS and worked across React, Node.js, MySQL, Kubernetes and cloud infrastructure.',
      'Built multi-tenant SaaS foundations and internal Go/Python/JavaScript integration frameworks that reduced repeated development work.',
      'Implemented Hyperledger Fabric infrastructure and fine-grained RBAC/ABAC systems for sensitive-data use cases.',
      'Led cross-platform product development using Flutter and mentored engineers through architecture, tooling and delivery practices.',
    ],
  },
];

export default function Experience() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />
      <main className='container mx-auto max-w-6xl px-4 py-12 sm:py-16'>
        <header className='max-w-3xl'>
          <div className='text-xs font-semibold uppercase tracking-[0.2em] text-accent'>Career</div>
          <h1 className='mt-3 text-4xl font-semibold tracking-[-0.035em] sm:text-5xl'>
            Building systems, then owning what happens to them in production.
          </h1>
          <p className='mt-5 text-base leading-7 text-foreground/65 sm:text-lg'>
            6+ years across backend engineering, product development, cloud infrastructure, distributed systems and technical leadership.
          </p>
        </header>

        <div className='relative mt-14 space-y-5 before:absolute before:bottom-6 before:left-[7px] before:top-6 before:w-px before:bg-border sm:before:left-[11px]'>
          {experience.map((job, index) => (
            <article key={`${job.company}-${job.period}`} className='relative pl-8 sm:pl-10'>
              <span className={`absolute left-0 top-7 h-4 w-4 rounded-full border-4 border-background sm:h-6 sm:w-6 ${index === 0 ? 'bg-emerald-500' : 'bg-accent/50'}`} />
              <div className='glass-card rounded-2xl p-6 sm:p-7'>
                <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                  <div>
                    <h2 className='text-xl font-semibold tracking-tight'>{job.title}</h2>
                    <div className='mt-1 text-sm font-medium text-accent'>{job.company}</div>
                  </div>
                  <div className='text-sm text-foreground/50 sm:text-right'>
                    <div>{job.period}</div>
                    <div>{job.location}</div>
                  </div>
                </div>

                <p className='mt-5 max-w-4xl text-sm leading-6 text-foreground/65'>{job.summary}</p>

                <ul className='mt-5 grid gap-2 text-sm leading-6 text-foreground/68'>
                  {job.highlights.map((highlight) => (
                    <li key={highlight} className='flex gap-3'>
                      <span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70' />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
