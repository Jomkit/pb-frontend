import { useParams } from "react-router-dom"
import Card from "../../components/Card"
import Frame from "../../components/Frame"
import { useEffect, useState } from "react";
import Api from "../../api";
import TaskList from "../task/TaskList";
import { IProject, ITask } from "../../types";

const ProjectDetails = () => {
  const {projectId} = useParams();
  const [project, setProject] = useState({} as IProject);
  const [tasks, setTasks] = useState([] as ITask[]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const getProject = async () => {
      const result = await Api.getProject(projectId!);
      const tasks = await Api.findProjectTasks(projectId!);
      
      setTasks(tasks);
      setProject(result);
      setIsLoading(false);
    }
    getProject();
    
  }, []);
  
  return (
    <Frame bgColor="bg-cyan-400" title="">
      {isLoading ? <p>Loading...</p> : 
      <>
        <Card title={project.name} subtitle={project.note}>
            <TaskList tasks={tasks} projects={[project]} loading={isLoading}/>
        </Card>
      </>}
    </Frame>
    
  )
}

export default ProjectDetails