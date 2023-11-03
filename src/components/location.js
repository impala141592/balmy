// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const LocationDisplay = () => {
//   const [city, setCity] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           axios
//             .get(
//               `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=594bf2ae0eaf42c9b77a2b566f9bade9`
//             )
//             .then((response) => {
//               const currentCity = response.data.results[0].components.city;
//               setCity(currentCity);
//             })
//             .catch((error) => {
//               setErrorMessage(`Error getting location data: ${error.message}`);
//             });
//         },
//         (error) => {
//           setErrorMessage(`Error getting location: ${error.message}`);
//         }
//       );
//     } else {
//       setErrorMessage("Geolocation is not supported by your browser.");
//     }
//   }, []);

//   return <div>{errorMessage ? <p>{errorMessage}</p> : <p>{city}</p>}</div>;
// };

// export default LocationDisplay;
