// Functions

// Sort by rating highest first, returns sorted list
export const handleSortRatingHighest = (movies) => {
  // Spreads into new array
  let sortedMovies = [...movies];

  let compare = (a, b) => {
    if (a.rating > b.rating) {
      return -1;
    } else if (a.rating < b.rating) {
      return 1;
    } else return 0;
  }

  sortedMovies.sort(compare);
  return sortedMovies;
}

// Sort by rating lowest first, returns sorted list
export const handleSortRatingLowest = (movies) => {
  let sortedMovies = [...movies];

  let compare = (a, b) => {
    if (a.rating < b.rating) {
      return -1;
    } else if (a.rating > b.rating) {
      return 1;
    } else return 0;
  }

  sortedMovies.sort(compare);
  return sortedMovies;
}

// Sort by newest first, returns sorted list
export const handleSortNewest = (movies) => {
  // Spreads into new array
  let sortedMovies = [...movies];

  let compare = (a, b) => {
    if (a.datetime > b.datetime) {
      return -1;
    } else if (a.datetime < b.datetime) {
      return 1;
    } else return 0;
  }

  sortedMovies.sort(compare);
  return sortedMovies;
}

// Sort by oldest first, returns sorted list
export const handleSortOldest = (movies) => {
  // Spreads into new array
  let sortedMovies = [...movies];

  let compare = (a, b) => {
    if (a.datetime < b.datetime) {
      return -1;
    } else if (a.datetime > b.datetime) {
      return 1;
    } else return 0;
  }

  sortedMovies.sort(compare);
  return sortedMovies;
}