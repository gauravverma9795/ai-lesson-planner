"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { generateLessonPlan, LessonPlanDetails } from '@/services/geminiService'
import { generatePDF } from '@/lib/utils'
import { useLessonPlan } from '@/context/LessonPlanContext'

export function LessonPlanForm() {
  const { register, handleSubmit } = useForm<LessonPlanDetails>()
  const [isLoading, setIsLoading] = useState(false)
  const { 
    setLessonPlan, 
    setLessonPlanDetails, 
    lessonPlan, 
    saveLessonPlan 
  } = useLessonPlan()

  const onSubmit = async (data: LessonPlanDetails) => {
    setIsLoading(true)
    try {
      setLessonPlanDetails(data)
      const generatedPlan = await generateLessonPlan(data)
      setLessonPlan(generatedPlan)
    } catch (error) {
      console.error('Error generating lesson plan:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = () => {
    if (lessonPlan) {
      generatePDF(lessonPlan)
      saveLessonPlan()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Lesson Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            {...register('topic')} 
            placeholder="Lesson Topic" 
            required 
          />
          <Input 
            {...register('gradeLevel')} 
            placeholder="Grade Level" 
            required 
          />
          <Textarea 
            {...register('mainConcept')} 
            placeholder="Main Concept & Subtopics" 
            required 
          />
          <Textarea 
            {...register('materialsNeeded')} 
            placeholder="Materials Needed" 
            required 
          />
          <Textarea 
            {...register('learningObjectives')} 
            placeholder="Learning Objectives" 
            required 
          />
          <Textarea 
            {...register('lessonOutline')} 
            placeholder="Initial Lesson Outline" 
            required 
          />

          <div className="flex space-x-4">
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full"
            >
              {isLoading ? 'Generating...' : 'Generate Lesson Plan'}
            </Button>
            
            {lessonPlan && (
              <Button 
                type="button" 
                variant="secondary" 
                className="w-full"
                onClick={handleDownloadPDF}
              >
                Download PDF
              </Button>
            )}
          </div>
        </form>

        {isLoading && (
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}

        {lessonPlan && !isLoading && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h2 className="text-xl font-bold mb-2">Generated Lesson Plan</h2>
            <pre className="whitespace-pre-wrap text-sm">{lessonPlan}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}