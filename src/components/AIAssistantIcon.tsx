import { useState } from 'react';
import { Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DesignChatAgent } from './DesignChatAgent';

export const AIAssistantIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        className="fixed right-6 bottom-24 z-50"
        onHoverStart={() => setIsOpen(true)}
        onHoverEnd={() => setIsOpen(false)}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer"
        >
          <Bot className="h-7 w-7 text-primary-foreground" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed right-6 bottom-44 z-50 w-[400px] max-w-[90vw]"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <DesignChatAgent />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
