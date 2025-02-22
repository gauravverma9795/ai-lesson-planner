"use client"

import React, { createContext, useState, useContext, useEffect } from 'react'
import { LessonPlanDetails } from '@/services/geminiService'

interface LessonPlanContextType {
  lessonPlan: string | null
  lessonPlanDetails: LessonPlanDetails
  setLessonPlan: (plan: string) => void
  setLessonPlanDetails: (details: LessonPlanDetails) => void
  saveLessonPlan: () => void
  getSavedLessonPlans: () => Array<{details: LessonPlanDetails, plan: string}>
}

const LessonPlanContext = createContext<LessonPlanContextType | undefined>(undefined)

export const LessonPlanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lessonPlan, setLessonPlan] = useState<string | null>(null)
  const [lessonPlanDetails, setLessonPlanDetails] = useState<LessonPlanDetails>({
    topic: '',
    gradeLevel: '',
    mainConcept: '',
    materialsNeeded: '',
    learningObjectives: '',
    lessonOutline: ''
  })

  const saveLessonPlan = () => {
    if (lessonPlan && lessonPlanDetails.topic) {
      const savedPlans = JSON.parse(localStorage.getItem('savedLessonPlans') || '[]')
      const newSavedPlan = { details: lessonPlanDetails, plan: lessonPlan }
      savedPlans.push(newSavedPlan)
      localStorage.setItem('savedLessonPlans', JSON.stringify(savedPlans))
    }
  }

  const getSavedLessonPlans = () => {
    return JSON.parse(localStorage.getItem('savedLessonPlans') || '[]')
  }

  return (
    <LessonPlanContext.Provider 
      value={{ 
        lessonPlan, 
        setLessonPlan, 
        lessonPlanDetails, 
        setLessonPlanDetails,
        saveLessonPlan,
        getSavedLessonPlans
      }}
    >
      {children}
    </LessonPlanContext.Provider>
  )
}

export const useLessonPlan = () => {
  const context = useContext(LessonPlanContext)
  if (context === undefined) {
    throw new Error('useLessonPlan must be used within a LessonPlanProvider')
  }
  return context
}