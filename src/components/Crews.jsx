
export const Crews = ({ crews }) => {
    const characterCrew = crews.find((v) => v.job === "Characters");
    const directorCrew = crews.find((v) => v.job === "Director");
    const writerCrews = crews.filter((v) => v.job === "Writer");
    const crewsToShow = [characterCrew, directorCrew, ...writerCrews];

    const renderCrews = crewsToShow.map(
        (c) =>
        !!c && (
            <div key={c.id} className="" role="button">
            <div className="fw-bold">{c.name}</div>
            <div className="text-white-50 fw-light">{c.job}</div>
            </div>
        )
    )

    return (
        <div className="crews-grid pt-3">
            {renderCrews}
        </div>
    )
}