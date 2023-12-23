import { useState, useEffect, useRef } from "react";
import { IGame } from "../interface/game";
import { CardGame } from "./card";
import "./loadGames.css";

export function LoadGames() {
  const [cards, setCards] = useState<IGame[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const observer = useRef<IntersectionObserver | null>(null);
  const loading = useRef(false); // Add a ref to track loading state

  useEffect(() => {
    getGames(currentPage, itemsPerPage).then((data) => {
      setCards((prevCards) => [...prevCards, ...data.results]); // Append new cards to the existing list
    });
  }, [currentPage, itemsPerPage]);

  const getGames = async (page: number, perPage: number) => {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=5d39e1dcf1914e44a2a51f3fc6ecd764&page=${page}&perPage=${perPage}`
    );
    const data = await response.json();
    return data;
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading.current) { // Check if not already loading
      loadNextPage();
    }
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "200px", // Adjust the rootMargin as needed
      threshold: 0.5, // Adjust the threshold as needed
    });
    const sentinel = document.getElementById("sentinel");
    if (sentinel) {
      observer.current.observe(sentinel);
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [itemsPerPage]); // Only re-run the effect when itemsPerPage changes

  const loadNextPage = () => {
    loading.current = true; // Set loading state to true
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    loading.current = false; // Reset loading state when new cards are loaded
  }, [cards]);

  return (
    <div className="card-icon">
      {cards.map((card) => {
        return <CardGame card={card} key={card.id} />;
      })}

      <div id="sentinel"></div>
    </div>
  );
}
