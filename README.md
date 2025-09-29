# 🌱 DevBharat - Empowering Rural Farmers with Technology  

![DevBharat Logo](assets/team-photo.png)  
*Smart India Hackathon 2025 | Problem Statement ID – SIH25109*  

> **Theme:** Agriculture, FoodTech & Rural Development  
> **Category:** Hardware  
> **Team ID:** 50871  
> **Team Name:** DevBharat  

---

## 📖 About the Project

DevBharat is an **AI-driven, IoT-integrated platform** designed to **empower farmers** by simplifying access to **government subsidies**, enabling **direct crop sales**, and providing **offline connectivity** for rural areas with limited internet access.  

This solution bridges the **rural-digital divide** through:  
- A **smart subsidy guide** to help farmers complete steps with reminders and multilingual support.  
- A **direct marketplace** connecting farmers directly with buyers, eliminating middlemen.  
- **IoT-powered offline networks** using ESP32 and LoRa RA-02 to provide access even without internet.  

---

## 🚜 Key Features

| Feature                  | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| **Smart Subsidy Guide**  | Guided step-by-step process with reminders and multilingual support.        |
| **Direct Marketplace**   | Sell crops directly to buyers, ensuring fair pricing and transparency.      |
| **Offline Access**       | ESP32 + LoRa RA-02 based decentralized local network for villages.          |
| **AI-Powered Insights**  | Personalized subsidy eligibility suggestions and modern farming guidance.   |
| **Multilingual Support** | Voice and text interfaces in regional languages for better accessibility.   |
| **Analytics Dashboard**  | Data-driven insights for farmers and policymakers.                         |

---

## 🏗️ System Architecture

### **High-Level Flow**
1. **Farmer registers** on the platform and logs in.
2. **AI engine** suggests eligible subsidies and guides the farmer step-by-step.
3. **Offline ESP32-based nodes** ensure farmers can access services without internet.
4. Farmers can **list products directly in the marketplace**.
5. **Buyers purchase directly**, eliminating middlemen commissions.
6. Reports are generated and can be **submitted to Gram Panchayat offices**.

---

## 💻 Tech Stack

| Area             | Technologies Used |
|------------------|-------------------|
| **Frontend**     | React.js (Vite), HTML, CSS, Bootstrap, Tailwind CSS, Three.js, Redux Toolkit, Framer Motion, Lottie Files |
| **Backend**      | Node.js, Express.js, MongoDB, JWT Authentication, Bcrypt.js |
| **AI & ML**      | Python (Flask), NLP, Machine Learning, LLM |
| **IoT Devices**  | ESP32, LoRa RA-02, Arduino IDE, SD Card, Sensors |
| **APIs & Tools** | Google Maps API, OpenWeather API, Email.js, Postman, GeminiAI, GitHub, GitLab |

---

## 🌾 Platform Modules

### 1. **Farmer Dashboard**
- View and manage crop listings  
- Track subsidy applications  
- Get AI-powered insights  

![Farmer Dashboard](assets/farmer-dashboard.png)

---

### 2. **Subsidy Workflow**
- Step-by-step guide to apply for government schemes  
- Upload documents and track approvals  

![Subsidy Workflow](assets/subsidy-page.png)

---

### 3. **User Dashboard**
- Buyers can browse and purchase directly from farmers  
- Transparent pricing and analytics  

![User Dashboard](assets/user-dashboard.png)

---

### 4. **IoT Integration**
- ESP32 devices create **offline mesh networks** with **LoRa RA-02**  
- Local nodes extend connectivity up to **15 km between villages**  
- Data syncs when connected to the internet  

![IoT Integration](assets/iot-integration.png)

---

## 📂 Project Structure

















---

## 🌍 Impact and Benefits

| Category        | Benefits |
|----------------|----------|
| **Social 👥** | Empowers farmers with digital literacy and transparency. |
| **Economic 💰** | Eliminates middlemen, ensuring fair crop prices. |
| **Environmental 🌱** | Encourages sustainable farming and reduces carbon footprint through local sales. |

---

## 👨‍💻 Team DevBharat

| Name                  | Role            | Skills |
|-----------------------|----------------|--------|
| **Nishant Sankar Swain** | Team Leader | Full Stack Web Development, PHP, IoT Integration |
| **Sumit Kumar Patra**    | Developer    | React.js, Node.js, AI Integration |

![Team Photo](assets/team-photo.png)

---

## 📸 Screenshots

- **Home Page**  
  ![Home Page](assets/home-page.png)

- **Register & Login**  
  ![Register](assets/register.png)  
  ![Login](assets/login.png)

---

## 🚀 Deployment

The project is deployed on **Vercel** for the frontend and **cloud-based backend**.

- **Live Website:** [Kisan Setu Platform](https://kisan-setu-mu.vercel.app/)  
- **GitHub Repository:** [DevBharat](https://github.com/Nishant18S/DevBharat)  

---

## 📜 Research References

| Title | Publisher | DOI |
|-------|-----------|-----|
| Challenges and Opportunities of Future Rural Wireless Communications | IEEE | [10.1109/MCOM.001.2100280](https://doi.org/10.1109/MCOM.001.2100280) |
| Rural e-Commerce in Developing Countries | IEEE | [10.1109/MITP.2018.021921657](https://doi.org/10.1109/MITP.2018.021921657) |
| LoRa Communication for Agriculture 4.0 | IEEE | [10.1109/JIOT.2024.3486369](https://doi.org/10.1109/JIOT.2024.3486369) |

---

## 📽️ Demo Video

- [Watch Demo on YouTube](https://youtu.be/07z2fRVC7iM?si=m2Kwav6bBfdYcZyg)

---

## 📝 How to Run the Project Locally

### **1. Clone the Repository**
```bash
git clone https://github.com/Nishant18S/DevBharat.git
cd DevBharat

