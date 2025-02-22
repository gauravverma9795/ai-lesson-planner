export interface LessonPlan {
    id: string
    topic: string
    gradeLevel: string
    subject: string
    createdAt: Date
    updatedAt: Date
    content: string
    learningObjectives: string[]
    materials: string[]
  }
  
  export interface User {
    id: string
    email: string
    name?: string
    lessonPlans?: LessonPlan[]
  }
  
  export type LessonPlanStatus = 'draft' | 'generated' | 'published'