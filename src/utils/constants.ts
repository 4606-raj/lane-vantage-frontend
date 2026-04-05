export const messages = {
    validation: {
        not_empty: 'This field can\'t be empty',
        min_string: 'The value must be at least 3 characters',
        too_long: 'The value is too long',
        invalid_value: 'Invalid value',
    }
}

export const projectStatuses = {
    NOT_STARTED: 'Not Started',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    ON_HOLD: 'On Hold',
    CANCELLED: 'Cancelled'
};

export type ProjectStatus = typeof projectStatuses[keyof typeof projectStatuses];
