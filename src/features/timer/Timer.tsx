import { useContext, useState } from "react";
import Api from "../../api";
import Card from "../../components/Card";
import { ITask } from "../../types";
import TimerFace from "./TimerFace";
import { useTimer } from "react-timer-hook";
import userContext from "../../components/contexts/userContext";
import NewSurveyForm from "../survey/NewSurveyForm";
import Popup from "../../components/Popup";

const unassignedTask: ITask = {
  id: "0",
  name: "Free Task"
}

const Timer = ({ projectId, task = unassignedTask, timeLimit = 25 }: {projectId?: string, task?: ITask, timeLimit?: number }) => {
  let exp = timeLimit; // time limit in minutes
  const [popupOpen, setPopupOpen] = useState(false);
  const [timerId, setTimerId] = useState("");
  
  const user = useContext(userContext);
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + exp*60);

  // Logs end time, calculates start time, and then creates time-entry
  const handleExpire = (restart: (expiryTimestamp: Date, autoStart: boolean) => void) => {
    if(projectId){
      const end = expiryTimestamp.toISOString();
      const start = new Date(expiryTimestamp.getTime() - exp*60*1000);

      const result = Api.createTimeEntry(user.id!, {projectId: task.projectId, start: start.toISOString(), end: end, taskId: task.id});
      result.then(({clockifyTimer}) => {
        setTimerId(clockifyTimer.id);
        open(); // open timer survey
      });
      
    } else{
      console.log("Time at exp:", expiryTimestamp);
    }
    restart(expiryTimestamp, false);
  }

  // frontend timer logic
  const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
            expiryTimestamp, 
            autoStart: false, 
            onExpire: () => (handleExpire(restart)) // Should log a completed time-entry to the associated project or task
          });

  const open = () => {
    setPopupOpen(true);
  }
  const close = () => {
    setPopupOpen(false);
  }

  return (
    <Card>
      <h2 className="text-start">Timer</h2>
      <div className="flex justify-between">
        <TimerFace sec={seconds} min={minutes} />
        
        {popupOpen && projectId && (
          <Popup close={close}>
            <NewSurveyForm projectId={projectId} task={task} timerId={timerId} closePopup={close} />
          </Popup>
        )}
        <div id="set-timer">
          { isRunning ? 
            <button id="pause-btn" className="btn bg-yellow-400" onClick={pause}><i className="fa-solid fa-pause"></i></button>
            :
            <button id="start-btn" className="btn bg-green-400" onClick={resume}><i className="fa-solid fa-play"></i></button>
          }

          <button id="restart-btn" className="btn bg-red-500" onClick={() => restart(expiryTimestamp, false)}><i className="fa-solid fa-rotate-right"></i></button>
        </div>
      </div>
    </Card>
  )
}

export default Timer