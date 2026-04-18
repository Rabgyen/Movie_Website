export default async function MovieDetail({
    params,
}: {
    params: Promise<{ movieId: string }>;
}) {
    const { movieId } = await params;

    return (
        <div>
            <h1>Movie id: {movieId}</h1>
        </div>
    );
}