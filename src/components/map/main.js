// /* global maplibregl amazonLocationClient amazonLocationAuthHelper */

// // Amazon Location Service resource names:
// const mapName = "Nthome_Mapping";
// const placesName = "Soshanguve LL, Soshanguve, City of Tshwane, Gauteng, ZAF";
// const region = "eu-west-1";
// const apiKey = "v1.public.eyJqdGkiOiIyZTUwM2MwZS0xZDBjLTRkZmItYmUwMC1jOWJmYmM1OWEwMGUifc6yGBAhbBMmnyRUxOy08NyN41P4UkscCeUTI-9IIFh0SSM9dI0BbS5_aaS6Op9T8TNZ630SsDKP9SKxUiyo5FWd6X0I_DHQRe3mDK8r7iYGIEqplXlVJln0aFjtChJOalHWY-uKT8MxM-MI8E0Z0ywOVCXzMNKD72zqeNtY4RZZXKPFRkHdk2RJ5RvIC_s5a1MeWU2VlGrSadrlQxyJDIP0cqRg3Zr-MJI9rthEY_BBMM-erIrx9V4e828tJWTNHkdW42gS31ZsLJ3KCdTjudlDPCO3G2G12hIu7lAqTBW1H34c7h4dgYoWjXFIV-GTFFAM7c5LB3CgEu9UvQjXGlw.ZGQzZDY2OGQtMWQxMy00ZTEwLWIyZGUtOGVjYzUzMjU3OGE4";

// // Initialize a map
// async function initializeMap() {
//     // Initialize the map
//     const mlglMap = new maplibregl.Map({
//         container: "map", // HTML element ID of map element
//         center: [28.0868788, -25.4705589], // Initial map centerpoint soshanguvhe block L
//         zoom: 16, // Initial map zoom
//         style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`, // Defines the appearance of the map and authenticates using an API key
//     });

//     // Add navigation control to the top left of the map
//     mlglMap.addControl(new maplibregl.NavigationControl(), "top-left");

//     return mlglMap;
// }

// async function main() {
//     // Create an authentication helper instance using an API key
//     const authHelper = await amazonLocationAuthHelper.withAPIKey(apiKey);

//     // Initialize map and Amazon Location SDK client
//     const map = await initializeMap();
//     const client = new amazonLocationClient.LocationClient({
//         region,
//         ...authHelper.getLocationClientConfig(), // Provides configuration required to make requests to Amazon Location
//     });

//     // Variable to hold marker that will be rendered on click
//     let marker;

//     // On mouse click, display marker and get results:
//     map.on("click", async function (e) {
//         // Remove any existing marker
//         if (marker) {
//             marker.remove();
//         }

//         // Render a marker on clicked point
//         marker = new maplibregl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map);

//         // Set up parameters for search call
//         let params = {
//             IndexName: placesName,
//             Position: [e.lngLat.lng, e.lngLat.lat],
//             Language: "en",
//             MaxResults: "5",
//         };

//         // Set up command to search for results around clicked point
//         const searchCommand = new amazonLocationClient.SearchPlaceIndexForPositionCommand(params);

//         try {
//             // Make request to search for results around clicked point
//             const data = await client.send(searchCommand);

//             // Write JSON response data to HTML
//             document.querySelector("#response").textContent = JSON.stringify(data, undefined, 2);

//             // Display place label in an alert box
//             alert(data.Results[0].Place.Label);
//         } catch (error) {
//             // Write JSON response error to HTML
//             document.querySelector("#response").textContent = JSON.stringify(error, undefined, 2);

//             // Display error in an alert box
//             alert("There was an error searching.");
//         }
//     });
// }

// // Call the main function after the script is loaded
// window.onload = main;
