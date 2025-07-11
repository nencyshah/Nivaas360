import React, { useEffect, useState } from "react";
import a7 from "../assets/a7.jpg";
import a3 from "../assets/a3.jpg";
import a4 from "../assets/a4.png";
import a5 from "../assets/a5.jpg";

const images = [a7, a3, a4, a5];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Buy");

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#4B3832]">
        
      {/* Image Slider */}
      <div className="max-w-6xl mx-auto my-6 px-4">
        <div className="relative overflow-hidden rounded-2xl shadow-lg">
          <div
            className="flex transition-transform ease-in-out duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full object-cover h-48 sm:h-64 md:h-80 lg:h-96"
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-[#7B5E57]/80 text-white text-xl px-3 rounded-full hover:bg-[#4B3832]/90 transition"
          >
            &#8249;
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-[#7B5E57]/80 text-white text-xl px-3 rounded-full hover:bg-[#4B3832]/90 transition"
          >
            &#8250;
          </button>

          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full ${currentIndex === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {["Buy", "Rent", "Sell"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-semibold border transition duration-300 ${
                activeTab === tab
                  ? "bg-[#7B5E57] text-white border-[#7B5E57]"
                  : "bg-[#DCC6B2] text-[#4B3832] border-[#DCC6B2] hover:bg-[#7B5E57] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row px-4 gap-6">
        {/* Filters Sidebar */}
        <aside className="bg-white p-5 rounded-lg shadow w-full lg:w-1/4 text-[#4B3832]">
          <h3 className="font-semibold mb-4 text-lg">Filters</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-[#7B5E57] cursor-pointer">Location</li>
            <li className="hover:text-[#7B5E57] cursor-pointer">Price Range</li>
            <li className="hover:text-[#7B5E57] cursor-pointer">Property Type</li>
            <li className="hover:text-[#7B5E57] cursor-pointer">Bedrooms</li>
          </ul>
        </aside>

        {/* Property Listings */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {["Apartment in Pune", "Villa in Goa", "Flat in Mumbai", "House in Jaipur", "Studio in Delhi", "Farmhouse in Nashik"].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-lg p-4 transform hover:scale-105 transition duration-300"
            >
              <div className="h-32 sm:h-40 md:h-48 bg-[#DCC6B2] rounded mb-3"></div>
              <h4 className="font-bold text-lg">{item}</h4>
              <p className="text-sm text-[#7B5E57] mt-1">Location details</p>
            </div>
          ))}
        </main>
      </div>

      <footer className="text-center py-6 text-sm text-[#7B5E57] mt-10">
        © 2025 Real Estate Portal. All rights reserved.
      </footer>
    </div>
  );
}
