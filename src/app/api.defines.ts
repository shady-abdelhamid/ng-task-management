
const base = 'localhost:3000';
export const TASKS = {
        GET_TASKS: `${base}/tasks`,
        GET_TASK: `${base}/tasks/{id}`,
        POST_TASK: `${base}/tasks`,
        PATCH_TASK_STATUS: `${base}/tasks/{id}/status`,
        DELETE_TASK: `${base}/tasks/{id}`,
};
