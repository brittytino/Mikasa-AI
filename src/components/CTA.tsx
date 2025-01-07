import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-mikasa-red to-mikasa-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start trading with Mikasa AI today and experience the future of
            cryptocurrency trading.
          </p>
          <Button
            size="lg"
            className="bg-white text-mikasa-red hover:bg-gray-100"
          >
            Get Started Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
};