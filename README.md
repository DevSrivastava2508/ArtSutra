# GigFinance

GigFinance is a mobile finance tracker designed for gig workers to keep track of their income and expenses.

The project is being developed as part of an Entrepreneurship Development project. The current version is a working prototype built with React Native and Expo and is intended to be demonstrated on an Android device.

## Overview

Gig workers often receive income from different jobs or platforms and may have regular work-related expenses. Keeping track of these transactions manually can make it difficult to understand their actual earnings and spending.

GigFinance provides a specialized financial management and shift-tracking experience, available both as a standalone **responsive web application** (`web/`) and as a mobile prototype.

## Features

* **🔐 2-Step Login & Occupation Onboarding**: Support for Indian gig workers to select or enter their exact role (Delivery Boy / Partner, Freelancer / Digital Specialist, Cab & Auto Driver, Home Services, Courier, or custom occupation) with persistent client-side storage.
* **💼 Real-time Retained Cash & Runway**: Immediate calculation of retained savings, operational outflows, and 3-month emergency reserve targets.
* **🎯 Daily Shift Target Progress**: Visual daily goal tracking (e.g. ₹2,000/day) with in-place target customization.
* **📊 Visual Native SVG Analytics**: 7-Day Inflow vs Outflow Trend curve with interactive tooltips, and Expense Donut breakdown (Fuel, Food on shift, Bike maintenance, Data).
* **📋 Filterable Ledger & CSV Export**: Instant keyword searching, category filters, and 1-click CSV download for bank loan proofs or tax filing.
* **⛽ Shift Fuel & Mileage Cost Calculator**: Live trip fuel cost calculation and net operating rate per km.
* **🌓 Dark & Light Mode**: Slate Dark Mode and Clean Light Mode.

## Technology Stack

* **Web Application (`web/`)**: Semantic HTML5, Custom Vanilla CSS design system, Modular ES6 JavaScript, Native SVG Charts, `localStorage` persistence.
* **Mobile Prototype (`src/`)**: React Native, Expo, JavaScript.
* **Version Control**: Git & GitHub.

## Project Structure

```text
GigFinance/
├── src/
├── assets/
├── package.json
├── app.json
├── .gitignore
└── README.md
```

## Running the Project

### Requirements

* Node.js
* npm
* Expo
* Expo Go (for testing on Android)

### Installation

Clone the repository and open the project directory:

```bash
git clone <repository-url>
cd GigFinance
```

Install the project dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

A QR code will be displayed in the terminal. Scan it using Expo Go on an Android device connected to the same network.

## Project Status

Current status: **Prototype**

The application can currently be run and tested on an Android device using Expo Go.

The project is being developed incrementally, with the focus currently on the core user interface and financial tracking functionality.

## Future Development

Planned improvements include:

* Database integration
* User authentication
* Expense categorisation
* Daily, weekly and monthly financial summaries
* Income and expense analytics
* Savings tracking
* Support for multiple gig platforms
* Data export and reporting

## Purpose

This project explores the development of a practical financial management tool for gig workers while applying concepts from entrepreneurship, product development and mobile application development.

## Author

**Tinu Rathore**

Entrepreneurship Development Project
