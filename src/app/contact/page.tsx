import { Nav } from '@/components/nav';

const socials = [
  {
    name: 'Email',
    icon: 'fa fa-envelope',
    link: 'mailto:vishnurajesh45@gmail.com',
    title: 'Mail',
  },
  {
    name: 'Telegram',
    icon: 'fa-telegram',
    link: 'https://t.me/bluejeans117',
    title: 'Telegram',
  },
  {
    name: 'Instagram',
    icon: 'fa-instagram',
    link: 'https://instagram.com/vishnu_kapadia',
    title: 'Instagram',
  },
  {
    name: 'Twitter',
    icon: 'fa-twitter',
    link: 'https://twitter.com/bluejeans117',
    title: 'Twitter',
  },
  {
    name: 'Facebook',
    icon: 'fa-facebook',
    link: 'https://www.facebook.com/bluejeans117/',
    title: 'Facebook',
  },
  {
    name: 'Discord',
    icon: 'fa-discord',
    link: '#',
    title: 'Discord: bluejeans117#0888',
  },
];

export default function Contact() {
  return (
    <main className='flex min-h-screen flex-col'>
      <Nav />
      <div className='container flex flex-1 flex-col items-center justify-center py-16'>
        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl'>
          Contact <span className='text-accent'>Me</span>
        </h1>
        <h2 className='mt-4 text-xl text-foreground/60'>
          You can reach me on these platforms...
        </h2>

        <div className='mt-12 flex flex-wrap justify-center gap-8'>
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              className='group relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-card transition-colors hover:bg-accent/10'
              target='_blank'
              rel='noopener noreferrer'
              title={social.title}
            >
              <i className={`fab fa-2x ${social.icon}`} />
              <span className='sr-only'>{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
