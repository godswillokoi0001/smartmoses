import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const Resume = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef(null);
  // No modal needed

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0');
            entry.target.classList.add('animate-fadeIn');
            observer.unobserve(entry.target);
          }
        });
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
  }, []);

  // Function to open PDF in a new tab
  const openPdfInNewTab = () => {
    window.open('/assets/pdf/MY CV_compressed.pdf', '_blank');
  };

  // Function to download PDF
  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = '/assets/pdf/MY CV_compressed.pdf';
    link.download = 'MY CV_compressed.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">My Resume</h2>
            <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto"></div>
            <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Download or view my professional CV below.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center opacity-0" ref={sectionRef}>
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-lg w-full flex flex-col items-center">
              {/* Other Skills Section */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Other Skills</h3>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[
                  'Social Media Manager', 'Video Editing', 'Graphics Designer', 'Branding', 'Content Creation'
                ].map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Link to Other Portfolio */}
              <a
                href="https://social-media-manager-godswill-okoi.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-8 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow"
              >
                See' Portfolio
              </a>

              <hr className="w-full border-t border-gray-300 dark:border-gray-600 my-6" />

              {/* CV Buttons */}
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={openPdfInNewTab}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View CV
                </button>
                <button
                  onClick={downloadPdf}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download CV
                </button>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-400">
                My CV includes my professional experience, education, skills, and achievements...
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
