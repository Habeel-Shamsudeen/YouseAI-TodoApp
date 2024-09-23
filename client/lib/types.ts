export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    description?: string;
    status: Status;
    priority: Priority;
    dueDate?: Date;
    userId?: string;
    user?: User;
  }
  
  export interface DecodedToken {
    id: string;
  }
  
  export enum Status {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
  }
  
  export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
  }
  