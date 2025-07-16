#!/usr/bin/env node

// Weather Station Service
// Continuously monitors and updates weather station information

const fs = require('fs');
const path = require('path');

// Simple implementation of the WeatherStationAPI for Node.js

// Simple implementation of the WeatherStationAPI for Node.js
class WeatherStationAPI {
    constructor() {
        this.baseUrl = 'https://dd.meteo.gc.ca/today/citypage_weather/QC/';
        this.proxyUrl = 'https://api.allorigins.win/raw?url=';
        this.stationData = this.loadStationData();
    }

    // Load embedded station data
    loadStationData() {
        const stationCoordinates = `<stations>
<name code="s0000354" lat="48.80N" lon="79.21O">La Sarre</name>
<name code="s0000270" lat="48.88N" lon="72.23O">Dolbeau-Mistassini</name>
<name code="s0000314" lat="48.50N" lon="64.16O">Percé</name>
<name code="s0000315" lat="48.35N" lon="64.68O">Chandler</name>
<name code="s0000182" lat="46.68N" lon="71.74O">Donnacona</name>
<name code="s0000061" lat="45.48N" lon="74.30O">Rigaud</name>
<name code="s0000062" lat="45.42N" lon="74.04O">Saint-Lazare</name>
<name code="s0000361" lat="45.54N" lon="73.90O">Deux-Montagnes</name>
<name code="s0000362" lat="45.40N" lon="74.03O">Vaudreuil-Dorion</name>
<name code="s0000363" lat="45.42N" lon="74.04O">Pincourt</name>
<name code="s0000185" lat="46.21N" lon="70.77O">Beauceville</name>
<name code="s0000186" lat="45.58N" lon="70.89O">Lac-Mégantic</name>
<name code="s0000187" lat="46.13N" lon="70.36O">Saint-Georges</name>
<name code="s0000416" lat="46.81N" lon="71.17O">Lévis</name>
<name code="s0000194" lat="47.44N" lon="70.46O">Charlevoix</name>
<name code="s0000320" lat="49.16N" lon="66.38O">Cap Chat</name>
<name code="s0000321" lat="48.93N" lon="66.28O">Gaspésie (Parc national)</name>
<name code="s0000322" lat="49.12N" lon="66.49O">Sainte-Anne-Des-Monts</name>
<name code="s0000578" lat="60.81N" lon="78.20O">Akulivik</name>
<name code="s0000342" lat="47.44N" lon="70.51O">Baie-Saint-Paul</name>
<name code="s0000295" lat="48.15N" lon="69.72O">Tadoussac</name>
<name code="s0000284" lat="47.75N" lon="71.25O">Laurentides (Réserve faunique)</name>
<name code="s0000268" lat="48.01N" lon="65.34O">New Carlisle</name>
<name code="s0000269" lat="48.04N" lon="65.49O">Bonaventure</name>
<name code="s0000245" lat="47.33N" lon="77.00O">La Vérendrye (Réserve faunique)</name>
<name code="s0000717" lat="48.10N" lon="77.80O">Val-d'Or</name>
<name code="s0000718" lat="48.47N" lon="78.14O">Amos</name>
<name code="s0000345" lat="45.27N" lon="72.15O">Magog</name>
<name code="s0000393" lat="48.45N" lon="68.52O">Rimouski</name>
<name code="s0000244" lat="46.37N" lon="75.98O">Maniwaki</name>
<name code="s0000246" lat="46.55N" lon="75.50O">Mont-Laurier</name>
<name code="s0000174" lat="47.62N" lon="61.52O">Îles-de-la-Madeleine</name>
<name code="s0000333" lat="47.65N" lon="70.15O">La Malbaie</name>
<name code="s0000334" lat="46.98N" lon="70.55O">Montmagny</name>
<name code="s0000335" lat="47.56N" lon="69.87O">Kamouraska</name>
<name code="s0000336" lat="47.10N" lon="70.35O">L'Islet</name>
<name code="s0000046" lat="45.39N" lon="73.52O">Candiac</name>
<name code="s0000048" lat="45.40N" lon="73.56O">La Prairie</name>
<name code="s0000049" lat="45.38N" lon="73.58O">Saint-Constant</name>
<name code="s0000050" lat="45.40N" lon="73.56O">Sainte-Catherine</name>
<name code="s0000059" lat="45.63N" lon="72.96O">Saint-Hyacinthe</name>
<name code="s0000180" lat="45.68N" lon="73.43O">Varennes</name>
<name code="s0000551" lat="45.53N" lon="73.48O">Longueuil</name>
<name code="s0000552" lat="45.44N" lon="73.25O">Richelieu</name>
<name code="s0000553" lat="45.36N" lon="73.48O">Carignan</name>
<name code="s0000554" lat="45.45N" lon="73.29O">Chambly</name>
<name code="s0000555" lat="45.55N" lon="73.32O">Mont-Saint-Hilaire</name>
<name code="s0000556" lat="45.54N" lon="73.21O">Otterburn Park</name>
<name code="s0000557" lat="45.65N" lon="73.30O">Saint-Amable</name>
<name code="s0000558" lat="45.55N" lon="73.32O">Saint-Basile Le Grand</name>
<name code="s0000559" lat="45.59N" lon="73.34O">Sainte-Julie</name>
<name code="s0000769" lat="45.38N" lon="73.55O">Delson</name>
<name code="s0000483" lat="49.21N" lon="68.18O">Baie-Comeau</name>
<name code="s0000484" lat="48.74N" lon="69.09O">Forestville</name>
<name code="s0000610" lat="50.18N" lon="61.81O">Natashquan</name>
<name code="s0000541" lat="50.22N" lon="63.17O">Havre St-Pierre</name>
<name code="s0000574" lat="61.60N" lon="71.96O">Kangiqsujuaq</name>
<name code="s0000575" lat="61.60N" lon="71.96O">Lac Raglan</name>
<name code="s0000617" lat="49.76N" lon="77.63O">Matagami</name>
<name code="s0000711" lat="60.03N" lon="77.27O">Puvirnituq</name>
<name code="s0000586" lat="59.30N" lon="69.60O">Aupaluk</name>
<name code="s0000598" lat="49.92N" lon="74.37O">Chibougamau</name>
<name code="s0000738" lat="52.79N" lon="67.09O">Fermont</name>
<name code="s0000542" lat="55.30N" lon="77.74O">Kuujjuarapik</name>
<name code="s0000681" lat="45.40N" lon="71.90O">Sherbrooke</name>
<name code="s0000682" lat="45.60N" lon="71.96O">Val-des-Sources</name>
<name code="s0000319" lat="49.25N" lon="65.57O">Grande-Vallée</name>
<name code="s0000810" lat="48.10N" lon="66.11O">Pointe-à-la-Croix</name>
<name code="s0000811" lat="48.10N" lon="66.11O">Carleton-sur-Mer</name>
<name code="s0000124" lat="47.44N" lon="72.78O">La Tuque</name>
<name code="s0000125" lat="47.08N" lon="72.91O">Mauricie</name>
<name code="s0000052" lat="45.41N" lon="72.73O">Granby</name>
<name code="s0000063" lat="45.28N" lon="72.98O">Farnham</name>
<name code="s0000028" lat="48.36N" lon="69.42O">Escoumins</name>
<name code="s0000205" lat="46.69N" lon="71.36O">Bernières</name>
<name code="s0000611" lat="45.49N" lon="75.66O">Gatineau</name>
<name code="s0000612" lat="45.70N" lon="74.98O">Papineau</name>
<name code="s0000614" lat="45.65N" lon="75.66O">Val-des-Monts</name>
<name code="s0000615" lat="45.50N" lon="75.78O">Chelsea</name>
<name code="s0000699" lat="58.69N" lon="69.94O">Tasiujaq</name>
<name code="s0000060" lat="45.43N" lon="73.16O">Marieville</name>
<name code="s0000202" lat="45.31N" lon="73.27O">Saint-Jean-sur-Richelieu</name>
<name code="s0000203" lat="45.34N" lon="73.51O">Saint-Luc</name>
<name code="s0000673" lat="48.51N" lon="72.23O">Roberval</name>
<name code="s0000674" lat="48.63N" lon="72.32O">Lac-Saint-Jean</name>
<name code="s0000675" lat="48.63N" lon="72.32O">Saint-Félicien</name>
<name code="s0000055" lat="46.01N" lon="73.92O">Prévost</name>
<name code="s0000056" lat="45.82N" lon="73.96O">Sainte-Sophie</name>
<name code="s0000058" lat="46.01N" lon="73.92O">Saint-Sauveur</name>
<name code="s0000600" lat="45.65N" lon="74.08O">Mirabel</name>
<name code="s0000601" lat="45.82N" lon="73.96O">Saint-Jérôme</name>
<name code="s0000602" lat="45.65N" lon="74.34O">Lachute</name>
<name code="s0000603" lat="45.68N" lon="73.89O">Blainville</name>
<name code="s0000604" lat="45.61N" lon="73.84O">Boisbriand</name>
<name code="s0000605" lat="45.67N" lon="73.79O">Lorraine</name>
<name code="s0000606" lat="45.58N" lon="73.93O">Rosemère</name>
<name code="s0000607" lat="45.76N" lon="73.81O">Sainte-Anne-Des-Plaines</name>
<name code="s0000608" lat="45.58N" lon="73.93O">Sainte-Thérèse</name>
<name code="s0000609" lat="45.57N" lon="73.88O">Saint-Eustache</name>
<name code="s0000599" lat="56.55N" lon="76.55O">Umiujaq</name>
<name code="s0000793" lat="62.21N" lon="75.65O">Salluit</name>
<name code="s0000579" lat="51.47N" lon="78.76O">Waskaganish</name>
<name code="s0000719" lat="58.11N" lon="68.40O">Kuujjuaq</name>
<name code="s0000532" lat="53.79N" lon="77.61O">La Grande Rivière</name>
<name code="s0000580" lat="53.79N" lon="77.61O">Baie-James</name>
<name code="s0000544" lat="61.05N" lon="69.63O">Quaqtaq</name>
<name code="s0000346" lat="46.39N" lon="72.75O">Trois-Rivières</name>
<name code="s0000347" lat="46.34N" lon="72.43O">Bécancour</name>
<name code="s0000348" lat="46.25N" lon="72.95O">Louiseville</name>
<name code="s0000459" lat="46.44N" lon="73.17O">Lanaudière</name>
<name code="s0000054" lat="46.06N" lon="71.96O">Victoriaville</name>
<name code="s0000480" lat="60.02N" lon="70.01O">Kangirsuk</name>
<name code="s0000204" lat="46.82N" lon="71.27O">Vanier</name>
<name code="s0000620" lat="46.81N" lon="71.22O">Québec</name>
<name code="s0000535" lat="48.83N" lon="64.57O">Gaspé</name>
<name code="s0000536" lat="48.83N" lon="64.57O">Forillon</name>
<name code="s0000537" lat="48.83N" lon="64.57O">Forillon ( Parc national)</name>
<name code="s0000044" lat="45.31N" lon="73.86O">Beauharnois</name>
<name code="s0000635" lat="45.53N" lon="73.56O">Montréal</name>
<name code="s0000712" lat="45.60N" lon="73.67O">Laval</name>
<name code="s0000800" lat="50.22N" lon="66.37O">Sept-Îles</name>
<name code="s0000801" lat="50.03N" lon="66.86O">Port-Cartier</name>
<name code="s0000563" lat="62.42N" lon="77.92O">Ivujivik</name>
<name code="s0000591" lat="58.70N" lon="65.95O">Kangiqsualujjuaq</name>
<name code="s0000709" lat="46.56N" lon="72.74O">Shawinigan</name>
<name code="s0000406" lat="48.47N" lon="67.42O">Amqui</name>
<name code="s0000407" lat="47.98N" lon="66.96O">Matapédia</name>
<name code="s0000408" lat="47.98N" lon="66.96O">Vallée de la Matapédia</name>
<name code="s0000253" lat="47.74N" lon="69.54O">Rivière-du-Loup</name>
<name code="s0000254" lat="48.12N" lon="69.17O">Trois-Pistoles</name>
<name code="s0000255" lat="47.67N" lon="68.98O">Témiscouata</name>
<name code="s0000121" lat="50.47N" lon="59.61O">Chevery</name>
<name code="s0000486" lat="48.32N" lon="71.13O">Bagotville</name>
<name code="s0000353" lat="48.24N" lon="79.02O">Rouyn-Noranda</name>
<name code="s0000783" lat="48.59N" lon="68.19O">Mont-Joli</name>
<name code="s0000784" lat="48.84N" lon="67.53O">Matane</name>
<name code="s0000064" lat="46.10N" lon="71.30O">Thetford Mines</name>
<name code="s0000094" lat="50.29N" lon="64.04O">Mingan</name>
<name code="s0000085" lat="47.39N" lon="78.70O">Témiscamingue</name>
<name code="s0000051" lat="45.25N" lon="73.80O">Saint-Rémi</name>
<name code="s0000296" lat="45.13N" lon="71.80O">Coaticook</name>
<name code="s0000260" lat="46.23N" lon="72.61O">Nicolet</name>
<name code="s0000098" lat="45.25N" lon="74.12O">Salaberry-de-Valleyfield</name>
<name code="s0000099" lat="45.09N" lon="74.18O">Huntingdon</name>
<name code="s0000742" lat="45.18N" lon="74.24O">Saint-Timothée</name>
<name code="s0000057" lat="46.00N" lon="73.73O">Saint-Lin-Laurentides</name>
<name code="s0000142" lat="45.82N" lon="73.43O">L'Assomption</name>
<name code="s0000143" lat="46.09N" lon="73.19O">Berthierville</name>
<name code="s0000144" lat="45.85N" lon="73.24O">Contrecoeur</name>
<name code="s0000145" lat="45.75N" lon="73.60O">Mascouche</name>
<name code="s0000147" lat="46.04N" lon="73.11O">Sorel-Tracy</name>
<name code="s0000148" lat="46.04N" lon="73.11O">Tracy</name>
<name code="s0000149" lat="45.70N" lon="73.58O">Le Gardeur</name>
<name code="s0000290" lat="45.70N" lon="73.63O">Terrebonne</name>
<name code="s0000721" lat="46.02N" lon="73.44O">Joliette</name>
<name code="s0000755" lat="45.74N" lon="73.46O">Repentigny</name>
<name code="s0000097" lat="49.82N" lon="64.35O">Port-Menier</name>
<name code="s0000027" lat="48.96N" lon="65.50O">Murdochville</name>
<name code="s0000029" lat="46.68N" lon="73.92O">Saint-Michel-des-Saints</name>
<name code="s0000053" lat="45.20N" lon="72.75O">Cowansville</name>
<name code="s0000123" lat="50.64N" lon="68.73O">Manicouagan</name>
<name code="s0000163" lat="45.11N" lon="72.62O">Sutton</name>
<name code="s0000197" lat="48.54N" lon="71.65O">Alma</name>
<name code="s0000211" lat="48.42N" lon="71.07O">Saguenay</name>
<name code="s0000213" lat="46.12N" lon="74.60O">Mont-Tremblant</name>
<name code="s0000214" lat="45.88N" lon="74.57O">Sainte-Agathe</name>
<name code="s0000261" lat="45.88N" lon="72.51O">Drummondville</name>
<name code="s0000262" lat="45.92N" lon="72.74O">Saint-Nicéphore</name>
<name code="s0000287" lat="47.92N" lon="74.62O">Parent</name>
<name code="s0000288" lat="48.46N" lon="73.68O">Gouin (Réservoir)</name>
<name code="s0000478" lat="53.86N" lon="73.49O">La Grande-Quatre</name>
<name code="s0000494" lat="51.43N" lon="57.13O">Blanc-Sablon</name>
<name code="s0000577" lat="54.80N" lon="66.82O">Schefferville</name>
<name code="s0000613" lat="45.91N" lon="77.07O">Pontiac</name>
<name code="s0000627" lat="58.46N" lon="78.10O">Inukjuak</name>
<station code="wpd" lat="47.57N" lon="71.23O">L'Étape</station>
</stations>`;

        return this.parseStationCoordinates(stationCoordinates);
    }

