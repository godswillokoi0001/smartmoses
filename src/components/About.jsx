import { useState, useEffect, useRef } from 'react';

// A mock theme hook since the original context is not provided.
// In your actual app, you would use your `useTheme` hook.
const useTheme = () => ({ darkMode: true });

const About = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('story');
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  // Add elements to the ref array for intersection observer
  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  // Effect for fade-in animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            // Optional: unobserve after animation to prevent re-triggering
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Start animation a bit before element is fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Cleanup observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [activeTab]); // Rerun when tab changes to observe new elements

  // Timeline data populated from your CV
  const timelineData = [
    {
      year: '2023 - 2025',
      title: 'Frontend Developer',
      company: 'Technolix Digitals | Azawire-HQ- Abuja, Nigeria',
      description: 'Building and maintaining responsive, user-friendly web interfaces using modern technologies like React and Tailwind CSS.'
    },
    {
      year: '2024 - 2025',
      title: 'Director | Editor',
      company: 'Disolmedia - Cross River State, Nigeria',
      description: 'Directed and edited engaging video content for various brand and client projects, ensuring high-quality production and storytelling.'
    },
    {
        year: '2023 - 2025',
        title: 'ICT Manager',
        company: 'Disolnet Technologies Ltd. - Cross River State, Nigeria',
        description: 'Oversaw daily operations and led a team to deliver IT solutions. Managed staff duties and conducted computer training sessions.'
    },
    {
      year: '2022 - 2023',
      title: 'Graphics Designer | Video Editor | Instructor',
      company: 'Disolmedia - Cross River State, Nigeria',
      description: 'Created engaging visual and video content for brand projects. Also taught computer literacy and design tools to students.'
    },
    {
      year: '2018 - 2022',
      title: 'ICT Manager',
      company: 'Cyber Craft Technologies and Computer - Cross River State, Nigeria',
      description: 'Managed daily operations at a computer center, ensuring smooth delivery of services and providing hands-on computer training.'
    }
  ];

  // Services data populated from your CV skills
  const servicesData = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Frontend Development',
      description: 'Crafting responsive, high-performance, and user-friendly web interfaces with HTML, CSS, JavaScript, React, and Tailwind CSS.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Graphic & Web Design',
      description: 'Creating compelling visual identities, logos, and UI/UX designs using Adobe Photoshop, Illustrator, and modern design principles.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Video Editing & Production',
      description: 'Editing and producing high-quality video content for marketing, social media, and corporate needs using Adobe Premiere Pro.'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      title: 'ICT Management & Training',
      description: 'Providing IT solutions, operational oversight, and hands-on training for individuals and teams to improve digital literacy.'
    }
  ];

  // Tab content components
  const tabContent = {
    story: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl">
            <img
              src="/images/Godswill.png"
              alt="Godswill Okoi"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div className="p-6">
                <h4 className="text-white font-bold text-xl">Godswill Okoi</h4>
                <p className="text-gray-200">Frontend Developer & Creative Professional</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
            <span>4+</span>
          </div>
          <div className="absolute -bottom-3 -right-3 w-24 h-24 border-2 border-indigo-600 dark:border-indigo-400 rounded-full"></div>
          <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg opacity-70 rotate-12"></div>
          <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-purple-100 dark:bg-purple-900/20 rounded-lg opacity-70 -rotate-12"></div>
        </div>
        <div>
          <div className="flex items-center mb-6 space-x-2">
            <div className="h-px w-12 bg-indigo-600 dark:bg-indigo-400"></div>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">My Story</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Creative Developer with a Passion for Digital Solutions
          </h3>
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              Hi, I'm Godswill Okoi — a creative professional skilled in responsive web design, graphic design, and video editing. With over 4 years of experience, I specialize in turning ideas into seamless user experiences and engaging multimedia content.
            </p>
            <p className="leading-relaxed">
              My journey is fueled by a passion for collaborative work and a continuous drive to learn. I am currently focused on advancing my expertise in both frontend development and videography to create dynamic, impactful digital projects.
            </p>
          </div>
        </div>
      </div>
    ),
    experience: (
      <div className="relative">
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-indigo-200 dark:bg-indigo-900/30"></div>
        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`relative flex flex-col md:flex-row gap-8 items-start opacity-0 ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-7 h-7 rounded-full bg-indigo-600 dark:bg-indigo-500 border-4 border-white dark:border-gray-800 z-10"></div>
              <div className="md:w-1/2">
                <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}>
                  <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg font-semibold mb-4">
                    {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-4">{item.company}</p>
                  <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              </div>
              <div className="hidden md:block md:w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    ),
    services: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {servicesData.map((service, index) => (
          <div
            key={index}
            ref={addToRefs}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 opacity-0"
          >
            <div className="w-16 h-16 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    )
  };

  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 opacity-0" ref={sectionRef}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mx-auto rounded-full mb-6"></div>
            <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
              Get to know more about me, my experience, and what services I offer.
            </p>
          </div>
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-gray-200 dark:bg-gray-800 rounded-lg">
              {[
                { id: 'story', label: 'My Story' },
                { id: 'experience', label: 'Experience' },
                { id: 'services', label: 'Services' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-6 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8">
            {tabContent[activeTab]}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;