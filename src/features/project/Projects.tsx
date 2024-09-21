import { useContext, useEffect, useState } from 'react'
import Frame from '../../components/Frame'
import ProjectList from './ProjectList'
import Api from '../../api'
import userContext from '../../components/contexts/userContext'

const Projects = () => {
  const initialState = [
    {
      id: "1",  
      name: "Example project",
      note: "Notes about example project"
    }
  ]

  const [projects, setProjects] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const {id} = useContext(userContext);
  const userId = id;
  
  useEffect(() => {
    const getProjects = async () => {
      if(!userId) return;
      const projects = await Api.getUserProjects(userId);
      
      if(projects.length !== 0){
        setProjects(projects);
      }
      setIsLoading(false);
    }
    getProjects();
  }, [userId]);
  
  return (
    <Frame bgColor='bg-cyan-400' title='Projects'>
      { isLoading ? <p>Loading...</p> : <ProjectList projects={projects}/> }
    </Frame>
  )
}

export default Projects