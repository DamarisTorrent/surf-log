# 🌊 SurfLog - NOAA Buoy Wave Data Viewer

A modern, beautiful web application for viewing real-time and historical wave data from NOAA buoys. Built with React, TypeScript, and Tailwind CSS.

![SurfLog](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue)

## ✨ Features

- **Real-time Wave Data** - Live data from 70+ NOAA buoys across all US coastal regions
- **Historical Data** - Access wave data up to 15 years back
- **Beautiful Visualizations** - Interactive charts showing wave height and period trends
- **Detailed Metrics** - Wave height, period, wind speed, direction, and more
- **Responsive Design** - Mobile-first design that works on all devices
- **Dark Mode Ready** - Built-in dark mode support
- **No Database Required** - Direct integration with NOAA APIs
- **100% Free Hosting** - Deploy on Vercel for free

## 🚀 Live Demo

[View Live Demo](#) (Coming soon)

## 📍 Available Buoys (70+ Stations)

### 🦞 Northeast Atlantic
6 buoys from Maine to New Jersey including Nantucket, Montauk Point, Delaware Bay, and Georges Bank

### 🌊 Mid-Atlantic
3 buoys from North Carolina including South Hatteras, Frying Pan Shoals, and Diamond Shoals

### 🏖️ Southeast Atlantic
5 buoys from South Carolina to Florida including Charleston, Savannah, Jacksonville, and Cocoa Beach

### 🌴 Gulf of Mexico
6 buoys from Texas to Florida including Corpus Christi, Pensacola, and Tampa

### 🏝️ Caribbean
5 buoys including Bahamas, Puerto Rico, and Virgin Islands

### 🌲 Pacific Northwest
6 buoys from Washington to Oregon including Columbia River Bar, Tillamook, and Stonewall Bank

### 🌁 Central California
5 buoys from Bodega Bay to Monterey including San Francisco, Half Moon Bay, and Monterey Bay

### 🌅 Southern California
9 buoys from Point Arguello to San Diego including Santa Barbara, Long Beach, and San Clemente

### 🌺 Hawaii
6 buoys including Oahu, Kauai, and Big Island offshore monitoring stations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Data Source**: NOAA National Data Buoy Center API

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/surf-log.git

# Navigate to project directory
cd surf-log

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect Vite and configure the build
5. Deploy!

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
# Build command: npm run build
# Publish directory: dist
```

## 📊 Data Source

This application fetches data directly from the NOAA National Data Buoy Center:
- Real-time data (last 45 days): `https://www.ndbc.noaa.gov/data/realtime2/`
- Historical data: `https://www.ndbc.noaa.gov/view_text_file.php`

## 🎨 Features in Detail

### Real-time Monitoring
View current wave conditions including:
- Wave height (in feet)
- Dominant wave period
- Average wave period
- Wave direction
- Wind speed and gusts
- Atmospheric pressure

### Historical Analysis
Select any date within the last 15 years to view:
- Hourly wave data readings
- Wave height trends over 48 hours
- Historical weather patterns

### Beautiful UI
- Ocean-themed color palette
- Glassmorphic cards with backdrop blur
- Smooth animations and transitions
- Responsive grid layouts
- Interactive charts

## 🔧 Project Structure

```
surf-log/
├── src/
│   ├── components/         # React components
│   │   ├── BuoySelector.tsx
│   │   ├── Card.tsx
│   │   ├── DatePicker.tsx
│   │   ├── WaveChart.tsx
│   │   └── WaveDataDisplay.tsx
│   ├── lib/               # Utility functions
│   │   ├── noaa-api.ts    # NOAA API integration
│   │   └── utils.ts       # Helper functions
│   ├── types/             # TypeScript types
│   │   └── buoy.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Data provided by [NOAA National Data Buoy Center](https://www.ndbc.noaa.gov/)
- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with 🌊 by surfers, for surfers