    // Parse station coordinates from XML format
    parseStationCoordinates(xmlData) {
        const { DOMParser } = require('xmldom');
        const xmlDoc = new DOMParser().parseFromString(xmlData, 'text/xml');
        
        const parsedStations = [];
        
        // Parse both 'name' and 'station' tags
        const nameStations = Array.from(xmlDoc.getElementsByTagName('name'));
        const stationTags = Array.from(xmlDoc.getElementsByTagName('station'));
        
        // Combine both collections
        const allStations = [...nameStations, ...stationTags];
        
        for (let i = 0; i < allStations.length; i++) {
            const station = allStations[i];
            const code = station.getAttribute('code');
            const lat = station.getAttribute('lat');
            const lon = station.getAttribute('lon');
            const name = station.textContent;
            
            if (code && lat && lon) {
                // Parse latitude (e.g., "48.80N" -> 48.80)
                const latValue = parseFloat(lat.replace(/[NS]$/, ''));
                const latDirection = lat.slice(-1);
                const finalLat = latDirection === 'S' ? -latValue : latValue;
                
                // Parse longitude (e.g., "79.21O" -> -79.21, O = West)
                const lonValue = parseFloat(lon.replace(/[EO]$/, ''));
                const lonDirection = lon.slice(-1);
                const finalLon = lonDirection === 'O' ? -lonValue : lonValue;
                
                parsedStations.push({
                    code: code,
                    name: name,
                    lat: finalLat,
                    lon: finalLon,
                    originalLat: lat,
                    originalLon: lon
                });
            }
        }
        
        return parsedStations;
    }

