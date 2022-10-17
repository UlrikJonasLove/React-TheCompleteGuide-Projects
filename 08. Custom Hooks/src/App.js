import React, { useEffect, useState } from 'react';
import { useHttp } from './hooks/use-http';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);

  //getting values from the custom hook by destructuring
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = taskObj => {
      const loadedTasks = [];
  
        for (const taskKey in taskObj) {
          loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
        }
  
        setTasks(loadedTasks); // state functions will never change, no need to add as depencency
    };
    fetchTasks(
      { url: 'https://react-http-9fa33-default-rtdb.europe-west1.firebasedatabase.app/tasks.json' }, 
      transformTasks);
  }, [fetchTasks]); // because of useCallback we can add fetchTasks as a dependency and avoid infinite loop

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
