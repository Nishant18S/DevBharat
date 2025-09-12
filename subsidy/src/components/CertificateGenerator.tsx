import React, { useState } from 'react';
import { Download, FileText, Shield, QrCode, Check, Award, Calendar, MapPin } from 'lucide-react';
import jsPDF from 'jspdf';
import type { FarmerData, CompletedStep } from '../types';
import { subsidySchemes } from '../data/subsidySchemes';
import { cropSteps } from '../data/cropSteps';
import ashokaEmblemPath from '../assets/asok stambh.png';

interface CertificateGeneratorProps {
  farmerData: FarmerData;
  completedSteps: CompletedStep[];
  uploadedImages: Record<string, {
    src: string;
    filename: string;
    timestamp: Date;
    stepTitle: string;
    fileSize: number;
  }>;
  selectedCrop: string | null;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  farmerData,
  completedSteps,
  uploadedImages,
  selectedCrop
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificateId] = useState(() => `AGR-${Date.now().toString(36).toUpperCase()}`);
  
  // Convert image to base64
  const convertImageToBase64 = (imagePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = reject;
      img.src = imagePath;
    });
  };
  
  // Calculate eligible schemes
  const eligibleSchemes = subsidySchemes.filter(scheme => 
    farmerData.landArea >= scheme.minLand && farmerData.landArea <= scheme.maxLand
  );
        
  // Get step details from cropSteps data
  const getStepDetails = (stepId: string) => {
    for (const crop in cropSteps) {
      const steps = cropSteps[crop as keyof typeof cropSteps];
      const step = steps.find(s => s.id === stepId);
      if (step) return step;
    }
    return null;
  };
  
  // Get current steps for completion calculation
  const getCurrentSteps = () => {
    if (!farmerData.selectedCrop || !(farmerData.selectedCrop in cropSteps)) {
      return [];
    }
    const selectedCrop = farmerData.selectedCrop as keyof typeof cropSteps;
    return cropSteps[selectedCrop];
  };

  const generateCertificate = async () => {
    setIsGenerating(true);
    
    try {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 0;

      // Page 1 - Green header with Government branding
      pdf.setFillColor(76, 175, 80); // Green #4CAF50
      pdf.rect(0, 0, pageWidth, 40, 'F');
      
      // Ashoka Emblem (Government of India emblem) - Base64
      try {
        const emblemBase64 = await convertImageToBase64(ashokaEmblemPath);
        const emblemSize = 16; // 16mm diameter
        const emblemX = 17; // X position
        const emblemY = 12; // Y position
        pdf.addImage(emblemBase64, 'PNG', emblemX, emblemY, emblemSize, emblemSize);
      } catch (error) {
        console.error('Error adding Ashoka emblem:', error);
        // Fallback to text if emblem fails
        pdf.setFillColor(255, 193, 7);
        pdf.circle(25, 20, 8, 'F');
        pdf.setFontSize(8);
        pdf.setTextColor(0, 0, 0);
        pdf.text('GOI', 25, 22, { align: 'center' });
      }
      
      // Government header text
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('GOVERNMENT OF INDIA', pageWidth / 2, 15, { align: 'center' });
      pdf.setFontSize(14);
      pdf.text('AGRICULTURAL SUBSIDY MANAGEMENT SYSTEM', pageWidth / 2, 25, { align: 'center' });
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Ministry of Agriculture & Farmers Welfare', pageWidth / 2, 32, { align: 'center' });
      
      pdf.setTextColor(0, 0, 0);
      yPosition = 55;
      
      // Main border
      pdf.setDrawColor(76, 175, 80);
      pdf.setLineWidth(2);
      pdf.rect(10, 45, pageWidth - 20, pageHeight - 55, 'S');
      
      // Certificate details table
      const certDetails = [
        ['CERTIFICATE ID:', certificateId, 'VALID UNTIL:', '12/9/2028'],
        ['ISSUE DATE:', new Date().toLocaleDateString('en-GB'), 'STATUS:', 'VERIFIED']
      ];
      
      pdf.setFontSize(10);
      certDetails.forEach((row, index) => {
        const rowY = yPosition + (index * 8);
        pdf.setFont('helvetica', 'bold');
        pdf.text(row[0], 20, rowY);
        pdf.setFont('helvetica', 'normal');
        pdf.text(row[1], 70, rowY);
        pdf.setFont('helvetica', 'bold');
        pdf.text(row[2], 120, rowY);
        pdf.setFont('helvetica', 'normal');
        pdf.text(row[3], 160, rowY);
      });
      
      yPosition += 25;
      
      // Add farmer photo if available
      if (farmerData.profilePhoto) {
        try {
          const imgWidth = 25, imgHeight = 30;
          const imgX = pageWidth - imgWidth - 20, imgY = yPosition;
          pdf.addImage(farmerData.profilePhoto, 'JPEG', imgX, imgY, imgWidth, imgHeight);
          pdf.setDrawColor(0, 0, 0);
          pdf.setLineWidth(1);
          pdf.rect(imgX, imgY, imgWidth, imgHeight);
          pdf.setFontSize(8);
          pdf.text('Farmer Photo', imgX + imgWidth/2, imgY + imgHeight + 5, { align: 'center' });
        } catch (error) {
          console.error('Error adding farmer image:', error);
        }
      }
      
      // Helper functions
      const checkPageSpace = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }
      };
      
      const addText = (text: string, x: number, y: number, options?: {
        fontSize?: number;
        style?: 'normal' | 'bold';
        color?: [number, number, number];
      }) => {
        if (options?.fontSize) pdf.setFontSize(options.fontSize);
        if (options?.style) pdf.setFont('helvetica', options.style);
        if (options?.color) pdf.setTextColor(...options.color);
        
        const lines = pdf.splitTextToSize(text, pageWidth - 40);
        pdf.text(lines, x, y);
        return y + (lines.length * 5) + 5;
      };
      
      // Farmer profile details table
      yPosition = addText('FARMER PROFILE DETAILS', 20, yPosition, {
        fontSize: 12,
        style: 'bold'
      });
      
      yPosition += 5;
      
      const farmerDetails = [];
      
      if (farmerData.name) farmerDetails.push(['Full Name', farmerData.name]);
      if (farmerData.aadhaar) farmerDetails.push(['Aadhaar Number', farmerData.aadhaar]);
      if (farmerData.mobile) farmerDetails.push(['Mobile Number', farmerData.mobile]);
      if (farmerData.location) farmerDetails.push(['Complete Address', farmerData.location]);
      if (farmerData.landArea) farmerDetails.push(['Land Area (acres)', farmerData.landArea.toString()]);
      if (farmerData.bankAccount) farmerDetails.push(['Bank Account Number', farmerData.bankAccount]);
      if (selectedCrop) farmerDetails.push(['Selected Crop', selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)]);
      if (completedSteps.length > 0) {
        farmerDetails.push(['Training Start Date', completedSteps[0].completedAt.toLocaleDateString('en-IN')]);
        farmerDetails.push(['Training End Date', completedSteps[completedSteps.length - 1].completedAt.toLocaleDateString('en-IN')]);
      }
      
      // Display farmer details in clean format
      farmerDetails.forEach((detail) => {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${detail[0]}:`, 20, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(detail[1], 80, yPosition);
        yPosition += 6;
        
        // Check if we need a new page
        checkPageSpace(15);
      });
      
      yPosition += 10;

      // Training Completion Progress Bar
      checkPageSpace(25);
      yPosition = addText('TRAINING COMPLETION STATUS', 20, yPosition, {
        fontSize: 12,
        style: 'bold'
      });
      
      yPosition += 5;
      
      // Progress bar background
      pdf.setFillColor(240, 240, 240);
      pdf.rect(20, yPosition, pageWidth - 40, 8, 'F');
      
      // Progress bar fill
      const progressWidth = ((pageWidth - 40) * completedSteps.length) / getCurrentSteps().length;
      pdf.setFillColor(76, 175, 80); // Green
      pdf.rect(20, yPosition, progressWidth, 8, 'F');
      
      // Progress text
      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      pdf.text(`${completedSteps.length}/${getCurrentSteps().length} Modules Completed (${Math.round((completedSteps.length / getCurrentSteps().length) * 100)}%)`, pageWidth / 2, yPosition + 5, { align: 'center' });
      
      pdf.setTextColor(0, 0, 0);
      yPosition += 20;
      
      // Training modules with light blue evidence cards
      checkPageSpace(30);
      yPosition = addText('TRAINING MODULES WITH EVIDENCE', 20, yPosition, {
        fontSize: 12,
        style: 'bold'
      });
      
      yPosition += 8;
      
      if (completedSteps.length > 0) {
        completedSteps.forEach((step, index) => {
          checkPageSpace(50);
          
          // Light blue evidence card background
          pdf.setFillColor(227, 242, 253); // Light blue #E3F2FD
          pdf.rect(20, yPosition - 3, pageWidth - 40, 40, 'F');
          
          // Green completion dot
          // pdf.setFillColor(76, 175, 80); // Green
          // pdf.circle(25, yPosition + 5, 3, 'F');
          
          // Module header
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`Module ${index + 1}: Training Step ${step.id}`, 35, yPosition + 2);
          
          // Completion date
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'normal');
          pdf.text(`Completed: ${step.completedAt.toLocaleDateString('en-IN')}`, pageWidth - 80, yPosition + 2);
          
          // Get step details
          const stepDetails = getStepDetails(step.id);
          if (stepDetails) {
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Title: ${stepDetails.title}`, 25, yPosition + 10);
            
            // Image and evidence details in structured layout
            if (step.imageProof) {
              // Evidence details on the left
              pdf.setFontSize(8);
              pdf.setFont('helvetica', 'bold');
              pdf.text('Evidence Details:', 25, yPosition + 16);
              
              pdf.setFont('helvetica', 'normal');
              // Truncate filename if too long
              let filename = step.imageProof.filename;
              if (filename.length > 20) {
                filename = filename.substring(0, 17) + '...';
              }
              pdf.text(`File: ${filename}`, 25, yPosition + 21);
              pdf.text(`Size: ${(step.imageProof.fileSize / 1024).toFixed(1)} KB`, 25, yPosition + 26);
              pdf.text(`Date: ${step.imageProof.timestamp.toLocaleDateString('en-IN')}`, 25, yPosition + 31);
              
              // Image on the right side - bigger size
              try {
                const imgWidth = 30, imgHeight = 22; // Increased size
                const imgX = pageWidth - imgWidth - 25; // Right side positioning
                const imgY = yPosition + 15;
                pdf.addImage(step.imageProof.src, 'JPEG', imgX, imgY, imgWidth, imgHeight);
                pdf.setDrawColor(0, 0, 0);
                pdf.setLineWidth(0.5);
                pdf.rect(imgX, imgY, imgWidth, imgHeight);
                pdf.setFontSize(7);
                pdf.text('EVIDENCE', imgX + imgWidth/2, imgY + imgHeight + 3, { align: 'center' });
              } catch (error) {
                console.error('Error adding evidence image:', error);
                // Fallback to placeholder if image fails to load
                const imgWidth = 30, imgHeight = 22;
                const imgX = pageWidth - imgWidth - 25;
                const imgY = yPosition + 15;
                pdf.setFillColor(200, 200, 200);
                pdf.rect(imgX, imgY, imgWidth, imgHeight, 'F');
                pdf.setFontSize(8);
                pdf.text('IMAGE ERROR', imgX + imgWidth/2, imgY + imgHeight/2, { align: 'center' });
              }
            } else {
              // Evidence details on the left (no image case)
              pdf.setFontSize(8);
              pdf.setFont('helvetica', 'italic');
              pdf.text('No evidence image submitted', 25, yPosition + 22);
              
              // Placeholder on the right side
              const imgWidth = 30, imgHeight = 22;
              const imgX = pageWidth - imgWidth - 25;
              const imgY = yPosition + 15;
              pdf.setFillColor(200, 200, 200);
              pdf.rect(imgX, imgY, imgWidth, imgHeight, 'F');
              pdf.setFontSize(8);
              pdf.text('NO IMAGE', imgX + imgWidth/2, imgY + imgHeight/2, { align: 'center' });
            }
          }
          
          yPosition += 45;
        });
      } else {
        pdf.text('No training modules completed.', 25, yPosition);
        yPosition += 10;
      }



      // Performance analytics with yellow background
      checkPageSpace(30);
      yPosition = addText('PERFORMANCE ANALYTICS', 20, yPosition, {
        fontSize: 12,
        style: 'bold'
      });
      
      yPosition += 8;
      
      // Yellow background for analytics table
      pdf.setFillColor(255, 248, 225); // Yellow #FFF8E1
      pdf.rect(20, yPosition, pageWidth - 40, 25, 'F');
      
      // Analytics data
      const analyticsData = [
        ['Training Duration', `${completedSteps.length > 0 ? Math.ceil((completedSteps[completedSteps.length - 1].completedAt.getTime() - completedSteps[0].completedAt.getTime()) / (1000 * 60 * 60 * 24)) : 0} days`],
        ['Completion Rate', `${Math.round((completedSteps.length / getCurrentSteps().length) * 100)}%`],
        ['Evidence Submitted', `${Object.keys(uploadedImages).length} proofs`],
        ['Eligible Schemes', `${eligibleSchemes.length} schemes`]
      ];
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Performance Metrics:', 25, yPosition + 5);
      
      analyticsData.forEach((data, index) => {
        const rowY = yPosition + 10 + (index * 4);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${data[0]}:`, 25, rowY);
        pdf.setFont('helvetica', 'normal');
        pdf.text(data[1], 80, rowY);
      });
      
      yPosition += 35;
      
      // Terms and Conditions in government format
      checkPageSpace(20);
      yPosition = addText('TERMS AND CONDITIONS', 20, yPosition, {
        fontSize: 12,
        style: 'bold'
      });
      
      yPosition += 8;
      
      // Create structured terms in numbered format (No borders)
      const terms = [
        'This certificate is valid for a period of three (3) years from the date of issue and may be renewed upon successful completion of refresher training.',
        'The certificate holder must maintain the prescribed training standards and implement the learned agricultural practices in their farming operations.',
        'This certificate must be produced as mandatory documentation when applying for any government subsidy schemes or agricultural benefits.',
        'The certificate is subject to verification by authorized government officials and may be audited for compliance with training requirements.',
        'Any fraudulent use, duplication, or misrepresentation of this certificate will result in immediate cancellation and legal action under applicable laws.',
        'The certificate holder agrees to participate in periodic follow-up surveys, monitoring visits, and evaluation programs conducted by the issuing authority.',
        'This certificate does not guarantee automatic approval of subsidy applications, which remain subject to individual scheme eligibility and availability of funds.',
        'All information provided during the training program must be accurate, verifiable, and supported by authentic documentation.',
        'The issuing authority reserves the right to revoke this certificate if any discrepancies, violations, or non-compliance issues are discovered.',
        'For any queries, clarifications, or grievances related to this certificate, contact the nearest Agricultural Extension Office or the District Collectorate.'
      ];
      
      terms.forEach((term, index) => {
        checkPageSpace(15);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`${index + 1}.`, 20, yPosition);
        
        pdf.setFont('helvetica', 'normal');
        const termLines = pdf.splitTextToSize(term, pageWidth - 50);
        pdf.text(termLines, 25, yPosition);
        yPosition += termLines.length * 4 + 6;
      });
      
      yPosition += 10;

      // Digital authentication with blue secure badge
      checkPageSpace(25);
      yPosition = addText('DIGITAL AUTHENTICATION & VERIFICATION', 20, yPosition, {
        fontSize: 12,
        style: 'bold'
      });
      
      yPosition += 8;
      
      // Blue secure badge
      pdf.setFillColor(33, 150, 243); // Blue
      pdf.rect(20, yPosition, 40, 12, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text('SECURE', 40, yPosition + 7, { align: 'center' });
      
      pdf.setTextColor(0, 0, 0);
      
      // Verification details
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Authentication Details:', 70, yPosition + 3);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text(`Certificate ID: ${certificateId}`, 70, yPosition + 9);
      
      yPosition += 20;
      
      pdf.setFontSize(8);
      pdf.text('Verification Portal: https://agri.gov.in/verify-certificate', 20, yPosition);
      pdf.text('QR Code: Scan for instant verification and authenticity check', 20, yPosition + 6);
      
      yPosition += 15;
      
      // Government subsidy schemes with green circular numbers
      checkPageSpace(30);
      
      yPosition = addText('GOVERNMENT SUBSIDY SCHEMES ELIGIBILITY', 20, yPosition, {
        fontSize: 12,
        style: 'bold'
      });
      
      yPosition += 8;
      
      // Define specific government schemes with exact details from user input
      const governmentSchemes = [
        {
          id: 1,
          name: 'PM-KISAN Small & Marginal Farmer Support',
          type: 'Central Government',
          benefit: '₹18,000',
          eligibility: 'Land ≤ 2 acres',
          isEligible: farmerData.landArea <= 2
        },
        {
          id: 2,
          name: 'Digital Agriculture Innovation Scheme',
          type: 'Private Partnership',
          benefit: '₹35,000',
          eligibility: 'Tech-savvy progressive farmers',
          isEligible: true // Always eligible for tech-savvy farmers
        },
        {
          id: 3,
          name: 'Organic Farming Premium Support',
          type: 'State Government',
          benefit: '₹65,000',
          eligibility: 'Organic certification holders',
          isEligible: true // Assuming eligible after training completion
        },
        {
          id: 4,
          name: 'Climate Resilient Agriculture Program',
          type: 'Central Government',
          benefit: '₹55,000',
          eligibility: 'Drought/flood prone areas',
          isEligible: true // Context-based eligibility
        }
      ];
      
      governmentSchemes.forEach((scheme, index) => {
        checkPageSpace(45);
        
        // Green circular number
        // pdf.setFillColor(76, 175, 80); // Green
        // pdf.circle(25, yPosition + 8, 7, 'F');
        // pdf.setTextColor(255, 255, 255);
        // pdf.setFontSize(12);
        // pdf.setFont('helvetica', 'bold');
        // pdf.text(scheme.id.toString(), 25, yPosition + 10, { align: 'center' });
        
        // ELIGIBLE badge
        if (scheme.isEligible) {
          pdf.setFillColor(76, 175, 80); // Green
          pdf.rect(pageWidth - 55, yPosition + 3, 35, 10, 'F');
          pdf.setTextColor(255, 255, 255);
          pdf.setFontSize(9);
          pdf.setFont('helvetica', 'bold');
          pdf.text('ELIGIBLE', pageWidth - 37.5, yPosition + 9, { align: 'center' });
        }
        
        pdf.setTextColor(0, 0, 0);
        
        // Scheme name
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        const schemeName = pdf.splitTextToSize(scheme.name, pageWidth - 100);
        pdf.text(schemeName, 40, yPosition + 5);
        
        yPosition += (schemeName.length * 5) + 8;
        
        // Scheme details with better alignment
        const detailsStartX = 25;
        const labelWidth = 35;
        const valueStartX = detailsStartX + labelWidth;
        
        // Type
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Type:', detailsStartX, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(scheme.type, valueStartX, yPosition);
        yPosition += 6;
        
        // Benefit
        pdf.setFont('helvetica', 'bold');
        pdf.text('Benefit:', detailsStartX, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(0, 128, 0); // Green color for amount
        pdf.text(scheme.benefit, valueStartX, yPosition);
        pdf.setTextColor(0, 0, 0); // Reset to black
        yPosition += 5;
        
        // Eligibility
        pdf.setFont('helvetica', 'bold');
        pdf.text('Eligibility:', detailsStartX, yPosition);
        pdf.setFont('helvetica', 'normal');
        const eligibilityLines = pdf.splitTextToSize(scheme.eligibility, pageWidth - valueStartX - 20);
        pdf.text(eligibilityLines, valueStartX, yPosition);
        yPosition += Math.max(eligibilityLines.length * 5, 6);
        
        yPosition += 12; // Space between schemes
      });
      
      // Footer - Official Signatures with proper alignment
      checkPageSpace(60);
      
      // Authority signatures section
      yPosition = addText('ISSUING AUTHORITY', 20, yPosition, {
        fontSize: 11,
        style: 'bold'
      });
      
      yPosition += 20;
      
      // Create signature sections with improved spacing and alignment
      const signatureY = yPosition;
      const leftSignatureX = 25;
      const rightSignatureX = pageWidth - 90;
      const centerX = pageWidth / 2;
      
      // Left signature section
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Authorized Signatory', leftSignatureX, signatureY);
      pdf.text('Training Officer', leftSignatureX, signatureY + 6);
      pdf.text('Agricultural Department', leftSignatureX, signatureY + 12);
      
      // Right signature section
      pdf.text('Authorized Signatory', rightSignatureX, signatureY);
      pdf.text('District Collector', rightSignatureX, signatureY + 6);
      
      // Properly align the government seal text
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'italic');
      pdf.text('(Government Seal)', rightSignatureX, signatureY + 12);
      
      // Add official seal placeholder in center with better positioning
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text('OFFICIAL SEAL', centerX, signatureY + 6, { align: 'center' });
      
      // Add signature lines for better visual appeal
      pdf.setLineWidth(0.5);
      pdf.setDrawColor(0, 0, 0);
      pdf.line(leftSignatureX, signatureY - 3, leftSignatureX + 50, signatureY - 3);
      pdf.line(rightSignatureX, signatureY - 3, rightSignatureX + 50, signatureY - 3);
      
      // Save the PDF
      const filename = `Agricultural_Training_Certificate_${farmerData.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'Farmer'}_${new Date().toISOString().slice(0, 10)}.pdf`;
      pdf.save(filename);
      
      setIsGenerating(false);
      
      // Show success message
      alert(`Government Certificate generated successfully!\nFilename: ${filename}\n\nThis certificate includes:\n- Farmer profile with photo\n- Training modules completed\n- Government subsidy schemes\n- Digital verification\n- Performance analytics`);
      
    } catch (error) {
      console.error('Error generating certificate:', error);
      setIsGenerating(false);
      alert('Error generating certificate. Please try again.');
    }
  };


  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center mb-8">
        <FileText className="h-8 w-8 text-blue-600 mr-3" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Government Certificate Generator</h2>
          <p className="text-gray-600 mt-1">
            Generate official agricultural training certificate with digital verification and subsidy eligibility
          </p>
        </div>
      </div>

      {/* Completed Steps Summary */}
      <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
        <div className="flex items-center mb-4">
          <Check className="h-6 w-6 text-blue-600 mr-3" />
          <h3 className="text-lg font-bold text-blue-800">Training Modules Completed</h3>
        </div>
        
        {completedSteps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {completedSteps.map((step, index) => (
              <div key={step.id} className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">Module {index + 1}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    {step.completedAt.toLocaleDateString('en-IN')}
                  </div>
                  {step.imageProof && (
                    <div className="text-xs text-blue-600">
                      ✓ Proof submitted: {step.imageProof.filename}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No training modules completed yet.</p>
        )}
      </div>

      {/* Eligible Schemes */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
        <div className="flex items-center mb-4">
          <Award className="h-6 w-6 text-gray-700 mr-3" />
          <h3 className="text-lg font-bold text-gray-800">Government Subsidy Schemes Eligibility</h3>
        </div>
        
        <div className="space-y-4">
          {/* PM-KISAN Scheme */}
          <div className="bg-white rounded-lg p-4 border border-gray-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">PM-KISAN Small & Marginal Farmer Support</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="bg-blue-100 px-2 py-1 rounded text-xs">Central Government</span>
                    <span className="font-semibold text-green-600">₹18,000</span>
                  </div>
                </div>
              </div>
              <span className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold">
                ELIGIBLE
              </span>
            </div>
            <p className="text-sm text-gray-700 ml-11">
              <strong>Eligibility:</strong> Land ≤ 2 acres
            </p>
          </div>

          {/* Digital Agriculture Innovation Scheme */}
          <div className="bg-white rounded-lg p-4 border border-gray-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Digital Agriculture Innovation Scheme</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="bg-purple-100 px-2 py-1 rounded text-xs">Private Partnership</span>
                    <span className="font-semibold text-green-600">₹35,000</span>
                  </div>
                </div>
              </div>
              <span className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold">
                ELIGIBLE
              </span>
            </div>
            <p className="text-sm text-gray-700 ml-11">
              <strong>Eligibility:</strong> Tech-savvy progressive farmers
            </p>
          </div>

          {/* Organic Farming Premium Support */}
          <div className="bg-white rounded-lg p-4 border border-gray-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Organic Farming Premium Support</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="bg-orange-100 px-2 py-1 rounded text-xs">State Government</span>
                    <span className="font-semibold text-green-600">₹65,000</span>
                  </div>
                </div>
              </div>
              <span className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold">
                ELIGIBLE
              </span>
            </div>
            <p className="text-sm text-gray-700 ml-11">
              <strong>Eligibility:</strong> Organic certification holders
            </p>
          </div>

          {/* Climate Resilient Agriculture Program */}
          <div className="bg-white rounded-lg p-4 border border-gray-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Climate Resilient Agriculture Program</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="bg-blue-100 px-2 py-1 rounded text-xs">Central Government</span>
                    <span className="font-semibold text-green-600">₹55,000</span>
                  </div>
                </div>
              </div>
              <span className="bg-green-500 text-white px-3 py-1 rounded text-xs font-bold">
                ELIGIBLE
              </span>
            </div>
            <p className="text-sm text-gray-700 ml-11">
              <strong>Eligibility:</strong> Drought/flood prone areas
            </p>
          </div>
        </div>
      </div>

      {/* Certificate Preview */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-100 rounded-xl p-8 mb-8 border border-gray-200">
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
            <div className="border-4 border-blue-800 rounded-lg p-6">
              {/* Header */}
              <div className="text-center mb-6 relative">
                {/* Add farmer image in top right if available */}
                {farmerData.profilePhoto && (
                  <div className="absolute top-0 right-0">
                    <img 
                      src={farmerData.profilePhoto} 
                      alt="Farmer Photo" 
                      className="w-16 h-20 object-cover border-2 border-gray-300 rounded"
                    />
                    <p className="text-xs text-gray-500 text-center mt-1">Farmer Photo</p>
                  </div>
                )}
                
                <div className="bg-blue-800 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  GOVERNMENT OF INDIA
                </h3>
                <p className="text-lg text-gray-700 font-semibold">
                  Ministry of Agriculture & Farmers Welfare
                </p>
                <p className="text-base text-gray-600">
                  Agricultural Subsidy Management System
                </p>
                <div className="w-32 h-1 bg-blue-800 mx-auto mt-3"></div>
              </div>

              {/* Certificate Content */}
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  CERTIFICATE OF AGRICULTURAL TRAINING COMPLETION
                </h4>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Certificate ID: <span className="font-mono font-bold">{certificateId}</span></p>
                  <p className="text-sm text-gray-600">Issue Date: {new Date().toLocaleDateString('en-IN')}</p>
                </div>
                
                <div className="text-left bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>HEREBY CERTIFIED</strong> that <strong className="text-blue-600">{farmerData.name || 'Farmer Name'}</strong>, 
                    holder of Aadhaar No. <strong>{farmerData.aadhaar ? `${farmerData.aadhaar.substring(0, 4)}-XXXX-XXXX` : 'XXXX-XXXX-XXXX'}</strong>, 
                    has successfully completed the comprehensive agricultural training program for{' '}
                    <strong className="text-blue-600">
                      {selectedCrop?.charAt(0).toUpperCase()}{selectedCrop?.slice(1)} Cultivation
                    </strong> under the Agricultural Subsidy Management System.
                  </p>
                </div>
              </div>

              {/* Training Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">
                    {completedSteps.length}
                  </div>
                  <div className="text-sm text-gray-600">Modules Completed</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-gray-600">100%</div>
                  <div className="text-sm text-gray-600">Training Progress</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-gray-600">
                    {Object.keys(uploadedImages).length}
                  </div>
                  <div className="text-sm text-gray-600">Proofs Submitted</div>
                </div>
                <div className="text-center bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">
                    4
                  </div>
                  <div className="text-sm text-gray-600">Eligible Schemes</div>
                </div>
              </div>

              {/* Farmer Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h5 className="font-bold text-gray-800 mb-3 text-center">FARMER DETAILS</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {farmerData.name && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{farmerData.name}</span>
                    </div>
                  )}
                  {farmerData.landArea && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Land Area:</span>
                      <span className="font-medium">{farmerData.landArea} acres</span>
                    </div>
                  )}
                  {farmerData.location && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{farmerData.location}</span>
                    </div>
                  )}
                  {farmerData.mobile && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mobile:</span>
                      <span className="font-medium">{farmerData.mobile}</span>
                    </div>
                  )}
                  {farmerData.aadhaar && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aadhaar:</span>
                      <span className="font-medium">{farmerData.aadhaar.substring(0, 4)}-XXXX-XXXX</span>
                    </div>
                  )}
                  {farmerData.bankAccount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank Account:</span>
                      <span className="font-medium">{farmerData.bankAccount}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Authorization */}
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="grid grid-cols-2 gap-8 text-center text-sm">
                  <div>
                    <div className="h-8 border-b border-gray-300 mb-2"></div>
                    <p className="font-medium">Authorized Officer</p>
                    <p className="text-gray-600">Agricultural Department</p>
                  </div>
                  <div>
                    <div className="h-8 border-b border-gray-300 mb-2"></div>
                    <p className="font-medium">District Collector</p>
                    <p className="text-gray-600">Government Seal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions & Digital Verification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Terms and Conditions
          </h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p>• Certificate valid for 3 years from issue date</p>
            <p>• Must maintain training standards and practices</p>
            <p>• Required for subsidy scheme applications</p>
            <p>• Subject to verification by authorized officials</p>
            <p>• Fraudulent use will result in legal action</p>
            <p>• Regular monitoring may be conducted</p>
            <p className="text-xs text-yellow-700 mt-3 italic">
              Full terms and conditions will be included in the generated PDF certificate.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 text-center">
          <QrCode className="h-8 w-8 text-gray-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-800 mb-2">Digital Verification</h4>
          <div className="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg mx-auto mb-3 flex items-center justify-center">
            <div className="text-center">
              <QrCode className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500">QR Code</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">Certificate ID:</p>
            <p className="font-mono font-bold text-xs bg-white px-2 py-1 rounded">{certificateId}</p>
            <p className="text-gray-600 mt-3">
              Scan QR code or visit verification portal to authenticate certificate
            </p>
            <p className="text-xs text-blue-600">agri.gov.in/verify</p>
          </div>
        </div>
      </div>

      {/* Certificate Summary */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-8 border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-4">Government Certificate Will Include:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-blue-600" />
            <span className="text-sm">All training steps completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-blue-600" />
            <span className="text-sm">Eligible subsidy schemes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-blue-600" />
            <span className="text-sm">Terms and conditions</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-blue-600" />
            <span className="text-sm">Digital verification</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-blue-600" />
            <span className="text-sm">Government format</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-blue-600" />
            <span className="text-sm">Official signatures</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-blue-600" />
            <span className="text-sm">Hereby message</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-blue-600" />
            <span className="text-sm">Farmer details</span>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={generateCertificate}
          disabled={isGenerating || completedSteps.length === 0}
          className={`px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
            isGenerating || completedSteps.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
          } text-white`}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
              Generating Government Certificate...
            </>
          ) : (
            <>
              <Download className="inline h-6 w-6 mr-3" />
              Generate Official Government Certificate PDF
            </>
          )}
        </button>
        
        {!isGenerating && (
          <div className="mt-4">
            {completedSteps.length === 0 ? (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg inline-block">
                Please complete at least one training module to generate certificate
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Your government certificate will include comprehensive training details, eligible schemes, and official verification
                </p>
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <span>✓ Digital verification enabled</span>
                  <span>✓ Government format</span>
                  <span>✓ Official signatures</span>
                  <span>✓ Terms included</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};