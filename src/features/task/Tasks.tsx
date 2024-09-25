import { useContext, useEffect, useState } from 'react';
import Frame from '../../components/Frame'
import Api from '../../api';
import TaskList from './TaskList';
import userContext from '../../components/contexts/userContext';
import { IProject, ITask } from '../../types';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const user = useContext(userContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([] as ITask[]);
  const [projects, setProjects] = useState([] as IProject[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get all of a user's projects and then get all tasks of those projects
    const getAllTasks = async () => {
      if(!user.id) return;
      const fetchedProjects = await Api.getUserProjects(user.id!);
      if(fetchedProjects.length === 0){
        console.log("no projects");
        alert("Please create a project first");
        navigate("/projects");
        return;
      }
      const taskPromises = fetchedProjects.map( (project: any) => {
        return Api.findProjectTasks(project.id);
      });
      if(taskPromises.length === 0){
        setIsLoading(false);
        return;
      }

      const loadedTasks = await Promise.all(taskPromises).then((values) => {
        return values.flat(Infinity);
      })
      
      setTasks(loadedTasks);
      setProjects(fetchedProjects);
      setIsLoading(false);
    }
    getAllTasks();
    
  }, [user]);

  return (
    <Frame bgColor='bg-orange-400' title='Tasks'>
      
      {isLoading ? <p>Loading...</p> : 
      <>
        <TaskList loading={isLoading} projects={projects} tasks={tasks} />
      </>
      }
    </Frame>
  )
}

export default Tasks