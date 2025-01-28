import { Nav } from '@/components/nav';
import Image from 'next/image';

const skills = {
  programmingLanguages: [
    'Golang',
    'Python',
    'Java',
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Flutter',
    'Dart',
    'Kotlin',
    'Swift',
    'Rust',
    'C/C++',
    'PHP',
  ],
  cloudTechnologies: [
    'AWS (S3, Lambda, EC2, Glue, EKS, Beanstalk)',
    'GCP (BigQuery, Cloud SQL, Dataflow, K8s)',
    'Firebase',
    'Microsoft Azure',
  ],
  blockchain: [
    'Hyperledger Fabric',
    'Ethereum',
    'Smart Contracts',
    'RBAC/ABAC implementations',
  ],
  devOps: [
    'Kubernetes',
    'Docker',
    'GitHub',
    'GitLab',
    'SonarQube',
    'CI/CD Pipelines',
  ],
  databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Cloud BigTable'],
  other: [
    'Android Custom ROM development',
    'Linux shell scripting',
    '*nix system administration',
    'Microservices',
    'REST API Design',
    'Software Design Patterns',
    'Object-Oriented Programming',
    'System Design',
  ],
};

const certifications = [
  {
    title: 'AWS Partner Certifications',
    items: ['Accreditation (Technical)', 'Sales Accreditation (Business)'],
    date: 'April 2024',
  },
  {
    title: 'HackerRank Certifications',
    items: [
      'Certified Software Engineer',
      'Go (Intermediate)',
      'JavaScript (Intermediate)',
      'Rest API (Intermediate)',
      'Java (Basic)',
      'Python (Basic)',
      'Problem Solving (Basic)',
    ],
    date: 'May-June 2024',
  },
  {
    title: 'Blockchain Certifications',
    items: [
      'BlockchainExpert Certificate – AlgoExpert',
      'IBM Blockchain Essentials V2',
      'The Complete Guide on Hyperledger Fabric v2.x on Kubernetes',
      'Command Line Interface with Golang',
    ],
    date: 'February-September 2023',
  },
];

const leadership = [
  {
    title: 'Team Leadership',
    description:
      'Led multiple teams across consulting projects and internal product development initiatives. Facilitated knowledge-sharing sessions to improve development processes and optimize CI/CD pipelines, positively impacting team productivity by ~40%.',
  },
  {
    title: 'Workshops and Knowledge Sharing',
    description:
      'Conducted workshops on coding best practices, tools (e.g., GitHub, Kubernetes, IDE extensions), and development pipelines across internal and client-facing forums. Recognized for driving technical excellence through structured training sessions.',
  },
  {
    title: 'Mentorship Initiative',
    description:
      'Active participant in Real OGs (2020), providing guidance to undergraduate Computer Science students through career advice, skill development, and networking insights. Author of technical blogs on cloud computing, blockchain, and emerging technologies.',
  },
  {
    title: 'Open Source Contributions',
    description:
      'Contributed to major open-source projects including Linux, Android Open Source Project (AOSP), and libraries in Go, Python, and Flutter. Earned the Arctic Vault Contributor Badge for significant contributions.',
  },
];

const interests = [
  {
    title: 'Professional',
    description:
      'Open-source contributions to Linux, AOSP, and libraries in Go, Python, and Flutter. Writing technical blogs on cloud computing, blockchain, and mobile development. Exploring emerging technologies like AI and Web3.',
  },
  {
    title: 'Aviation',
    description:
      'Aviation enthusiast, with a focus on flight mechanics and simulation.',
  },
  {
    title: 'Sports',
    description:
      'National-level table tennis player and state-level basketball player.',
  },
  {
    title: 'Creative',
    description: 'Biking and playing the guitar.',
  },
];

const languages = [
  { name: 'English', level: 'Professional' },
  { name: 'Kannada', level: 'Native' },
  { name: 'Hindi', level: 'Professional' },
  { name: 'Gujarati', level: 'Conversational' },
];

export default function About() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />
      <main className='container mx-auto px-4 py-8'>
        <div className='mb-8 flex flex-col items-center md:flex-row md:items-start md:space-x-8'>
          <div className='mb-6 md:mb-0'>
            <Image
              src='/img/portrait.jpg'
              alt='Vishnu Rajesh'
              width={120}
              height={120}
              className='rounded-full object-cover shadow-lg'
            />
          </div>
          <div>
            <h1 className='mb-4 text-4xl font-bold'>About Me</h1>
            <p className='mb-4 text-lg text-foreground/80'>
              Dedicated problem solver and solutions-focused software engineer
              with a diverse technical background spanning cloud computing,
              blockchain, mobile development, and system administration.
              Leveraging this broad expertise to architect comprehensive
              solutions that bridge multiple technology domains. Passionate
              about open-source contributions and mentoring the next generation
              of developers.
            </p>
          </div>
        </div>

        <section className='mb-12'>
          <h2 className='mb-6 text-2xl font-semibold'>Technical Skills</h2>
          <div className='grid gap-6 md:grid-cols-2'>
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className='rounded-lg border border-accent/20 bg-card p-4'
              >
                <h3 className='mb-3 text-lg font-medium capitalize text-accent'>
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className='flex flex-wrap gap-2'>
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className='rounded-full border border-accent/20 bg-background px-3 py-1 text-sm'
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='mb-6 text-2xl font-semibold'>Certifications</h2>
          <div className='grid gap-6 md:grid-cols-2'>
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className='rounded-lg border border-accent/20 bg-card p-4'
              >
                <h3 className='mb-2 text-lg font-medium text-accent'>
                  {cert.title}
                </h3>
                <ul className='list-inside list-disc space-y-1 text-foreground/80'>
                  {cert.items.map((item, index) => (
                    <li key={index}>
                      {item}{' '}
                      <span className='text-foreground/60'>({cert.date})</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='mb-6 text-2xl font-semibold'>
            Leadership & Activities
          </h2>
          <div className='grid gap-6 md:grid-cols-2'>
            {leadership.map((item) => (
              <div
                key={item.title}
                className='rounded-lg border border-accent/20 bg-card p-4'
              >
                <h3 className='mb-2 text-lg font-medium text-accent'>
                  {item.title}
                </h3>
                <p className='text-foreground/80'>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className='mb-12'>
          <h2 className='mb-6 text-2xl font-semibold'>Interests & Languages</h2>
          <div className='grid gap-6 md:grid-cols-2'>
            <div>
              <h3 className='mb-4 text-xl font-medium'>Personal Interests</h3>
              <div className='grid gap-4 sm:grid-cols-2'>
                {interests.map((interest) => (
                  <div
                    key={interest.title}
                    className='rounded-lg border border-accent/20 bg-card p-4'
                  >
                    <h4 className='mb-2 font-medium text-accent'>
                      {interest.title}
                    </h4>
                    <p className='text-sm text-foreground/80'>
                      {interest.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className='mb-4 text-xl font-medium'>Languages</h3>
              <div className='rounded-lg border border-accent/20 bg-card p-4'>
                <div className='grid grid-cols-2 gap-4'>
                  {languages.map((lang) => (
                    <div key={lang.name} className='flex flex-col'>
                      <span className='font-medium text-accent'>
                        {lang.name}
                      </span>
                      <span className='text-sm text-foreground/60'>
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
