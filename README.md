# mooviesfinder

a node Js/ React Js project to search and retrieve movies from OMDB api

🚀 **Goal**: Design a fullstack application searching the latest movies informations

**API**

- Design a small API to search through a movie database (use the OMDB open API : [https://www.omdbapi.com/](https://www.omdbapi.com/))
- Imagine your API is listened by many other services - so make sure it caches the information and does not fetch it all the time
- Make sure the cache contains recent informations - **we should not be late more than 24h** **with the live data**

**App**

- Design a small App showing the results from your API - you are free to display however you like
- There should be a search section on the home page to filter movies by at least title - **search should be done on the backend**
- By clicking on a result, we should be redirected to a result page with more details

→ Feel free to add any additional features you like

🚧 **Constraints:**

- Use **Typescript**
- **React** must be used for the UI
- **Add at least one test** on your project
- **Clear instructions on how to run the project** must be shipped along with the projet (to allow us to read your project correctly 🙂) - best is to have a **README.md** at the root of the git repository containing the instructions to run your code

✏️ **Additional details:**

- Try making **regular commits** on your github repository, as if it was a real project
- Add a small "todo" section on **what you would improve** at the end of your README
- **Architecture** and **readability** are top criterias in the way we will assess your work

📩 **Submission:**

The ideal submission format is the following:

- A **link** to a Github repository (try if possible to have only 1 repository)
- Any additional information that you feel is important to communicate 🙂

# TO RUN APPLICATION
## First run Node js server

Nodejs must be installed
- Clone this project 
- cd backend
- run "npm install" to download the dependancies
- copy env.example in .env and add your constants
- npm start

## Then run frrontend React application
- cd frontend/my-app
- npm start
