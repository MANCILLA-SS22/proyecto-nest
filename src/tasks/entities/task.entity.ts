enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

class Task {
    id: string
    title: string
    description: string
    status: TaskStatus
}

export {Task, TaskStatus};