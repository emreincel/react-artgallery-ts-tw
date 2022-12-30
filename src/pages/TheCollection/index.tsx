import { useEffect, useState } from 'react';

import HeroCollection from '../../components/HeroCollection';
import ArtworkList from '../../components/ArtworkList';

import { artworkDataModeler } from '../../libs/helpers/artworkDataModeler';

const TheCollection = () => {
  const [artworkPage, setArtworkPage] = useState<[] | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const getArtworkPage = async () => {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?page=${pageNumber}`
    );
    const result = await response.json();
    const pageData = result.data;

    console.log(pageData);

    const artworkPageArray = pageData.map((artwork: any) => {
      const artworkDetails = artworkDataModeler(artwork);

      return artworkDetails;
    });

    console.log(artworkPageArray);

    setArtworkPage(artworkPageArray);
  };

  useEffect(() => {
    getArtworkPage();
    console.log(pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <>
      <div className="flex flex-col gap-8 p-12">
        <HeroCollection />

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setPageNumber(pageNumber - 1)}
            className="h-12 w-28 rounded-full border p-1 enabled:hover:border-black enabled:hover:fill-black enabled:hover:cursor-pointer disabled:opacity-75"
          >
            Previous
          </button>
          <button
            onClick={() => setPageNumber(pageNumber + 1)}
            className="h-12 w-28 rounded-full border p-1 enabled:hover:border-black enabled:hover:fill-black enabled:hover:cursor-pointer disabled:opacity-75"
          >
            Next
          </button>
        </div>

        <ArtworkList artworkPage={artworkPage} />
      </div>
    </>
  );
};

export default TheCollection;
