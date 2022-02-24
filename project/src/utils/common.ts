export const getRating = (rating: number): number => {
  return (Math.round(rating) / 5) * 100;
}

