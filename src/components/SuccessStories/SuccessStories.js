import React from 'react';
import "./successStories.css"

function SuccessStories() {

  const story = [
    {
      id: 1,
      image: "https://media.licdn.com/dms/image/D5603AQE6mIuvzc7sKA/profile-displayphoto-shrink_800_800/0/1690634412938?e=2147483647&v=beta&t=jI954JDVoLYdKCmppkaiC-OowupYzNu9TqO1dWnfomQ",
      name: "Pratik Gondkar",
      Company: "Devops Developer",
      description: "  Her journey from a curious learner to a professional developer exemplifies the impact of our teaching. Jane's success story is just one of many, demonstrating our commitment to nurturing talent and driving excellence",
      companyname: "Arohi Software",
      companylogo: "https://media.licdn.com/dms/image/D560BAQFtWM46bCiJfQ/company-logo_200_200/0/1695197175289?e=2147483647&v=beta&t=46cYmda122C_egnedarsDunJhoZgjhMYaeUJixhrbXM"
    },
    {
      id: 2,
      image: "data:image/jpeg;base64,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",
      name: "Poonam Digole",
      Company: "Project Manager",
      description: "  Her journey from a curious learner to a professional developer exemplifies the impact of our teaching. Jane's success story is just one of many, demonstrating our commitment to nurturing talent and driving excellence",
      companyname: "Arohi Software",
      companylogo: "https://media.licdn.com/dms/image/D560BAQFtWM46bCiJfQ/company-logo_200_200/0/1695197175289?e=2147483647&v=beta&t=46cYmda122C_egnedarsDunJhoZgjhMYaeUJixhrbXM"
    },
    {
      id: 3,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV93-nEXSU8vhg-dMH3F_AslVVEbZDFur_zA&s",
      name: "Vivek Shejole",
      Company: "Software Developer",
      description: " Her journey from a curious learner to a professional developer exemplifies the impact of our teaching. Jane's success story is just one of many, demonstrating our commitment to nurturing talent and driving excellence",
      companyname: "Arohi Software",
      companylogo: "https://media.licdn.com/dms/image/D560BAQFtWM46bCiJfQ/company-logo_200_200/0/1695197175289?e=2147483647&v=beta&t=46cYmda122C_egnedarsDunJhoZgjhMYaeUJixhrbXM"
    }
  ]



  return (
    <div className="min-h-screen p-10 mt-20">
      <h1 className="text-white text-6xl ml-20 font-bold mb-16">
        Success Stories
      </h1>
      <div className="animate-attach w-[200%]">
        {story.map((course) => (
          <div
            key={course.id}
            className=" bg-black text-white min-w-[20rem] rounded-lg shadow-lg overflow-hidden mb-5"
          >
            <div className="flex justify-center mt-5">
              <img
                src={course.image}
                alt={course.name}
                className="w-40 h-40 object-cover rounded-full"
              />
            </div>
            <div className="p-5">
              <h2 className="text-2xl font-bold mt-4 mb-2 text-center">{course.name}</h2>
              <p className="text-lg text-cyan-400 text-center">{course.Company}</p>
              <p className="text-gray-400 mb-5 text-center">{course.description}</p>
              <div className="flex items-center justify-center mt-5">
                <img
                  src={course.companylogo}
                  alt={course.companyname}
                  className="w-20 h-20 rounded-full mr-3"
                />
                <span className="text-lg text-white">{course.companyname}</span>
              </div>
              <hr className="mt-5"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SuccessStories;
