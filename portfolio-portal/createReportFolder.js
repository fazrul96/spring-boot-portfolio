const fs = require('fs');
const path = require('path');

const reportDir = 'cypress/results';
const reportAssetsDir = 'cypress/results/assets';
const reportFilename = 'End-to-End-Testing-Report.html';
const reportJsonFilename = 'End-to-End-Testing-Report.json';
const action = 1; // 0 createReportFolder, 1 renameAndOpenReport

const currentDate = new Date().toISOString().split('T')[0]; // Get current date in the format YYYY-MM-DD
const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur', hour12: false }).split(',')[1].replace(/:| /g, ''); // Get current time in the format HHmmss
const reportNameWithDate = `${reportFilename.split('.')[0]}-${currentDate}-${currentTime}.html`;
const reportJsonNameWithDate = `${reportJsonFilename.split('.')[0]}-${currentDate}-${currentTime}.json`;

function createReportFolder() {
  const folderName = `${currentDate}_${currentTime}`; // Unique folder name using date and time
  const folderPath = path.join(reportDir, folderName);
  const type = 'duplicate'; // 0 duplicate, 1 transfer

  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    if(type === 'duplicate') {
        // Duplicate File
        const reportFilePath = path.join(folderPath, reportFilename);
        fs.copyFileSync(path.join(reportDir, reportFilename), reportFilePath);
        console.log(`HTML report created at: ${reportFilePath}`);
    
        const reportJsonFilePath = path.join(reportDir, reportJsonFilename);
        fs.readFile(reportJsonFilePath, 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading JSON report file:', err);
            return;
          }
    
          fs.writeFile(path.join(folderPath, reportJsonFilename), data, 'utf8', (err) => {
            if (err) {
              console.error('Error writing JSON report file:', err);
              return;
            }
            console.log(`JSON report copied to: ${folderPath}`);
            openReport(reportFilePath, () => {
              console.log('Report opened.');
            });
          });
        });
    } else {
        // Transfer File
        const reportFilePath = path.join(reportDir, reportFilename);
        const htmlContent = fs.readFileSync(reportFilePath, 'utf8');
        fs.writeFileSync(path.join(folderPath, reportFilename), htmlContent, 'utf8');
    
        const reportJsonFilePath = path.join(reportDir, reportJsonFilename);
        const jsonData = fs.readFileSync(reportJsonFilePath, 'utf8');
        fs.writeFileSync(path.join(folderPath, reportJsonFilename), jsonData, 'utf8');
    
        console.log(`HTML and JSON reports moved to: ${folderPath}`);
        openReport(path.join(folderPath, reportFilename));
    }

  } catch (err) {
    console.error('Error creating report folder:', err);
  }
}

function renameAndOpenReport() {
    const reportFilePath = path.join(reportDir, reportFilename);
    const reportJsonFilePath = path.join(reportDir, reportJsonFilename);
    const newReportFilePath = path.join(reportDir, reportNameWithDate);
    const newReportJsonFilePath = path.join(reportDir, reportJsonNameWithDate);
  
    try {
      // Rename the HTML report file
      fs.renameSync(reportFilePath, newReportFilePath);
      console.log(`HTML report renamed to: ${newReportFilePath}`);
  
      // Rename the JSON report file
      fs.renameSync(reportJsonFilePath, newReportJsonFilePath);
      console.log(`JSON report renamed to: ${newReportJsonFilePath}`);
  
      openReport(newReportFilePath);
    } catch (err) {
      console.error('Error renaming report files:', err);
    }
  }
  
function openReport(reportFilePath) {
  const isWindows = process.platform === 'win32';
  const command = isWindows ? `start ${reportFilePath}` : `xdg-open ${reportFilePath}`;

  const { exec } = require('child_process');
  exec(command, (error) => {
    if (error) {
      console.error(`Error opening report: ${error}`);
    } else {
      console.log('Report opened.');
    }
  });
}

// Check if the script is called with an argument
if (process.argv.length > 2) {
    const type = parseInt(process.argv[2]); // Parse the argument to an integer (assuming it's a number)
  
    if (isNaN(type)) {
      console.error('Invalid argument. Please provide a number (0 or 1) as the argument.');
    } else {
        if (type === action) {
            renameAndOpenReport();
        } else {
            createReportFolder();
        }
    }
} else {
    console.error('No argument provided. Please provide a number (0 or 1) as the argument.');
}