Pibble Classifier System :p
This project is a web-based image classification system that utilizes deep learning to categorize users into specific profiles based on facial expression analysis. The application is deployed using a decoupled architecture, separating the client-side interface from the inference engine.

System Architecture :D
The project is structured into two main components:
------Backend 
-The backend is a Python-based API hosted on Hugging Face Spaces. It handles the computational load of the facial analysis.
-Flask: Provides the RESTful API infrastructure.
-DeepFace: A deep learning facial analysis library used for emotion recognition.
-TensorFlow: Acts as the underlying framework for the neural network models.
-OpenCV: Utilized for image preprocessing and matrix manipulations.
-CORS Integration: Configured to allow secure cross-origin requests from the frontend domain.

--------Frontend
-The frontend is a static web application hosted on GitHub Pages. It manages the user hardware interface and result visualization.
-MediaDevices API: Handles real-time video streaming from the user's webcam.
-Canvas API: Captures frames from the video stream for transmission.
-Vanilla JavaScript: Manages asynchronous communication with the backend API.
-CSS3: Implements a glassmorphism design language and responsive layout.
