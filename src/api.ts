import axios, { AxiosError } from 'axios';
import { IUser } from './types';

export default class Api {
    // store token for interacting with clockify api here
    static userToken: string | null;
    static BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

    /**
     * Request utility for api
     * Default method is GET
     * 
     */
    static async request(endpoint: string, method: string = "get", data: any = {}) {
        console.debug("Frontend API call:", endpoint, data, method);

        const url = `${this.BASE_URL}/${endpoint}`;
        const headers = { 
            Authorization: `Bearer ${Api.userToken}`
        };
        const params = (method === "get") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch(err){
            if(err instanceof AxiosError && err.response){
                console.error("API Error:", err.response);
                let message = err.response.data.error.message;
                throw Array.isArray(message) ? message : [message];
            }
        }
    }

    //Individual API routes 

    /**************************USERS */

    /**
     * User Login
     * 
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * 
     * @return {string} userToken - The token of the user.
     */
    static async login(username: string, password: string) {
        const token = await this.request("auth/token", "post", {username: username, password: password});
        return token;
    }

    /** 
     * For new users to register
     * 
     * @param {object} user - The user object.
     * @returns { string } token - The token of the user.
     */
    static async register(user: IUser) {
        const res = await this.request("auth/register", "post", user);
        // console.log("In api register", res);
        return res.token;
    }

    /**
     * Get user info
     * 
     * @param {number} userId - The id of the user.
     * @returns {object} user - The user object containing id, username, firstName, lastName, email
     */
    static async getUser(userId: number) {
        const endpoint = `users/${userId}`;
        let results = await this.request(endpoint);
        return results;
    }
    
    /***************************PROJECTS */

    /**
     * Retrieves a list of projects from the backend API
     *
     * @return {object[]} An array of project objects.
     */
    static async getProjects() {
        const endpoint = "projects/";
        
        let results = await this.request(endpoint);
        
        return results;
    }

    /**
     * create user project
     * POST /users/{userId}/projects
     * 
     * @param {number} userId - The id of the user.
     * @param {object} data - The data of the project, contains {name, note}
     * 
     * @returns {object} - clockifyProject: {ClockifyProject}
     */
    static async createUserProject(userId: number, data: object){
        const endpoint = "users/" + userId + "/projects";
        let results = await this.request(endpoint, "post", data);
        return results.clockifyProject;
    }
    
    /** 
     * Get all projects associated with a userId
     * GET /users/{userId}/projects
     * 
     */
    static async getUserProjects(userId: number){
        const endpoint = `users/${userId}/projects`;
        let results = await this.request(endpoint);
        return results.projects;
    }

    /**
     * Get project by id
     * GET /projects/{projectId}
     * 
     */
    static async getProject(projectId: string){
        const endpoint = `projects/${projectId}`;
        let results = await this.request(endpoint);
        return results.clockifyProject;
    }

    /**
     * Create a new task in Clockify with specific project from API
     * 
     */
    static async createTask(projectId: string, data: object){
        
        const endpoint = `projects/${projectId}/tasks`;
        let results = await this.request(endpoint, "post", data);
        return results;
    }

    /**
     * Retrieves the tasks associated with a specific project from the Clockify API.
     *
     * @param {string} projectId - The ID of the project for which to retrieve tasks.
     * @return {object[]} An array of task objects associated with the project.
     */
    static async findProjectTasks(projectId: string){
        const endpoint = `projects/${projectId}/tasks`;
        let results = await this.request(endpoint);
        return results.clockifyTasks;
    }

    /** 
     * Retrieve task by id
     * 
     * @param {string} projectId - The ID of the project for which to retrieve tasks.
     * @param {string} taskId - The ID of the task to retrieve.
     * @returns {object} - The task object.
     */
    static async findTaskById(projectId: string, taskId: string){
        const endpoint = `projects/${projectId}/tasks/${taskId}`;
        let results = await this.request(endpoint);
        return results;
    }

    /** 
     * Delete tasks by id and projectId
     * 
     */
    static async deleteTask(projectId: string, taskId: string){
        const endpoint = `projects/${projectId}/tasks/${taskId}`;
        let results = await this.request(endpoint, "delete");
        return results.message;
    }
    
    /**************************TIMERS */

    /**
     * Create a new time entry in Clockify and creates a new time entry in local db
     * POST /timers
     * 
     * @param {string} userId - The ID of the user for which to create the time entry, used in local db only
     * @param {object} data - contains (start, end, taskId, projectId)
     */
    static async createTimeEntry(userId: number, data: object){
        const endpoint = `timers/`;
        let result = await this.request(endpoint, "post", { userId, data });
        return result;
    }

    /**
     * Get all time entries
     * GET /timers
     * 
     * @returns {object[]} - An array of time entry objects
     */
    static async getTimeEntries(){
        const endpoint = `timers/`;
        let results = await this.request(endpoint);
        return results;
    }

    /**
     * Get a user's time entries
     * GET /users/{userId}/timers
     */
    static async getUserTimeEntries(userId: number){
        const endpoint = `users/${userId}/timers`;
        let results = await this.request(endpoint);
        return results;
    }

    /****************************SURVEYS */

    /**
     * Create a new survey in Clockify
     * POST /surveys
     * 
     * @param {object} data - contains (start, end, taskId, projectId)
     */
    static async createSurvey(data: object){
        const endpoint = `surveys/`;
        let result = await this.request(endpoint, "post", data);
        return result;
    }

    /**
     * Get all surveys
     * GET /surveys
     * 
     */
    static async getSurveys(){
        const endpoint = `surveys/`;
        let results = await this.request(endpoint);
        return results;
    }
    
    /****************************REPORTS */

    /** 
     * Create detailed report of time entries for user
     * POST /users/{userId}/reports
     * 
     * @param {number} userId - The ID of the user for which to create the report.
     * @param {object} data - optional, contains period (in days), period defaults to 7 days if omitted
     * 
     * @returns {array} usersTimers - An array of time entry objects
     */
    static async createUserReport(userId: number, data?: object){
        const endpoint = `users/${userId}/report`;
        let result = await this.request(endpoint, "post", data);
        return result;
    }
}