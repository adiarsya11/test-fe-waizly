import { motion } from "framer-motion";
import { SquareX } from "lucide-react";

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <motion.div
      key="empty"
      className="flex justify-center items-center p-5"
      layout
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring" }}
    >
      <SquareX size={48} className="text-red-500" />
      <p className="ml-3 text-lg font-semibold">{message}</p>
    </motion.div>
  );
};

export default EmptyState;
