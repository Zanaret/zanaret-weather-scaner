# Weather Scanner Web Service

A web service that finds and returns XML weather data URLs for Canadian weather stations.

## Features

- 🔍 **XML File Scanner**: Automatically finds XML weather files
- 🕐 **Timestamp Detection**: Identifies weather data timestamps
- 📍 **Station Code Scanner**: Locates weather station codes (s0000XXX format)
- 🗺️ **Interactive Map**: View all weather stations on an interactive map
- 🌐 **Web Service API**: Get XML URLs via HTTP requests

## Usage

### Web Interface
Visit the main page to use the interactive scanner and map.

### Web Service API

#### Get XML URL for a Station
```
GET https://yourusername.github.io/weather-scanner/?station=s0000408
```

#### Response Format
```
✅ Found XML file for station s0000408 in hour 20 (current hour): https://dd.meteo.gc.ca/today/citypage_weather/QC/20/20250716T200338.917Z_MSC_CitypageWeather_s0000408_fr.xml
```

#### Examples

**Station s0000408 (Vallée de la Matapédia):**
```
https://yourusername.github.io/weather-scanner/?station=s0000408
```

**Station s0000319 (Grande-Vallée):**
```
https://yourusername.github.io/weather-scanner/?station=s0000319
```

**Station s0000314 (Percé):**
```
https://yourusername.github.io/weather-scanner/?station=s0000314
```

## API Usage Examples

### Using cURL
```bash
curl "https://yourusername.github.io/weather-scanner/?station=s0000408"
```

### Using PowerShell
```powershell
Invoke-WebRequest -Uri "https://yourusername.github.io/weather-scanner/?station=s0000408" -UseBasicParsing
```

### Using Python
```python
import requests
response = requests.get("https://yourusername.github.io/weather-scanner/?station=s0000408")
print(response.text)
```

### Using JavaScript
```javascript
fetch("https://yourusername.github.io/weather-scanner/?station=s0000408")
    .then(response => response.text())
    .then(data => console.log(data));
```

## Station Codes

The service supports all Canadian weather station codes in the format `s0000XXX`. Some examples:

- `s0000408` - Vallée de la Matapédia
- `s0000319` - Grande-Vallée
- `s0000314` - Percé
- `s0000315` - Chandler
- `s0000182` - Donnacona

## Data Source

Weather data is sourced from Environment and Climate Change Canada:
- Base URL: `https://dd.meteo.gc.ca/today/citypage_weather/QC/`
- Format: XML files with French weather data (`_fr.xml`)
- Update Frequency: Hourly

## Features

- ✅ **Automatic Hour Detection**: Finds current or most recent data
- ✅ **Error Handling**: Returns informative error messages
- ✅ **CORS Support**: Works with web applications
- ✅ **Multiple Formats**: Supports JSON and plain text responses
- ✅ **Interactive Map**: Visual station location display
- ✅ **Real-time Data**: Searches through 24 hours of data

## Error Responses

If a station is not found:
```
❌ No XML files found for station s0000999

No XML files were found for station s0000999 in the current hour or any of the previous 24 hours.
```

## Development

This is a client-side web application built with:
- HTML5
- CSS3
- JavaScript (ES6+)
- Leaflet.js (for maps)

## License

This project is open source and available under the MIT License. 