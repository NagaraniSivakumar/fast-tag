# 🚗 Fast Tag Mini Project

This project is a simplified **Fast Tag toll system portal** built using **React (Vite)** for the frontend and connects to backend APIs to simulate toll charges and vehicle registration. backend service for the **Fast Tag Mini Project**, built using Spring Boot. It provides REST APIs to register vehicles, check registration status, and update toll payment timestamps.

> 📌 Designed to showcase frontend skills, React component architecture, API interaction, and a real-world use case.

---

##  Features

-  Check if a vehicle has a Fast Tag registered
-  Calculate toll fares based on vehicle type and previous trip
-  Apply half-fare if returning within 30 minutes
-  Show popup if vehicle is not registered
-  Register new vehicles using a simple form
-  View dynamically generated toll bills
-  Responsive UI built with **Tailwind CSS**

---

##  How It Works

1. User enters their vehicle number.
2. System checks registration status via `/api/vehicle/check`.
3. If **registered**, fare is calculated and bill displayed.
4. If **not registered**, popup prompts user to register.
5. On registration, vehicle data is posted to `/api/vehicle/register`.
6. Fares are calculated dynamically based on:
   - **Vehicle type**
   - **Last paid time** (if applicable)

---

##  Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend APIs:** Expected at `/api/vehicle/*`
- **HTTP Client:** Axios
- **MY SQL:** DB connectivity

---

##  Installation

```bash
# Clone the repository
Frontend-react
git clone https://github.com/your-username/fast-tag-portal.git](https://github.com/NagaraniSivakumar/fast-tag.git
cd fast-tag/fasttag-frontend

# Install dependencies
npm install

# Start the development server
npm run dev

### Clone the Repository
Backend-Java
```bash
git clone https://github.com/your-username/fast-tag-backend.git
cd fast-tag/fasttag-backend

mvn clean install
mvn spring-boot:run

```sql
CREATE DATABASE fasttag;
use fasttag;
