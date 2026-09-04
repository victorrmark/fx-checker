# FX Converter

A modern foreign exchange dashboard for converting currencies, tracking exchange-rate trends, comparing multiple currencies, and managing favorite currency pairs.

Built with **React, TypeScript, Tailwind CSS, TanStack Query, Axios, and TradingView Lightweight Charts**, with exchange-rate data provided by the **Frankfurter API**.

> **Note:** Frankfurter provides the latest available reference exchange rates rather than tick-by-tick market prices. Therefore, the market ticker in this application represents the latest available FX data.

---

## Features

### Currency Conversion

- Convert between supported currencies.
- Search currencies by name or currency code.
- Display currency flags, names, and ISO 4217 currency codes.
- Swap base and quote currencies instantly.
- Calculate converted amounts from the latest available exchange rate.
- Amount-based conversion with validation.

### Market Ticker

A continuously scrolling market ticker displays selected currency pairs and their latest exchange-rate movements.

Each market item includes:

- Currency pair
- Current/latest rate
- Percentage change
- Rate date


> Since Frankfurter provides reference rates rather than real-time market prices, "Live Markets" represents the latest available FX data rather than tick-by-tick prices.

### Exchange Rate Charts

Historical exchange-rate data is visualized using **TradingView Lightweight Charts**.

The chart provides:

- Historical rate movements
- Configurable date ranges
- Latest rate
- Opening rate
- Absolute change
- Percentage change
- Loading states when changing ranges

Supported ranges include:

- 1D
- 5D
- 1M
- 3M
- 6M
- YTD
- 1Y
- MAX

### Currency Comparison

Compare the selected base currency against multiple currencies simultaneously.

The comparison system:

- Fetches multiple currency rates concurrently.
- Uses TanStack Query for request management and caching.
- Calculates converted values based on the selected amount.
- Allows currencies to be searched and filtered.
- Indicates currencies that are already in the user's favorites.

### Favorites and Logs

Users can save frequently used currency pairs and log conversions.

Favorites and Logs are stored locally, so no account is required.

### Architecture
The application separates UI state, server state, and persistent client state.

## UI State

React state is used for temporary interface state such as:

- Selected currencies
- Conversion amount
- Search input
- Chart range
- Dropdown visibility

## Server State

TanStack Query manages data retrieved from the Frankfurter API.

This provides:

- Caching
- Loading states
- Error states
- Background refetching
- Query deduplication
- Automatic request lifecycle management

## Persistent State

Favorites and Logged Converstions are persisted using the browser's localStorage.

## Responsive Design
The interface is designed around a responsive layout using Tailwind CSS.

Layouts adapt between smaller and larger screens.

### Getting Started
## Prerequisites

Make sure you have:

- Node.js
- pnpm, npm, or another package manager
- Git

## Installation

Clone the repository:
```bash
git clone <repository-url>
```

Navigate into the project:
```bash
cd fx-converter
```
Install dependencies:
```bash
pnpm install
```
Or:
```bash
npm install
```
Start the Development Server
```bash
npm run dev
```

The application will be available at the local development URL shown by Vite.

### Acknowledgements

- [Frankfurter](https://www.frankfurter.app/) — Exchange-rate data
- [TradingView Lightweight Charts](https://tradingview.github.io/lightweight-charts/) — Financial charting
- [TanStack Query](https://tanstack.com/query) — Server-state management
- [Axios](https://axios-http.com/) — HTTP client
- [Tailwind CSS](https://tailwindcss.com/) — Styling and responsive design

---

### Author

Built as a frontend engineering project from [frontend Mentor](https://www.frontendmentor.io/challenges/foreign-exchange-currency-converter) challenges focused on building a practical, data-driven financial application with a modern React and TypeScript stack.
[github](https://github.com/victorrmark)



