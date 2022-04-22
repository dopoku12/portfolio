import Education from '../components/Education';
import Skills from '../components/Skills'
import Nav from "../components/Nav"
import ResumeIcons from '../components/ResumeIcons';
function Resume() {
    return (
        <div className='card'>
            <Nav />
            <section id='resume-id'>
                <header id='header'>
                    <h2>David Opoku</h2>
                </header>

                <ul>
                    <li>
                        Riverdale, MD 20737
                    </li>
                    <li>
                        davidopoku30@gmail.com
                    </li>

                    <li>
                        +1 240-522-6634
                    </li>
                </ul>

                <article className='resume'>
                    <header className='sub-header'>
                        <h2>Education</h2>
                    </header>
                    <Education />

                    <header className='sub-header'>
                        <h2>Highlighted Skills</h2>
                    </header>
                    <Skills />

                    <header className='sub-header'>
                        <h2>Tech</h2>
                    </header>
                    <ResumeIcons />

                </article>
            </section>
        </div>
    );
}

export default Resume;
