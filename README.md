📘 Detailed Project Workflow & Working Solution: https://docs.google.com/document/d/1H5tZzmpYD6jbSQiwDEeFaOxedYRbH4IPeYS2FGQBcPE/edit?tab=t.0#heading=h.uoy5uyelxkti

🚗 Fast Tag Mini Project
This project is a simplified Fast Tag Toll System built using React (Vite) for the frontend and Spring Boot for the backend. It simulates toll charges, vehicle registration, and fare calculation logic based on vehicle type and last trip time.

📌 Designed to showcase:

Frontend skills

React component architecture

REST API integration

Real-world use case implementation

✨ Features
 Check if a vehicle has a Fast Tag registered

 Calculate toll fares based on vehicle type and previous trip

 Apply half-fare if returning within 30 minutes

 Show popup if vehicle is not registered

 Register new vehicles using a simple form

 View dynamically generated toll bills

 Responsive UI with Tailwind CSS

⚙️ How It Works
1.User enters their vehicle number.

2.System checks registration status via /api/vehicle/check.

3.If registered, fare is calculated and bill displayed.

4.If not registered, a popup prompts the user to register.

5.On registration, vehicle data is sent via POST /api/vehicle/register.

6.Fares are calculated dynamically based on:

7.Vehicle type (e.g., Car, Truck, Bike)

8.Last paid toll time (for return trip logic)

9. History tab for transaction history of particular vehicle number.

🛠️ Installation
 Frontend - React
 # Clone the repository
git clone https://github.com/NagaraniSivakumar/fast-tag.git
cd fast-tag/fasttag-frontend

# Install dependencies
npm install

# Start the development server
npm run dev

Backend - Spring Boot
# Clone the repository
git clone https://github.com/your-username/fast-tag-backend.git
cd fast-tag/fasttag-backend

# Build and run the Spring Boot application
mvn clean install
mvn spring-boot:run

MySQL Database Setup

CREATE DATABASE fasttag;
USE fasttag;

