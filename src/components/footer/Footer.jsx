import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { motion } from 'framer-motion'

import MasterCardImg from "../../assets/mastercard.png"
import CreditCardImg from "../../assets/creditcard.png"
import CashImg from "../../assets/cash.png"

const socialLinks = [
  { icon: FaInstagram, url: "https://www.instagram.com/logicforge" },
  { icon: FaFacebookF, url: "https://www.facebook.com/logicforge" },
  { icon: FaYoutube, url: "https://www.youtube.com/logicforge" },
  { icon: FaXTwitter, url: "https://twitter.com/logicforge" }
]

const Footer = () => {
  const slideUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className='w-full h-auto bg-neutral-100 py-12 border-t border-neutral-200'>
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* Footer content */}
        <motion.div
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          variants={slideUpVariant}
        >
          {/* Logo + description */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <Link to="/" className='text-4xl sm:text-5xl text-blue-600 font-bold'>
              LogicForge IT Solutions
            </Link>
            <p className="text-sm text-neutral-600">
              Providing innovative POS, cloud, and enterprise solutions tailored
              to streamline your business operations and scale with confidence.
            </p>
            <div className="flex items-center gap-3 sm:gap-5">
              {socialLinks.map(({ icon: Icon, url }, idx) => (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-neutral-200 hover:bg-blue-600 flex items-center justify-center transition">
                  <Icon className="w-5 h-5 text-neutral-700 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 space-y-5">
            <h1 className="text-lg text-neutral-900 font-semibold">Quick Links</h1>
            <div className="space-y-2 text-neutral-600">
              <Link to="/" className="block hover:text-blue-600">Home</Link>
              <Link to="/services" className="block hover:text-blue-600">Services</Link>
              <Link to="/products" className="block hover:text-blue-600">Products</Link>
              <Link to="/contact" className="block hover:text-blue-600">Contact Us</Link>
            </div>
          </div>

          {/* Solutions */}
          <div className="col-span-1 space-y-5">
            <h1 className="text-lg text-neutral-900 font-semibold">Our Solutions</h1>
            <div className="space-y-2 text-neutral-600">
              <Link to="/" className="block hover:text-blue-600">POS Systems</Link>
              <Link to="/" className="block hover:text-blue-600">Cloud ERP</Link>
              <Link to="/" className="block hover:text-blue-600">Inventory Management</Link>
              <Link to="/" className="block hover:text-blue-600">Biometric Security</Link>
            </div>
          </div>

          {/* Support */}
          <div className="col-span-1 space-y-5">
            <h1 className="text-lg text-neutral-900 font-semibold">Support</h1>
            <div className="space-y-2 text-neutral-600">
              <Link to="/" className="block hover:text-blue-600">Documentation</Link>
              <Link to="/" className="block hover:text-blue-600">API Reference</Link>
              <Link to="/" className="block hover:text-blue-600">Knowledge Base</Link>
              <Link to="/" className="block hover:text-blue-600">Careers</Link>
            </div>
          </div>
        </motion.div>

        {/* Separator */}
        <div className="w-full h-px bg-neutral-300" />

        {/* Bottom Section */}
        <motion.div
          className="w-full flex flex-col sm:flex-row items-center justify-between gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          variants={slideUpVariant}
        >
          <p className="text-sm text-neutral-600">
            © 2025 LogicForge Software Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <img src={MasterCardImg} alt="MasterCard" className="h-8" />
            <img src={CreditCardImg} alt="Credit Card" className="h-8" />
            <img src={CashImg} alt="Cash" className="h-8" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Footer