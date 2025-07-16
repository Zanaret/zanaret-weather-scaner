# Weather Station API - URL Usage Guide

This guide shows you how to use the Weather Station API directly through URLs for easy integration into any application.

## 🌐 Base URL

All API endpoints are accessed through:
```
api-url.html
```

## 📋 Available Endpoints

### 1. Get All Stations
**URL:** `api-url.html?action=stations`

**Example:**
```
api-url.html?action=stations
```

**Response:**
```json
{
  "success": true,
  "count": 200,
  "stations": [
    {
      "code": "s0000123",
      "name": "Montreal",
      "lat": 45.53,
      "lon": -73.56,
      "originalLat": "45.53N",
      "originalLon": "73.56O"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 2. Get Station by Code
**URL:** `api-url.html?action=station&code=STATION_CODE`

**Example:**
```
api-url.html?action=station&code=s0000123
```

**Response:**
```json
{
  "success": true,
  "station": {
    "code": "s0000123",
    "name": "Montreal",
    "lat": 45.53,
    "lon": -73.56,
    "originalLat": "45.53N",
    "originalLon": "73.56O"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 3. Search Stations by Name
**URL:** `api-url.html?action=search&name=SEARCH_TERM`

**Example:**
```
api-url.html?action=search&name=Montreal
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "stations": [
    {
      "code": "s0000123",
      "name": "Montreal",
      "lat": 45.53,
      "lon": -73.56
    },
    {
      "code": "s0000712",
      "name": "Laval",
      "lat": 45.60,
      "lon": -73.67
    }
  ],
  "searchTerm": "Montreal",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 4. Get Latest XML File
**URL:** `api-url.html?action=xml&station=STATION_CODE`

**Example:**
```
api-url.html?action=xml&station=s0000123
```

**Response (JSON):**
```json
{
  "success": true,
  "station": "s0000123",
  "latestFile": {
    "url": "https://dd.meteo.gc.ca/today/citypage_weather/QC/12/s0000123_fr.xml",
    "type": "XML File Link",
    "hour": "12",
    "sourceUrl": "https://dd.meteo.gc.ca/today/citypage_weather/QC/12/"
  },
  "foundInCurrentHour": true,
  "foundHour": "12",
  "totalFiles": 1,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Direct URL Response:**
```
https://dd.meteo.gc.ca/today/citypage_weather/QC/12/s0000123_fr.xml
```

**For Direct URL Access:**
```
api-url.html?action=xml&station=s0000123&direct=true
```

### 5. Scan URL for Weather Data
**URL:** `api-url.html?action=scan&url=URL_TO_SCAN&hour=HOUR`

**Example:**
```
api-url.html?action=scan&url=https://dd.meteo.gc.ca/today/citypage_weather/QC/&hour=12
```

**Response:**
```json
{
  "success": true,
  "url": "https://dd.meteo.gc.ca/today/citypage_weather/QC/12/",
  "hour": "12",
  "results": {
    "xmlFiles": [
      {
        "url": "https://dd.meteo.gc.ca/today/citypage_weather/QC/12/s0000123_fr.xml",
        "type": "XML File Link",
        "context": "..."
      }
    ],
    "timestamps": [
      {
        "raw": "20240115T123045.123",
        "parsed": {
          "formatted": "2024-01-15 12:30:45.123",
          "date": "2024-01-15",
          "time": "12:30:45"
        },
        "context": "..."
      }
    ],
    "stationCodes": [
      {
        "raw": "s0000123",
        "parsed": {
          "formatted": "s-0000123",
          "stationNumber": "0000123",
          "prefix": "s"
        },
        "context": "..."
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 6. Get Station Statistics
**URL:** `api-url.html?action=stats`

**Example:**
```
api-url.html?action=stats
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalStations": 200,
    "stationsWithData": 45,
    "currentHour": "12",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

## 🔗 Integration Examples

### JavaScript (Fetch API)
```javascript
// Get all stations
fetch('api-url.html?action=stations')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(`Found ${data.count} stations`);
      data.stations.forEach(station => {
        console.log(`${station.name}: ${station.code}`);
      });
    }
  });

// Get specific station
fetch('api-url.html?action=station&code=s0000123')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(`Station: ${data.station.name}`);
      console.log(`Location: ${data.station.lat}, ${data.station.lon}`);
    }
  });

// Search for stations
fetch('api-url.html?action=search&name=Montreal')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(`Found ${data.count} stations matching "Montreal"`);
    }
  });

// Get latest XML file
fetch('api-url.html?action=xml&station=s0000123')
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log(`Latest XML: ${data.latestFile.url}`);
      // Fetch the actual XML data
      fetch(data.latestFile.url)
        .then(response => response.text())
        .then(xmlContent => console.log('Weather data:', xmlContent));
    }
  });
```

### jQuery
```javascript
// Get all stations
$.getJSON('api-url.html?action=stations', function(data) {
    if (data.success) {
        console.log(`Found ${data.count} stations`);
    }
});

// Get specific station
$.getJSON('api-url.html?action=station&code=s0000123', function(data) {
    if (data.success) {
        console.log(`Station: ${data.station.name}`);
    }
});
```

### Python (Requests)
```python
import requests
import json

# Get all stations
response = requests.get('api-url.html?action=stations')
data = response.json()

if data['success']:
    print(f"Found {data['count']} stations")
    for station in data['stations']:
        print(f"{station['name']}: {station['code']}")

# Get specific station
response = requests.get('api-url.html?action=station&code=s0000123')
data = response.json()

if data['success']:
    print(f"Station: {data['station']['name']}")
    print(f"Location: {data['station']['lat']}, {data['station']['lon']}")

# Search for stations
response = requests.get('api-url.html?action=search&name=Montreal')
data = response.json()

if data['success']:
    print(f"Found {data['count']} stations matching 'Montreal'")

# Get latest XML file
response = requests.get('api-url.html?action=xml&station=s0000123')
data = response.json()

if data['success']:
    print(f"Latest XML: {data['latestFile']['url']}")
    # Fetch the actual XML data
    xml_response = requests.get(data['latestFile']['url'])
    print('Weather data:', xml_response.text)
```

### cURL
```bash
# Get all stations
curl "api-url.html?action=stations"

# Get specific station
curl "api-url.html?action=station&code=s0000123"

# Search for stations
curl "api-url.html?action=search&name=Montreal"

# Get latest XML file
curl "api-url.html?action=xml&station=s0000123"

# Get statistics
curl "api-url.html?action=stats"

# Scan URL (note: URL must be encoded)
curl "api-url.html?action=scan&url=https%3A//dd.meteo.gc.ca/today/citypage_weather/QC/&hour=12"
```

### PHP
```php
<?php
// Get all stations
$response = file_get_contents('api-url.html?action=stations');
$data = json_decode($response, true);

if ($data['success']) {
    echo "Found " . $data['count'] . " stations\n";
    foreach ($data['stations'] as $station) {
        echo $station['name'] . ": " . $station['code'] . "\n";
    }
}

// Get specific station
$response = file_get_contents('api-url.html?action=station&code=s0000123');
$data = json_decode($response, true);

if ($data['success']) {
    echo "Station: " . $data['station']['name'] . "\n";
    echo "Location: " . $data['station']['lat'] . ", " . $data['station']['lon'] . "\n";
}
?>
```

### HTML Links
```html
<!-- Direct links to API endpoints -->
<a href="api-url.html?action=stations">Get All Stations</a>
<a href="api-url.html?action=station&code=s0000123">Get Montreal Station</a>
<a href="api-url.html?action=search&name=Quebec">Search Quebec Stations</a>
<a href="api-url.html?action=xml&station=s0000123">Get Montreal Weather Data</a>
<a href="api-url.html?action=stats">Get Statistics</a>
```

## 🔧 Advanced Usage

### URL Encoding
When using URLs with special characters, make sure to encode them properly:

```javascript
// JavaScript
const url = encodeURIComponent('https://dd.meteo.gc.ca/today/citypage_weather/QC/');
const apiUrl = `api-url.html?action=scan&url=${url}&hour=12`;

// Python
import urllib.parse
url = urllib.parse.quote('https://dd.meteo.gc.ca/today/citypage_weather/QC/')
api_url = f'api-url.html?action=scan&url={url}&hour=12'
```

### Error Handling
All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message description",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

Common error scenarios:
- Invalid station code format
- Station not found
- Missing required parameters
- Invalid action parameter
- Network connectivity issues

### Web Service Mode
For programmatic access, add `format=json` or `service=true` to force JSON response:

```
api-url.html?action=stations&format=json
api-url.html?action=station&code=s0000123&service=true
```

### Direct URL Access
For the XML endpoint, add `direct=true` to get just the direct URL to the weather data file:

```
api-url.html?action=xml&station=s0000123&direct=true
```

This will return just the direct URL (e.g., `https://dd.meteo.gc.ca/today/citypage_weather/QC/12/s0000123_fr.xml`) without any formatting or JSON wrapper.

## 🚀 Quick Start Examples

### 1. Get Montreal Weather Data
```
api-url.html?action=xml&station=s0000123
```

### 2. Find All Stations Near Quebec City
```
api-url.html?action=search&name=Quebec
```

### 3. Get Current Hour Statistics
```
api-url.html?action=stats
```

### 4. Scan Current Hour for All Data
```
api-url.html?action=scan&url=https://dd.meteo.gc.ca/today/citypage_weather/QC/&hour=current
```

### 5. Get All Available Stations
```
api-url.html?action=stations
```

## 📊 Response Format

All successful responses follow this format:
```json
{
  "success": true,
  "data": "...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

All error responses follow this format:
```json
{
  "success": false,
  "error": "Error description",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🔒 CORS and Security

The API supports cross-origin requests and can be used from any domain. For production applications, consider:

- Implementing rate limiting
- Adding authentication if needed
- Using HTTPS for secure data transmission
- Implementing caching strategies

## 🧪 Testing

You can test all endpoints directly in your browser by visiting the URLs. The API will return JSON responses that you can view and use for development.

For automated testing, use tools like:
- Postman
- cURL
- JavaScript fetch API
- Python requests library
- Any HTTP client

---

**Ready to integrate! Just use the URLs above in your applications.** 