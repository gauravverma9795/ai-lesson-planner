import jsPDF from 'jspdf'

export const generatePDF = (content: string, filename: string = 'lesson_plan.pdf') => {
  const doc = new jsPDF()
  
  // Set font and size
  doc.setFontSize(12)
  
  // Split text into lines
  const splitText = doc.splitTextToSize(content, 180)
  
  // Add text to PDF
  doc.text(splitText, 10, 10)
  
  // Save the PDF
  doc.save(filename)
}