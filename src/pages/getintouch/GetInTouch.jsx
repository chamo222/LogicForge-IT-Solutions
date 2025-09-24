import React, { useState } from "react";
import { motion } from "framer-motion";
import RootLayout from "../../layout/RootLayout";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const fadeIn = (direction = "up") => ({
  hidden: { opacity: 0, y: direction === "up" ? 40 : -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
});

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate form submission (replace with your API call)
    setSubmitMessage("Sending message...");
    setTimeout(() => {
      setSubmitMessage("✅ Your message has been sent!");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-900 py-24">
      <RootLayout>
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Get in <span className="text-red-500">Touch</span>
          </h1>
          <p className="text-neutral-600 max-w-xl mx-auto text-lg">
            Have a project or idea? We would love to hear from you. Fill out the
            form below or contact us directly.
          </p>
        </motion.div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            className="bg-neutral-50 p-8 rounded-2xl shadow-md space-y-6"
            variants={fadeIn("up")}
            initial="hidden"
            whileInView="visible"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-2 rounded-lg bg-white border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
            >
              Send Message
            </button>

            {submitMessage && (
              <p className="text-center text-green-500 font-medium mt-2">
                {submitMessage}
              </p>
            )}
          </motion.form>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            variants={fadeIn("up")}
            initial="hidden"
            whileInView="visible"
          >
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-red-500 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-neutral-800">Phone</h3>
                <p className="text-neutral-600">+94 77 123 4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-red-500 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-neutral-800">Email</h3>
                <p className="text-neutral-600">info@logicforge.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-red-500 text-xl mt-1" />
              <div>
                <h3 className="font-semibold text-neutral-800">Address</h3>
                <p className="text-neutral-600">
                  Colombo, Sri Lanka
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </RootLayout>
    </div>
  );
};

export default GetInTouch;