import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Scene3D } from "./Scene3D";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />
      <div className="absolute inset-0">
        <img
          src="https://i.imgur.com/A2cTFis.jpg"
          alt="Mikasa Background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mikasa-black via-mikasa-black/90 to-mikasa-red/20" />
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="inline-block"
            >
              <span className="px-4 py-2 rounded-full bg-mikasa-red/20 text-red-400 text-sm font-semibold">
                Revolutionary AI Trading
              </span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              Mikasa AI
              <span className="text-mikasa-red">Trading</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Experience the power of humanity's strongest AI trading companion. 
              Precision, strength, and unwavering determination in every trade.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-mikasa-red hover:bg-red-800 text-white px-8 py-6 text-lg rounded-xl 
                transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
              >
                Start Trading Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl
                transform transition-all duration-300 hover:scale-105 hover:border-mikasa-red"
              >
                View Trading Stats
              </Button>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center gap-6 mt-8"
            >
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-mikasa-red bg-gray-800 flex items-center justify-center"
                  >
                    <span className="text-white font-semibold">T{i}</span>
                  </div>
                ))}
              </div>
              <div className="text-gray-400">
                <p className="font-semibold">10k+ Active Traders</p>
                <p className="text-sm">Join the revolution</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-mikasa-red/50 
            transform transition-transform duration-500 hover:scale-105">
              <img
                src="https://c4.wallpaperflare.com/wallpaper/770/711/692/anime-attack-on-titan-attack-on-titan-mikasa-ackerman-wallpaper-thumb.jpg"
                alt="Mikasa"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mikasa-black to-transparent" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute bottom-0 left-0 right-0 p-6 text-white"
              >
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-300">Current Trading Volume</p>
                    <p className="text-3xl font-bold">$2.5M+</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-300">Success Rate</p>
                    <p className="text-3xl font-bold text-green-500">89%</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};