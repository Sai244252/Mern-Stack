import { apiSlice } from "./apiSlice";

import { MOVIE_URL, UPLOAD_URL } from "../constants";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMovies: builder.query({
      query: () => `${MOVIE_URL}/all-movies/`,
    }),

    createMovie: builder.mutation({
      query: (newMovie) => ({
        url: `${MOVIE_URL}/create-movie`,
        method: "POST",
        body: newMovie,
      }),
    }),

    updateMovie: builder.mutation({
      query: ({ id, updatedMovie }) => ({
        url: `${MOVIE_URL}/update-movie/${id}`,
        method: "PUT",
        body: updatedMovie,
      }),
    }),

    addMovieReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/reviews`,
        method: "POST",
        body: { rating, id, comment },
      }),
    }),

    deleteComment: builder.mutation({
      query: ({ movieId, reviewId }) => ({
        url: `${MOVIE_URL}/delete-comment`,
        method: "DELETE",
        body: { movieId, reviewId },
      }),
    }),

    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/delete-movie/${id}`,
        method: "DELETE",
      }),
    }),

    getSpecificMovie: builder.query({
      query: (id) => ({
        url: `${MOVIE_URL}/specific-movie/${id}`,
        method: "GET",
      }),
    }),

    uploadImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: formData,
      }),
    }),

    getNewMovies: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/new-movies/`,
        method: "GET",
      }),
    }),

    getTopMovies: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/top-movies/`,
        method: "GET",
      }),
    }),

    getRandomMovies: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/random-movies/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllMoviesQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useAddMovieReviewMutation,
  useDeleteCommentMutation,
  useDeleteMovieMutation,
  useUploadImageMutation,
  useGetSpecificMovieQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
  useGetNewMoviesQuery,
} = moviesApiSlice;
