# Weather Station Service

An automated service that continuously monitors and updates weather station information, ensuring you always have the latest weather data links.

## 🌟 Features

- **🔄 Automated Updates**: Continuously updates weather station links every 30 minutes
- **📊 Real-time Monitoring**: Live status tracking and statistics
- **🌐 Web Dashboard**: Beautiful web interface for service control
- **📝 Comprehensive Logging**: Detailed logs of all service activities
- **⚡ Fast Updates**: Optimized for speed with minimal delays
- **🛡️ Error Handling**: Robust error handling and automatic retries
- **🔧 Easy Management**: Simple start/stop/status commands

## 📁 Service Files

- `weather-service.js` - Main service script
- `service-dashboard.html` - Web dashboard for monitoring
- `weather-service.service` - Linux systemd service file
- `install-service.bat` - Windows service installer
- `SERVICE_README.md` - This documentation

## 🚀 Quick Start

### Option 1: Manual Service (Recommended for testing)

1. **Install dependencies:**
   ```bash
   npm install xmldom
   ```

2. **Start the service:**
   ```bash
   node weather-service.js start
   ```

3. **Monitor the service:**
   ```bash
   node weather-service.js status
   ```

4. **Stop the service:**
   ```bash
   node weather-service.js stop
   ```

### Option 2: Web Dashboard

1. Open `service-dashboard.html` in your browser
2. Use the dashboard to start, stop, and monitor the service
3. View real-time logs and statistics

### Option 3: System Service (Production)

#### Linux (systemd)

1. **Copy service file:**
   ```bash
   sudo cp weather-service.service /etc/systemd/system/
   ```

2. **Create service user:**
   ```bash
   sudo useradd -r -s /bin/false weather
   sudo mkdir -p /opt/weather-scanner
   sudo chown weather:weather /opt/weather-scanner
   ```

3. **Copy files:**
   ```bash
   sudo cp weather-service.js /opt/weather-scanner/
   sudo cp station-scanner.js /opt/weather-scanner/
   sudo cp api.js /opt/weather-scanner/
   ```

4. **Enable and start service:**
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable weather-service
   sudo systemctl start weather-service
   ```

5. **Check status:**
   ```bash
   sudo systemctl status weather-service
   ```

#### Windows

1. **Download NSSM** from https://nssm.cc/
2. **Place nssm.exe** in the project directory
3. **Run as administrator:**
   ```cmd
   install-service.bat
   ```

4. **Start the service:**
   ```cmd
   net start WeatherStationService
   ```

## 📋 Service Commands

### Command Line Interface

```bash
# Start the service (runs continuously)
node weather-service.js start

# Stop the service
node weather-service.js stop

# Trigger manual update
node weather-service.js update

# Check service status
node weather-service.js status

# Show help
node weather-service.js
```

### Service Management

```bash
# Linux systemd
sudo systemctl start weather-service
sudo systemctl stop weather-service
sudo systemctl status weather-service
sudo systemctl restart weather-service

