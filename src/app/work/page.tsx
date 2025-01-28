import { Nav } from '@/components/nav';
import Image from 'next/image';

const projects = [
  {
    title: 'Evolution-X',
    image: '/img/projects/project1.svg',
    link: 'https://evolution-x.org/',
    github: 'https://github.com/Evolution-X/',
  },
  {
    title: 'Project-404',
    image: '/img/projects/project2.jpg',
    link: 'https://project404.co/',
    github: 'https://github.com/P-404/',
  },
  {
    title: 'OP Auth',
    image: '/img/projects/project3.png',
    link: 'https://github.com/bluejeans117/OPAuth',
    github: 'https://github.com/bluejeans117/OPAuth',
  },
];

export default function Work() {
  return (
    <main className='flex min-h-screen flex-col'>
      <Nav />
      <div className='container py-16'>
        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
          My <span className='text-accent'>Work</span>
        </h1>
        <h2 className='mt-4 text-xl text-foreground/60'>
          Check out some of my projects...
        </h2>

        <div className='mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project) => (
            <div
              key={project.title}
              className='group relative overflow-hidden rounded-lg border border-accent/20 bg-card'
            >
              <div className='relative aspect-video w-full overflow-hidden'>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className='object-cover transition-transform duration-300 group-hover:scale-105'
                />
              </div>
              <div className='p-6'>
                <h3 className='mb-4 text-xl font-semibold'>{project.title}</h3>
                <div className='flex gap-4'>
                  <a
                    href={project.link}
                    className='inline-flex items-center gap-2 text-sm text-accent hover:underline'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <svg
                      className='h-4 w-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                      />
                    </svg>
                    View Project
                  </a>
                  <a
                    href={project.github}
                    className='inline-flex items-center gap-2 text-sm text-accent hover:underline'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <svg
                      className='h-4 w-4'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fillRule='evenodd'
                        d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                      />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
