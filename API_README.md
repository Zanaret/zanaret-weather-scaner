# Weather Station API

A comprehensive JavaScript API for accessing Environment Canada weather station data, providing programmatic access to weather information, station locations, and XML data files.

## 🌟 Features

- **200+ Weather Stations**: Complete database of Quebec weather stations with coordinates
- **Real-time Data Access**: Current hour detection and latest XML file retrieval
- **Station Search**: Find stations by code or name
- **URL Scanning**: Scan Environment Canada servers for weather data
- **Timestamp Parsing**: Parse and format weather timestamps
- **CORS Support**: Built-in proxy support for cross-origin requests
- **Interactive Demo**: Complete demo interface for testing

## 📦 Installation

### Browser Usage
```html
<script src="api.js"></script>
```

### Node.js Usage
```javascript
const WeatherStationAPI = require('./api.js');
```

## 🚀 Quick Start

```javascript
// Initialize the API
const api = new WeatherStationAPI();

// Get all weather stations
const stations = await api.getAllStations();
console.log(`Found ${stations.count} stations`);

// Get latest weather data for a specific station
const xmlData = await api.getLatestXMLFile('s0000123');
if (xmlData.success) {
    console.log(`Latest file: ${xmlData.latestFile.url}`);
}
```

## 📚 API Reference

### Constructor
```javascript
const api = new WeatherStationAPI();
```
Creates a new instance of the WeatherStationAPI class.

### Methods

#### `getAllStations()`
Retrieves information about all available weather stations.

**Returns:** Promise<Object>
```javascript
{
    success: true,
    count: 200,
    stations: [
        {
            code: "s0000123",
            name: "Montreal",
            lat: 45.53,
            lon: -73.56,
            originalLat: "45.53N",
            originalLon: "73.56O"
        }
        // ... more stations
    ],
    timestamp: "2024-01-15T10:30:00.000Z"
}
```

#### `getStationByCode(stationCode)`
Finds a specific weather station by its station code.

**Parameters:**
- `stationCode` (string): Station code in format `s0000XXX`

**Returns:** Promise<Object>
```javascript
{
    success: true,
    station: {
        code: "s0000123",
        name: "Montreal",
        lat: 45.53,
        lon: -73.56,
        originalLat: "45.53N",
        originalLon: "73.56O"
    },
    timestamp: "2024-01-15T10:30:00.000Z"
}
```

#### `searchStationsByName(searchTerm)`
Searches for weather stations by name (partial matches supported).

**Parameters:**
- `searchTerm` (string): Station name to search for

**Returns:** Promise<Object>
```javascript
{
    success: true,
    count: 2,
    stations: [
        {
            code: "s0000123",
            name: "Montreal",
            lat: 45.53,
            lon: -73.56
        },
        {
            code: "s0000712",
            name: "Laval",
            lat: 45.60,
            lon: -73.67
        }
    ],
    searchTerm: "Montreal",
    timestamp: "2024-01-15T10:30:00.000Z"
}
```

#### `getLatestXMLFile(stationCode)`
Finds the most recent XML weather data file for a specific station.

**Parameters:**
- `stationCode` (string): Station code in format `s0000XXX`

**Returns:** Promise<Object>
```javascript
{
    success: true,
    station: "s0000123",
    latestFile: {
        url: "https://dd.meteo.gc.ca/today/citypage_weather/QC/12/s0000123_fr.xml",
        type: "XML File Link",
        hour: "12",
        sourceUrl: "https://dd.meteo.gc.ca/today/citypage_weather/QC/12/"
    },
    foundInCurrentHour: true,
    foundHour: "12",
    totalFiles: 1,
    timestamp: "2024-01-15T10:30:00.000Z"
}
```

#### `scanURL(url, hour)`
Scans a specific URL for XML files, timestamps, and station codes.

**Parameters:**
- `url` (string): URL to scan
- `hour` (string, optional): Specific hour to scan (00-23)

**Returns:** Promise<Object>
```javascript
{
    success: true,
    url: "https://dd.meteo.gc.ca/today/citypage_weather/QC/12/",
    hour: "12",
    results: {
        xmlFiles: [
            {
                url: "https://dd.meteo.gc.ca/today/citypage_weather/QC/12/s0000123_fr.xml",
                type: "XML File Link",
                context: "..."
            }
        ],
        timestamps: [
            {
                raw: "20240115T123045.123",
                parsed: {
                    formatted: "2024-01-15 12:30:45.123",
                    date: "2024-01-15",
                    time: "12:30:45"
                },
                context: "..."
            }
        ],
        stationCodes: [
            {
                raw: "s0000123",
                parsed: {
                    formatted: "s-0000123",
                    stationNumber: "0000123",
                    prefix: "s"
                },
                context: "..."
            }
        ]
    },
    timestamp: "2024-01-15T10:30:00.000Z"
}
```

#### `getStationStats()`
Gets overall statistics about weather stations and current data availability.

**Returns:** Promise<Object>
```javascript
{
    success: true,
    stats: {
        totalStations: 200,
        stationsWithData: 45,
        currentHour: "12",
        timestamp: "2024-01-15T10:30:00.000Z"
    }
}
```

#### `getCurrentHour()`
Gets the current UTC hour in 24-hour format.

**Returns:** string
```javascript
"12" // Returns current hour as "00" to "23"
```

## 🔧 Utility Methods

### `parseTimestamp(timestamp)`
Parses timestamp in format `YYYYMMDDTHHMMSS.MSS`.

