// Functions

// Handle sort by rating highest first
export const handleSortRatingHighest = (props) => {
  // Spreads into new array so React will detect props change and re-renders
  let sortedMovies = [...props.movies];

  let compare = (a, b) => {
    if (a.rating > b.rating) {
      return -1;
    } else if (a.rating < b.rating) {
      return 1;
    } else return 0;
  }

  sortedMovies.sort(compare)
  props.setMovies(sortedMovies)
}

// Handle sort by rating lowest first
export const handleSortRatingLowest = (props) => {
  // Spreads into new array so React will detect props change and re-renders
  let sortedMovies = [...props.movies];

  let compare = (a, b) => {
    if (a.rating < b.rating) {
      return -1;
    } else if (a.rating > b.rating) {
      return 1;
    } else return 0;
  }

  sortedMovies.sort(compare)
  props.setMovies(sortedMovies)
}

// Handle sort by newest first
export const handleSortNewest = (props) => {
  // Spreads into new array so React will detect props change and re-renders
  let sortedMovies = [...props.movies];

  let compare = (a, b) => {
    if (a.datetime > b.datetime) {
      return -1;
    } else if (a.datetime < b.datetime) {
      return 1;
    } else return 0;
  }

  sortedMovies.sort(compare)
  props.setMovies(sortedMovies)
}

// Handle sort by oldest first
export const handleSortOldest = (props) => {
  // Spreads into new array so React will detect props change and re-renders
  let sortedMovies = [...props.movies];

  let compare = (a, b) => {
    if (a.datetime < b.datetime) {
      return -1;
    } else if (a.datetime > b.datetime) {
      return 1;
    } else return 0;
  }

  sortedMovies.sort(compare)
  props.setMovies(sortedMovies)
}