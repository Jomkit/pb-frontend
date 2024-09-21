
import { Link } from 'react-router-dom';
import { IProject } from '../../types';

const Project = ({project}: {project: IProject}) => {
  const {id, name, note} = project;

  return (
    <Link to={`/projects/${id}`}>
      <div className='w-full mx-auto p-2 mb-2 border-solid border-2 border-black rounded-md bg-white' id={id}>
          <div className="header">
              <h1 className="text-3xl text-bold">{name}</h1>
              <h3>Description: {note}</h3>
          </div>
      </div>
    </Link>
  )
}

export default Project 