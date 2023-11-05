import { useState, useEffect } from "react";
// import formatDate from "./utils"; // Define a utility function to format dates

export default function Todo({ initialTodos }) {
  const [task, setTask] = useState("");
  const [pubDate, setPubDate] = useState("");
  const [todos, setTodos] = useState(initialTodos);

  const handleCheckboxChange = async (index) => {
    // Send a PUT request to mark the task as completed on the backend
    const updatedTodo = todos[index];
    try {
      const response = await fetch(`http://localhost:8000/app/add/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: updatedTodo.task }),
      });

      if (response.ok) {
        // Update the completedDate with today's date
        updatedTodo.completedDate = new Date();
        setTodos([...todos]);
      } else {
        console.error("Failed to mark todo as completed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new todo object
    const newTodo = {
      task,
      pubDate,
      completedDate: null, // Leave it null for now
    };

    // Send the new todo to the backend
    try {
      const response = await fetch("http://localhost:8000/app/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (response.ok) {
        // Reset form fields and update the todos list
        setTask("");
        setPubDate("");
        setTodos([...todos, newTodo]);
      } else {
        console.error("Failed to add todo");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Use useEffect to update the page when todos change
  useEffect(() => {
    // Fetch the updated todos from the backend
    async function fetchUpdatedTodos() {
      try {
        const response = await fetch("http://localhost:8000/app/");
        if (response.ok) {
          const updatedTodos = await response.json();
          setTodos(updatedTodos);
        }
      } catch (error) {
        console.error("Error fetching updated todos:", error);
      }
    }

    fetchUpdatedTodos();
  }, [todos]); // This will run the effect whenever the 'todos' state changes

  return (
    <div className="w-3/4 mx-auto my-10 p-5 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-semibold mb-4">Todo App</h1>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          className="w-1/2 p-2 border border-gray-400 rounded-md"
        />
        <input
          type="date"
          placeholder="Published Date"
          value={pubDate}
          onChange={(e) => setPubDate(e.target.value)}
          required
          className="w-1/4 p-2 border border-gray-400 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          Add Todo
        </button>
      </form>
      <ul className="list-disc pl-6">
        {todos.map((todo, index) => (
          <li key={index} className="mb-2">
            <input
              type="checkbox"
              disabled={todo.compDate !== null}
              onChange={() => handleCheckboxChange(index)}
              style={{ cursor: "pointer" }}
              className="mr-2"
            />
            {todo.task} (Published Date: {formatDate(todo.pubDate)}, Completed Date:{" "}
            {todo.compDate ? formatDate(todo.compDate) : "Not Completed"})
          </li>
        ))}
      </ul>
    </div>
  );
}

// Define the formatDate utility function
function formatDate(dateString) {
  if (!dateString || dateString === "undefined") {
    return "Not Available";
  }

  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Add 1 because getUTCMonth() is 0-based
  const year = date.getUTCFullYear();

  return `${month}/${day}/${year}`;
}


export async function getServerSideProps() {
  // Fetch the initial todos from the backend
  try {
    const response = await fetch("http://localhost:8000/app/");
    if (response.ok) {
      const initialTodos = await response.json();
      console.log(initialTodos)
      return {
        props: { initialTodos },
      };
    }
  } catch (error) {
    console.error("Error fetching initial todos:", error);
  }

  // If there's an error, return an empty initialTodos array
  return {
    props: { initialTodos: [] },
  };
}
