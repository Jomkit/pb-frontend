import { useEffect, useState } from "react"
import Api from "../../api";
import { Duration } from "luxon";
import { calculateTotalDuration } from "../../utils/duration";
import { ISurvey, ITimer } from "../../types";

const SurveyReport = ({userId}: {userId: number}) => {
    const initialStats = {
        timeWeek: "0 hours, 0 minutes",
        timeToday: "0 hours"
    }
    const [timeStatistics, setTimeStatistics] = useState(initialStats);
    const [weeklyScores, setWeeklyScores] = useState([] as any[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        /**
         * Gets total time for the week and today and updates the state
         * @param {number} userId - The id of the user.
         */
        const getStats = async (userId: number) => {
            const res = await Api.getUserTimeEntries(userId);
            //Filters all user's timers to just those that started today
            const timersToday = res.timers.filter((timer: ITimer) => Date.parse(timer.timeInterval.start) >= new Date().setHours(0,0,0,0));
            
            const durationsWeek = res.timers.map((timer: any) => timer.timeInterval.duration);
            const durationsToday = timersToday.map((timer: any) => timer.timeInterval.duration);

            const timeWeek: Duration = calculateTotalDuration(durationsWeek);
            const timeToday: Duration = calculateTotalDuration(durationsToday);

            setTimeStatistics({timeWeek: timeWeek.toHuman(), timeToday: timeToday.toHuman()});
        }
        getStats(userId);
        
    }, []);
    
    useEffect(() => {
        interface IDailyScore {
            day: string,
            scores: ISurvey[]
        }
        
        const getReport = async(userId: number) => {
            const reportCall = await Api.createUserReport(userId);
            const allScores = await Api.getSurveys();
            console.log("allScores", allScores);
            const weeklyScoresCalculated : IDailyScore[] = [
                {day: "Sunday", scores: []},
                {day: "Monday", scores: []},
                {day: "Tuesday", scores: []},
                {day: "Wednesday", scores: []},
                {day: "Thursday", scores: []},
                {day: "Friday", scores: []},
                {day: "Saturday", scores: []},
            ]
            reportCall.usersTimers.map((timer: ITimer) => {
                let date = new Date(timer.timeInterval.end!);
                let day = date.getDay();
                let groupedScores = allScores.surveys.filter((survey: ISurvey) => survey.taskId === timer.taskId);
                
                weeklyScoresCalculated[day].scores.push(...groupedScores);
            });
            const avgPerDay = weeklyScoresCalculated.map((entry: IDailyScore) => {
                if(entry.scores.length > 0) {
                    const avg = entry.scores.reduce((a: number, b: ISurvey) => a + b.score, 0) / entry.scores.length;
                    return {day: entry.day, scores: entry.scores, avg: avg};
                } else {
                    return {day: entry.day, scores: entry.scores, avg: 0};
                }
            });

            setWeeklyScores(avgPerDay);
            setLoading(false);
        }

        getReport(userId);
    }, [userId])
    
  return (
    loading ? <p>Loading...</p> :
        <div className='w-full lg:w-2/3 m-auto mt-10 p-4 simple-border'>
            <h2 className='text-bold'>Report</h2>
            <div className="text-start">
                <p>Productive time today: {timeStatistics.timeToday}</p>
                <p>Total time last week: {timeStatistics.timeWeek}</p>
                <p>Most productive day of the week (by average score): {weeklyScores.reduce((a: any, b: any) => a.avg > b.avg ? a : b).day} ({weeklyScores.reduce((a: any, b: any) => a.avg > b.avg ? a : b).avg})</p>
            </div>
        </div>
    
  )
}

export default SurveyReport