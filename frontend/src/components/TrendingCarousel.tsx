import React from 'react';

const TrendingCarousel: React.FC = () => {
  // Temporary mock data for movie posters
  const trendingMovies = [
    { id: 1, title: 'Movie One', image: '/posters/movie1.jpg' },
    { id: 2, title: 'Movie Two', image: '/posters/movie2.jpg' },
    { id: 3, title: 'Movie Three', image: '/posters/movie3.jpg' },
    { id: 4, title: 'Movie Four', image: '/posters/movie4.jpg' },
  ];

  return (
    <section className="bg-black text-white px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {trendingMovies.map((movie) => (
          <div key={movie.id} className="min-w-[150px]">
            <img
              src={movie.image}
              alt={movie.title}
              className="rounded-lg shadow-lg w-full"
            />
            <p className="mt-2 text-center">{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingCarousel;
