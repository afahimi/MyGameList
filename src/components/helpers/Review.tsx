import { ThemeProvider } from "@emotion/react";
import { InfoContainer } from "./InfoContainer";
import { Rating, createTheme } from "@mui/material";

const theme = createTheme();

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <ThemeProvider theme={theme}>
      <Rating name="simple-controlled" value={rating} readOnly />
    </ThemeProvider>
  );
};

interface ReviewProps {
  userName: string;
  rating: number;
  reviewText: string;
}

export const Review = ({ userName, rating, reviewText }: ReviewProps) => {
  return (
    <div className="h-auto w-full bg-slate-200 px-4 py-2 rounded-md flex flex-col gap-3">
      <div className="flex flex-row w-full h-auto items-center gap-3">
        <h3 className="text-xl font-bold">{userName}</h3>
        <StarRating rating={rating} />
      </div>
      <p className="text-xl">{reviewText}</p>
    </div>
  );
};
