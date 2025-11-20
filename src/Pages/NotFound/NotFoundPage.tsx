import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SpellText from '../../Compenets/UI/SpellText';

const NotFoundPage = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-white font-roobert mt-3">
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
            404
          </motion.h1>
          <motion.div
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-95 font-dancing"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SpellText
              text="Oops! The page you're looking for seems to have wandered off into the digital wilderness."
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
        <div className="max-w-6xl mx-auto text-center">
          <motion.div className="mb-20" {...fadeInFromTop}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#3B8D90' }}>
              Page Not Found
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Don't worry, even the best explorers get lost sometimes. Let's get you back on track!
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
                What happened?
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                The page you were looking for might have been moved, deleted, or the URL might be incorrect. Our website is constantly evolving to serve you better.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                But don't fret! You can easily navigate back to our amazing collection of products and continue your shopping journey.
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
                  <span className="text-gray-600 text-lg">Quick Actions</span>
                  <span className="font-bold text-2xl" style={{ color: '#3B8D90' }}>→</span>
                </div>
                <div className="space-y-4">
                  <motion.button
                    onClick={() => navigate("/")}
                    style={{
                       background: 'linear-gradient(to right, #3B8D90, #14B8A6)'
                    }}
                    className="w-full px-6 py-4  text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Go to Homepage
                  </motion.button>
                  <motion.button
                    onClick={() => navigate(-1)}
                    className="w-full px-6 py-4 bg-[#E8765E] text-white border-2 border-gray-300 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Go Back
                  </motion.button>
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
              Explore Our Store
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover amazing products and find exactly what you're looking for.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Shop Collection", desc: "Browse our latest arrivals and bestsellers", path: "/products", icon: "🛍️" },
              { title: "Categories", desc: "Explore products by category", path: "/categories", icon: "📂" },
              { title: "Brands", desc: "Discover trusted brands we carry", path: "/brands", icon: "🏷️" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-6xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {item.desc}
                </p>
                <motion.button
                  onClick={() => navigate(item.path)}
           style={{
             background: 'linear-gradient(to right, #3B8D90, #14B8A6)'
           }}
                  className="px-6 py-3  text-white rounded-xl font-semibold shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default NotFoundPage;