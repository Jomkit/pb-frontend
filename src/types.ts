interface IProject {
    id?: string,
    name: string,
    note: string
}

interface ITask {
    id: string,
    projectId?: string,
    name: string,
    duration?: string,
    estimate?: string,
    status?: string
}

interface ITaskData {
    userId: number,
    data: {
        name: string,
        status?: string,
        estimate?: string
    }
}

interface ITimer {
    id: string,
    projectId: string,
    taskId: string,
    timeInterval: {
        start: string,
        end?: string
    }
}

interface ISurvey {
    id?: string,
    projectId: string,
    taskId: string,
    timerId: string,
    score: number,
    description?: string
}

interface IUser {
    id?: number,
    token?: string,
    username: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string
}

export type { IProject, ITask, ITaskData, ITimer, ISurvey, IUser }