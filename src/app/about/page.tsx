import { Nav } from '@/components/nav';
import Image from 'next/image';
import { Braces, Cloud, Database, GitBranch, Server, Smartphone } from 'lucide-react';

const skillGroups = [
  { icon: Server, title: 'Backend & distributed systems', items: ['Go', 'Java', 'Python', 'REST APIs', 'Microservices', 'Kafka', 'System Design'] },
  { icon: Cloud, title: 'Cloud & platform', items: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'CI/CD', 'Observability', 'Linux'] },
  { icon: Database, title: 'Data & storage', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'HBase', 'Redis', 'BigTable', 'Aerospike'] },
  { icon: Braces, title: 'Product & frontend', items: ['React', 'TypeScript', 'JavaScript', 'Angular', 'Flutter', 'Next.js'] },
  { icon: Smartphone, title: 'Mobile & systems', items: ['Flutter', 'Android / AOSP', 'Kotlin', 'Rust', 'Shell scripting'] },
  { icon: GitBranch, title: 'Specialist experience', items: ['Hyperledger Fabric', 'RBAC / ABAC', 'OpenAPI', 'Developer tooling', 'SRE collaboration'] },
];

const principles = [
  { title: 'Own the whole system', description: 'I care about the path before and after the code I touch: data flow, production behavior, failure modes, dependencies and operational impact.' },
  { title: 'Make the interface simpler than the implementation', description: 'A recurring theme in my work is turning complicated infrastructure into a smaller, safer developer surface — one of the reasons I am building FlexDoc.' },
  { title: 'Build, measure, iterate', description: 'I prefer working products and observable systems over abstract architecture. The design matters, but it has to survive contact with production.' },
  { title: 'Stay close to open source', description: 'I have spent years around Linux, Android/AOSP and open-source libraries, and I continue to build and publish developer tooling publicly.' },
];

export default function About() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />
      <main className='container mx-auto max-w-6xl px-4 py-12 sm:py-16'>
        <section className='grid gap-10 lg:grid-cols-[180px_1fr] lg:items-start'>
          <div className='mx-auto lg:mx-0'>
            <Image src='/img/portrait.jpg' alt='Vishnu Rajesh' width={160} height={160} className='h-40 w-40 rounded-full border border-border object-cover shadow-xl' priority />
          </div>
          <div>
            <div className='text-xs font-semibold uppercase tracking-[0.2em] text-accent'>About</div>
            <h1 className='mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl'>Backend engineer, product builder and open-source developer.</h1>
            <div className='mt-6 space-y-4 text-base leading-7 text-foreground/68 sm:text-lg'>
              <p>I&apos;m a Senior Software Engineer at Epsilon in Bengaluru, working primarily on backend and ad-tech systems, while also serving as Co-founder & CTO at Prauga. I have 6+ years of experience across backend engineering, cloud infrastructure, distributed systems, mobile products and developer tooling.</p>
              <p>Go is the language I reach for most often, but my career has been intentionally broad: Kafka and high-throughput consumers, Kubernetes and cloud platforms, Java services, React/Angular applications, Flutter products, databases from PostgreSQL to HBase, and blockchain infrastructure with Hyperledger Fabric.</p>
              <p>My current open-source focus is <strong className='text-foreground'>FlexDoc</strong>, a self-hosted OpenAPI documentation renderer and API explorer. FlexDoc 2.8 keeps one canonical renderer and request model across browser/Node integrations, .NET, JVM frameworks, Python, PHP, Ruby, Go, Rust, Elixir and static distribution.</p>
            </div>
          </div>
        </section>
        <section className='mt-16'>
          <div className='mb-7'><div className='text-xs font-semibold uppercase tracking-[0.2em] text-accent'>Toolkit</div><h2 className='mt-2 text-3xl font-semibold tracking-tight'>What I work with</h2></div>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {skillGroups.map(({ icon: Icon, title, items }) => (
              <div key={title} className='glass-card rounded-2xl p-5'><div className='mb-4 flex items-center gap-3'><div className='rounded-lg bg-accent/10 p-2 text-accent'><Icon size={18} /></div><h3 className='font-semibold'>{title}</h3></div><div className='flex flex-wrap gap-2'>{items.map((item) => <span key={item} className='rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-foreground/70'>{item}</span>)}</div></div>
            ))}
          </div>
        </section>
        <section className='mt-16'>
          <div className='mb-7'><div className='text-xs font-semibold uppercase tracking-[0.2em] text-accent'>How I work</div><h2 className='mt-2 text-3xl font-semibold tracking-tight'>Engineering principles</h2></div>
          <div className='grid gap-4 md:grid-cols-2'>{principles.map((item) => <div key={item.title} className='rounded-2xl border border-border bg-card/60 p-6'><h3 className='font-semibold'>{item.title}</h3><p className='mt-2 text-sm leading-6 text-foreground/62'>{item.description}</p></div>)}</div>
        </section>
        <section className='mt-16 grid gap-5 md:grid-cols-2'>
          <div className='rounded-2xl border border-border bg-card/60 p-6'><div className='text-xs font-semibold uppercase tracking-[0.18em] text-accent'>Beyond work</div><p className='mt-3 text-sm leading-6 text-foreground/65'>Aviation and flight simulation, motorcycling, guitar, open-source systems, and product experiments. I&apos;ve also competed in table tennis at national level and basketball at state level.</p></div>
          <div className='rounded-2xl border border-border bg-card/60 p-6'><div className='text-xs font-semibold uppercase tracking-[0.18em] text-accent'>Languages</div><p className='mt-3 text-sm leading-6 text-foreground/65'>English and Hindi professionally, Kannada natively, and Gujarati conversationally.</p></div>
        </section>
      </main>
    </div>
  );
}
