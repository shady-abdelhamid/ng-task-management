import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

export const AUTH = {
        SIGNUP: `${baseUrl}/auth/signup`,
        SIGNIN: `${baseUrl}/auth/signin`,
};

export const TASKS = {
        GET_TASKS: `${baseUrl}/tasks`,
        GET_TASK: `${baseUrl}/tasks/{id}`,
        POST_TASK: `${baseUrl}/tasks`,
        PATCH_TASK_STATUS: `${baseUrl}/tasks/{id}/status`,
        DELETE_TASK: `${baseUrl}/tasks/{id}`,
};
