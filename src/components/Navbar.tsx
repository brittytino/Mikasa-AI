import { Bitcoin, Wallet, BookOpen, ChartBar } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { toast } from "./ui/use-toast";

export const Navbar = () => {
  const [showWalletDialog, setShowWalletDialog] = useState(true);

  const handleConnectWallet = () => {
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been successfully connected!",
    });
    setShowWalletDialog(false);
  };

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bitcoin className="w-8 h-8 text-mikasa-red" />
            <span className="text-xl font-bold text-white">Mikasa AI</span>
          </div>

          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              className="text-white hover:text-mikasa-red hover:bg-transparent"
              onClick={() => window.open("/documentation", "_blank")}
            >
              <BookOpen className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              className="bg-[#F97316] hover:bg-[#F97316]/80 text-white border-none"
            >
              <a href="/stats" className="flex items-center gap-2">
                <ChartBar className="mr-2 h-4 w-4" />
                View Trading Stats
              </a>
            </Button>

            <Button 
              className="bg-mikasa-red hover:bg-red-800 flex items-center gap-2"
              onClick={handleConnectWallet}
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </motion.div>

      <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
        <DialogContent className="bg-gray-900 text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Connect Your Wallet</DialogTitle>
            <DialogDescription className="text-gray-400">
              Connect your wallet to access all features and start trading with Mikasa AI.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Button 
              className="bg-mikasa-red hover:bg-red-800 w-full flex items-center justify-center gap-2"
              onClick={handleConnectWallet}
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
            <p className="text-sm text-gray-400 text-center">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};