import { Nav } from '@/components/nav';

const experience = [
  {
    company: 'VaidhyaMegha Pvt Ltd',
    location: 'Hyderabad, TG',
    title: 'ATG Lead and Consultant – Software Developer 3',
    period: 'Jan 2024 – Present',
    highlights: [
      {
        project: 'Client B: Service Gateway',
        points: [
          'Designed and implemented a service gateway in Java for authentication, rate-limiting, and access management, reducing system response times by 25%.',
          'Conducted multiple sessions on coding best practices, development pipelines, and tools (e.g., GitHub, Kubernetes, IDE extensions), improving team productivity by 40%.',
        ],
      },
      {
        project: 'Client C: Platform Migration',
        points: [
          'Led migration of a platform from Caspio to AWS using React, NodeJS, and MySQL, reducing costs by 70% while enhancing system reliability.',
          'Introduced new system components like scheduled messaging services with no additional infrastructure costs.',
          'Migrated payment management from in-house solutions to Stripe, minimizing financial risks and simplifying compliance.',
          'Introduced Attribute-Based Access Control (ABAC) for precise user access control.',
        ],
      },
      {
        project: 'Internal Products',
        points: [
          'Refactored a multi-tenant SaaS platform into a service gateway plus foundational services written in Golang, improving modularity and scalability.',
          'Developed internal frameworks for frontend (JavaScript) and backend (Python, GoLang) to integrate seamlessly with the service gateway, reducing developer effort by 50%.',
        ],
      },
    ],
  },
  {
    company: 'VaidhyaMegha Pvt Ltd',
    location: 'Bengaluru, KA',
    title: 'ATG Lead and Consultant – Software Developer 2',
    period: 'Sept 2022 – Jan 2024',
    highlights: [
      {
        project: 'Client A: Doctor-Patient Interaction Platform',
        points: [
          'Led the development of a cross-platform application for doctor-patient interactions, improving system efficiency by 60%.',
          'Introduced features for appointment scheduling, medical document sharing, and referrals.',
        ],
      },
      {
        project: 'Multi-Tenant SaaS Platform',
        points: [
          'Built a multi-tenant SaaS application to streamline internal product operations, reducing development effort by 40%.',
        ],
      },
      {
        project: 'Client B: Blockchain Implementation',
        points: [
          'Developed a fine-grained Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC) system, enhancing data security and compliance.',
          'Implemented a blockchain network with Kubernetes, increasing scalability and reducing deployment time by 50%.',
          'Built private Golang libraries for smart contracts and API integrations, achieving a 30% reduction in integration time for new systems.',
        ],
      },
    ],
  },
  {
    company: 'VaidhyaMegha Pvt Ltd',
    location: 'Bengaluru, KA',
    title: 'ATG Developer and Consultant – Software Developer 1',
    period: 'Oct 2020 – Sept 2022',
    highlights: [
      {
        project: 'Flutter Mobile App Development',
        points: [
          'Designed and developed a cross-platform mobile app for house recognition and classification using TensorFlow, improving classification accuracy by 85%.',
        ],
      },
      {
        project: 'Blockchain E-commerce Prototype',
        points: [
          'Built a blockchain-based e-commerce web app prototype for NFTs, reducing transaction times by 30% compared to traditional systems.',
        ],
      },
      {
        project: 'Automated Legal Will Generator',
        points: [
          'Led the development of a cross-platform, automated legal will generation application, achieving a 50% reduction in manual documentation time for users.',
        ],
      },
      {
        project: 'Healthcare Platform Development',
        points: [
          'Created a cross-platform application to facilitate interactions between doctors and patients, enabling appointment scheduling, referrals, and secure sharing of sensitive medical documents.',
          'Reduced administrative errors by 40% and improved data security compliance.',
        ],
      },
    ],
  },
];

const contact = {
  email: 'vishnurajesh45@gmail.com',
  location: 'Bengaluru, KA',
  linkedin: 'linkedin.com/in/vishnurajesh',
};

export default function Experience() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />
      <main className='container mx-auto px-4 py-8'>
        <div className='mb-8 flex flex-col items-center md:flex-row md:justify-between'>
          <div>
            <h1 className='text-4xl font-bold'>Professional Experience</h1>
            <div className='mt-2 text-foreground/60'>
              <p>{contact.location}</p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className='hover:text-accent'
                >
                  Email
                </a>{' '}
                •{' '}
                <a
                  href={`https://${contact.linkedin}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-accent'
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className='space-y-12'>
          {experience.map((job, index) => (
            <div
              key={index}
              className='rounded-lg border border-accent/20 bg-card p-6'
            >
              <div className='mb-4'>
                <h3 className='text-xl font-semibold text-accent'>
                  {job.title}
                </h3>
                <p className='text-foreground/60'>
                  {job.company} | {job.location} | {job.period}
                </p>
              </div>
              <div className='space-y-6'>
                {job.highlights.map((highlight, hIndex) => (
                  <div key={hIndex}>
                    <h4 className='mb-2 font-medium text-accent/80'>
                      {highlight.project}
                    </h4>
                    <ul className='list-inside list-disc space-y-2 text-foreground/80'>
                      {highlight.points.map((point, pIndex) => (
                        <li key={pIndex} className='pl-4'>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
