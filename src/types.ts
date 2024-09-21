interface IProject {
    id: string,
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

// Not sure this one is needed yet
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
    username: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    email?: string
}

export type { IProject, ITask, ISurvey, IUser }