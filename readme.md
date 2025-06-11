# Fitoholic - Indian Fitness Tracker & AI Advisor

Fitoholic is a modern, full-stack web application designed as a comprehensive fitness tracker tailored for an Indian audience. It allows users to monitor their daily health metrics, visualize their progress, and get personalized advice from an AI-powered chatbot. The application features a secure authentication system, role-based access for admins, and a premium subscription model managed via Razorpay.

---

## ✨ Features

### For Users:
- **Secure Authentication:** JWT-based login, signup, and password reset functionality.
- **Interactive Dashboard:** A central hub to view and manage all fitness data.
- **Daily Loggers:** Track daily Steps, Calories, Water Intake, and Weight.
- **Data Visualization:** Animated charts display historical data for all tracked metrics.
- **Profile Management:** Users can update their name, email, bio, and password.
- **Premium Feature (Paid):**
    - Access to **Fitto**, an AI-powered chatbot (driven by Google's Gemini) for personalized fitness and nutrition advice.
    - Seamless one-time payment via Razorpay.
- **Theming:** A beautiful, persistent Light/Dark mode toggle for a personalized UI.

### For Admins:
- **Role-Based Access:** Admins are redirected to a dedicated, secure admin panel upon login.
- **User Management Dashboard:** View a list of all registered users with search functionality.
- **At-a-Glance Stats:** See key metrics like total users, premium users, and number of admins.
- **User Monitoring:** View a specific user's complete log history and progress charts in a read-only mode.
- **Secure User Management:**
    - Admins can remove users.
    - Admins cannot edit or remove other admins or themselves, ensuring system integrity.
    - Admin roles can only be assigned via direct database access for security.

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3+
- **Language:** Java 21
- **Authentication:** Spring Security 6, JSON Web Tokens (JWT)
- **Database:** MySQL 8
- **ORM:** Spring Data JPA (Hibernate)
- **Build Tool:** Maven
- **Payments:** Razorpay API
- **AI:** Google Gemini API (via REST)
- **Email:** Spring Boot Mail (with SMTP)

### Frontend
- **Framework/Library:** React 18 (Create React App)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Icons:** Heroicons, Font Awesome
- **API Communication:** Fetch API

---

## 🚀 Getting Started

Follow these instructions to set up and run the Fitoholic project on a new machine.

### Prerequisites

Ensure you have the following software installed on your system:
- **Java JDK 21:** [Oracle JDK 21](https://www.oracle.com/java/technologies/downloads/#jdk21-windows)
- **Apache Maven 3.9+:** [Maven Downloads](https://maven.apache.org/download.cgi)
- **Node.js LTS Version (e.g., 20.x):** [Node.js Downloads](https://nodejs.org/en/)
- **MySQL 8 Server:** [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- A code editor like **Visual Studio Code**.

### Setup & Installation

**1. Clone the Repository (or Copy the Folder)**
- Copy your `Fitoholic` project folder to the new machine.

**2. Backend Setup (Spring Boot)**
- **Open the backend project** in your code editor at `Fitoholic/backend/api/`.
- **Create the Database:**
    - Open your MySQL client (e.g., MySQL Command-Line Client or Workbench).
    - Run the following command to create the database:
      ```sql
      CREATE DATABASE fitoholic_db;
      ```
- **Configure Application Properties:**
    - Navigate to `src/main/resources/application.properties`.
    - Update the following fields with your local credentials:
      ```properties
      # MySQL Database
      spring.datasource.password=[Your MySQL root password]

      # Razorpay API Keys (from your Razorpay Test Dashboard)
      razorpay.key.id=[Your Razorpay Key ID]
      razorpay.key.secret=[Your Razorpay Key Secret]
      
      # Gemini API Key (from Google AI Studio)
      gemini.api.key=[Your Gemini API Key]

      # Email (SMTP) Configuration (e.g., with a Gmail App Password)
      spring.mail.username=[Your Gmail Address]
      spring.mail.password=[Your 16-character Gmail App Password]
      ```
- **Build and Run the Backend:**
    - Open a terminal inside the `Fitoholic/backend/api/` directory.
    - Run the command:
      ```bash
      mvn clean spring-boot:run
      ```
    - The backend server will start on `http://localhost:8080`. The first run will automatically create all necessary tables in your `fitoholic_db` database.

**3. Frontend Setup (React)**
- **Open a new terminal.**
- **Navigate to the frontend directory:**
  ```bash
  cd path/to/your/project/Fitoholic/frontend

  
