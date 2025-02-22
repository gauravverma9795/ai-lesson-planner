"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { generateLessonPlan } from '@/services/geminiService'
import { useLessonPlan } from '@/hooks/useLessonPlan'

export function LessonPlanGenerator() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { setLessonPlan } = useLessonPlan()

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    try {
      const generatedPlan = await generateLessonPlan({
        topic: 'Custom Lesson',
        gradeLevel: 'Flexible',
        mainConcept: prompt,
        materialsNeeded: 'Varies',
        learningObjectives: 'Custom learning objectives',
        lessonOutline: 'Custom lesson outline'
      })
      
      setLessonPlan(generatedPlan)
    } catch (error) {
      console.error('Error generating lesson plan:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Textarea 
        placeholder="Enter a custom prompt for lesson plan generation"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[150px]"
      />
      <Button 
        onClick={handleGenerate} 
        disabled={isLoading || !prompt.trim()}
      >
        {isLoading ? 'Generating...' : 'Generate Custom Lesson Plan'}
      </Button>
    </div>
  )
}