"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useTodo from "@/lib/hooks/useTodo";
import { Search, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import TodoCard from "@/components/common/todo-card";
import EmptyState from "@/components/common/empty-state";
import ConfirmDeleteDialog from "@/components/common/confirm-dialog";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const { toast } = useToast();
  const {
    data: { todos, content, search, filteredTodos },
    method: {
      addTodo,
      setSearch,
      setContent,
      deleteTodo,
      searchTodos,
      completeTodo,
      setTabStatus,
      deleteAllCompleted,
    },
  } = useTodo();

  const handleAddTodo = () => {
    if (content.trim() === "") {
      toast({
        description: "Content cannot be empty",
        className: "bg-red-500 text-white py-4 px-6",
      });
      return;
    }
    const success = addTodo();
    if (success) {
      toast({
        description: "Todo added successfully",
        className: "bg-green-500 text-white py-4 px-6",
      });
    } else {
      toast({
        description: "Failed added todo",
        className: "bg-red-500 text-white py-4 px-6",
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-2 p-24">
      <h1 className="text-4xl md:text-5xl font-bold">Todo apps</h1>

      <div className="mt-5 w-full flex flex-col items-center">
        <Tabs defaultValue="all" className="min-w-80 md:min-w-[500px]">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="all" onClick={() => setTabStatus("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="active" onClick={() => setTabStatus("active")}>
              Active
            </TabsTrigger>
            <TabsTrigger
              value="complete"
              onClick={() => setTabStatus("complete")}
            >
              Complete
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="flex gap-x-2 my-2">
              <Input
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="shadow-lg text-lg"
                placeholder="Add new todo"
              />
              <Button onClick={handleAddTodo}>Add</Button>
            </div>

            <div className="my-5">
              <AnimatePresence>
                {todos.length === 0 ? (
                  <EmptyState message="No todos found" />
                ) : (
                  todos.map((todo) => (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      onComplete={completeTodo}
                      onDelete={deleteTodo}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </TabsContent>
          <TabsContent value="active">
            <div className="flex gap-x-2 items-center my-2">
              <Input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="shadow-lg text-lg"
                placeholder="Search todo"
              />
              <Search
                size={30}
                className="cursor-pointer"
                onClick={searchTodos}
              />
            </div>

            <div className="my-4">
              <AnimatePresence>
                {filteredTodos.length === 0 ? (
                  <EmptyState message="No todos found" />
                ) : (
                  filteredTodos.map((todo) => (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      onComplete={completeTodo}
                      onDelete={deleteTodo}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          <TabsContent value="complete">
            <div className="flex gap-x-2 items-center my-2">
              <Input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="shadow-lg text-lg"
                placeholder="Search todo"
              />
              <Search
                size={30}
                className="cursor-pointer"
                onClick={searchTodos}
              />
            </div>

            <div className="my-4">
              <AnimatePresence>
                {filteredTodos.length === 0 ? (
                  <EmptyState message="No todos found" />
                ) : (
                  <>
                    {filteredTodos.map((todo) => (
                      <TodoCard
                        key={todo.id}
                        todo={todo}
                        onComplete={completeTodo}
                        onDelete={deleteTodo}
                      />
                    ))}
                    <motion.div
                      className="w-full flex justify-end"
                      layout
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <ConfirmDeleteDialog
                        title="Delete All Complete Todo"
                        description="Are you sure you want to delete all completed todos? This action cannot be undone."
                        onDelete={deleteAllCompleted}
                      >
                        <Button className="bg-red-500 flex gap-x-2 my-2">
                          <Trash2 />
                          Delete Complete
                        </Button>
                      </ConfirmDeleteDialog>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
