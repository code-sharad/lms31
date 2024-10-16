import React from "react";

function category() {
  const category = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/38547/office-freelancer-computer-business-38547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Replace with actual image URLs
      title: "Digital Marketing with generative AI",
      type: "offline",
      description:
        "Become expert at drawing intelligence from data and get noticed by top companies",
      languges: "Google Ads, Google Analytics, Google Optimize, wordpress,  YouTube Ads",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/3183131/pexels-photo-3183131.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with actual image URLs
      title: "Data Science & Analytics",
      description:
        "Become expert at drawing intelligence from data and get noticed by top companies",
      languges: "jupiter, python, numpy, pandas",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with actual image URLs
      title: "Full Stack Development",
      type: "online",
      description:
        "Become expert at drawing intelligence from data and get noticed by top companies",
      languges: "Html, css, javascript, react, nodejs, express, mongodb",
    },
    {
      id: 4,
      image:
        "https://images.pexels.com/photos/1972464/pexels-photo-1972464.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with actual image URLs
      title: "Java Development",
      type: "online",
      description:
        "Become expert at drawing intelligence from data and get noticed by top companies",
      languges: "java, spring, hibernate, springboot, kafka, elasticsearch",
    },
    {
      id: 5,
      image:
        "https://images.pexels.com/photos/27141304/pexels-photo-27141304/free-photo-of-a-digital-clock-and-a-digital-timer-on-a-black-screen.jpeg?auto=compress&cs=tinysrgb&w=600", // Replace with actual image URLs
      title: "UI/UX Design",
      type: "online",
      description:
        "Become expert at drawing intelligence from data and get noticed by top companies",
      languges: "figma , sketch, photoshop, invision, designhub, invision",
    },

    // Add more categorys as needed
  ];

  return (
    <div>
      <div className="min-h-screen  p-10">
      
      {
        <h1 className="text-white text-center text-6xl ml-20 font-bold mb-10">
          Explore Our Categories
        
        </h1>

      }

        <p className="text-white text-2xl text-center ml-20 font-bold  "> Discover Your Passion </p>
        <br />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ml-5 mr-5 lg:ml-20 lg:mr-20">

          {category.map((category) => (
            <div
              key={category.id}
              className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out text-white rounded-xl overflow-hidden"
            >
              {/* Uncomment and style this if you want to add images */}

             <img
                src={category.image}
                alt={category.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h2 className="text-3xl font-extrabold mt-4 mb-2">{category.title}</h2>
                <hr className="border-t-2 border-cyan-400" />
                <button className="mt-7 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-full font-semibold text-xl transition-colors duration-300">
                  {category.languges}
                </button>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}

export default category;
