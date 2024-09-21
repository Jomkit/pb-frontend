/** mock module for API */

export default class Api {
    static getProject(projectId: string) {
        return {
            "clockifyProject":
            {
                id: projectId,
                name: `testProject ${projectId}`,
                note: "testNote"
            }
        }
    }

    static findProjectTasks(projectId: string) {
        return [
            {
                id: "1",
                projectId: projectId,
                name: "testTask 1",
                status: "In Progress"
            },
            {
                id: "2",
                projectId: projectId,
                name: "testTask 2",
                status: "In Progress"
            }
        ]
    }

    static getUserProjects() {
        return [
                {
                    id: "1", 
                    name: "testProject 1",
                    note: "testNote 1",
                    duration: "PT5M"
                },
                {
                    id: "2", 
                    name: "testProject 2",
                    note: "testNote 2",
                    duration: "PT5M"
                }
            ]
    }

    static createUserProject() {
        return [
            {
                id: "1",
                name: "New testProject 1",
                note: "testNote 1"
            }
        ]
    }
    static createTask() {
        return [
            {
                id: "1",
                name: "New testTask 1"
            }
        ]
    }

    static deleteTask() {
        return "Task deleted";
    }

    static createTimeEntry() {
        const date = new Date();
        return {
            id: "1",
            start: new Date(date.setMinutes(5)),
            end: new Date(date.setMinutes(10)),
            taskId: "1", 
            projectId: "1"
        }
    }
    
    static getUserTimeEntries() {
        const date = new Date();
        return { timers: [
            {
                id: "1",
                timeInterval: {
                    start: new Date(date.setMinutes(5)),
                    end: new Date(date.setMinutes(10)),
                    duration: "PT5M"
                },
                projectId: "1",
                taskId: "1"
            },
            {
                id: "2",
                timeInterval: {
                    start: new Date(date.setMinutes(15)),
                    end: new Date(date.setMinutes(20)),
                    duration: "PT5M"
                },
                projectId: "1",
                taskId: "2"
            }
        ]}
    }

    static createUserReport() {
        const date = new Date();
        return {
            usersTimers: [
                {
                    id: "1",
                    timeInterval: {
                        start: new Date(date.setMinutes(5)),
                        end: new Date(date.setMinutes(10)),
                        duration: "PT5M"
                    },
                    projectId: "1",
                    taskId: "1"
                },
                {
                    id: "2",
                    timeInterval: {
                        start: new Date(date.setMinutes(15)),
                        end: new Date(date.setMinutes(20)),
                        duration: "PT5M"
                    },
                    projectId: "1",
                    taskId: "2"
                }
            ]
        }
    }

    static getSurveys() {
        return {
            surveys: [
                {
                    id: "1",
                    taskId: "1",
                    projectId: "1",
                    score: 1,
                    description: "testDescription"
                },
                {
                    id: "2",
                    taskId: "2",
                    projectId: "1",
                    score: 2,
                    description: "testDescription"
                }
            ]
        }
    }
}