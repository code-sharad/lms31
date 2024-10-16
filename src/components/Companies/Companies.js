import React from 'react';
import "./Companies.css";

const companies = [
  {
    id: 1,
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  {
    id: 4,
    name: 'LinkedIn',
    logo: 'https://media.licdn.com/dms/image/D560BAQFtWM46bCiJfQ/company-logo_200_200/0/1695197175289?e=2147483647&v=beta&t=46cYmda122C_egnedarsDunJhoZgjhMYaeUJixhrbXM',
  },
  {
    id: 5,
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  },
  {
    id: 6,
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    id: 7,
    name: 'Facebook',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
  },
  {
    id: 8,
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
];

function Companies() {
  return (
    <div className="py-12 mt-12">
      <div className="container mx-auto">
        <h1 className="text-white ml-20 text-6xl font-bold mb-12">Our Achievers Work With</h1>
        <div className="overflow-hidden">
          <div className="animate-scroll flex gap-60">
            {companies.concat(companies).map((company, index) => (
              <div key={index} className="flex flex-col mt-9 items-center">
                <img src={company.logo} alt={company.name} className="h-20 w-20 object-contain mb-4" />
                <p className="text-white text-2xl">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Companies;
