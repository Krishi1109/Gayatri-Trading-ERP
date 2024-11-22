# Gayatri-Trading-ERP

**Gayatri-Trading-ERP** is an admin panel designed specifically for managing accounts and purchase orders for **Gayatri Trading**. This system provides shopkeepers with a streamlined way to track various accounts, monitor purchase orders, and manage amounts and quantities effectively. 

Additionally, the system features intuitive charts for data visualization, enabling users to analyze key metrics and make informed decisions.

---

## Features

- **Account Management**: Easily track and manage various accounts.
- **Purchase Order Tracking**: Keep a detailed record of purchase orders with amounts and quantities.
- **Data Visualization**: Analyze performance and trends through interactive charts.
- **User-Friendly Admin Panel**: A clean and intuitive interface designed for seamless operation.

---

## Tech Stack

This ERP system is built using the following technologies:

- **Node.js**: Backend development for handling server-side operations.
- **Express.js**: Framework for building the API and backend logic.
- **React.js**: Frontend framework for building an interactive user interface.
- **Redux**: State management for efficient data handling across components.
- **MongoDB**: Database for storing and managing application data.

---

## Login Component

The **Login Component** is the entry point of the Gayatri-Trading-ERP. It handles user authentication securely and manages sessions effectively.

### Key Features
- **JWT Authentication**: Validates user credentials and generates a JWT token on the backend.
- **Redux Integration**: Stores user data and authentication state globally.
- **Token Storage**: Saves the JWT token in `localStorage` for maintaining sessions across page refreshes.

### Workflow
1. User submits login credentials.
2. Backend validates credentials and returns a JWT token.
3. The token is saved in `localStorage` and Redux state for further use.

![image](https://github.com/user-attachments/assets/cd03a07d-ad0f-44ce-8236-140872850128)
