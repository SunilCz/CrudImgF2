
// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const SearchPage = () => {
//   const location = useLocation();
//   const [searchResults, setSearchResults] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const searchQuery = new URLSearchParams(location.search).get('q');

//     const fetchData = async () => {
//       try {
//         const res = await fetch(`${process.env.REACT_APP_CRUD}/api/blog/search?q=${encodeURIComponent(searchQuery)}`);
        
//         if (!res.ok) {
//           throw new Error(`Error: ${res.status} - ${res.statusText}`);
//         }

//         const data = await res.json();
//         setSearchResults(data.results);
//       } catch (error) {
//         console.error('Error fetching search results:', error);
//         setError(error.message || 'An error occurred while fetching search results.');
//       }
//     };

//     if (searchQuery) {
//       fetchData();
//     } else {
//       setSearchResults([]);
//       setError(null);
//     }
//   }, [location.search]);

//   return (
//     <div>
//       <h2>Search Results</h2>
//       {error ? (
//         <p>{error}</p>
//       ) : (
//         searchResults.map((result) => (
//           <div key={result._id}>
//             <h3>{result.title}</h3>
//             <p>{result.content}</p>
//             {result.image && (
//               <img
//                 src={`${process.env.REACT_APP_CRUD}/uploads/${result.image}`}
//                 alt={result.title}
//                 style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'cover' }}
//               />
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default SearchPage;
