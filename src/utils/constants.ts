export const messages = {
    validation: {
        not_empty: 'This field can\'t be empty',
        min_string: 'The value must be at least 3 characters',
        too_long: 'The value is too long',
        invalid_value: 'Invalid value',
    }
}

export const projectStatuses = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    completed: 'Completed',
    on_hold: 'On Hold',
    cancelled: 'Cancelled'
};

export const projectPriorities = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
}

export type ProjectStatus = typeof projectStatuses[keyof typeof projectStatuses];
export type projectPriorities = typeof projectPriorities[keyof typeof projectPriorities];