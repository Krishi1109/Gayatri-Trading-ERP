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

### Example
![image](https://github.com/user-attachments/assets/cd03a07d-ad0f-44ce-8236-140872850128)

---

## Manage Brands, Categories, Variants, and Units

This step allows the admin to set up the foundational data for managing purchases effectively. These details will be used when entering purchase orders to ensure consistency and ease of use.

### Key Features
- **Add Brands**: Define product brands to categorize your inventory.
- **Add Categories**: Organize items into specific groups for better management.
- **Add Variants**: Specify product variations (e.g., size, color) for detailed tracking.
- **Add Units**: Define units of measurement (e.g., kg, liter) that will be used during purchase entry.

### Workflow
1. Navigate to the respective sections (Brands, Categories, Variants, or Units).
2. Add the necessary details using simple forms.
3. The defined units will automatically appear when entering purchase orders.

### Example
![image](https://github.com/user-attachments/assets/754cef80-fefb-4018-a7c6-e2aaa45547ba)

---

## Purchase Entry

The **Purchase Entry** feature enables seamless tracking of purchases by leveraging the pre-defined data for brands, categories, variants, and units. Simply select the options from dropdowns and input the quantity and price.

### Key Features
- **Dynamic Dropdowns**: Pre-filled dropdowns for brands, categories, variants, and units.
- **Quick Entry**: Only quantity and price need to be entered manually.
- **Efficient Tracking**: Automatically associates the selected fields with the purchase record.

### Workflow
1. Navigate to the **Purchase Entry** section.
2. Select the required details from the dropdown menus (e.g., brand, category, variant, unit).
3. Enter the **Quantity** and **Price**.
4. Save the entry to update your purchase records.

### Example
![image](https://github.com/user-attachments/assets/37a77341-ad63-49b7-ad5c-0e773b63cf13)

---

## List of All Purchase Orders

The **Purchase Orders** section provides a comprehensive view of active and completed orders, making it easier to track and manage inventory and pricing.

### Key Features

1. **Active Orders Table**:
   - Displays all active orders for easy tracking of prices and stock levels.
   - Helps users manage ongoing inventory requirements.

2. **All Records Table**:
   - Shows all purchase records with **pagination** for efficient browsing.
   - Includes **filters** for:
     - **Brands**
     - **Status**
     - **Category**
   - Enables users to search and narrow down specific records quickly.


### Workflow
1. View all active purchase orders in the **Active Orders Table** for immediate insights.
2. Switch to the **All Records Table** for a historical view.
3. Use filters to refine data based on your requirements.

### Example
![image](https://github.com/user-attachments/assets/e0e7c2fc-4817-4f4b-81c3-16bf710ac871)


