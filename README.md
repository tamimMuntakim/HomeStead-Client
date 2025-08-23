# 🏡 HomeStead – Real Estate Platform

HomeStead is a modern real estate platform where agents can list properties, buyers can explore, wishlist, and make offers, and admins can manage users and transactions. It features secure authentication, property verification, Stripe-based payments, and a clean responsive UI built with React and TailwindCSS.

---

## 🔗 Live Demo
[HomeStead – Real Estate Platform](https://homestead-authentication.web.app)  
---

## ✨ Features
-   🔑 **Authentication**: Email/Password & Google Sign-in using Firebase Auth.
-   🏠 **Property Management**: Agents can add, update, and manage properties.
-   ✅ **Property Verification**: Admins can verify pending properties before they appear public.
-   💳 **Secure Payments**: Integrated with Stripe for property offers & transactions.
-   ⭐ **Wishlist & Reviews**: Users can wishlist properties and leave reviews.
-   👨‍💼 **Role-based Access**: Separate dashboards for Admin, Agent, and User.
-   🎨 **Modern UI/UX**: Built with React, TailwindCSS, DaisyUI, Framer Motion, and Lottie animations.
-   ⚡ **Performance**: Optimized API calls with TanStack React Query and Axios.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/tamimMuntakim/HomeStead-Client.git
```
### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env.local` file in the root directory and add:

```bash
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_imgbb_key=your_imgbb_api_key
VITE_stripe_pk=your_stripe_publishable_key
```

### 4️⃣ Run the development server
```bash
npm run dev
```
### 5️⃣ Build for production
```bash
npm run build
```
## 📂 Project Structure
```bash
.firebase/
public/
src/
 ├── assets/             # Images, Lotties, icons
 ├── Components/         # Reusable UI components
 ├── Contexts/           # React Context (Auth, etc.)
 ├── Firebase/           # Firebase config
 ├── Hooks/              # Custom hooks (Axios, Auth, Query hooks)
 ├── Layouts/            # Layout wrappers (Home, Dashboard, Auth)
 ├── Pages/              # Application pages (Home, Login, Dashboard, etc.)
 ├── PrivateRoutes/      # Role-based protected routes
 ├── Providers/          # Context providers
 ├── Routes/             # App routing
 ├── App.jsx             # Root component
 └── main.jsx            # Entry point
 ```
## 🛠️ Tech Stack

### Frontend
- **React** 19  
- **React Router** 7  
- **TailwindCSS** 4  
- **DaisyUI**  
- **Framer Motion**  
- **Lottie React**  

### State & Data Handling
- **TanStack React Query**  
- **Axios**  

### Backend & Services
- **Firebase Authentication**  
- **Stripe Payments**  
- **ImgBB Image Hosting**  

### Utilities
- **SweetAlert2**  
- **React Hook Form**  
- **Date-fns**

<!-- 📸 Screenshots
(Add your screenshots here with a brief description for each one. Example: ![Homepage](path/to/image.png)) -->
## 📜 License
This project is licensed under the MIT License – feel free to use and modify.