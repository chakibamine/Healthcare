export const generatePrescriptionPDF = async (prescription, medicalRecord) => {
  try {
    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Ordonnance Médicale</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              padding: 20px;
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #2d3748;
              max-width: 1200px;
              margin: 0 auto;
            }

            .container {
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .header {
              text-align: center;
              margin-bottom: 2rem;
              padding-bottom: 1rem;
              border-bottom: 2px solid #e2e8f0;
            }

            .clinic-name {
              font-size: clamp(1.5rem, 4vw, 2.5rem);
              font-weight: bold;
              color: #1a365d;
              margin-bottom: 0.5rem;
            }

            .info-container {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              gap: 2rem;
              margin-bottom: 2rem;
            }

            .doctor-info, .patient-info {
              flex: 1;
              min-width: 250px;
            }

            .patient-info {
              text-align: right;
            }

            .separator {
              border-top: 1px solid #e2e8f0;
              margin: 1.5rem 0;
            }

            .section {
              margin: 1.5rem 0;
              padding: 1rem;
              background: #f8fafc;
              border-radius: 6px;
            }

            .section-title {
              font-weight: bold;
              color: #2c5282;
              margin-bottom: 0.5rem;
              font-size: 1.1rem;
              text-transform: uppercase;
            }

            .section-content {
              padding-left: 1rem;
              white-space: pre-line;
            }

            .signature-container {
              margin-top: 3rem;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              gap: 2rem;
            }

            .signature-box {
              flex: 1;
              min-width: 200px;
              text-align: center;
            }

            .signature-line {
              margin: 1rem auto;
              width: 80%;
              max-width: 200px;
              border-bottom: 1px solid #000;
            }

            @media print {
              body {
                padding: 0;
                background: white;
              }

              .container {
                box-shadow: none;
                padding: 20px;
              }

              .section {
                break-inside: avoid;
                background: white;
                border: 1px solid #e2e8f0;
              }
            }

            @media screen and (max-width: 600px) {
              body {
                padding: 10px;
              }

              .container {
                padding: 1rem;
              }

              .doctor-info, .patient-info {
                text-align: left;
              }

              .signature-container {
                flex-direction: column;
                gap: 1rem;
              }

              .signature-box {
                width: 100%;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="clinic-name">CLINIQUE MÉDICALE</div>
            </div>

            <div class="info-container">
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
            </div>

            <div class="separator"></div>

            <div class="section">
              <div class="section-title">MÉDICAMENTS</div>
              <div class="section-content">${prescription.medicaments || 'N/A'}</div>
            </div>

            <div class="section">
              <div class="section-title">POSOLOGIE</div>
              <div class="section-content">${prescription.posologie || 'N/A'}</div>
            </div>

            <div class="section">
              <div class="section-title">DURÉE DU TRAITEMENT</div>
              <div class="section-content">${prescription.duration || 0} jours</div>
            </div>

            ${prescription.sideEffects?.length ? `
              <div class="section">
                <div class="section-title">EFFETS SECONDAIRES POSSIBLES</div>
                <div class="section-content">
                  ${prescription.sideEffects.map(effect => `• ${effect}`).join('<br>')}
                </div>
              </div>
            ` : ''}

            ${prescription.description ? `
              <div class="section">
                <div class="section-title">NOTES</div>
                <div class="section-content">${prescription.description}</div>
              </div>
            ` : ''}

            <div class="signature-container">
              <div class="signature-box">
                <div>Signature du médecin</div>
                <div class="signature-line"></div>
              </div>
              <div class="signature-box">
                <div>Cachet de la clinique</div>
                <div class="signature-line"></div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    printWindow.onload = function() {
      printWindow.print();
    };

  } catch (error) {
    console.error('Error generating prescription:', error);
    alert('Failed to generate prescription');
  }
}; 