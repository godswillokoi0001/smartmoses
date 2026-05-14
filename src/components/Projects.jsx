import { useState, useEffect, useRef } from 'react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const sectionRef = useRef(null);

  // All your projects are now listed here with more relevant images
  const projects = [
    {
      id: 1,
      title: "Gericht: Fine Dining Restaurant",
      description: "An immersive and elegant website for a high-end restaurant. Features a dynamic homepage, detailed menu sections, a showcase of awards, and a stunning photo gallery.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "frontend",
      technologies: ["React", "CSS3", "UI/UX Design"],
      demoLink: "https://astounding-dodol-f6646a.netlify.app/",
      codeLink: "#"
    },
    {
      id: 2,
      title: "Godswill Okoi: Social Media Expert",
      description: "A compelling single-page portfolio for a social media manager. Clearly presents services, client-focused value propositions, transparent pricing, and a direct contact form.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "frontend",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      demoLink: "https://social-media-manager-godswill-okoi.netlify.app/",
      codeLink: "#"
    },
    {
      id: 3,
      title: "Shamurr: Online Fashion Boutique",
      description: "An e-commerce platform for the Shamurr fashion brand. Designed to provide a seamless shopping experience with product catalogs, categories, and a user-friendly checkout process.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "frontend",
      technologies: ["React", "E-commerce", "CSS"],
      demoLink: "https://shamurr.com.ng/",
      codeLink: "#"
    },
    {
      id: 4,
      title: "Smith: Modern Developer Portfolio",
      description: "A minimalist and professional portfolio for a developer named Smith. Features a clean interface, a skills showcase with progress bars, a project gallery, and an integrated contact form.",
      image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      category: "frontend",
      technologies: ["React", "Portfolio", "CSS"],
      demoLink: "https://incredible-eclair-9bf92e.netlify.app/",
      codeLink: "#"
    },
    {
      id: 5,
      title: "HooBank: The Next Generation Bank",
      description: "A futuristic and visually striking landing page for HooBank, a modern digital banking solution. Highlights cutting-edge features, business solutions, and client testimonials with a sleek, dark-mode UI.",
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      category: "frontend",
      technologies: ["React", "Tailwind CSS", "Fintech"],
      demoLink: "https://aquamarine-cascaron-71f27f.netlify.app/",
      codeLink: "#"
    },
    {
      id: 6,
      title: "OpenAI GPT-3 Showcase",
      description: "A visually engaging landing page dedicated to the OpenAI GPT-3 model. Explores its capabilities, potential applications, and features a library of related resources in a futuristic layout.",
      image: "https://images.unsplash.com/photo-1620712943543-2858200e9456?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "frontend",
      technologies: ["React", "CSS", "AI"],
      demoLink: "https://jazzy-piroshki-3b4b5d.netlify.app/",
      codeLink: "#"
    },
    {
      id: 7,
      title: "Godswill Okoi: Full-Stack Portfolio",
      description: "A comprehensive and multi-page personal portfolio for Godswill Okoi. Details a wide range of services including web development, graphic design, and video editing, complete with project examples.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "frontend",
      technologies: ["HTML", "CSS", "JavaScript"],
      demoLink: "https://snazzy-marigold-5d7216.netlify.app/",
      codeLink: "#"
    },
    {
      id: 8,
      title: "Minimalist To-Do Application",
      description: "A straightforward and clean to-do list application. Built for simplicity and efficiency, allowing users to quickly add and manage their daily tasks without distraction.",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "frontend",
      technologies: ["JavaScript", "HTML5", "CSS3"],
      demoLink: "https://amazing-muffin-9450c4.netlify.app/",
      codeLink: "#"
    },
    {
      id: 9,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates and team collaboration features.",
      image: "https://images.unsplash.com/photo-1579567761406-461487c3c188?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      category: "frontend",
      technologies: ["React", "Redux", "Socket.io", "Tailwind CSS"],
      demoLink: "#",
      codeLink: "#"
    },
    {
      id: 10,
      title: "Weather Dashboard",
      description: "A weather dashboard that displays current and forecasted weather data for multiple locations.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "frontend",
      technologies: ["JavaScript", "Weather API", "Chart.js", "CSS3"],
      demoLink: "#",
      codeLink: "#"
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h2>
            <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto"></div>
            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here are some of the projects I've worked on, showcasing my skills in development. Each project represents different challenges and creative solutions.
            </p>
          </div>

          {/* The project cards will be displayed in a grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/262626/FFFFFF?text=Project'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-indigo-600/80 text-white text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 mt-4">
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-white/90 text-gray-900 text-sm rounded-md hover:bg-white transition-colors"
                        >
                          Live Demo
                        </a>
                        <a
                          href={project.codeLink}
                           target="_blank"
                           rel="noopener noreferrer"
                          className="px-3 py-1 bg-gray-800/90 text-white text-sm rounded-md hover:bg-gray-800 transition-colors"
                        >
                          View Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;