# Windows
net start WeatherStationService
net stop WeatherStationService
sc query WeatherStationService
```

## 📊 Service Monitoring

### Generated Files

The service creates several monitoring files in the `Stations/` folder:

- **`service.log`** - Real-time service activity log
- **`UPDATE_SUMMARY.md`** - Latest update statistics
- **`[StationName]_[Code].txt`** - Individual station files with latest links

### Service Statistics

- **Update Interval**: 30 minutes (configurable)
- **Stations Monitored**: 200+ Environment Canada stations
- **File Format**: .txt files with direct links
- **Log Retention**: Last 1000 log entries
- **Auto-restart**: Enabled on failure

### Status Information

```bash
node weather-service.js status
```

Shows:
- Service running status
- Last update time
- Total updates performed
- Next scheduled update
- Update interval

## 🔧 Configuration

### Update Interval

To change the update interval, modify the `interval` property in `weather-service.js`:

```javascript
this.interval = 15 * 60 * 1000; // 15 minutes
this.interval = 60 * 60 * 1000; // 1 hour
```

### Log Level

The service logs all activities with timestamps:
- **INFO**: Normal operations
- **SUCCESS**: Successful updates
- **WARNING**: Non-critical issues
- **ERROR**: Failed operations

### File Locations

- **Working Directory**: `./Stations/`
- **Log File**: `./Stations/service.log`
- **Summary File**: `./Stations/UPDATE_SUMMARY.md`
- **Station Files**: `./Stations/[StationName]_[Code].txt`

## 🛠️ Troubleshooting

### Common Issues

1. **Service won't start**
   - Check Node.js installation: `node --version`
   - Verify dependencies: `npm install xmldom`
   - Check file permissions

2. **No files generated**
   - Check internet connection
   - Verify API endpoints are accessible
   - Check service logs: `./Stations/service.log`

3. **Service stops unexpectedly**
   - Check system resources
   - Review error logs
   - Verify network connectivity

4. **Permission errors (Linux)**
   ```bash
   sudo chown -R weather:weather /opt/weather-scanner
   sudo chmod -R 755 /opt/weather-scanner
   ```

### Log Analysis

The service log contains detailed information:

```bash
# View recent logs
tail -f ./Stations/service.log

# Search for errors
grep "ERROR" ./Stations/service.log

# Check update frequency
grep "Update completed" ./Stations/service.log
```

### Performance Monitoring

- **Memory Usage**: ~50-100MB
- **CPU Usage**: Low (mostly idle)
- **Network Usage**: ~2-3 requests per station
- **Disk Usage**: ~1MB for logs + station files

## 🔄 Integration

### API Integration

The service can be integrated with other applications:

```javascript
const { WeatherStationService } = require('./weather-service.js');

const service = new WeatherStationService();

// Start service
await service.start();

// Get status
const status = service.getStatus();

// Manual update
await service.manualUpdate();
```

### Webhook Support

Add webhook notifications for important events:

```javascript
// In weather-service.js
async notifyWebhook(event, data) {
    try {
        await fetch('https://your-webhook-url.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event, data, timestamp: new Date().toISOString() })
        });
    } catch (error) {
        this.log(`Webhook notification failed: ${error.message}`, 'error');
    }
}
```

## 📈 Scaling

### Multiple Instances

For high-availability setups:

1. **Load Balancing**: Run multiple service instances
2. **Database Storage**: Store station data in database
3. **Redis Caching**: Cache API responses
4. **Monitoring**: Use Prometheus/Grafana for metrics

### Production Deployment

1. **Docker Container**:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   CMD ["node", "weather-service.js", "start"]
   ```

2. **Kubernetes Deployment**:
   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: weather-service
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: weather-service
   ```

## 🔒 Security

### Best Practices

1. **Service User**: Run as dedicated user (not root)
2. **File Permissions**: Restrict access to service files
3. **Network Security**: Use HTTPS for web dashboard
4. **Log Rotation**: Implement log rotation
5. **Monitoring**: Set up alerts for service failures

### Firewall Configuration

```bash
# Allow outbound HTTP/HTTPS
sudo ufw allow out 80/tcp
sudo ufw allow out 443/tcp
```

## 📞 Support

### Getting Help

1. **Check Logs**: Review `./Stations/service.log`
2. **Service Status**: Run `node weather-service.js status`
3. **Documentation**: Read this README
4. **Issues**: Report on GitHub

### Useful Commands

```bash
# Service health check
node weather-service.js status

# View recent activity
tail -20 ./Stations/service.log

# Check file generation
ls -la ./Stations/*.txt | wc -l

# Monitor service in real-time
tail -f ./Stations/service.log
```

## 📄 License

This project is open source and available under the MIT License.

---

**🌤️ Weather Station Service** - Always up-to-date weather information! 