**Parameters:**
- `timestamp` (string): Timestamp in format `20240115T123045.123`

**Returns:** Object
```javascript
{
    formatted: "2024-01-15 12:30:45.123",
    date: "2024-01-15",
    time: "12:30:45",
    milliseconds: "123",
    year: "2024",
    month: "01",
    day: "15",
    hour: "12",
    minute: "30",
    second: "45"
}
```

### `parseStationCode(stationCode)`
Parses station code in format `s0000XXX`.

**Parameters:**
- `stationCode` (string): Station code like `s0000123`

**Returns:** Object
```javascript
{
    formatted: "s-0000123",
    stationNumber: "0000123",
    prefix: "s",
    fullCode: "S0000123"
}
```

## 🌐 Data Sources

### Primary Data Source
- **Environment Canada**: `https://dd.meteo.gc.ca/today/citypage_weather/QC/`
- **CORS Proxy**: `https://api.allorigins.win/raw?url=`

### Station Data
The API includes embedded data for 200+ weather stations across Quebec with:
- Station codes (s0000XXX format)
- Station names
- Geographic coordinates (latitude/longitude)
- Original coordinate format (N/S, E/O)

## 📊 Error Handling

All API methods return consistent error responses:

```javascript
{
    success: false,
    error: "Error message description",
    timestamp: "2024-01-15T10:30:00.000Z"
}
```

Common error scenarios:
- Invalid station code format
- Station not found
- Network connectivity issues
- CORS restrictions
- Invalid URL format

## 🧪 Testing

### Interactive Demo
Open `api-demo.html` in a web browser to test all API functionality interactively.

### Quick Tests
```javascript
// Run comprehensive tests
const api = new WeatherStationAPI();

// Test 1: Get all stations
const allStations = await api.getAllStations();
console.log(`Found ${allStations.count} stations`);

// Test 2: Get specific station
const station = await api.getStationByCode('s0000123');
console.log(`Station: ${station.station.name}`);

// Test 3: Search for stations
const search = await api.searchStationsByName('Montreal');
console.log(`Found ${search.count} stations matching "Montreal"`);

// Test 4: Get latest XML file
const xmlFile = await api.getLatestXMLFile('s0000123');
console.log(`Latest file: ${xmlFile.latestFile.url}`);

// Test 5: Get statistics
const stats = await api.getStationStats();
console.log(`Total stations: ${stats.stats.totalStations}`);
```

## 🔗 Integration Examples

### Web Application
```html
<!DOCTYPE html>
<html>
<head>
    <title>Weather Station App</title>
</head>
<body>
    <div id="stations"></div>
    
    <script src="api.js"></script>
    <script>
        const api = new WeatherStationAPI();
        
        async function loadStations() {
            const result = await api.getAllStations();
            const stationsDiv = document.getElementById('stations');
            
            result.stations.forEach(station => {
                stationsDiv.innerHTML += `
                    <div>
                        <h3>${station.name}</h3>
                        <p>Code: ${station.code}</p>
                        <p>Location: ${station.lat}, ${station.lon}</p>
                    </div>
                `;
            });
        }
        
        loadStations();
    </script>
</body>
</html>
```

### Node.js Application
```javascript
const WeatherStationAPI = require('./api.js');

async function weatherApp() {
    const api = new WeatherStationAPI();
    
    // Get Montreal weather data
    const montrealData = await api.getLatestXMLFile('s0000123');
    
    if (montrealData.success) {
        console.log(`Montreal weather data: ${montrealData.latestFile.url}`);
        
        // Fetch the actual XML data
        const response = await fetch(montrealData.latestFile.url);
        const xmlContent = await response.text();
        console.log('Weather data:', xmlContent);
    }
}

weatherApp();
```

### React Component
```jsx
import React, { useState, useEffect } from 'react';

function WeatherStationList() {
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function loadStations() {
            const api = new WeatherStationAPI();
            const result = await api.getAllStations();
            setStations(result.stations);
            setLoading(false);
        }
        
        loadStations();
    }, []);
    
    if (loading) return <div>Loading stations...</div>;
    
    return (
        <div>
            <h2>Weather Stations ({stations.length})</h2>
            {stations.map(station => (
                <div key={station.code}>
                    <h3>{station.name}</h3>
                    <p>Code: {station.code}</p>
                    <p>Location: {station.lat}, {station.lon}</p>
                </div>
            ))}
        </div>
    );
}
```

## 🔒 CORS and Security

The API uses a CORS proxy (`api.allorigins.win`) to bypass cross-origin restrictions when accessing Environment Canada's servers. This allows the API to work in web browsers without requiring server-side implementation.

For production applications, consider:
- Implementing your own CORS proxy
- Using server-side API endpoints
- Adding rate limiting
- Implementing caching strategies

## 📈 Performance Considerations

- **Station Data**: 200+ stations are embedded in the API for instant access
- **Network Requests**: API methods make HTTP requests to Environment Canada servers
- **Caching**: Consider implementing client-side caching for frequently accessed data
- **Rate Limiting**: Be mindful of server load when making multiple requests

## 🤝 Contributing

To contribute to this API:

1. Fork the repository
2. Create a feature branch
3. Add your improvements
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

For issues, questions, or feature requests:
- Check the interactive demo (`api-demo.html`)
- Review the error handling section
- Test with the provided examples
- Open an issue in the repository

---

**Built with ❤️ for the weather data community** 