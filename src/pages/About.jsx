import { Link } from 'react-router';
import Reveal from '../components/Reveal';
import SEO from '../components/SEO';
import CalvinImage from '../images/calvin.jpg';
import Image from '../components/Image';
import Tilt from '../components/Tilt';
import { ArrowRightIcon, ExternalIcon } from '../components/Icons';
import { CodeAnim, ChatAnim, SparkleAnim } from '../components/ServiceIcons';
import { ServerAnim, RocketAnim, ShieldAnim, UsersAnim } from '../components/AboutIcons';
import '../styles/About.css';

const skills = [
  {
    icon: <CodeAnim />,
    title: 'Front-End Development',
    items: 'React · TypeScript · JavaScript · CSS · Responsive & accessible UI',
    note: 'where I spend my days, in industry and on client work',
  },
  {
    icon: <ServerAnim />,
    title: 'Back-End & APIs',
    items: 'Python · Django · PostgreSQL · REST APIs',
    note: 'enough to build a feature end to end without waiting on someone else',
  },
  {
    icon: <RocketAnim />,
    title: 'Tools & Delivery',
    items: 'Git · CI/CD · Docker · Netlify & AWS',
    note: 'the work gets tracked, reviewed and shipped the way it should be',
  },
];

const values = [
  {
    icon: <ShieldAnim />,
    title: 'Quality First',
    desc: 'I deliver high-quality work that stands the test of time, with no cut corners.',
  },
  {
    icon: <ChatAnim />,
    title: 'Clear Communication',
    desc: 'Regular updates and plain language keep us on the same page throughout.',
  },
  {
    icon: <UsersAnim />,
    title: 'User-Centered Design',
    desc: 'Your customers are at the heart of every decision I make.',
  },
  {
    icon: <SparkleAnim />,
    title: 'Continuous Learning',
    desc: 'The web evolves constantly, and so do I, so your site stays modern.',
  },
];

const About = () => {
  return (
    <div className="about-page">
      <SEO
        title="About Calvin R Development | Frontend Web Developer in Armidale"
        description="Meet Calvin Reinke, a working front-end developer based in Armidale, NSW. Front-end dev on the LabNext70 team at UNE, and the developer behind Calvin R Development."
        canonicalUrl="/about"
        keywords="frontend developer Armidale, web developer profile, Calvin R Development, quality web development, professional web developer NSW"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Calvin Reinke',
          jobTitle: 'Front-End Web Developer',
          description:
            'Front-end web developer in Armidale, NSW. Works on the LabNext70 team at the University of New England, and is the founder of Calvin R Development',
          worksFor: { '@type': 'Organization', name: 'University of New England' },
          alumniOf: { '@type': 'EducationalOrganization', name: 'Bachelor of Computer Science' },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Armidale',
            addressRegion: 'NSW',
            addressCountry: 'Australia',
          },
          image: 'https://calvinrdevelopment.com/calvin.jpg',
          url: 'https://calvinrdevelopment.com/about',
          sameAs: ['https://github.com/Lyfe4'],
        }}
      />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <Reveal as="span" className="eyebrow">
            About me
          </Reveal>
          <Reveal as="h1" delay={0.05}>
            The developer behind <span className="gradient-text">your website</span>
          </Reveal>
          <Reveal as="p" delay={0.1}>
            A working front-end developer based in Armidale, building production software in
            industry and websites and web apps for businesses across Australia.
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="section about-story">
        <div className="container about-story-grid">
          <Reveal className="about-image-wrap" y={0}>
            <Tilt className="about-image-frame" max={14} scale={1.03} glare>
              <Image src={CalvinImage} alt="Calvin, frontend web developer" height={460} priority />
            </Tilt>
            <div className="about-image-glow" aria-hidden="true"></div>
          </Reveal>
          <Reveal className="about-content" delay={0.1}>
            <span className="eyebrow">Where I work</span>
            <h2>I build software for a living</h2>
            <p>
              By day I'm a front-end developer on the LabNext70 team at the University of New
              England, where I design and build the front end of a new platform for staff and
              students. I hold a Bachelor of Computer Science.
            </p>
            <p>
              That's the background I bring to Calvin R Development: the same stack, the same review
              process, and the same care about accessibility, performance and code someone can still
              work with in a year's time.
            </p>
            <p>
              I work with small businesses around Armidale and the New England region, and remotely
              Australia-wide. I also take on contract front-end work for teams that need an extra
              pair of hands on an existing product.
            </p>
            <p>
              Whichever it is, it starts the same way: understanding what you actually need, then
              building it properly.
            </p>
            <Link to="/contact" className="btn-primary about-cta">
              Work with me <ArrowRightIcon size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section className="section skills-section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Technical expertise</span>
            <h2>The tools of the trade</h2>
            <p>The stack I work in every day, in industry and on client projects alike.</p>
          </Reveal>
          <div className="skills-grid">
            {skills.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="skill-card glass-card">
                <div className="skill-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.items}</p>
                <p className="marginalia skill-note">{s.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Side project */}
      <section className="section side-project-section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Side project</span>
            <h2>Things I build for myself</h2>
          </Reveal>
          <Reveal className="side-project glass-card">
            <div className="side-project-content">
              <span className="case-label">Patchbay</span>
              <h3>A browser-based toolkit for developers</h3>
              <p>
                A growing set of small client-side tools, plus a node canvas that wires them
                together into pipelines. Everything runs in your browser and nothing is uploaded
                anywhere. It's where I test ideas that don't belong in client work.
              </p>
            </div>
            <a
              href="https://patchbay-tools.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Try it <ExternalIcon size={17} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">How I work</span>
            <h2>What I value</h2>
          </Reveal>
          <div className="values-grid">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="value-card glass-card">
                <div className="value-icon">{v.icon}</div>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
