// Function to start camera and display camera feed
function startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request access to user's camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                // Create video element
                var video = document.createElement('video');
                video.srcObject = stream;
                video.autoplay = true;
                video.muted = true;

                // Append video element to camera feed container
                var cameraFeedContainer = document.getElementById('cameraFeed');
                cameraFeedContainer.innerHTML = ''; // Clear existing content
                cameraFeedContainer.appendChild(video);

                // Hide specific elements when camera feed appears
                hideElementsOnCameraFeed();

                // Display buttons when camera feed appears
                addButtons();
            })
            .catch(function(error) {
                console.error('Error accessing the camera:', error);
            });
    } else {
        console.error('getUserMedia is not supported in this browser');
    }
}

// Function to hide specified elements when camera feed appears
function hideElementsOnCameraFeed() {
    // Select elements to hide
    var elementsToHide = [
        '.title',
        '.video-background',
        '.bottomfeatures',
        'nav',
        '#cameraText',
        'button[onclick="startCamera()"]'
    ];

    // Loop through elements and hide them
    elementsToHide.forEach(function(selector) {
        var element = document.querySelector(selector);
        if (element) {
            element.style.display = 'none';
        }
    });
}

// Function to add buttons dynamically
function addButtons() {
    // Container for buttons
    var buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    // Button configurations
    var buttonConfigurations = [
        { text: 'Zoom In', onClick: zoomIn },
        { text: 'Zoom Out', onClick: zoomOut },
        { text: '2D', onClick: function() { switchMode('2D'); } },
        { text: '3D', onClick: function() { switchMode('3D'); } },
        { text: 'Delete', onClick: deleteCameraFeed }
    ];

    // Create buttons based on configurations
    buttonConfigurations.forEach(function(config) {
        var button = createButton(config.text, config.onClick);
        buttonContainer.appendChild(button);
    });

    // Append button container to the background box
    var backgroundBox = document.getElementById('backgroundBox');
    backgroundBox.appendChild(buttonContainer);

    // Display the button container
    buttonContainer.style.display = 'flex';
}

// Helper function to create a button
function createButton(text, onClick) {
    var button = document.createElement('button');
    button.textContent = text;
    button.className = 'mode-button';
    button.onclick = onClick;
    return button;
}

// Function to handle delete button click (clear camera feed)
function deleteCameraFeed() {
    var cameraFeed = document.getElementById('cameraFeed');
    cameraFeed.innerHTML = ''; // Clear camera feed content
    cameraFeed.style.display = 'none'; // Hide camera feed container

    // Hide the button container
    var buttonContainer = document.querySelector('.button-container');
    if (buttonContainer) {
        buttonContainer.style.display = 'none';
    }
}

// Function to handle zoom in button click
function zoomIn() {
    console.log('Zoom In button clicked!');
}

// Function to handle zoom out button click
function zoomOut() {
    console.log('Zoom Out button clicked!');
}

// Function to handle mode switch (2D or 3D)
function switchMode(mode) {
    console.log('Switching to ' + mode + ' mode');
}

// Function to attach click event listener to camera access button
function startCameraOnClick() {
    var cameraAccessButton = document.getElementById('camera-access-button');
    if (cameraAccessButton) {
        cameraAccessButton.addEventListener('click', startCamera);
    }
}

// Call the function to start camera access only when the button is clicked
startCameraOnClick();
