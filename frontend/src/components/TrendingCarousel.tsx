import React, { useRef } from 'react';

const TrendingCarousel: React.FC = () => {
  // Temporary mock data for movie posters
  const trendingMovies = [
    { id: 1, title: 'Movie One', image: '/posters/movie1.jpg' },
    { id: 2, title: 'Movie Two', image: '/posters/movie2.jpg' },
    { id: 3, title: 'Movie Three', image: '/posters/movie3.jpg' },
    { id: 4, title: 'Movie Four', image: '/posters/movie4.jpg' },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-black text-white px-6 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Trending Now</h2>
      <div className="flex items-center relative">
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 z-10"
        >
          ◀
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth px-4"
        >
          {trendingMovies.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[150px] hover:scale-105 transition-transform duration-300"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="rounded-lg shadow-lg w-full"
              />
              <p className="mt-2 text-center">{movie.title}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
          className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 z-10"
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default TrendingCarousel;
