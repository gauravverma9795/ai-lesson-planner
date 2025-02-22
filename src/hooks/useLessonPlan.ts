import { useState, useEffect } from 'react'
import { LessonPlanDetails } from '@/services/geminiService'

export function useLessonPlan() {
  const [lessonPlan, setLessonPlan] = useState<string | null>(null)
  const [lessonPlanDetails, setLessonPlanDetails] = useState<LessonPlanDetails>({
    topic: '',
    gradeLevel: '',
    mainConcept: '',
    materialsNeeded: '',
    learningObjectives: '',
    lessonOutline: ''
  })

  useEffect(() => {
    // Load saved lesson plan from localStorage on component mount
    const savedDetails = localStorage.getItem('lessonPlanDetails')
    const savedPlan = localStorage.getItem('generatedLessonPlan')

    if (savedDetails) {
      setLessonPlanDetails(JSON.parse(savedDetails))
    }

    if (savedPlan) {
      setLessonPlan(savedPlan)
    }
  }, [])

  const saveLessonPlan = () => {
    if (lessonPlan) {
      localStorage.setItem('lessonPlanDetails', JSON.stringify(lessonPlanDetails))
      localStorage.setItem('generatedLessonPlan', lessonPlan)
    }
  }

  const clearLessonPlan = () => {
    setLessonPlan(null)
    setLessonPlanDetails({
      topic: '',
      gradeLevel: '',
      mainConcept: '',
      materialsNeeded: '',
      learningObjectives: '',
      lessonOutline: ''
    })
    localStorage.removeItem('lessonPlanDetails')
    localStorage.removeItem('generatedLessonPlan')
  }

  return {
    lessonPlan,
    setLessonPlan,
    lessonPlanDetails,
    setLessonPlanDetails,
    saveLessonPlan,
    clearLessonPlan
  }
}