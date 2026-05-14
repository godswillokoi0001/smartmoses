import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const Skills = () => {
  const { darkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef(null);
  const skillsContainerRef = useRef(null);
  const modalRef = useRef(null);

  // Skill categories with icons
  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'tools', name: 'Tools & Others' }
  ];

  // Comprehensive skills data with icons and categories
  const skillsData = [
    // Frontend Development
    {
      name: "HTML5",
      level: 95,
      category: "frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      color: "#E34F26",
      description: "Semantic markup, accessibility, and modern HTML features"
    },
    {
      name: "CSS3/SASS",
      level: 90,
      category: "frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      color: "#1572B6",
      description: "Responsive design, animations, and CSS architecture"
    },
    {
      name: "JavaScript",
      level: 92,
      category: "frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "#F7DF1E",
      description: "ES6+, DOM manipulation, and asynchronous programming"
    },
    {
      name: "TypeScript",
      level: 85,
      category: "frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "#3178C6",
      description: "Type safety, interfaces, and advanced TypeScript patterns"
    },
    {
      name: "React",
      level: 88,
      category: "frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "#61DAFB",
      description: "Component architecture, hooks, and state management"
    },
    {
      name: "Redux",
      level: 82,
      category: "frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
      color: "#764ABC",
      description: "State management, middleware, and Redux Toolkit"
    },
    {
      name: "Tailwind CSS",
      level: 90,
      category: "frontend",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      color: "#06B6D4",
      description: "Utility-first CSS and responsive component design"
    },
    // Web Design
    {
      name: "Figma",
      level: 80,
      category: "tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      color: "#F24E1E",
      description: "UI/UX design, prototyping, and design systems"
    },
    {
      name: "Adobe Photoshop",
      level: 75,
      category: "tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
      color: "#31A8FF",
      description: "Photo editing, digital manipulation, and compositing for web"
    },
    {
      name: "Adobe Illustrator",
      level: 70,
      category: "tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
      color: "#FF9A00",
      description: "Vector graphics, logo design, and illustration for web"
    },
    // Tools for Frontend/Web
    {
      name: "Git",
      level: 85,
      category: "tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      color: "#F05032",
      description: "Version control, branching strategies, and collaboration"
    },
    {
      name: "Vite",
      level: 75,
      category: "tools",
      icon: "https://vitejs.dev/logo.svg",
      color: "#646CFF",
      description: "Frontend tooling, fast development and build tool"
    },
    {
      name: "ESLint",
      level: 70,
      category: "tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
      color: "#4B32C3",
      description: "Linting and code quality for JavaScript/TypeScript"
    },
    {
      name: "Prettier",
      level: 70,
      category: "tools",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prettier/prettier-original.svg",
      color: "#F7B93E",
      description: "Code formatting for consistent style"
    },

  ];

  // Reset search query when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setSearchQuery('');
    }
  }, [isModalOpen]);

  // Filter skills based on active category and search query
  const filteredSkills = skillsData
    .filter(skill => {
      // Filter by category
      if (activeCategory !== 'all' && skill.category !== activeCategory) {
        return false;
      }

      // Filter by search query (if in modal)
      if (isModalOpen && searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          skill.name.toLowerCase().includes(query) ||
          skill.description.toLowerCase().includes(query) ||
          skill.technologies?.some(tech => tech.toLowerCase().includes(query))
        );
      }

      return true;
    });

  // Limit the number of skills shown in the main grid
  const visibleSkillsLimit = 9;
  const visibleSkills = filteredSkills.slice(0, visibleSkillsLimit);
  const hasMoreSkills = filteredSkills.length > visibleSkillsLimit;

  // Animation for skill bars
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');

          // Animate skill bars with delay
          const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
          skillBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.width = bar.dataset.level + '%';
            }, index * 100);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [activeCategory]);

  // Reset animations when category changes
  useEffect(() => {
    if (skillsContainerRef.current) {
      const skillBars = skillsContainerRef.current.querySelectorAll('.skill-bar-fill');
      skillBars.forEach(bar => {
        bar.style.width = '0%';
      });

      // Trigger reflow to restart animations
      void skillsContainerRef.current.offsetWidth;

      // Re-apply animations
      setTimeout(() => {
        skillBars.forEach((bar, index) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.level + '%';
          }, index * 100);
        });
      }, 100);
    }
  }, [activeCategory]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Close modal with Escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEscKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  return (
    <section id="skills" className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-indigo-200 dark:bg-indigo-900 blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-purple-200 dark:bg-purple-900 blur-3xl opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">My Skills</h2>
            </div>
            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mx-auto rounded-full mb-6"></div>
            <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Here are the technologies and tools I work with, spanning development, graphics design, and video editing. I'm constantly learning and expanding my skill set to stay up-to-date with the latest trends and techniques.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-x-auto scrollbar-hide w-full max-w-xs sm:max-w-md md:max-w-none">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  style={{ minWidth: '110px' }}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Skills grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0"
            ref={(el) => {
              sectionRef.current = el;
              skillsContainerRef.current = el;
            }}
          >
            {visibleSkills.map((skill, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                    style={{
                      backgroundColor: `${skill.color}20`,
                      color: skill.color
                    }}
                  >
                    <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">{skill.level}% Proficiency</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="skill-bar-fill h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: "0%",
                        backgroundColor: skill.color,
                        opacity: hoveredSkill === skill.name ? 1 : 0.8
                      }}
                      data-level={skill.level}
                    ></div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          {/* See More Button */}
          {hasMoreSkills && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <span>See More Skills</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          {/* Additional section: Learning Now */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Currently Learning</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Always expanding my knowledge with these technologies
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                // Frontend & backend currently learning
                { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", color: "#E10098" },
                { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", color: "#000000" },
                { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "#2496ED" },
                { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", color: "#DC382D" },
                { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", color: "#2D3748" },
                { name: "Python (FastAPI)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", color: "#009688" }
              ].map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: `${tech.color}15`,
                    }}
                  >
                    <img src={tech.icon} alt={tech.name} className="w-10 h-10" />
                  </div>
                  <span className="text-gray-900 dark:text-white font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">All Skills</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <div className="relative w-full max-w-md mx-auto mb-4">
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-center mb-8 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {filteredSkills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                        style={{
                          backgroundColor: `${skill.color}20`,
                          color: skill.color
                        }}
                      >
                        <img src={skill.icon} alt={skill.name} className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-gray-900 dark:text-white">{skill.name}</h4>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400">{skill.level}% Proficiency</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="relative w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: skill.color,
                          }}
                        ></div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No skills found</h4>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;
