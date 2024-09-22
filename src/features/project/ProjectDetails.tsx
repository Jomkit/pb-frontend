import { useParams } from "react-router-dom"
import Card from "../../components/Card"
import Frame from "../../components/Frame"
import { useEffect, useState } from "react";
import Api from "../../api";
import TaskList from "../task/TaskList";
import useLocalStorage from "../../components/hooks/useLocalStorage";

const ProjectDetails = () => {
  const {projectId} = useParams();
  const [currProjectId, setCurrProjectId] = useLocalStorage("currProjectId");
  const [project, setProject] = useState({} as any);
  const [tasks, setTasks] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const getProject = async () => {
      const result = await Api.getProject(projectId!);
      const tasks = await Api.findProjectTasks(projectId!);
      console.log("tasks", tasks);
      setTasks(tasks);
      setProject(result);
      setCurrProjectId(projectId);
      setIsLoading(false);
    }
    getProject();
    console.log(currProjectId);
    
  }, []);
  
  return (
    <Frame bgColor="bg-cyan-400" title="">
      {isLoading ? <p>Loading...</p> : 
      <>
        <Card title={project.name} subtitle={project.note}>
            <TaskList tasks={tasks} loading={isLoading}/>
        </Card>
      </>}
    </Frame>
    
  )
}

export default ProjectDetails