import React, { useState, useEffect } from 'react';
import './App.css';

interface Project {
  name: string;
  description: string;
  html_url: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
        setLoading(false);
      });
  }, []);

  const skills = ['Java', 'Spring Boot', 'React', 'TypeScript', 'AWS', 'SQL'];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Uno0306's Portfolio</h1>
        <p>Welcome to my personal portfolio website.</p>
      </header>

      <main>
        <section className="App-section">
          <h2>About Me</h2>
          <p>
            I am a passionate developer with experience in building web applications.
          </p>
          <h3>My Skills</h3>
          <ul className="skills-list">
            {skills.map(skill => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="App-section">
          <h2>My Projects</h2>
          {loading ? (
            <p>Loading projects...</p>
          ) : (
            <div className="projects-grid">
              {projects.map(project => (
                <div className="project-card" key={project.name}>
                  <h3>{project.name}</h3>
                  <p>{project.description || 'No description available.'}</p>
                  <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} Uno0306. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;