import { Shield, Zap, ChartBar } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Secure Trading",
    description:
      "Advanced security protocols protect your assets and trading activities.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Execute trades with the speed and precision of the ODM gear.",
  },
  {
    icon: ChartBar,
    title: "Advanced Analytics",
    description:
      "Get detailed insights and predictions powered by cutting-edge AI.",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-mikasa-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Why Choose Mikasa AI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-6 rounded-lg bg-white/5 backdrop-blur-lg border border-white/10 hover:border-mikasa-red transition-colors"
            >
              <feature.icon className="w-12 h-12 text-mikasa-red mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};