    // Get all stations
    async getAllStations() {
        return {
            success: true,
            count: this.stationData.length,
            stations: this.stationData,
            timestamp: new Date().toISOString()
        };
    }

    // Get latest XML file for a station
    async getLatestXMLFile(stationCode) {
        try {
            // Validate station code
            if (!/^s\d{7}$/i.test(stationCode)) {
                return {
                    success: false,
                    error: `Invalid station code format: ${stationCode}`,
                    timestamp: new Date().toISOString()
                };
            }

            // Get current hour
            const now = new Date();
            const currentHour = now.getUTCHours().toString().padStart(2, '0');
            
            // Try current hour first
            let stationFiles = [];
            let foundHour = currentHour;
            let foundInCurrentHour = false;
            
            const currentHourUrl = this.baseUrl + currentHour + '/';
            try {
                const response = await fetch(this.proxyUrl + encodeURIComponent(currentHourUrl));
                if (response.ok) {
                    const htmlContent = await response.text();
                    const results = this.findXMLFiles(htmlContent, currentHourUrl);
                    
                    // Filter for the specific station and _fr.xml files only
                    stationFiles = results.xmlFiles.filter(file => 
                        (file.url.toLowerCase().includes(stationCode.toLowerCase()) ||
                         file.context.toLowerCase().includes(stationCode.toLowerCase())) &&
                        file.url.endsWith('_fr.xml')
                    );
                    
                    if (stationFiles.length > 0) {
                        foundInCurrentHour = true;
                        stationFiles.forEach(file => {
                            file.hour = currentHour;
                            file.sourceUrl = currentHourUrl;
                        });
                    }
                }
            } catch (error) {
                console.log(`Error checking current hour ${currentHour}:`, error);
            }
            
            // If not found in current hour, search previous hours
            if (!foundInCurrentHour) {
                const hours = [];
                for (let i = 1; i <= 24; i++) {
                    const hour = (currentHour - i + 24) % 24;
                    hours.push(hour.toString().padStart(2, '0'));
                }
                
                for (const hour of hours) {
                    try {
                        const hourUrl = this.baseUrl + hour + '/';
                        const response = await fetch(this.proxyUrl + encodeURIComponent(hourUrl));
                        
                        if (response.ok) {
                            const htmlContent = await response.text();
                            const results = this.findXMLFiles(htmlContent, hourUrl);
                            
                            const hourFiles = results.xmlFiles.filter(file => 
                                (file.url.toLowerCase().includes(stationCode.toLowerCase()) ||
                                 file.context.toLowerCase().includes(stationCode.toLowerCase())) &&
                                file.url.endsWith('_fr.xml')
                            );
                            
                            if (hourFiles.length > 0) {
                                foundHour = hour;
                                stationFiles = hourFiles;
                                stationFiles.forEach(file => {
                                    file.hour = hour;
                                    file.sourceUrl = hourUrl;
                                });
                                break;
                            }
                        }
                        
                        await new Promise(resolve => setTimeout(resolve, 50));
                        
                    } catch (error) {
                        console.log(`Error checking hour ${hour}:`, error);
                        continue;
                    }
                }
            }
            
            if (stationFiles.length > 0) {
                // Get the latest file for this station
                const latestFile = stationFiles.sort((a, b) => {
                    const aMatch = a.url.match(/(\d{8}T\d{6})/);
                    const bMatch = b.url.match(/(\d{8}T\d{6})/);
                    if (aMatch && bMatch) {
                        return bMatch[1].localeCompare(aMatch[1]);
                    }
                    return b.url.localeCompare(a.url);
                })[0];
                
                return {
                    success: true,
                    station: stationCode,
                    latestFile: latestFile,
                    foundInCurrentHour: foundInCurrentHour,
                    foundHour: foundHour,
                    totalFiles: stationFiles.length,
                    timestamp: new Date().toISOString()
                };
                
            } else {
                return {
                    success: false,
                    station: stationCode,
                    error: "No XML files found for station",
                    timestamp: new Date().toISOString()
                };
            }
            
        } catch (error) {
            return {
                success: false,
                station: stationCode,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    // Find XML files in HTML content
    findXMLFiles(htmlContent, baseUrl) {
        const xmlFiles = [];
        
        // Regular expressions to find XML file references
        const patterns = [
            /href=["']([^"']*\.xml)["']/gi,
            /src=["']([^"']*\.xml)["']/gi,
            /["']([^"']*\.xml)["']/gi
        ];
        
        for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(htmlContent)) !== null) {
                const url = match[1];
                if (url && url.includes('.xml')) {
                    const fullUrl = url.startsWith('http') ? url : new URL(url, baseUrl).href;
                    xmlFiles.push({
                        url: fullUrl,
                        filename: url.split('/').pop(),
                        context: this.getContext(htmlContent, match.index, 100)
                    });
                }
            }
        }
        
        return { xmlFiles };
    }

