import React from "react";
import { ContentCarousel } from "../components/ContentCarousel";
import { FeaturedMovie } from "../types/FeaturedMovie";

export type MovieGroup = {
  category: string;
  movies: FeaturedMovie[];
};

interface Props {
  groups: MovieGroup[];
  delayStart?: number;  // Optional stagger delay
}

const CustomSection: React.FC<Props> = ({ groups, delayStart = 100 }) => {
  return (
    <>
      {groups.map((group, index) => (
        <ContentCarousel
          key={group.category}
          title={group.category}
          movies={group.movies}
          delayRender={delayStart + index * 100}
        />
      ))}
    </>
  );
};

export default CustomSection;
