 GitHub Activity Tracker

This is a simple full-stack project that simulates GitHub events (star, issue, push) and displays them on a React dashboard. Events are received via a backend webhook and stored in Firebase Firestore.

 How to Run the Project Locally

 Prerequisites

- Node.js installed
- Firebase account + Firestore set up
- Firebase Admin SDK key in `backend/serviceAccountKey.json`

---

 Backend Setup (Node.js + Express)

1. Go to the backend folder:
   cd backend
   
2.Install dependencies:
    npm install

3.Start the server:
 node index.js
#Server runs on: http://localhost:4000/webhook



4.Go to the frontend folder:
 cd github-activity-dashboard


5.Install dependencies:
  npm install


6.Start the React app:
  npm start
#App runs on: http://localhost:3000

7.Simulate Webhook Events
  Use curl, Postman, or webhook.site to POST event data (e.g. star, issue, push) to:
    http://localhost:4000/webhook
eg.use the following command as it is:
curl -X POST http://localhost:4000/webhook -H "Content-Type: application/json" -d "{\"action\":\"created\",\"repository\":{\"name\":\"stellar-repo\"},\"sender\":{\"login\":\"astro-user\"},\"starred_at\":\"2025-06-06T11:00:00Z\"}"



 My Approach
1.Defined the Goal
I started by understanding the core objective: simulate a GitHub activity tracker that displays real-time events like stars, issues, and pushes — using a React frontend and a backend that receives and stores webhook data.

2.Set Up the Backend First
I created a backend server using Express.js to receive GitHub-style webhook events. This server parsed incoming JSON payloads and stored relevant data (repository name, event type, username, and timestamp) into a database.

3.Database Integration
My initial plan was to use Firebase Firestore, but due to limitations requiring a paid plan, I shifted to using local backend storage (Express + local or temporary in-memory DB). This made development more flexible and cost-free.

4.Built the React Frontend
The frontend was developed using React with functional components and hooks, focused on fetching and displaying the stored event data. I created components to show each event clearly, with a clean and minimal layout.

5.Simulated Events Using curl
I used curl commands in Windows to simulate different GitHub webhook events (star, issue, push) and confirmed that the backend captured and stored the data correctly — and that the frontend updated as expected.

6.GitHub Integration
I created a clean repo, and carefully pushed the code to GitHub — resolving push protection issues along the way to ensure no secrets were exposed.







Challenges Faced:
Firebase Cloud Setup Issues
Initially, I intended to use Firebase Cloud Functions and Firestore for storing webhook data. However, enabling some Firebase services required billing to be activated. To avoid this, I shifted to using a local Express.js server as the backend for handling webhooks, which gave me full control without incurring any cost.

Frontend Integration Difficulties
Connecting the React frontend with Firebase became tricky because the Firebase project configuration lacked essential values like the App ID and Project ID. I had to troubleshoot the configuration and ensure the Firebase web setup was correctly initialized to make data flow between Firestore and the frontend.

GitHub Push Security Restrictions
While pushing the project to GitHub, I encountered errors due to GitHub push protection rules. These blocked commits containing sensitive files like serviceAccountKey.json, which was mistakenly committed. I had to remove the file from Git history and .gitignore it to prevent exposing secrets, and then force push safely to publish the repository.
