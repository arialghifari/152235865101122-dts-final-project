import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useChapterTranslationQuery,
  useChapterVersesQuery,
} from "../services/quranApi";
import VerseCard from "./VerseCard";
import { selectBookmarks } from "../reducers/firebaseSlice";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

function VerseList() {
  const { chapter } = useParams();
  const [chapterDetail, setChapterDetail] = useState([]);

  const [user] = useAuthState(auth);
  const bookmarks = useSelector(selectBookmarks);

  useEffect(() => {
    if (user) {
      const updateBookmarks = async () => {
        await updateDoc(doc(db, "users", user.uid), {
          bookmarks: bookmarks,
        });
      };

      updateBookmarks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmarks]);

  const {
    data: dataChapterVerses,
    error: errorChapterVerses,
    isLoading: isLoadingChapterVerses,
  } = useChapterVersesQuery(chapter);
  const {
    data: dataTranslation,
    error: errorTranslation,
    isLoading: isLoadingTranslation,
  } = useChapterTranslationQuery(chapter);

  useEffect(() => {
    if (dataChapterVerses && dataTranslation) {
      let detailArabic = [];

      dataChapterVerses.verses.map((item, index) =>
        detailArabic.push({
          id: index + 1,
          arabic: item.text_uthmani,
          verse_key: item.verse_key,
        })
      );

      let detailWithTranslation = detailArabic.map((item, i) => ({
        ...item,
        translation: dataTranslation.translations[i]?.text,
      }));

      setChapterDetail(detailWithTranslation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChapterVerses, dataTranslation]);

  return (
    <>
      {errorChapterVerses || errorTranslation ? (
        <p className="text-center dark:text-zinc-300">There was an error</p>
      ) : isLoadingChapterVerses || isLoadingTranslation ? (
        <p className="text-center dark:text-zinc-300">Loading...</p>
      ) : dataChapterVerses && dataTranslation ? (
        <div className="flex flex-col gap-4">
          {chapterDetail.map((item, index) => (
            <VerseCard key={index} item={item} />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default VerseList;