    // Get context around a match
    getContext(htmlContent, index, length) {
        const start = Math.max(0, index - length);
        const end = Math.min(htmlContent.length, index + length);
        return htmlContent.substring(start, end).replace(/\s+/g, ' ').trim();
    }
}

class WeatherStationService {
    constructor() {
        this.api = new WeatherStationAPI();
        this.stationsFolder = './Stations/';
        this.interval = 30 * 60 * 1000; // 30 minutes
        this.isRunning = false;
        this.lastUpdate = null;
        this.updateCount = 0;
        this.serviceLog = [];
        
        // Ensure Stations directory exists
        if (!fs.existsSync(this.stationsFolder)) {
            fs.mkdirSync(this.stationsFolder, { recursive: true });
        }
        
        // Create service log file
        this.logFile = path.join(this.stationsFolder, 'service.log');
        this.createServiceLog();
    }

    // Create initial service log
    createServiceLog() {
        const logContent = `# Weather Station Service Log

**Service Started:** ${new Date().toLocaleString()}
**Update Interval:** ${this.interval / 60000} minutes
**Status:** Running

## Service Information
- **Auto-updates:** Every ${this.interval / 60000} minutes
- **Stations monitored:** 200+ Environment Canada stations
- **File format:** .txt files with direct links
- **Last update:** Never

---
*Service automatically updates weather station links*`;

        fs.writeFileSync(this.logFile, logContent, 'utf8');
    }

