document.addEventListener('DOMContentLoaded', () => {
    const addVideoBtn = document.getElementById('addVideo');
    const useCameraBtn = document.getElementById('useCamera');
    const mediaContainer = document.getElementById('mediaContainer');

    // Create hidden file input for video upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'video/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // Utility function to create remove button
    const createRemoveButton = () => {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove Video';
        removeBtn.style.position = 'relative';
        removeBtn.style.marginTop = '16px';
        removeBtn.style.backgroundColor = '#dc2626';
        removeBtn.style.color = '#ffffff';
        removeBtn.style.fontWeight = '500';
        removeBtn.style.padding = '8px 16px';
        removeBtn.style.borderRadius = '8px';
        removeBtn.style.border = 'none';
        removeBtn.style.cursor = 'pointer';
        removeBtn.style.zIndex = '10';
        removeBtn.style.transition = 'background-color 0.3s ease';
        removeBtn.onmouseover = () => {
            removeBtn.style.backgroundColor = '#b91c1c';
        };
        removeBtn.onmouseout = () => {
            removeBtn.style.backgroundColor = '#dc2626';
        };
        removeBtn.onclick = () => {
            mediaContainer.innerHTML = '';
        };
        return removeBtn;
    };

    // Handle video upload
    addVideoBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('video-container');
            
            const video = document.createElement('video');
            video.controls = true;
            video.src = URL.createObjectURL(file);
            
            videoContainer.appendChild(video);
            
            // Clear previous content
            mediaContainer.innerHTML = '';
            mediaContainer.appendChild(videoContainer);
            mediaContainer.appendChild(createRemoveButton());
        }
    });

    // Handle camera access
    useCameraBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('video-container');
            
            const video = document.createElement('video');
            video.autoplay = true;
            video.playsInline = true;
            video.srcObject = stream;
            
            videoContainer.appendChild(video);

            // Add stop camera button
            const stopBtn = document.createElement('button');
            stopBtn.textContent = 'Stop Camera';
            stopBtn.style.position = 'relative';
            stopBtn.style.marginTop = '16px';
            stopBtn.style.backgroundColor = '#dc2626';
            stopBtn.style.color = '#ffffff';
            stopBtn.style.fontWeight = '500';
            stopBtn.style.padding = '8px 16px';
            stopBtn.style.borderRadius = '8px';
            stopBtn.style.border = 'none';
            stopBtn.style.cursor = 'pointer';
            stopBtn.style.zIndex = '10';
            stopBtn.style.transition = 'background-color 0.3s ease';
            stopBtn.onmouseover = () => {
                stopBtn.style.backgroundColor = '#b91c1c';
            };
            stopBtn.onmouseout = () => {
                stopBtn.style.backgroundColor = '#dc2626';
            };
            stopBtn.onclick = () => {
                // Stop all tracks in the stream
                const tracks = stream.getTracks();
                tracks.forEach(track => {
                    track.stop();
                });
                
                // Remove video source
                video.srcObject = null;
                
                // Clear the container
                mediaContainer.innerHTML = '';
            };

            // Clear previous content
            mediaContainer.innerHTML = '';
            mediaContainer.appendChild(videoContainer);
            mediaContainer.appendChild(stopBtn);

            // Ensure video starts playing
            video.play().catch(err => {
                console.error('Error playing video:', err);
            });

        } catch (error) {
            console.error('Error accessing camera:', error);
            mediaContainer.innerHTML = `
                <div class="text-red-600 text-center p-4">
                    Error accessing camera. Please make sure you have granted camera permissions.
                </div>
            `;
        }
    });
});