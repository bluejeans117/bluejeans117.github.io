import { Nav } from '@/components/nav';
import Image from 'next/image';

export default function About() {
  return (
    <main className='flex min-h-screen flex-col'>
      <Nav />
      <div className='container py-16'>
        <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
          About <span className='text-accent'>Me</span>
        </h1>
        <h2 className='mt-4 text-xl text-foreground/60'>
          Here's a few things about me...
        </h2>

        <div className='mt-12 grid gap-8 md:grid-cols-2'>
          <div className='relative aspect-square w-full max-w-md overflow-hidden rounded-lg'>
            <Image
              src='/img/portrait.jpg'
              alt='Vishnu R'
              fill
              className='object-cover'
              priority
            />
          </div>

          <div className='flex flex-col gap-8'>
            <div>
              <h3 className='mb-4 text-2xl font-semibold text-accent'>BIO</h3>
              <p className='text-lg leading-relaxed'>
                I'm a Computer Science Engineering student in my 3rd year. I've
                been into coding since I was 14 years old. I'm mostly an Android
                Developer (For Custom ROMs), currently working with{' '}
                <a
                  href='https://evolution-x.org/'
                  className='text-accent hover:underline'
                >
                  @EvolutionXRom
                </a>{' '}
                and{' '}
                <a
                  href='https://project404.co/'
                  className='text-accent hover:underline'
                >
                  @Project404
                </a>{' '}
                as an assistant lead Developer. I've had great experience with
                android app development (Java and Kotlin, 3+ years). I'm
                extremely familiar with the Linux Shell, Git, DBMS (MySql,
                MongoDB and Firebase firestore), Computer Networks, and Cloud
                Computing Services (GCP, AWS and Azure). I'm also an avid gamer,
                Halo and Counter Strike being my favourite games of all time. I
                code bots (telegram, discord) and configure CI pipelines in my
                free time.
              </p>
            </div>
          </div>
        </div>

        <div className='mt-16 grid gap-8 md:grid-cols-3'>
          <div className='rounded-lg border border-accent/20 bg-card p-6'>
            <h3 className='mb-2 text-xl font-semibold'>Android</h3>
            <h6 className='mb-4 text-sm text-accent'>3+ years</h6>
            <p className='text-card-foreground/80'>
              I've worked with quite a few apps, ranging from music players, to
              file explorers, to corporate authentication applications, all with
              a very user-friendly and intuitive UI/UX. I have also integrated
              firebase capabilities to apps providing a very reliable backend to
              work with. I code apps mainly in Java, and sometimes Kotlin.
            </p>
          </div>

          <div className='rounded-lg border border-accent/20 bg-card p-6'>
            <h3 className='mb-2 text-xl font-semibold'>Cloud Computing</h3>
            <h6 className='mb-4 text-sm text-accent'>2 years</h6>
            <p className='text-card-foreground/80'>
              I've set up multiple servers using GCP and AWS services, such as
              Compute Engine, EC2, Lightsail, Kubernetes Engine, EKS, App Engine
              and a few more. I successfully configured each of these servers
              with linux distros and required tools with a remote connection, to
              perform various tasks such as building android ROMs, hosting
              websites(with a fully functional backend), hosting
              telegram/discord bots, performing machine learning tasks and also
              to deploy mobile applications.
            </p>
          </div>

          <div className='rounded-lg border border-accent/20 bg-card p-6'>
            <h3 className='mb-2 text-xl font-semibold'>Programming</h3>
            <h6 className='mb-4 text-sm text-accent'>Nerd Alert!</h6>
            <p className='text-card-foreground/80'>
              I have been coding for over 7 years now. I have completed multiple
              courses/tests from websites such as Coursera, HackerRank,
              HackerEarth, LeetCode and Udemy. I place myself as an intermediate
              level programmer who is good at problem solving. I still learn new
              things and practice coding almost every day. I also teach
              programming to others, and hope to run a successful youtube
              channel one day. I'm familiar with C, C++, Java, Python, Golang,
              Kotlin, Ruby, Rust, JavaScript, XML, CSS, html, Bash, Perl, Awk
              and Tcl.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
