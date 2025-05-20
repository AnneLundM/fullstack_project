/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

const FadeWrapper = ({ children, keyName }) => {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={keyName}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeWrapper;
