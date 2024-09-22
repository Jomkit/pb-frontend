import { useContext, useEffect, useState } from 'react'
import Frame from '../../components/Frame'
import ProjectList from './ProjectList'
import Api from '../../api'
import userContext from '../../components/contexts/userContext'
import { IProject } from '../../types'

const Projects = () => {

  const [projects, setProjects] = useState([] as IProject[]);
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