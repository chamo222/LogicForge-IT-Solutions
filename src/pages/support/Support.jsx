import React, { useState } from "react";
import RootLayout from "../../layout/RootLayout";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "You can track your order from your account dashboard or via the tracking link sent to your email.",
  },
  {
    question: "What is the return policy?",
    answer:
      "Products can be returned within 14 days of delivery. Terms and conditions apply.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can fill out the contact form below or email support@logicforge.com for immediate assistance.",
  },
];

const Support = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="w-full h-auto bg-white text-neutral-900">
      {/* Hero Section */}
      <section className="pt-32 pb-16 text-center bg-neutral-100">
        <RootLayout>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Need <span className="text-red-500">Support?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-neutral-600 max-w-2xl mx-auto text-lg"
          >
            Our team is here to help you with any questions or issues. Fill out the contact form
            or check the FAQ section to find answers quickly.
          </motion.p>
        </RootLayout>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <RootLayout>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-neutral-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all text-center"
            >
              <FaEnvelope className="text-4xl text-red-500 mx-auto mb-4" />
              <h2 className="font-semibold text-xl mb-2">Email Us</h2>
              <p className="text-neutral-700">support@logicforge.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-neutral-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all text-center"
            >
              <FaPhone className="text-4xl text-blue-600 mx-auto mb-4" />
              <h2 className="font-semibold text-xl mb-2">Call Us</h2>
              <p className="text-neutral-700">+94 123 456 789</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-neutral-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all text-center"
            >
              <FaMapMarkerAlt className="text-4xl text-green-600 mx-auto mb-4" />
              <h2 className="font-semibold text-xl mb-2">Visit Us</h2>
              <p className="text-neutral-700">123, Main Street, Colombo, Sri Lanka</p>
            </motion.div>
          </div>
        </RootLayout>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-neutral-50">
        <RootLayout>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">
              Send Us a <span className="text-red-500">Message</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:bg-red-600 transition-all"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </RootLayout>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <RootLayout>
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked <span className="text-red-500">Questions</span>
          </h2>
          <div className="max-w-4xl mx-auto grid gap-4">
            {faqs.map((faq, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                <summary className="flex items-center gap-2 font-semibold text-lg">
                  <FaQuestionCircle className="text-red-500" />
                  {faq.question}
                </summary>
                <p className="mt-2 text-neutral-700">{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </RootLayout>
      </section>
    </div>
  );
};

export default Support;