    // Log service activity
    log(message, type = 'info') {
        const timestamp = new Date().toLocaleString();
        const logEntry = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
        
        this.serviceLog.push(logEntry);
        
        // Keep only last 1000 log entries
        if (this.serviceLog.length > 1000) {
            this.serviceLog = this.serviceLog.slice(-1000);
        }
        
        // Write to log file
        const logContent = `# Weather Station Service Log

**Service Started:** ${new Date().toLocaleString()}
**Update Interval:** ${this.interval / 60000} minutes
**Status:** ${this.isRunning ? 'Running' : 'Stopped'}
**Last Update:** ${this.lastUpdate || 'Never'}
**Total Updates:** ${this.updateCount}

## Recent Activity
${this.serviceLog.slice(-50).join('\n')}

---
*Service automatically updates weather station links*`;

        fs.writeFileSync(this.logFile, logContent, 'utf8');
        
        // Also log to console
        console.log(logEntry);
    }

    // Update a single station
    async updateStation(station) {
        try {
            const xmlResponse = await this.api.getLatestXMLFile(station.code);
            
            let fileContent = '';
            let status = '❌';
            
            if (xmlResponse.success && xmlResponse.latestFile) {
                status = '✅';
                fileContent = xmlResponse.latestFile.url;
            } else {
                fileContent = xmlResponse.error || 'No data available';
            }
            
            // Create filename
            const sanitizedName = station.name
                .replace(/[<>:"/\\|?*]/g, '_')
                .replace(/\s+/g, '_')
                .replace(/__+/g, '_')
                .trim();
            
            const filename = `${sanitizedName}_${station.code}.txt`;
            const filepath = path.join(this.stationsFolder, filename);
            
            // Save the file
            fs.writeFileSync(filepath, fileContent, 'utf8');
            
            return { success: true, station: station.name, status, hasData: xmlResponse.success };
            
        } catch (error) {
            this.log(`Error updating station ${station.name}: ${error.message}`, 'error');
            return { success: false, station: station.name, error: error.message };
        }
    }

    // Update all stations
    async updateAllStations() {
        try {
            this.log('Starting weather station update...', 'info');
            
            // Get all stations
            const stationsResponse = await this.api.getAllStations();
            if (!stationsResponse.success) {
                throw new Error('Failed to load station data');
            }
            
            const stations = stationsResponse.stations;
            this.log(`Found ${stations.length} weather stations to update`, 'info');
            
            let successfulUpdates = 0;
            let failedUpdates = 0;
            let stationsWithData = 0;
            
            // Update each station
            for (let i = 0; i < stations.length; i++) {
                const station = stations[i];
                const result = await this.updateStation(station);
                
                if (result.success) {
                    successfulUpdates++;
                    if (result.hasData) {
                        stationsWithData++;
                    }
                } else {
                    failedUpdates++;
                }
                
                // Progress update every 10 stations
                if ((i + 1) % 10 === 0) {
                    this.log(`Progress: ${i + 1}/${stations.length} stations updated`, 'info');
                }
                
                // Small delay to avoid overwhelming the server
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            // Update service statistics
            this.lastUpdate = new Date().toLocaleString();
            this.updateCount++;
            
            // Create update summary
            const summaryContent = `# Weather Station Update Summary

**Last Update:** ${this.lastUpdate}
**Total Updates:** ${this.updateCount}
**Stations Processed:** ${stations.length}
**Successful Updates:** ${successfulUpdates}
**Failed Updates:** ${failedUpdates}
**Stations with Data:** ${stationsWithData}

## Update Statistics
- ✅ **Successful:** ${successfulUpdates} (${((successfulUpdates / stations.length) * 100).toFixed(1)}%)
- ❌ **Failed:** ${failedUpdates} (${((failedUpdates / stations.length) * 100).toFixed(1)}%)
- 📊 **With Data:** ${stationsWithData} (${((stationsWithData / stations.length) * 100).toFixed(1)}%)

---
*Auto-updated by Weather Station Service*`;

            fs.writeFileSync(path.join(this.stationsFolder, 'UPDATE_SUMMARY.md'), summaryContent, 'utf8');
            
            this.log(`Update completed: ${successfulUpdates} successful, ${failedUpdates} failed, ${stationsWithData} with data`, 'success');
            
        } catch (error) {
            this.log(`Update failed: ${error.message}`, 'error');
        }
    }

    // Start the service
    async start() {
        if (this.isRunning) {
            this.log('Service is already running', 'warning');
            return;
        }
        
        this.isRunning = true;
        this.log('Weather Station Service started', 'info');
        
        // Initial update
        await this.updateAllStations();
        
        // Set up periodic updates
        this.updateInterval = setInterval(async () => {
            if (this.isRunning) {
                await this.updateAllStations();
            }
        }, this.interval);
        
        this.log(`Service will update every ${this.interval / 60000} minutes`, 'info');
    }

    // Stop the service
    stop() {
        if (!this.isRunning) {
            this.log('Service is not running', 'warning');
            return;
        }
        
        this.isRunning = false;
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        this.log('Weather Station Service stopped', 'info');
    }

    // Get service status
    getStatus() {
        return {
            isRunning: this.isRunning,
            lastUpdate: this.lastUpdate,
            updateCount: this.updateCount,
            interval: this.interval,
            nextUpdate: this.lastUpdate ? new Date(new Date(this.lastUpdate).getTime() + this.interval) : null
        };
    }

    // Manual update trigger
    async manualUpdate() {
        if (!this.isRunning) {
            this.log('Service is not running. Starting manual update...', 'info');
            await this.updateAllStations();
        } else {
            this.log('Manual update triggered', 'info');
            await this.updateAllStations();
        }
    }
}

// Command line interface
async function main() {
    const service = new WeatherStationService();
    
    // Handle command line arguments
    const args = process.argv.slice(2);
    const command = args[0];
    
    switch (command) {
        case 'start':
            console.log('🌤️ Starting Weather Station Service...');
            await service.start();
            
            // Keep the process running
            process.on('SIGINT', () => {
                console.log('\n🛑 Stopping service...');
                service.stop();
                process.exit(0);
            });
            
            process.on('SIGTERM', () => {
                console.log('\n🛑 Stopping service...');
                service.stop();
                process.exit(0);
            });
            break;
            
        case 'stop':
            console.log('🛑 Stopping Weather Station Service...');
            service.stop();
            break;
            
        case 'update':
            console.log('🔄 Manual update triggered...');
            await service.manualUpdate();
            break;
            
        case 'status':
            const status = service.getStatus();
            console.log('📊 Weather Station Service Status:');
            console.log(`Running: ${status.isRunning}`);
            console.log(`Last Update: ${status.lastUpdate || 'Never'}`);
            console.log(`Total Updates: ${status.updateCount}`);
            console.log(`Update Interval: ${status.interval / 60000} minutes`);
            if (status.nextUpdate) {
                console.log(`Next Update: ${status.nextUpdate.toLocaleString()}`);
            }
            break;
            
        default:
            console.log('🌤️ Weather Station Service');
            console.log('Usage:');
            console.log('  node weather-service.js start   - Start the service');
            console.log('  node weather-service.js stop    - Stop the service');
            console.log('  node weather-service.js update  - Manual update');
            console.log('  node weather-service.js status  - Show status');
            break;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WeatherStationService };
}

// Run if this is the main script
if (require.main === module) {
    main().catch(error => {
        console.error('💥 Service failed:', error);
        process.exit(1);
    });
} 