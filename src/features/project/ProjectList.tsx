import AddBtn from "../../components/AddBtn"
import { IProject } from "../../types"
import Project from "./Project"
import { useState } from "react"
import Popup from "../../components/Popup"
import NewProjectForm from "./NewProjectForm"
import Card from "../../components/Card"


const ProjectList = ({projects}: {projects: IProject[]}) => {
  
  const [popupOpen, setPopupOpen] = useState(false);
  
  const addProject = () => {
    setPopupOpen(true);
  }

  const close = () => {
    setPopupOpen(false);
  }
  
  return (
    <div className="w-3/4 m-auto">
      <AddBtn handleClick={addProject} btnName="Project"/>
      {popupOpen && (
          <Popup close={close}>
            <NewProjectForm />
          </Popup>
        )}
        {projects.length === 0 ? 
        <Card title="No Projects">
          <p>Get started by creating a new project</p>
        </Card> 
        : 
          projects.map((proj) => (
            <Project key={proj.id} project={proj} />
          )) 
        }
    </div>
  )
}

export default ProjectList