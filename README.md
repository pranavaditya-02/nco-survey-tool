# NCO Smart Survey Tool

**Government of India Survey Platform**

A comprehensive, secure, and accessible platform for conducting large-scale government surveys with AI-powered insights and multilingual support.

![Government of India](https://img.shields.io/badge/Government-of%20India-FF9933?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
- [Usage](#-usage)
- [Meet the Team](#-meet-the-team)

## 🇮🇳 About

The NCO Smart Survey Tool is designed to empower modern governance through intelligent data collection. Built specifically for Indian government agencies, this platform ensures transparency, accessibility, and efficiency in conducting nationwide surveys.

This project was developed as an academic initiative to demonstrate modern web development skills and digital governance solutions.

### Key Features
- **22** Languages Supported
- **AI-Powered** Analytics and Insights
- **Voice Input** Accessibility Support
- **Real-time** Dashboard and Reporting

## ✨ Features

### 🌐 **Multilingual Support**
- AI-powered translation for English and all major Indian regional languages
- Real-time language switching during surveys
- Cultural context-aware translations

### 🎤 **Voice Responses**
- Speech-to-text technology for accessibility
- Support for multiple Indian languages and dialects
- Voice-guided survey navigation

### 🧠 **AI-Powered Analytics**
- Intelligent fraud detection algorithms
- Adaptive questioning based on responses
- Real-time insights and pattern recognition
- Predictive analytics for policy planning

### 🔒 **Privacy & Security**
- End-to-end encryption for all data
- GDPR and Indian data protection compliance
- Privacy-by-design architecture
- Secure government-grade authentication

### 👥 **Role-Based Access Control**
- **Citizens**: Secure survey participation
- **Survey Creators**: Campaign management and design
- **Data Analysts**: Advanced analytics and reporting
- **System Administrators**: Platform management

### 📊 **Real-Time Dashboard**
- Live response tracking and analytics
- Demographic insights and visualizations
- Exportable reports in multiple formats
- Custom KPI monitoring

## 🛠 Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **Database**: PostgreSQL with Supabase
- **Authentication**: Supabase Auth
- **AI/ML**: Vercel AI SDK
- **Deployment**: Vercel Platform
- **Analytics**: Custom dashboard with Recharts

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nco-survey-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
   ```

4. **Set up the database**
   
   Run the SQL scripts in order to set up your database schema:
   ```bash
   # Execute these scripts in your Supabase SQL editor or via the platform
   scripts/01_create_database_schema.sql
   scripts/02_seed_departments.sql
   scripts/03_seed_admin_users.sql
   scripts/04_create_sample_survey.sql
   scripts/05_create_sample_responses.sql
   scripts/06_create_system_settings.sql
   scripts/07_create_analytics_views.sql
   scripts/08_create_functions.sql
   scripts/09_create_triggers.sql
   scripts/10_grant_permissions.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Usage

### For Citizens
1. Visit the platform homepage
2. Click "Take a Survey" to view available surveys
3. Complete surveys using text or voice input
4. Switch languages as needed during participation

### For Government Officials
1. Access the admin portal at `/admin`
2. Create and manage survey campaigns
3. Monitor real-time response analytics
4. Export data and generate reports

### For System Administrators
1. Manage user roles and permissions
2. Configure system settings
3. Monitor platform performance
4. Ensure data security compliance

## 🤝 Contributing

We welcome contributions to improve this platform:

1. Fork the repository
2. Create a feature branch from `main`
3. Implement changes with proper testing
4. Submit pull request with detailed description

---

## 👥 Meet the Team

### Student Development Team

| **Name** | **Email** | **LinkedIn** |
|----------|-----------|--------------|
| Hemasri M | hemaleena1102@gmail.com | https://www.linkedin.com/in/hemasri-m/ |
| Pranav Aditya P S | pspranavadityacvm@gmail.com | https://www.linkedin.com/in/pranav-aditya-ps/ |

### 🤝 Get In Touch
For questions or collaboration opportunities, feel free to reach out to any team member above.

---

**Built with ❤️ for Digital India Initiative**

*Empowering governance through technology*