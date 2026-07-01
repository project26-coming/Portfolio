import Navbar from "@/components/Navbar/Navbar";
import VideoIntro from '../components/VideoIntro/VideoIntro';
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Education from "@/components/Education/Education";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <VideoIntro
        tagline="Data Science • Machine Learning • Full Stack Development"
        firstName="KADIMETLA"
        lastName="VARSHA"
        role = "Passionate Data Science undergraduate at MIT Manipal and IIT Madras, building AI-powered applications, machine learning solutions, and full-stack software that solve real-world problems."
        nextSectionId="work"
      />

      <section id="work" style={{ minHeight: '100vh', background: '#0c0a10' }}>
        <About />
      </section>
      <Skills />
       <Projects />
       <Education />
       <Contact />
    </main>
  );
}
