import { useState, useEffect } from 'react';
import Card from './components/Card';
import Scoreboard from './components/Scoreboard';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('bestScore')) || 0;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.front_default,
            };
          })
        );
        setCards(shuffleArray(pokemonDetails));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setIsLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  // Shuffle array function
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Handle card click
  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      // Reset game
      setClickedCards([]);
      setCurrentScore(0);
      setCards(shuffleArray(cards));
    } else {
      // Update scores
      const newScore = currentScore + 1;
      setClickedCards([...clickedCards, id]);
      setCurrentScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem('bestScore', newScore);
      }
      setCards(shuffleArray(cards));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Pokémon Memory Game</h1>
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl">
          {cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.image}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;