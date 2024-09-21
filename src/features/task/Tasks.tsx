import { useContext, useEffect, useState } from 'react';
import Frame from '../../components/Frame'
import Api from '../../api';
import TaskList from './TaskList';
import userContext from '../../components/contexts/userContext';
import CustomDropdown from '../../components/CustomDropdown';
import { IProject, ITask } from '../../types';
import useLocalStorage from '../../components/hooks/useLocalStorage';

const Tasks = () => {
  
  const [currProjectId, setCurrProjectId] = useLocalStorage("currProjectId");
  const [currProjectName, setCurrProjectName] = useState("No project selected");
  const { id } = useContext(userContext);

  // get tasks
  const [tasks, setTasks] = useState([] as ITask[]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [projects, setProjects] = useState([] as IProject[]);

  useEffect(() => {
    const getUserProjects = async () => {
      const res = await Api.getUserProjects(id!);
      console.log("res in api", res);
      
      setProjects(res);
    }
    if(id){
      getUserProjects();
    }
    
  },[id]);
  
  useEffect(() => {
    const findTasksFromProject = async () => {
      const results = await Api.findProjectTasks(currProjectId as string);
      console.log("tasks:", results); // Delete later
      if(results.length !== 0){
        setTasks(results);
      }
      setLoadingTasks(false);
    }
    
    if(id){
      setLoadingTasks(true);
      
      let currProject;
      console.log("Projects", projects);
      console.log("currProjectId", currProjectId);
      if(projects.length === 0) return;
      currProject = projects.find((proj) => proj.id === currProjectId);
      setCurrProjectName(currProject!.name);
      console.log("currProject", currProject);
      
      findTasksFromProject();
    }
  }, [currProjectId, projects]);

  const changeProject = (project: IProject) => {
    setCurrProjectId(project.id);
  }

  return (
    <Frame bgColor='bg-orange-400' title='Tasks'>
      {loadingTasks ? <p>Loading...</p> : 
      <>
        <CustomDropdown 
          label={"Select Project"} 
          items={projects} 
          handleClick={changeProject}
        />
        {projects.length > 1 && <h2>Current Project: {currProjectName}</h2>}
        <TaskList loading={loadingTasks} tasks={tasks} />
      </>
      }
    </Frame>
  )
}

export default Tasks