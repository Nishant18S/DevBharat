import React, { useState } from 'react';
import { Download, FileText, Shield, QrCode, Check, Award, Calendar, MapPin } from 'lucide-react';
import jsPDF from 'jspdf';
import type { FarmerData, CompletedStep } from '../types';
import { subsidySchemes } from '../data/subsidySchemes';
import { cropSteps } from '../data/cropSteps';

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

  const generateCertificate = async () => {
    setIsGenerating(true);
    
    try {
      // Create new PDF document
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // Helper function to add text with proper wrapping
      const addText = (text: string, x: number, y: number, options: any = {}) => {
        const fontSize = options.fontSize || 12;
        const align = options.align || 'left';
        const maxWidth = options.maxWidth || pageWidth - 40;
        
        pdf.setFontSize(fontSize);
        if (options.style === 'bold') {
          pdf.setFont('helvetica', 'bold');
        } else {
          pdf.setFont('helvetica', 'normal');
        }
        
        if (align === 'center') {
          pdf.text(text, pageWidth / 2, y, { align: 'center', maxWidth });
        } else {
          pdf.text(text, x, y, { maxWidth });
        }
        
        return y + fontSize * 0.5 + 5;
      };

      // Helper function to check and add new page if needed
      const checkPageSpace = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
          return true;
        }
        return false;
      };

      // Header - Government Emblem and Title (No borders)
      pdf.setFillColor(25, 25, 112); // Navy blue for government documents
      pdf.rect(0, 0, pageWidth, 35, 'F');
      
      pdf.setTextColor(255, 255, 255);
      yPosition = addText('GOVERNMENT OF INDIA', 0, 18, {
        fontSize: 18,
        style: 'bold',
        align: 'center'
      });
      
      yPosition = addText('Ministry of Agriculture & Farmers Welfare', 0, yPosition - 2, {
        fontSize: 13,
        align: 'center'
      });
      
      yPosition = addText('Agricultural Subsidy Management System', 0, yPosition - 2, {
        fontSize: 11,
        align: 'center'
      });
      
      pdf.setTextColor(0, 0, 0);
      yPosition = 45;

      // Government Seal/Emblem placeholder (No borders)
      pdf.setFontSize(10);
      pdf.text('GOVT SEAL', pageWidth / 2, yPosition + 12, { align: 'center' });
      
      yPosition += 25;
      
      // Certificate Title
      yPosition = addText('CERTIFICATE OF AGRICULTURAL TRAINING COMPLETION', 0, yPosition, {
        fontSize: 16,
        style: 'bold',
        align: 'center'
      });
      
      yPosition += 15;

      // Certificate ID and Date in clean format (No borders)
      pdf.setFontSize(9);
      pdf.text('Certificate No:', 20, yPosition);
      pdf.text(certificateId, 55, yPosition);
      pdf.text('Date of Issue:', 20, yPosition + 6);
      pdf.text(new Date().toLocaleDateString('en-IN'), 55, yPosition + 6);
      
      pdf.text('Valid Until:', pageWidth - 80, yPosition);
      const validUntil = new Date();
      validUntil.setFullYear(validUntil.getFullYear() + 3);
      pdf.text(validUntil.toLocaleDateString('en-IN'), pageWidth - 40, yPosition);
      
      pdf.text('Place of Issue:', pageWidth - 80, yPosition + 6);
      pdf.text('New Delhi', pageWidth - 40, yPosition + 6);
      
      yPosition += 20;

      // Hereby Message in official government format (No borders)
      yPosition = addText('HEREBY CERTIFIED', 0, yPosition, {
        fontSize: 14,
        style: 'bold',
        align: 'center'
      });
      
      yPosition += 10;
      
      const herebyMessage = `That Shri/Smt. ${farmerData.name || '[Farmer Name]'}, son/daughter of ________________, resident of ${farmerData.location || '[Location]'}, holding Aadhaar Card No. ${farmerData.aadhaar || '[Aadhaar Number]'}, has successfully completed the prescribed Agricultural Training Program for ${selectedCrop?.charAt(0).toUpperCase()}${selectedCrop?.slice(1) || '[Crop]'} Cultivation conducted under the Agricultural Subsidy Management System of the Government of India.`;
      
      const herebyLines = pdf.splitTextToSize(herebyMessage, pageWidth - 40);
      pdf.setFontSize(11);
      pdf.text(herebyLines, 20, yPosition);
      yPosition += herebyLines.length * 6 + 15;

      // Farmer Details Section - Full Details (No borders)
      checkPageSpace(50);
      yPosition = addText('FARMER COMPLETE DETAILS', 20, yPosition, {
        fontSize: 12,
        style: 'bold'
      });
      
      yPosition += 8;
      
      // Comprehensive farmer details
      const farmerDetails = [
        ['Full Name', farmerData.name || 'Not provided'],
        ['Father\'s/Husband\'s Name', '[Not provided]'], // This would need to be added to farmer data
        ['Aadhaar Number', farmerData.aadhaar || 'Not provided'],
        ['Mobile Number', farmerData.mobile || 'Not provided'],
        ['Email Address', '[Not provided]'], // This would need to be added to farmer data
        ['Complete Address', farmerData.location || 'Not provided'],
        ['District', '[Not provided]'], // This would need to be added to farmer data
        ['State', '[Not provided]'], // This would need to be added to farmer data
        ['PIN Code', '[Not provided]'], // This would need to be added to farmer data
        ['Land Area (acres)', farmerData.landArea.toString()],
        ['Land Survey Number', '[Not provided]'], // This would need to be added to farmer data
        ['Bank Account Number', farmerData.bankAccount || 'Not provided'],
        ['Bank Name & Branch', '[Not provided]'], // This would need to be added to farmer data
        ['IFSC Code', '[Not provided]'], // This would need to be added to farmer data
        ['Selected Crop', selectedCrop?.charAt(0).toUpperCase() + (selectedCrop?.slice(1) || 'Not selected')],
        ['Training Start Date', completedSteps.length > 0 ? completedSteps[0].completedAt.toLocaleDateString('en-IN') : 'Not available'],
        ['Training End Date', completedSteps.length > 0 ? completedSteps[completedSteps.length - 1].completedAt.toLocaleDateString('en-IN') : 'Not available']
      ];
      
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

      // Training Steps Completed with Full Content (No borders)
      checkPageSpace(30);
      yPosition = addText('DETAILED TRAINING MODULES COMPLETED', 20, yPosition, {
        fontSize: 12,
        style: 'bold'
      });
      
      yPosition += 8;
      
      if (completedSteps.length > 0) {
        completedSteps.forEach((step, index) => {
          checkPageSpace(40);
          
          // Module header
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`Module ${index + 1}: Step ${step.id}`, 20, yPosition);
          pdf.setFont('helvetica', 'normal');
          pdf.text(`Completed on: ${step.completedAt.toLocaleDateString('en-IN')}`, pageWidth - 80, yPosition);
          yPosition += 8;
          
          // Get step details from cropSteps data
          const stepDetails = getStepDetails(step.id);
          if (stepDetails) {
            // Step title and description
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Title: ${stepDetails.title}`, 25, yPosition);
            yPosition += 6;
            
            pdf.setFont('helvetica', 'normal');
            const descLines = pdf.splitTextToSize(`Description: ${stepDetails.description}`, pageWidth - 50);
            pdf.text(descLines, 25, yPosition);
            yPosition += descLines.length * 5 + 5;
            
            // Detailed steps content
            pdf.setFont('helvetica', 'bold');
            pdf.text('Training Content Covered:', 25, yPosition);
            yPosition += 6;
            
            pdf.setFont('helvetica', 'normal');
            stepDetails.detailedSteps.forEach((detailStep, detailIndex) => {
              checkPageSpace(10);
              const stepText = `${detailIndex + 1}. ${detailStep}`;
              const stepLines = pdf.splitTextToSize(stepText, pageWidth - 60);
              pdf.text(stepLines, 30, yPosition);
              yPosition += stepLines.length * 4 + 3;
            });
            
            // Checklist items
            if (stepDetails.checklist && stepDetails.checklist.length > 0) {
              checkPageSpace(15);
              pdf.setFont('helvetica', 'bold');
              pdf.text('Key Activities Completed:', 25, yPosition);
              yPosition += 6;
              
              pdf.setFont('helvetica', 'normal');
              stepDetails.checklist.forEach((checkItem) => {
                checkPageSpace(8);
                const checkText = `✓ ${checkItem}`;
                const checkLines = pdf.splitTextToSize(checkText, pageWidth - 60);
                pdf.text(checkLines, 30, yPosition);
                yPosition += checkLines.length * 4 + 2;
              });
            }
          }
          
          yPosition += 8;
        });
      } else {
        pdf.text('No training modules completed.', 25, yPosition);
        yPosition += 10;
      }



      // Terms and Conditions in government format (No borders)
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

      // Digital Verification Section (No borders)
      checkPageSpace(20);
      yPosition = addText('DIGITAL VERIFICATION', 20, yPosition, {
        fontSize: 12,
        style: 'bold'
      });
      
      yPosition += 8;
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Certificate Verification Details:', 20, yPosition);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text(`Unique Certificate ID: ${certificateId}`, 20, yPosition + 8);
      pdf.text('Online Verification Portal: https://agri.gov.in/verify-certificate', 20, yPosition + 14);
      pdf.text('QR Code: Scan for instant verification and authenticity check', 20, yPosition + 20);
      
      yPosition += 30;
      
      // Eligible Schemes Section at the end (No borders)
      checkPageSpace(30);
      
      yPosition = addText('SCHEME ELIGIBILITY', 20, yPosition, {
        fontSize: 12,
        style: 'bold'
      });
      
      yPosition += 8;
      
      if (eligibleSchemes.length > 0) {
        eligibleSchemes.forEach((scheme, index) => {
          checkPageSpace(30);
          
          // Scheme header
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${index + 1}. ${scheme.name}`, 20, yPosition);
          yPosition += 8;
          
          // Scheme details in clean format
          const schemeDetails = [
            ['Scheme Type', scheme.type],
            ['Financial Benefit', scheme.amount],
            ['Eligibility Criteria', scheme.eligibility],
            ['Required Documents', scheme.documents.join(', ')]
          ];
          
          schemeDetails.forEach(detail => {
            checkPageSpace(10);
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`${detail[0]}:`, 25, yPosition);
            pdf.setFont('helvetica', 'normal');
            const detailLines = pdf.splitTextToSize(detail[1], pageWidth - 80);
            pdf.text(detailLines, 80, yPosition);
            yPosition += Math.max(detailLines.length * 4, 6);
          });
          
          // Benefits subsection
          checkPageSpace(15);
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Key Benefits:', 25, yPosition);
          yPosition += 6;
          
          scheme.benefits.forEach(benefit => {
            checkPageSpace(8);
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            const benefitLines = pdf.splitTextToSize(`• ${benefit}`, pageWidth - 60);
            pdf.text(benefitLines, 30, yPosition);
            yPosition += benefitLines.length * 4 + 2;
          });
          
          yPosition += 8;
        });
      } else {
        pdf.setFontSize(10);
        pdf.text('Based on the provided land area, no schemes are currently eligible.', 25, yPosition);
        pdf.text('Please contact the nearest agricultural office for more information.', 25, yPosition + 6);
        yPosition += 20;
      }
      
      // Footer - Official Signatures (No borders)
      checkPageSpace(50);
      
      // Authority signatures section
      yPosition = addText('ISSUING AUTHORITY', 20, yPosition, {
        fontSize: 11,
        style: 'bold'
      });
      
      yPosition += 15;
      
      // Create signature sections with proper spacing (No borders)
      const signatureY = yPosition;
      const leftSignatureX = 30;
      const rightSignatureX = pageWidth - 100;
      
      pdf.setFontSize(9);
      pdf.text('Authorized Signatory', leftSignatureX, signatureY);
      pdf.text('Training Officer', leftSignatureX, signatureY + 6);
      pdf.text('Agricultural Department', leftSignatureX, signatureY + 12);
      
      pdf.text('Authorized Signatory', rightSignatureX, signatureY);
      pdf.text('District Collector', rightSignatureX, signatureY + 6);
      pdf.text('(Government Seal)', rightSignatureX, signatureY + 12);
      
      // Add official seal placeholder in center
      const centerX = pageWidth / 2;
      pdf.setFontSize(8);
      pdf.text('OFFICIAL SEAL', centerX, signatureY + 6, { align: 'center' });

      // Save the PDF
      const filename = `Agricultural_Training_Certificate_${farmerData.name?.replace(/[^a-zA-Z0-9]/g, '_') || 'Farmer'}_${new Date().toISOString().slice(0, 10)}.pdf`;
      pdf.save(filename);
      
      setIsGenerating(false);
      
      // Show success message
      alert(`Government Certificate generated successfully!\nFilename: ${filename}\n\nThis certificate includes:\n- All completed training steps\n- Eligible subsidy schemes\n- Terms and conditions\n- Digital verification details`);
      
    } catch (error) {
      console.error('Error generating certificate:', error);
      setIsGenerating(false);
      alert('Error generating certificate. Please try again.');
    }
  };

  const certificateId = `AGR-${Date.now().toString(36).toUpperCase()}`;
  
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
          <h3 className="text-lg font-bold text-gray-800">Eligible Government Subsidy Schemes</h3>
        </div>
        
        {eligibleSchemes.length > 0 ? (
          <div className="space-y-4">
            {eligibleSchemes.map((scheme) => (
              <div key={scheme.id} className="bg-white rounded-lg p-4 border border-gray-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{scheme.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded">{scheme.type}</span>
                      <span className="font-semibold text-blue-600">{scheme.amount}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Eligibility:</strong> {scheme.eligibility}
                  </p>
                  <div className="text-sm">
                    <strong className="text-gray-700">Key Benefits:</strong>
                    <ul className="mt-1 space-y-1">
                      {scheme.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="text-gray-600 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {benefit}
                        </li>
                      ))}
                      {scheme.benefits.length > 3 && (
                        <li className="text-blue-600 text-xs italic">+{scheme.benefits.length - 3} more benefits</li>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  <strong>Required Documents:</strong> {scheme.documents.join(', ')}
                </div>
              </div>
            ))})
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 font-medium">No schemes currently eligible</p>
            <p className="text-yellow-700 text-sm mt-1">
              Based on your current land area ({farmerData.landArea} acres), no subsidy schemes match your eligibility criteria.
            </p>
          </div>
        )}
      </div>

      {/* Certificate Preview */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-100 rounded-xl p-8 mb-8 border border-gray-200">
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
            <div className="border-4 border-blue-800 rounded-lg p-6">
              {/* Header */}
              <div className="text-center mb-6">
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
                    {eligibleSchemes.length}
                  </div>
                  <div className="text-sm text-gray-600">Eligible Schemes</div>
                </div>
              </div>

              {/* Farmer Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h5 className="font-bold text-gray-800 mb-3 text-center">FARMER DETAILS</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{farmerData.name || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Land Area:</span>
                    <span className="font-medium">{farmerData.landArea} acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{farmerData.location || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mobile:</span>
                    <span className="font-medium">{farmerData.mobile || 'Not provided'}</span>
                  </div>
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