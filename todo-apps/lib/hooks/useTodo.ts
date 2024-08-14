import { useEffect, useMemo, useState } from "react";
import { Todo } from "../types";
import { addTodosToLocalStorage } from "../utils";
import { useQuery } from "react-query";
import { getWeather } from "../api/weather";

const TODO_KEY = "todos";

const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<"all" | "active" | "complete">("all");

  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const getCurrentLocation = () => {
    return new Promise<void>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
          resolve();
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        }
      );
    });
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem(TODO_KEY);
    const todos = storedTodos ? JSON.parse(storedTodos) : [];
    setTodos(todos);

    getCurrentLocation().catch((error) => {
      console.error(error);
    });
  }, []);

  const { data } = useQuery(
    ["weather", latitude, longitude],
    () => getWeather(latitude, longitude),
    {
      enabled: !!latitude && !!longitude,
    }
  );

  const weatherData = useMemo(() => {
    const weatherCondition = data?.weather[0];
    return {
      name: data?.name,
      temperature: Math.round(Number(data?.main.temp) - 273.15),
      main: data?.main,
      description: weatherCondition?.description,
      sys: data?.sys,
      feelsLike: Math.round(Number(data?.main.feels_like) - 273.15),
      pressure: data?.main?.pressure,
    };
  }, [data]);

  const filterTodos = (status: string) => {
    if (status === "all") {
      setFilteredTodos(todos);
    } else if (status === "active") {
      const todosActive = todos.filter((todo: Todo) => !todo.isCompleted);
      setFilteredTodos(todosActive);
    } else if (status === "complete") {
      const todosComplete = todos.filter((todo: Todo) => todo.isCompleted);
      setFilteredTodos(todosComplete);
    }
  };

  useEffect(() => {
    filterTodos(status);
  }, [todos, status]);

  const addTodo = () => {
    if (content.trim() === "") {
      return false;
    }
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      content,
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    addTodosToLocalStorage(TODO_KEY, updatedTodos);
    setTodos(updatedTodos);
    setContent("");
    return true;
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    addTodosToLocalStorage(TODO_KEY, updatedTodos);
    setTodos(updatedTodos);
  };

  const completeTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    addTodosToLocalStorage(TODO_KEY, updatedTodos);
    setTodos(updatedTodos);
    const todosActive = updatedTodos.filter((todo: Todo) => !todo.isCompleted);
    setFilteredTodos(todosActive);
  };

  const searchTodos = () => {
    setFilteredTodos(
      filteredTodos.filter((todo) =>
        todo.content.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const setTabStatus = (status: "all" | "active" | "complete") => {
    setStatus(status);
    setSearch("");
  };

  const deleteAllCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.isCompleted);
    addTodosToLocalStorage(TODO_KEY, updatedTodos);
    setTodos(updatedTodos);
    setFilteredTodos(updatedTodos);
  };

  return {
    data: {
      todos,
      search,
      status,
      content,
      weatherData,
      filteredTodos,
    },
    method: {
      addTodo,
      setSearch,
      setContent,
      deleteTodo,
      searchTodos,
      setTabStatus,
      completeTodo,
      deleteAllCompleted,
    },
  };
};

export default useTodo;
