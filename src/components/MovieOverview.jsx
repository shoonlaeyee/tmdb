import dayjs from "dayjs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { Crews } from "./Crews";

export const MovieOverview = ({ movie, crews, className="" }) => {

    const productionCompany = movie.production_companies.find((c, i) => i === 0);
    const runtimeHourMinute = [movie.runtime / 60, movie.runtime % 60];
    const userScorePercentage = Math.floor(movie.vote_average * 10);

    const releaseYear = dayjs(movie.release_date).format("YYYY")

    return (
        <div className={`col-12 col-lg-9 py-3 ${className}`}>
            <div className="d-flex gap-2 fw-bold align-items-center lh-1">
            <div className="fs-2">{movie.title}</div>
            <div className="fw-light fs-3">
                ({releaseYear})
            </div>
            </div>
            <div className="d-flex gap-2 align-items-center fw-light fs-6">
            <div className="d-flex gap-1">
                {movie.release_date}
                {!!productionCompany && (
                <span>({productionCompany.origin_country})</span>
                )}
            </div>
            <div
                className="rounded-circle bg-light"
                style={{ width: 6, height: 6 }}
            ></div>
            <div className="d-flex gap-2 py-2">
                {movie.genres.map((g) => g.name).join(", ")}
            </div>
            <div
                className="rounded-circle bg-light"
                style={{ width: 6, height: 6 }}
            ></div>
            <div className="">
                <span>
                {Math.floor(runtimeHourMinute[0])}h{" "}
                {Math.floor(runtimeHourMinute[1])}m
                </span>
            </div>
            </div>
            <div className="d-flex gap-2 align-items-center pb-2">
            <div
                className="rounded-circle"
                style={{
                width: 60,
                height: 60,
                background: "#001100",
                padding: 2,
                }}
            >
                <CircularProgressbar
                value={userScorePercentage}
                strokeWidth={10}
                text={`${userScorePercentage}%`}
                styles={buildStyles({
                    backgroundColor: "red",
                    trailColor: "#004400",
                    pathColor: "green",
                    textColor: "white",
                    textSize: 22,
                })}
                />
            </div>
            <div className="fw-bold lh-sm">
                <div>User</div>
                <div>Score</div>
            </div>
            </div>
            <div className="fw-light text-white-50">
            <i>{movie.tagline}</i>
            </div>

            <div className="fw-bold fs-5 pt-2">Overview</div>
            <div className="fw-light">{movie.overview}</div>
            
            <Crews crews={crews} />

        </div>
    )
}