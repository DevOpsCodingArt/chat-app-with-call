# Chat App with Call

A modern real-time chat application with integrated voice/video call functionality. Built with a scalable architecture and responsive design, this project is ideal for teams, friends, and communities who want secure and seamless communication.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Project Overview

This repository contains a full-stack chat application supporting real-time messaging and calls. Users can register, log in, send text messages, and make voice/video calls. The app uses WebSockets for instant communication and WebRTC for media transmission.

## Features

- **Real-time Chat:** Instant messaging between users.
- **Voice/Video Calls:** Peer-to-peer calls via GetStream.
- **User Authentication:** Secure registration and login.
- **Responsive UI:** Works on desktop and mobile devices.
- **Message History:** Persistent storage of chat history.
- **Online Status:** Shows which users are online.
- **Notifications:** Alerts for new Friend.

## Architecture

- **Frontend:** React.js 
- **Backend:** Node.js with Express
- **Real-time Communication:** GetStream
- **Database:** MongoDB 
- **Authentication:** JWT (JSON Web Tokens)

## Tech Stack

- **Languages:** JavaScript, TypeScript 
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-time:** GetStream
- **DevOps:** GitHub Actions

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DevOpsCodingArt/chat-app-with-call.git
   cd chat-app-with-call
   ```

2. **Install dependencies:**
   - Backend:
     ```bash
     cd server
     npm install
     ```
   - Frontend:
     ```bash
     cd client
     npm install
     ```

3. **Set environment variables:**
   Create `.env` files in both `server` and `client` folders. Example for backend:
   ```
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   SOCKET_PORT=5000
   ```

4. **Run the app:**
   - Backend:
     ```bash
     npm run dev
     ```
   - Frontend:
     ```bash
     npm start
     ```

5. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Register a new account or log in.
- Start a chat with any online user.
- Initiate a voice or video call.


## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes.
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

Created by [DevOpsCodingArt](https://github.com/DevOpsCodingArt)  
For questions, please open an issue or contact via GitHub.
