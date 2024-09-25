import { useEffect, useState } from 'react';
import Api from '../../api';
import { Duration } from 'luxon';

const Statistics = ({userId}: {userId: number}) => {
  const [loading, setLoading] = useState(true);
  const [allProjects, setAllProjects] = useState([] as any[]);
  
  useEffect(() => {
    const getReport = async () => {
      if(!userId) return;

      const allProjectsCall = await Api.getUserProjects(userId);
      
      setAllProjects(allProjectsCall);
    }

    getReport();
    setLoading(false);
  }, [userId]);
  
  return (
    <div>
      <div>My Statistics</div>
        {loading ? <p>Loading...</p> :
          <table className='table-auto w-full simple-border'>
            <thead className='bg-green-200 simple-border'>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Total Time Spent</th>
              </tr>
            </thead>
            <tbody>
              {allProjects.map((project: any) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.archived ? "Complete" : "Active"}</td>
                <td>{Duration.fromISO(project.duration).toHuman()}</td>
              </tr>
                
              ))}
            </tbody>
          </table>
        }
    </div>
  )
}

export default Statistics