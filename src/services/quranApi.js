import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../apis/quran";

export const quranApi = createApi({
  reducerPath: "quranApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    quran: build.query({
      query: () => "/chapters",
    }),
    chapterVerses: build.query({
      query: (id) => `/quran/verses/uthmani?chapter_number=${id}`,
    }),
    chapterTranslation: build.query({
      query: (id) => `/quran/translations/131?chapter_number=${id}`,
    }),
    chapterRecitation: build.query({
      query: ({ id, page }) => `/recitations/7/by_chapter/${id}?page=${page}`,
    }),
    chapterDetail: build.query({
      query: (id) => `/chapters/${id}`,
    }),
  }),
});

export const {
  useQuranQuery,
  useChapterVersesQuery,
  useChapterTranslationQuery,
  useChapterRecitationQuery,
  useChapterDetailQuery,
} = quranApi;