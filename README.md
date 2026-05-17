# digital-warranty-receipt-vault

🟦 PROJECT TITLE
Digital Warranty & Receipt Vault
🟦 PROBLEM DESCRIPTION
Users often lose paper receipts and warranty documents, making it difficult to claim warranties or track installment purchases. There is no centralized system to store and manage purchase records digitally.
🟦 SOLUTION
This system provides a RESTful API to store product purchases, receipt images, warranty details, and installment history in a centralized digital vault.
🟦 FEATURES
- Product management (CRUD)
- Receipt image upload
- Warranty expiry tracking
- Installment tracking system
- Installment payment history
- Category filtering
- Expired warranty detection
🟦 TECHNOLOGIES USED
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Postman
- Git & GitHub
🟦 API ENDPOINTS
POST /api/product/create
GET /api/product/getallproducts
PUT /api/product/update/:id
DELETE /api/product/delete/:id

GET /api/product/category/:category
GET /api/product/installments
GET /api/product/expired

POST /api/product/installment/:id
🟦 SETUP INSTRUCTIONS
1. Clone repository
2. Run npm install
3. Create .env file with PORT and MONGO_URL
4. Run npm start
🟦 HOW TO RUN
npm start
Server runs on http://localhost:8000