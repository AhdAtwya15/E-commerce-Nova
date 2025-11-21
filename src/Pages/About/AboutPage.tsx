import { motion } from 'framer-motion';

import SpellText from '../../Compenets/UI/SpellText';

const AboutPage = () => {


  const fadeInFromTop = {
    initial: { opacity: 0, y: -80 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-roobert ">
  
      <motion.section
        className="relative text-white py-32 px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{
            background: "linear-gradient(135deg, #3B8D90 0%, #2c7375 25%, #E8765E 60%, #3B8D90 100%)",
            backgroundSize: "200% 200%",
          }}
        />
        
      
        <div className="absolute top-20 right-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
            {...fadeInFromTop}
          >
            About Nova
          </motion.h1>
          <motion.div
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-95 font-dancing"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >

            <SpellText
                        text=" Revolutionizing fashion retail with innovative design, sustainable practices, and unparalleled customer experience."
                        
                      />
                      
           
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white"
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" {...fadeInFromTop}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3B8D90' }}>
              Our Story
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Founded in 2025, Nova emerged from a vision to democratize fashion, making high-quality, trendy clothing accessible to everyone worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                From Vision to Reality
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                What started as a small online boutique has grown into a global fashion powerhouse. Our journey began with a simple belief: fashion should be inclusive, affordable, and sustainable.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we serve millions of customers across continents, offering a curated selection of contemporary apparel that reflects the latest trends and timeless style. Our commitment to innovation drives us to constantly evolve.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-6 border-b border-gray-200">
                  <span className="text-gray-600 text-lg">Founded</span>
                  <span className="font-bold text-2xl" style={{ color: '#3B8D90' }}>2025</span>
                </div>
                <div className="flex justify-between items-center pb-6 border-b border-gray-200">
                  <span className="text-gray-600 text-lg">Global Customers</span>
                  <span className="font-bold text-2xl" style={{ color: '#3B8D90' }}>2M+</span>
                </div>
                <div className="flex justify-between items-center pb-6 border-b border-gray-200">
                  <span className="text-gray-600 text-lg">Products</span>
                  <span className="font-bold text-2xl" style={{ color: '#3B8D90' }}>50,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-lg">Countries Served</span>
                  <span className="font-bold text-2xl" style={{ color: '#3B8D90' }}>150+</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-24 px-4 bg-white"
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" {...fadeInFromTop}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3B8D90' }}>
              Our Mission & Values
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            <motion.div
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'rgba(59, 141, 144, 0.1)' }}
              >
                <svg className="w-10 h-10" style={{ color: '#3B8D90' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Innovation
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We embrace cutting-edge technology and creative design to deliver fresh, exciting fashion that sets new industry standards.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'rgba(232, 118, 94, 0.1)' }}
              >
                <svg className="w-10 h-10" style={{ color: '#E8765E' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Sustainability
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Committed to eco-friendly practices, we source materials responsibly and minimize our environmental impact through sustainable production methods.
              </p>
            </motion.div>

            <motion.div
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: 'rgba(59, 141, 144, 0.1)' }}
              >
                <svg className="w-10 h-10" style={{ color: '#3B8D90' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Community
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Building a global community of fashion enthusiasts, we foster inclusivity and empower individuals to express their unique style confidently.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

 
      <motion.section
        className="py-24 px-4 bg-gradient-to-b from-white to-slate-50"
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" {...fadeInFromTop}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3B8D90' }}>
              What Sets Us Apart
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Nova stands out through our dedication to quality, innovation, and customer satisfaction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Quality Assurance
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Every product undergoes rigorous quality control to ensure it meets our high standards. We work directly with trusted manufacturers and use premium materials.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#3B8D90' }}></div>
                  <span className="text-gray-700 text-lg">Premium fabric selection</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#3B8D90' }}></div>
                  <span className="text-gray-700 text-lg">Expert craftsmanship</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#3B8D90' }}></div>
                  <span className="text-gray-700 text-lg">Comprehensive quality testing</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#3B8D90' }}></div>
                  <span className="text-gray-700 text-lg">Size and fit accuracy</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Customer-Centric Approach
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our customers are at the heart of everything we do. From seamless online shopping experiences to responsive customer support, we exceed expectations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#E8765E' }}></div>
                  <span className="text-gray-700 text-lg">24/7 customer support</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#E8765E' }}></div>
                  <span className="text-gray-700 text-lg">Easy returns and exchanges</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#E8765E' }}></div>
                  <span className="text-gray-700 text-lg">Secure payment processing</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#E8765E' }}></div>
                  <span className="text-gray-700 text-lg">Fast, reliable shipping</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

 
      <motion.section
        className="py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50"
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" {...fadeInFromTop}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3B8D90' }}>
              Meet the Developer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The creative mind behind Nova's digital transformation.
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              className="bg-white p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-gray-100"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ backgroundColor: 'rgba(59, 141, 144, 0.1)' }}
              >
                <svg className="w-16 h-16" style={{ color: '#3B8D90' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Ahd Atwya
              </h3>
              <p className="font-bold text-xl mb-6" style={{ color: '#3B8D90' }}>
                Front End Developer
              </p>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                Passionate about creating innovative e-commerce solutions that blend cutting-edge technology with exceptional user experiences. Specializing in modern web development with React, TypeScript, and modern CSS frameworks.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com/AhdAtwya15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#3B8D90' }}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/ahd-atwya-a46766228"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#E8765E' }}
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

   
      <motion.section
        className="relative py-32 px-4 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(232, 118, 94, 0.2)' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(59, 141, 144, 0.2)' }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          style={{
            background: "linear-gradient(135deg, #3B8D90 0%, #2c7375 30%, #E8765E 70%, #3B8D90 100%)",
            backgroundSize: "200% 200%",
          }}
        />

        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
            initial={{ y: -80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Style?
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl mb-12 leading-relaxed opacity-95"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 0.95 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join thousands of fashion enthusiasts who have discovered their perfect look with Nova.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
              style={{ color: '#3B8D90' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping Now
            </motion.button>
            <motion.button
              className="border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:bg-white"
              whileHover={{ 
                scale: 1.05,
                color: '#3B8D90'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;