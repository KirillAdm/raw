export const getGames = () => {
   return fetch('https://api.rawg.io/api/games?key=5d39e1dcf1914e44a2a51f3fc6ecd764', {
    method : 'GET',
   }).then(response => response.json())
   
}