import { Nav } from '@/components/nav';

const socials = [
  {
    name: 'LinkedIn',
    icon: 'fa-linkedin',
    link: 'https://www.linkedin.com/in/vishnu-r-28101016b/',
  },
  {
    name: 'GitHub',
    icon: 'fa-github',
    link: 'https://github.com/bluejeans117/',
  },
  {
    name: 'Stack Overflow',
    icon: 'fa-stack-overflow',
    link: 'https://stackoverflow.com/users/13810896/vishnu-r',
  },
  {
    name: 'Steam',
    icon: 'fa-steam',
    link: 'https://steamcommunity.com/id/bluejeans117/',
  },
];

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />
      <div className='flex flex-1 items-center justify-center'>
        <div className='container flex flex-col items-center justify-center py-24'>
          <h1 className='text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl'>
            Vishnu <span className='text-accent'>Rajesh</span>
          </h1>
          <h2 className='mt-4 text-center text-xl text-foreground/60'>
            Solutions Architect • Full Stack Engineer • Cloud Developer
            <br />
            Android Dev • SysAdmin • Blockchain Engineer
            <br />
            Open Source Contributor • Tech Enthusiast • Aviation Geek
          </h2>

          <div className='mt-12 flex gap-8'>
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.link}
                className='group relative flex h-12 w-12 items-center justify-center rounded-full border border-accent/20 bg-card transition-colors hover:bg-accent/10'
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className={`fab fa-2x ${social.icon}`} />
                <span className='sr-only'>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
