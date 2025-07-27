import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ResumeTemplates = () => {
  const templates = [
    { id: 1, name: "Boston", img: "/images/template1.png", users: "160,000+" },
    { id: 2, name: "Athens", img: "/images/template2.png", users: "310,000+" },
    { id: 3, name: "Brussels", img: "/images/template3.png", users: "150,000+" }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Adjust as per requirement
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className="bg-blue-800 text-white py-10 px-5">
      <h2 className="text-center text-3xl font-bold mb-6">Choose Your Resume Template</h2>
      <Slider {...settings}>
        {templates.map((template) => (
          <div key={template.id} className="px-4">
            <div className="bg-white text-black p-5 rounded-md shadow-lg">
              <h3 className="text-center text-xl font-bold">{template.name}</h3>
              <p className="text-center text-sm">{template.users} users chose this template</p>
              <img src={template.img} alt={template.name} className="w-full h-96 object-cover mt-4"/>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom Arrow Components
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-white" onClick={onClick}>
      ➡
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 cursor-pointer text-white" onClick={onClick}>
      ⬅
    </div>
  );
};

export default ResumeTemplates;
