"use client";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/lib/type";
import ConfirmDeleteDialog from "@/components/common/confirm-dialog";
import { Trash2 } from "lucide-react";

interface TodoCardProps {
  todo: Todo;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoCard = ({ todo, onComplete, onDelete }: TodoCardProps) => {
  return (
    <motion.div
      key={todo.id}
      className="flex my-2 bg-white justify-between p-2 items-center rounded-md shadow-lg"
      layout
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="flex items-center gap-x-2">
        <Checkbox
          checked={todo.isCompleted}
          onCheckedChange={() => onComplete(todo.id)}
        />
        <motion.span
          className={`text-lg font-semibold ${
            todo.isCompleted ? "strikethrough" : ""
          }`}
          initial={{ opacity: 1 }}
          animate={{ opacity: todo.isCompleted ? 0.5 : 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          {todo.content}
        </motion.span>
      </div>
      <ConfirmDeleteDialog
        title="Delete Todo"
        description="Are you sure you want to delete this todo? This action cannot be undone."
        onDelete={() => onDelete(todo.id)}
      >
        <Trash2 size={15} className="cursor-pointer hover:text-red-500" />
      </ConfirmDeleteDialog>
    </motion.div>
  );
};

export default TodoCard;
