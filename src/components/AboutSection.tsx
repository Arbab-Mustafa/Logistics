import * as motion from "motion/react-client";
import { Target, Compass, Users, Package, Globe } from "lucide-react";
import { ABOUT, ABOUT_DESC, CARDABT_1, CARDABT_2, CARDABT_3, CARDABTDESC_1, CARDN, GCC, PIL } from "@/constants/constants";

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-900">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div 
          className="max-w-xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">{ABOUT}</h2>
          <div className="w-16 h-1 bg-green-600 mx-auto mb-6"></div>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-center text-gray-200 mb-8">
            {ABOUT_DESC}
          </p>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8 mt-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-gray-800 p-8 rounded-xl shadow-sm border border-green-600"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-green-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">{CARDABT_1}</h3>
              </div>
              <p className="text-gray-300">
                {CARDABTDESC_1}
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800 p-8 rounded-xl shadow-sm border border-green-600"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <Compass className="w-6 h-6 text-green-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">{CARDABT_2}</h3>
              </div>
              <p className="text-gray-300">
              {CARDABT_3}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="text-center" variants={itemVariants}>
            <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-400 mb-2">{CARDN}</div>
            <p className="text-gray-400 font-medium">Active Clients</p>
          </motion.div>
          <div className="h-12 w-px bg-gray-700 hidden md:block"></div>
          <motion.div className="text-center" variants={itemVariants}>
            <Package className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-400 mb-2">{PIL}</div>
            <p className="text-gray-400 font-medium">Products Available</p>
          </motion.div>
          <div className="h-12 w-px bg-gray-700 hidden md:block"></div>
          <motion.div className="text-center" variants={itemVariants}>
            <Globe className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-green-400 mb-2">{GCC}</div>
            <p className="text-gray-400 font-medium">GCC Countries Served</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
