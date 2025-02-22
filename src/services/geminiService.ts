import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

export interface LessonPlanDetails {
  topic: string
  gradeLevel: string
  mainConcept: string
  materialsNeeded: string
  learningObjectives: string
  lessonOutline: string
}

export async function generateLessonPlan(details: LessonPlanDetails) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })
  
  const prompt = `Create a comprehensive lesson plan with the following details:

Topic: ${details.topic}
Grade Level: ${details.gradeLevel}
Main Concept: ${details.mainConcept}
Materials Needed: ${details.materialsNeeded}
Learning Objectives: ${details.learningObjectives}

Generate a structured lesson plan including:
1. Detailed lesson introduction
2. Step-by-step lesson outline
3. Engaging classroom activities
4. Assessment strategies
5. Potential modifications for different learning styles

Format the response in a clear, organized manner with distinct sections.`

  try {
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error("Lesson Plan Generation Error:", error)
    throw error
  }
}