function generateHomePage() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home Page</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                display: flex;
                gap: 40px;
            }
            .left-section {
                flex: 1;
            }
            .right-section {
                flex: 1;
            }
            input[type="text"] {
                width: 300px;
                padding: 8px;
                margin: 10px 0;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            button {
                padding: 8px 16px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            button:hover {
                background-color: #0056b3;
            }
            ul {
                list-style-type: disc;
                margin-left: 20px;
            }
            li {
                margin: 8px 0;
            }
        </style>
    </head>
    <body>
        <div class="left-section">
            <h1>Shared Resources for Candy Cane Lane</h1>
            <form id="resourceForm">
                <input type="text" id="userInput" name="userInput" placeholder="Enter text here..." required>
                <br>
                <button type="submit">Submit</button>
            </form>
            <div id="message" style="margin-top: 10px;"></div>
        </div>
        <div class="right-section">
            <ul id="resourcesList">
                <!-- Resources will be loaded here dynamically -->
            </ul>
        </div>
        <script>
            async function loadResources() {
                try {
                    const response = await fetch('/resources');
                    const result = await response.json();

                    if (result.success) {
                        const resourcesList = document.getElementById('resourcesList');
                        resourcesList.innerHTML = '';

                        if (result.resources.length === 0) {
                            resourcesList.innerHTML = '<li style="color: #666;">No resources added yet.</li>';
                        } else {
                            result.resources.forEach(resource => {
                                const li = document.createElement('li');
                                li.textContent = resource;
                                resourcesList.appendChild(li);
                            });
                        }
                    }
                } catch (error) {
                    console.error('Failed to load resources:', error);
                    document.getElementById('resourcesList').innerHTML = '<li style="color: red;">Failed to load resources</li>';
                }
            }

            function addResourceToList(resourceText) {
                const resourcesList = document.getElementById('resourcesList');
                const emptyMessage = resourcesList.querySelector('li[style*="color: #666"]');

                if (emptyMessage) {
                    resourcesList.removeChild(emptyMessage);
                }

                const li = document.createElement('li');
                li.textContent = resourceText;
                resourcesList.appendChild(li);
            }

            document.getElementById('resourceForm').addEventListener('submit', async function(e) {
                e.preventDefault();

                const userInput = document.getElementById('userInput').value;
                const messageDiv = document.getElementById('message');

                addResourceToList(userInput);
                document.getElementById('userInput').value = '';

                try {
                    const response = await fetch('/add-resource', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ userInput: userInput })
                    });

                    const result = await response.json();

                    if (result.success) {
                        messageDiv.innerHTML = '<span style="color: green;">Resource added successfully!</span>';
                        setTimeout(() => messageDiv.innerHTML = '', 3000);
                    } else {
                        messageDiv.innerHTML = '<span style="color: red;">Failed to add resource: ' + result.message + '</span>';
                        loadResources();
                    }
                } catch (error) {
                    messageDiv.innerHTML = '<span style="color: red;">Error: ' + error.message + '</span>';
                    loadResources();
                }
            });

            window.addEventListener('load', loadResources);
        </script>
    </body>
    </html>
  `;
}

module.exports = generateHomePage;