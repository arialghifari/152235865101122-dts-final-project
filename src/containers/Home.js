import React from "react";
import ChapterList from "../components/ChapterList";
import { useQuranQuery } from "../services/quranApi";

function Home() {
  const { data, error, isLoading } = useQuranQuery();
  return (
    <div className="container">
      {error ? (
        <p>Error</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        <ChapterList item={data} />
      ) : null}
    </div>
  );
}

export default Home;