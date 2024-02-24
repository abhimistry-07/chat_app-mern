# Tolki

This README file provides detailed information about my project, including its frontend and backend components, routes, and the technologies used.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Frontend Routes](#frontend-routes)
5. [Backend Routes](#backend-routes)
6. [Technologies Used](#technologies-used)
7. [Environment Variables](#environment-variables)
8. [Deployed Link](#deployed-link)
9. [Screenshots](#screenshots)

---

## Introduction 

This is a chat application where you can create account, login, find users to chat. You can create group chat. You can view each others profile. You can update group name, add and remove users from the group. You can receive notification for new chat message.

---

## Features  

**1. User Authentication:** Create your account and securely log in to access Tolki's features.

**2. User Search:** Easily find other users to initiate private conversations.

**3. Group Chat:** Engage in group discussions by creating and joining chat groups.

**4. Profile Viewing:** Get to know your fellow users better by viewing their profiles.

**5. Group Management:** Take control of your group chats by updating group names and managing group members.

**6. Notifications:** Stay updated with real-time notifications for new chat messages, ensuring you never miss a conversation.

---

## Installation 

### Frontend

To set up the Tolki chat app frontend locally, follow these steps:

1. Clone this repository to your local machine using the following command:

   ```shell
   git clone https://github.com/abhimistry-07/chat_app-mern

   ```

2. Navigate to the project directory:

   ```shell
   cd client
   
   ```

3. Install the required dependencies by running:

   ```shell
   npm install

   ```

4. Start the application:

   ```shell
   npm start

   ```

5. Access the platform by visiting http://localhost:3000 in your web browser.

### Backend

To set up the Tolki chat app backend locally, follow these steps:

1. Navigate to the project directory:

   ```shell
   cd ..
   cd server
   
   ```

2. Install the required dependencies by running:

   ```shell
   npm install

   ```

3. Start the application:

   ```shell
   npm run server

   ```

4. Access the platform by visiting http://localhost:8080 in your web browser.

---

## Frontend Routes

The frontend of this project is built using React and Redux. Chakra UI is used to create a visually appealing and responsive user interface.

1. `/`: Allows users to log in using their credentials.
2. `/signup`: Provides the functionality for users to create a new account.
3. `/chats`: The main page of the application, where displaing all the chats. (Private Route)

---

## Backend Routes

The backend of this project is developed using Node.js with the Express framework and MongoDB as a database. It provides the necessary API endpoints to manage user interactions.

#### USER Routes

1. `POST /user/register`: For register new user.
2. `POST /user/login`: For login user.
3. `GET /user/allUsers?search=${search}`: Retrieves all users and search specific user.

#### CHAT Routes (Private Routes)
   
1. `POST /chat/`: Create new one on one chat.
2. `GET /chat/`: Get all chats for loged user.
3. `POST /chat/group`: Create new group chat.
4. `PUT /chat/rename`: To rename group name.
5. `PUT /chat/addtogrp`: To add new user to group.
6. `PUT /chat/removefrgrp`: To remove user from group.
 
#### MESSAGE Routes (Private Routes)

1. `POST /message`: Send new message to chat.
2. `GET /message/:chatId`: Get all messages of specific chat.

---

## Technologies Used

### Frontend

- React
- Redux
- Chakra UI

### Backend

- Node.js
- Express
- MongoDB

---

## Environment Variables

To configure and run the project, you need to set the following environment variables in your `.env` file:

### Frontend

- `REACT_APP_BASE_URL`: Backend deployed URL.

### Backend

- `PORT`: Specifies the port on which the server will run.
- `MONGOURL`: Specifies the MongoDB database connection URL.
- `JWT_SECRET`: Secret key for JWT.

Make sure to set these environment variables according to your development or production environment.

---

## Deployed Link

Frontend: https://tolki.vercel.app

Backend: https://tolki.onrender.com

---

## Screenshots

Below are screenshots of different pages of the Tolki chat app:

1. ### Login Page:
   ![Login Page](https://github.com/abhimistry-07/chat_app-mern/blob/main/client/src/assets/Tolki%20Login%20Page.jpg)

2. ### Signup Page:
   ![Signup Page](https://github.com/abhimistry-07/chat_app-mern/blob/main/client/src/assets/Tolki%20Signup%20Page.jpg)

3. ### All Chats
   ![All Chats](https://github.com/abhimistry-07/chat_app-mern/blob/main/client/src/assets/Tolki%20All%20Chats%20Page.jpg)

4. ### Live Chat:
   ![Live Chat](https://github.com/abhimistry-07/chat_app-mern/blob/main/client/src/assets/Tolki%20live%20chat.jpg)

5. ### Group Chat:
  ![Group Chat](https://github.com/abhimistry-07/chat_app-mern/blob/main/client/src/assets/Tolki%20group%20chat.jpg)

6. ### User Profile:
  ![User Profile](https://github.com/abhimistry-07/chat_app-mern/blob/main/client/src/assets/Tolki%20User%20Profile.jpg)

7. ### Create Group:
  ![Create Group](https://github.com/abhimistry-07/chat_app-mern/blob/main/client/src/assets/Tolki%20create%20group.jpg)
  
8. ### Add or remove user:
  ![Add or remove user](https://github.com/abhimistry-07/chat_app-mern/blob/main/client/src/assets/Tolki%20add%20or%20remove%20user.jpg)
  
9. ### Search Users:
  ![Search Users](https://github.com/abhimistry-07/chat_app-mern/blob/main/client/src/assets/Tolki%20search%20user.jpg)
  
10. ### Notification:
  ![Notification](https://github.com/abhimistry-07/chat_app-mern/blob/main/client/src/assets/Tolki%20notification.jpg)

---
