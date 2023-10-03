const fs = require('fs')
const { merge } = require('mochawesome-merge') // Make sure to use { merge }

// Merge Mochawesome reports
merge('cypress/reports', {
// Options
    files: ['*.json'], // Merge all JSON reports
})
.then(report => {
    fs.writeFileSync('cypress/reports/mochawesome.json', JSON.stringify(report, null, 2))
    console.log('Merged Mochawesome reports successfully')
})
.catch(error => {
    console.error('Error merging reports:', error)
})