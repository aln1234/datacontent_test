# Course Subscription Prototype

This is a **Course Subscription Prototype** application built with **React** on the frontend and **ServiceNow** as the backend. The application allows users (learners) to view a list of available courses, subscribe to them, and manage their course subscriptions.

## Features

### 1. **Course List**

- Fetches and displays a list of available courses from the backend (ServiceNow).
- Course details include:
  - **Title**
  - **Description**
  - **Duration**
  - **Type** (Online, Offline, Hybrid)
  - **Course Image** (with a default placeholder if no image is provided)
- Courses are displayed in a responsive **grid layout**.

### 2. **Subscription Feature**

- Each course has a "Subscribe" button, allowing users to subscribe to courses.
- Subscribing creates a new record in the **Course Subscription** table in ServiceNow.
- Feedback is provided upon successful subscription using **toast notifications**.

### 3. **Unsubscribe Feature**

- Users can **unsubscribe** from courses they are subscribed to.
- Unsubscribing removes the subscription from the backend and updates the UI accordingly.
- Feedback is provided upon successful unsubscription using **toast notifications**.

### 4. **My Courses Section**

- Displays the courses the user has subscribed to by fetching data from the backend.
- Each subscribed course displays:
  - **Title**
  - **Description**
  - **Duration**
  - An **Unsubscribe** button.
- This section allows users to manage their subscriptions.

### 5. **Navbar with Subscription Count**

- The navbar includes a shopping cart icon that shows the **number of subscribed courses**.
- This count updates dynamically based on the user's subscriptions.

### 6. **Error Handling**

- Proper error handling for failed API requests:
- Errors in fetching courses, subscribing, or unsubscribing are displayed to the user via error messages and toast notifications.

### 7. **Responsive Design**

- The application is fully responsive and works well on both mobile and desktop devices.
- Styling is handled using **Tailwind CSS**.

## Technologies Used

### **Frontend:**

- **React**: For building the UI.
- **React Router**: For navigation between pages.
- **Axios**: For making API requests to the backend.
- **Tailwind CSS**: For responsive and modern styling.
- **React Toastify**: For showing notifications (e.g., on successful subscription or unsubscription).

### **Backend:**

- **ServiceNow**: The backend is implemented on the ServiceNow platform, which provides:
  - **Course Table**: Stores the course details.
  - **Subscription Table**: Stores the user's course subscriptions.

### **Authentication:**

- The application uses **OAuth token-based authentication** to communicate with the ServiceNow backend.
- The access token is stored in an **`.env`** file and passed in the API requests for secure access.

## Installation and Setup

1. **Clone the repository**:

```
git clone <repository-url>
cd datacontent_test
```

2. **Install the Dependencies**:

```
npm install
```


3. **Setup the Environment**:
Create a .env file at the root of your project with the following environment variables:

```
REACT_APP_ACCESS_TOKEN=<your-access-token>
REACT_APP_REFRESH_TOKEN=<your-refresh-token>
REACT_APP_CLIENT_ID=<your-client-id>
REACT_APP_CLIENT_SECRET=<your-client-secret>
```

4. **Start the Application**:

```
npm start
```
