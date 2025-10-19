const fs = require('fs');
const path = require('path');

function storeNewResource(resourceText) {
  const filePath = path.join(__dirname, 'resources.txt');
  const resourceEntry = resourceText + '\n';

  try {
    fs.appendFileSync(filePath, resourceEntry);
    return { success: true, message: 'Resource added successfully' };
  } catch (error) {
    console.error('Error writing to resources.txt:', error);
    return { success: false, message: 'Failed to add resource' };
  }
}

function loadResources() {
  const filePath = path.join(__dirname, 'resources.txt');

  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      const resources = data.split('\n').filter(line => line.trim() !== '');
      return { success: true, resources };
    } else {
      return { success: true, resources: [] };
    }
  } catch (error) {
    console.error('Error reading resources.txt:', error);
    return { success: false, message: 'Failed to read resources' };
  }
}

module.exports = { storeNewResource, loadResources };