import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchSearchResults from "../../hooks/useFetchSearchResults";
import { InfoContainer } from "../helpers/InfoContainer";
import { Textarea } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { Review } from "../helpers/Review";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

const sanitizeTitle = (title: string) => {
  return title.replace(/ /g, "_").replace(/[:?!/\\*<>|]/g, "");
};

const theme = createTheme();

export const Game = () => {
  const { title } = useParams<{ title: string }>();
  const decodedTitle = decodeURIComponent(title ?? "");
  const { loginToken } = useContext(LoginContext);

  const [reviews, setReviews] = useState<
    {
      userName: string;
      reviewText: string;
      rating: number;
    }[]
  >([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(
        `http://localhost:3000/reviews?title=${decodedTitle}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setReviews((prev) => {
          return data.map((review: any) => {
            return {
              userName: review.username,
              reviewText: review.review,
              rating: review.rating,
            };
          });
        });
      }
    };
    fetchReviews();
  }, [decodedTitle, reload]);

  const [searchResults, fetch_results] = useFetchSearchResults();
  const gameDetails = searchResults[0]
    ? Object.fromEntries(
        Object.entries(searchResults[0])
          .filter(([key]) =>
            ["publisher", "release_date", "star_rating"].includes(key)
          )
          .map(([key, value]) => {
            if (key === "release_date") {
              key = "Release Date";
              value = new Date(value).toLocaleDateString();
            } else if (key === "star_rating") {
              key = "Star Rating";
              value =
                reviews.length > 0
                  ? (
                      reviews.reduce(
                        (acc, review) => acc + parseInt(review.rating, 10),
                        0
                      ) / reviews.length
                    )
                      .toFixed(1)
                      .toString()
                  : "No reviews";
            } else {
              key = "Publisher";
            }
            return [key, value];
          })
      )
    : {};

  const [inputState, setInputState] = useState<{
    starValue: number | null;
    review: string;
  }>({ starValue: 1, review: "" });

  useEffect(() => {
    fetch_results(decodedTitle);
  }, [decodedTitle]);

  const getUserInfo = async () => {
    const response = await fetch("http://localhost:3000/user-info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log("Failed to fetch user info");
      return null;
    }
  };

  const sendReview = async () => {
    console.log("sending message");

    const userInfo = await getUserInfo();
    if (!userInfo) {
      console.log("Failed to fetch user info. Review not sent.");
      return;
    }

    const response = await fetch("http://localhost:3000/add-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loginToken}`,
      },
      body: JSON.stringify({
        title: decodedTitle,
        review: inputState.review,
        rating: inputState.starValue,
        username: userInfo.username,
      }),
    });

    if (response.ok) {
      console.log("Review submitted successfully");
      console.log(await response.json());
      setReload((prev) => !prev);
    } else {
      console.log("Review submission failed");
    }
  };

  return (
    <div className="pt-8 px-28">
      <div className="flex flex-row justify-center gap-10 w-full">
        <div className="w-1/3">
          <InfoContainer>
            <h1 className="text-2xl font-bold">{"Game Info"}</h1>
            <div className="h-0.5 w-full bg-slate-400" />
            <img
              src={`http://localhost:3000/images/${sanitizeTitle(
                searchResults[0]?.title ?? ""
              )}.png`}
              alt={searchResults[0]?.title ?? ""}
              className=" object-cover rounded-md w-80"
            />
            <div className="h-0.5 w-full bg-slate-400" />
            <div className="grid grid-cols-2 gap-2 w-full justify-items-center">
              {Object.entries(gameDetails).map(([key, value]) => (
                <>
                  <h3 key={key} className="text-xl font-semibold">
                    {key}:
                  </h3>
                  <h3 key={value} className="text-xl font-light">
                    {value}
                  </h3>
                </>
              ))}
            </div>
          </InfoContainer>
        </div>
        <div className="w-1/3 flex flex-col gap-5">
          <InfoContainer>
            <h1 className="text-2xl font-bold">
              {searchResults[0]?.title ?? ""}
            </h1>
            <div className="h-0.5 w-full bg-slate-400" />
            <p className="text-xl">{searchResults[0]?.description ?? ""}</p>
          </InfoContainer>
          <InfoContainer>
            <h1 className="text-2xl font-bold">Your Review</h1>
            <div className="h-0.5 w-full bg-slate-400" />
            <Textarea
              placeholder="Leave a review"
              size="md"
              resize="none"
              w="full"
              bg={"white"}
              onChange={(e) => {
                setInputState((prevState) => ({
                  ...prevState,
                  review: e.target.value,
                }));
              }}
              value={inputState.review}
            />
            <div className="h-auto w-auto p-3 rounded-3xl shadow-sm bg-slate-200">
              <ThemeProvider theme={theme}>
                <Rating
                  name="simple-controlled"
                  value={inputState.starValue}
                  onChange={(event, newValue) => {
                    setInputState((prevState) => ({
                      ...prevState,
                      starValue: newValue,
                    }));
                  }}
                />
              </ThemeProvider>
            </div>
            <button
              className="w-1/4 h-10 rounded-lg bg-slate-500 hover:bg-slate-400 transition ease-in-out text-white self-start"
              onClick={sendReview}
            >
              Submit
            </button>
          </InfoContainer>

          <InfoContainer>
            <div className="w-full flex flex-col gap-3 justify-start">
              <h1 className="text-2xl font-bold">Reviews</h1>
              <div className="h-0.5 w-full bg-slate-400" />
            </div>
            <h3 className="text-xl font-semibold">
              {reviews.length} Reviews Found
            </h3>
            {reviews.map((review, index) => (
              <Review
                key={index}
                userName={review.userName}
                rating={review.rating}
                reviewText={review.reviewText}
              />
            ))}
          </InfoContainer>
        </div>
      </div>
    </div>
  );
};
