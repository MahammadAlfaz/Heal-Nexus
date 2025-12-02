# TODO: Fix Report Upload and View Issues

## Information Gathered
- ReportUpload.tsx: Handles file upload, OCR processing, and Gemini API integration ✓
- MedicalReport.java: Has extractedData field to store OCR + Gemini results ✓
- MedicalReportService.java: Performs OCR and sends to Gemini, stores result in extractedData ✓
- ReportViewer.tsx: Currently only displays uploaded file in iframe, doesn't show extractedData ✗

## Plan
- [ ] Update ReportViewer.tsx to parse and display extractedData JSON
- [ ] Add structured display for OCR text and Gemini analysis results
- [ ] Show summary, test results, and status indicators

## Dependent Files to be edited
- src/components/ReportViewer.tsx

## Followup steps
- [ ] Test complete upload-to-view flow
- [ ] Verify extracted data displays correctly
- [ ] Check error handling for missing/invalid extractedData
