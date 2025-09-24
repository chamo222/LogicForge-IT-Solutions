import React from "react";
import RootLayout from "../../layout/RootLayout";
import { motion } from "framer-motion";
import { FaCode, FaMobileAlt, FaCloud, FaLock, FaRocket, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <FaCode className="text-4xl text-red-500" />,
    title: "Web Development",
    desc: "We craft fast, scalable, and visually appealing websites tailored to your business needs. From landing pages to complex dashboards, we ensure seamless experiences."
  },
  {
    icon: <FaMobileAlt className="text-4xl text-blue-600" />,
    title: "Mobile App Development",
    desc: "Build cross-platform apps with top-notch performance. Our mobile solutions are sleek, user-friendly, and optimized for Android & iOS."
  },
  {
    icon: <FaCloud className="text-4xl text-green-600" />,
    title: "Cloud Solutions",
    desc: "We help businesses migrate, scale, and manage their systems in the cloud with industry-standard tools and enterprise-level security."
  },
  {
    icon: <FaLock className="text-4xl text-yellow-600" />,
    title: "Cybersecurity",
    desc: "Our team ensures your data and systems are always safe with advanced penetration testing, monitoring, and compliance checks."
  }
];

const features = [
  { icon: <FaRocket className="text-red-500 text-xl" />, text: "Cutting-edge Technologies" },
  { icon: <FaUsers className="text-blue-600 text-xl" />, text: "Dedicated Expert Team" },
  { icon: <FaLock className="text-yellow-600 text-xl" />, text: "Security-first Approach" },
  { icon: <FaCloud className="text-green-600 text-xl" />, text: "Scalable Cloud Infrastructure" }
];

const Services = () => {
  return (
    <div className="w-full h-auto bg-white text-neutral-900">
      {/* Hero Section (added spacing for navbar) */}
      <section className="pt-32 pb-20 text-center">
        <RootLayout>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Professional <span className="text-red-500">IT Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-neutral-600 max-w-2xl mx-auto text-lg"
          >
            At LogicForge IT Solutions, we provide end-to-end digital services to help you
            transform your ideas into powerful business solutions.
          </motion.p>
        </RootLayout>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <RootLayout>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-neutral-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="mb-4">{service.icon}</div>
                <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                <p className="text-neutral-600 text-sm">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </RootLayout>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-neutral-100">
        <RootLayout>
          <h2 className="text-3xl font-bold text-center mb-10">
            Why <span className="text-red-500">Choose Us?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {features.map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.7 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="mb-3 flex justify-center">{f.icon}</div>
                <p className="text-neutral-700">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </RootLayout>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <RootLayout>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold mb-6"
          >
            Ready to bring your ideas to life?
          </motion.h3>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/get-in-touch">
              <button className="px-8 py-4 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:bg-red-600 transition">
                Get in Touch
              </button>
            </Link>
          </motion.div>
        </RootLayout>
      </section>
    </div>
  );
};

export default Services;