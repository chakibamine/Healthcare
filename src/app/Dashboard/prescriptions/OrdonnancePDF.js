export const generatePrescriptionPDF = async (prescription, medicalRecord) => {
  try {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    
    // Create the HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Ordonnance Médicale</title>
          <style>
            @media print {
              body {
                padding: 20px;
                font-family: Arial, sans-serif;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .clinic-name {
                font-size: 24px;
                font-weight: bold;
                color: #1a365d;
                margin-bottom: 10px;
              }
              .doctor-info {
                float: left;
                margin-bottom: 20px;
              }
              .patient-info {
                float: right;
                text-align: right;
                margin-bottom: 20px;
              }
              .clear {
                clear: both;
              }
              .separator {
                border-top: 1px solid #ccc;
                margin: 20px 0;
              }
              .section {
                margin: 15px 0;
              }
              .section-title {
                font-weight: bold;
                color: #2c5282;
                margin-bottom: 5px;
              }
              .signature {
                margin-top: 50px;
                display: flex;
                justify-content: space-between;
              }
              .signature-line {
                border-top: 1px solid #000;
                width: 200px;
                margin-top: 10px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="clinic-name">CLINIQUE MÉDICALE</div>
          </div>

          <div class="doctor-info">
            <div>Dr. ${medicalRecord.doctor?.nom || 'N/A'}</div>
            <div>Médecin Traitant</div>
            <div>Tél: +216 XX XXX XXX</div>
            <div>Email: doctor@example.com</div>
          </div>

          <div class="patient-info">
            <div>Date: ${new Date().toLocaleDateString()}</div>
            <div>Patient: ${medicalRecord.patient?.nom || 'N/A'}</div>
          </div>

          <div class="clear"></div>
          <div class="separator"></div>

          <div class="section">
            <div class="section-title">MÉDICAMENTS:</div>
            <div>${prescription.medicaments || 'N/A'}</div>
          </div>

          <div class="section">
            <div class="section-title">POSOLOGIE:</div>
            <div>${prescription.posologie || 'N/A'}</div>
          </div>

          <div class="section">
            <div class="section-title">DURÉE DU TRAITEMENT:</div>
            <div>${prescription.duration || 0} jours</div>
          </div>

          ${prescription.sideEffects?.length ? `
            <div class="section">
              <div class="section-title">EFFETS SECONDAIRES POSSIBLES:</div>
              <div>${prescription.sideEffects.map(effect => `• ${effect}`).join('<br>')}</div>
            </div>
          ` : ''}

          ${prescription.description ? `
            <div class="section">
              <div class="section-title">NOTES:</div>
              <div>${prescription.description}</div>
            </div>
          ` : ''}

          <div class="signature">
            <div>
              <div>Signature du médecin</div>
              <div class="signature-line"></div>
            </div>
            <div>
              <div>Cachet de la clinique</div>
              <div class="signature-line"></div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Write the HTML content to the new window
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = function() {
      printWindow.print();
      // Optional: close the window after printing
      // printWindow.close();
    };

  } catch (error) {
    console.error('Error generating prescription:', error);
    alert('Failed to generate prescription');
  }
}; 