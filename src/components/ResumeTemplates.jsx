import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const templates = [
  '/templates/t1.png',
  '/templates/t2.png',
  '/templates/t1.jpg',
  '/templates/t2.jpg',
  '/templates/t3.jpg',
];

export default function ResumeTemplates() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  const handleUseTemplate = (templateUrl) => {
    console.log('Selected template:', templateUrl);
    
    const templateId = templateUrl.includes('t1') ? 't1'
                     : templateUrl.includes('t2') ? 't2'
                     : templateUrl.includes('t3') ? 't3'
                     : 'default';
  
    navigate('/resume-builder', { state: { template: templateId } });
  };
  return (
    <div className="relative bg-white py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Choose Your Resume Template
      </h2>

      {/* Arrows */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow z-10"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow z-10"
      >
        <ChevronRight />
      </button>

      {/* Templates */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide space-x-6 px-10 scroll-smooth w-full max-w-6xl mx-auto"
      >
        {templates.map((src, index) => (
          <div
            key={index}
            className="relative min-w-[300px] max-w-[300px] flex-shrink-0 border rounded-lg overflow-hidden shadow-md hover:shadow-lg group"
          >
            <img
              src={src}
              alt={`Template ${index + 1}`}
              className="w-full h-[450px] object-cover"
            />
            <button
            onClick={() => handleUseTemplate(src)}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white px-4 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Use Template
          </button>

          </div>
        ))}
      </div>
    </div>
  );
}
