import React from "react";
import Navbar from "../../components/navbar/Navbar";


function HomePage() {
  // Example product list
  const products = [
    { id: 1, title: "SAFE BOX FOR SECURE STORAGE AL-70", image: "/images/safe1.png" },
    { id: 2, title: "SAFE BOX FOR SECURE STORAGE AL-50", image: "/images/safe2.png" },
    { id: 3, title: "SAFE BOX FOR SECURE STORAGE AL-36", image: "/images/safe3.png" },
    { id: 4, title: "BELDON – CORE i5 TOUCH POS MACHINE", image: "/images/pos.png" },
    { id: 5, title: "SAFE BOX FOR SECURE STORAGE AL-20", image: "/images/safe4.png" },
  ];

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar at top */}
      <Navbar />

      {/* Hero Banner */}
      <section className="mt-16 w-full h-[400px] bg-gray-100 flex items-center justify-center relative">
        <img
          src="/images/banner.png" // 👉 replace with your banner photo
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Touch POS Terminal – LKR 139,000
          </h1>
        </div>
      </section>

      {/* Latest Solutions */}
      <section className="w-full px-6 lg:px-20 py-10">
        <h2 className="text-2xl font-bold mb-6">
          LATEST <span className="text-blue-600">SOLUTIONS</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg shadow hover:shadow-lg p-4 flex flex-col items-center text-center transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-32 object-contain mb-4"
              />
              <h3 className="text-sm font-medium text-gray-700">
                {product.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;