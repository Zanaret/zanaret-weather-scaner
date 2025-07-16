// Weather Station API
// Provides programmatic access to Environment Canada weather data

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
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        
        const parsedStations = [];
        
        // Parse both 'name' and 'station' tags
        const nameStations = xmlDoc.getElementsByTagName('name');
        const stationTags = xmlDoc.getElementsByTagName('station');
        
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

    // API Methods

    // Get all stations
    async getAllStations() {
        return {
            success: true,
            count: this.stationData.length,
            stations: this.stationData,
            timestamp: new Date().toISOString()
        };
    }

    // Get station by code
    async getStationByCode(stationCode) {
        const station = this.stationData.find(s => s.code.toLowerCase() === stationCode.toLowerCase());
        
        if (!station) {
            return {
                success: false,
                error: `Station ${stationCode} not found`,
                timestamp: new Date().toISOString()
            };
        }

        return {
            success: true,
            station: station,
            timestamp: new Date().toISOString()
        };
    }

    // Search stations by name
    async searchStationsByName(searchTerm) {
        const results = this.stationData.filter(station => 
            station.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return {
            success: true,
            count: results.length,
            stations: results,
            searchTerm: searchTerm,
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
                        
                        await new Promise(resolve => setTimeout(resolve, 200));
                        
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

    // Scan for XML files, timestamps, and station codes
    async scanURL(url, hour = null) {
        try {
            let targetUrl = url;
            
            // If hour is specified, append it to the URL
            if (hour !== null) {
                targetUrl = url.endsWith('/') ? url + hour + '/' : url + '/' + hour + '/';
            }
            
            const response = await fetch(this.proxyUrl + encodeURIComponent(targetUrl));
            
            if (!response.ok) {
                return {
                    success: false,
                    error: `HTTP error! status: ${response.status}`,
                    url: targetUrl,
                    timestamp: new Date().toISOString()
                };
            }
            
            const htmlContent = await response.text();
            const results = this.findXMLFiles(htmlContent, targetUrl);
            
            return {
                success: true,
                url: targetUrl,
                hour: hour,
                results: results,
                timestamp: new Date().toISOString()
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message,
                url: url,
                timestamp: new Date().toISOString()
            };
        }
    }

    // Find XML files, timestamps, and station codes in HTML content
    findXMLFiles(htmlContent, baseUrl) {
        const xmlFiles = [];
        const baseUrlObj = new URL(baseUrl);
        
        // Regular expressions to find XML file references
        const patterns = [
            // Direct XML file links
            /href=["']([^"']*\.xml)["']/gi,
            /src=["']([^"']*\.xml)["']/gi,
            // XML file references in various contexts
            /["']([^"']*\.xml)["']/gi,
            // XML content type references
            /content-type["']?\s*:\s*["']?application\/xml["']?/gi,
            // XML namespace declarations
            /xmlns=["']([^"']*)["']/gi,
            // XML processing instructions
            /<\?xml[^>]*\?>/gi,
            // XML tags
            /<[^>]*xml[^>]*>/gi
        ];
        
        // Regular expression to find timestamp patterns (YYYYMMDDTHHMMSS.MSS)
        const timestampPattern = /(\d{8}T\d{6}\.\d{3})/g;
        
        // Regular expression to find station codes (s0000XXX)
        const stationCodePattern = /(s\d{7})/gi;
        
        // Find all timestamps in the content
        const timestamps = [];
        let timestampMatch;
        while ((timestampMatch = timestampPattern.exec(htmlContent)) !== null) {
            const timestamp = timestampMatch[1];
            const parsedTime = this.parseTimestamp(timestamp);
            timestamps.push({
                raw: timestamp,
                parsed: parsedTime,
                context: this.getContext(htmlContent, timestampMatch.index, 100)
            });
        }
        
        // Find all station codes in the content
        const stationCodes = [];
        let stationMatch;
        while ((stationMatch = stationCodePattern.exec(htmlContent)) !== null) {
            const stationCode = stationMatch[1];
            const parsedStation = this.parseStationCode(stationCode);
            stationCodes.push({
                raw: stationCode,
                parsed: parsedStation,
                context: this.getContext(htmlContent, stationMatch.index, 100)
            });
        }
        
        // Find all XML file links
        patterns.forEach((pattern, index) => {
            let match;
            while ((match = pattern.exec(htmlContent)) !== null) {
                if (index < 3 && match[1]) { // Only process file patterns
                    let xmlUrl = match[1];
                    
                    // Convert relative URLs to absolute
                    if (xmlUrl.startsWith('/')) {
                        xmlUrl = baseUrlObj.origin + xmlUrl;
                    } else if (!xmlUrl.startsWith('http')) {
                        xmlUrl = new URL(xmlUrl, baseUrl).href;
                    }
                    
                    // Check if it's a valid XML file URL
                    if (xmlUrl.endsWith('.xml') || xmlUrl.includes('.xml')) {
                        xmlFiles.push({
                            url: xmlUrl,
                            type: 'XML File Link',
                            context: this.getContext(htmlContent, match.index, 100)
                        });
                    }
                } else if (index >= 3) { // XML content references
                    xmlFiles.push({
                        url: 'Found in page content',
                        type: index === 3 ? 'XML Content-Type Reference' : 
                              index === 4 ? 'XML Namespace Declaration' :
                              index === 5 ? 'XML Processing Instruction' : 'XML Tag',
                        context: this.getContext(htmlContent, match.index, 100)
                    });
                }
            }
        });
        
        // Remove duplicates and filter for _fr.xml files
        const uniqueFiles = [];
        const seen = new Set();
        
        xmlFiles.forEach(file => {
            // Only include _fr.xml files
            if (!file.url.endsWith('_fr.xml')) return;
            const key = file.url + file.type;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueFiles.push(file);
            }
        });
        
        // Remove duplicate timestamps
        const uniqueTimestamps = [];
        const seenTimestamps = new Set();
        
        timestamps.forEach(timestamp => {
            if (!seenTimestamps.has(timestamp.raw)) {
                seenTimestamps.add(timestamp.raw);
                uniqueTimestamps.push(timestamp);
            }
        });
        
        // Remove duplicate station codes
        const uniqueStationCodes = [];
        const seenStationCodes = new Set();
        
        stationCodes.forEach(station => {
            if (!seenStationCodes.has(station.raw)) {
                seenStationCodes.add(station.raw);
                uniqueStationCodes.push(station);
            }
        });
        
        return {
            xmlFiles: uniqueFiles,
            timestamps: uniqueTimestamps,
            stationCodes: uniqueStationCodes
        };
    }

    // Parse timestamp in format YYYYMMDDTHHMMSS.MSS
    parseTimestamp(timestamp) {
        if (!/^\d{8}T\d{6}\.\d{3}$/.test(timestamp)) {
            return {
                formatted: 'Invalid format',
                date: 'Invalid',
                time: 'Invalid',
                milliseconds: 'Invalid'
            };
        }
        
        const year = timestamp.substring(0, 4);
        const month = timestamp.substring(4, 6);
        const day = timestamp.substring(6, 8);
        const hour = timestamp.substring(9, 11);
        const minute = timestamp.substring(11, 13);
        const second = timestamp.substring(13, 15);
        const milliseconds = timestamp.substring(16, 19);
        
        const date = `${year}-${month}-${day}`;
        const time = `${hour}:${minute}:${second}`;
        const formatted = `${date} ${time}.${milliseconds}`;
        
        return {
            formatted: formatted,
            date: date,
            time: time,
            milliseconds: milliseconds,
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second
        };
    }

    // Parse station code in format s0000XXX
    parseStationCode(stationCode) {
        if (!/^s\d{7}$/i.test(stationCode)) {
            return {
                formatted: 'Invalid format',
                stationNumber: 'Invalid',
                prefix: 'Invalid'
            };
        }
        
        const prefix = stationCode.substring(0, 1).toLowerCase();
        const stationNumber = stationCode.substring(1);
        const formatted = `${prefix}-${stationNumber}`;
        
        return {
            formatted: formatted,
            stationNumber: stationNumber,
            prefix: prefix,
            fullCode: stationCode.toUpperCase()
        };
    }

    // Get context around a match
    getContext(htmlContent, index, length) {
        const start = Math.max(0, index - length);
        const end = Math.min(htmlContent.length, index + length);
        return htmlContent.substring(start, end).replace(/\s+/g, ' ').trim();
    }

    // Get current hour
    getCurrentHour() {
        const now = new Date();
        return now.getUTCHours().toString().padStart(2, '0');
    }

    // Get station statistics
    async getStationStats() {
        const stats = {
            totalStations: this.stationData.length,
            stationsWithData: 0,
            currentHour: this.getCurrentHour(),
            timestamp: new Date().toISOString()
        };

        // Count stations with recent data (check current hour)
        const currentHourUrl = this.baseUrl + stats.currentHour + '/';
        try {
            const response = await fetch(this.proxyUrl + encodeURIComponent(currentHourUrl));
            if (response.ok) {
                const htmlContent = await response.text();
                const results = this.findXMLFiles(htmlContent, currentHourUrl);
                stats.stationsWithData = results.stationCodes.length;
            }
        } catch (error) {
            console.log('Error getting station stats:', error);
        }

        return {
            success: true,
            stats: stats
        };
    }
}

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherStationAPI;
} else if (typeof window !== 'undefined') {
    window.WeatherStationAPI = WeatherStationAPI;
}

// Example usage:
/*
const api = new WeatherStationAPI();

// Get all stations
const stations = await api.getAllStations();

// Get specific station
const station = await api.getStationByCode('s0000123');

// Get latest XML file for a station
const xmlFile = await api.getLatestXMLFile('s0000123');

// Search stations by name
const searchResults = await api.searchStationsByName('Montreal');

// Scan a URL
const scanResults = await api.scanURL('https://dd.meteo.gc.ca/today/citypage_weather/QC/', '12');

// Get station statistics
const stats = await api.getStationStats();
*/ 