

export default function MatchDetails(props) {

    const [team1Score, team2Score] = props.score.split('-').map(Number);
    const playerOne = props.team1[0];
    const playerTwo = props.team1[1];
    const playerThree = props.team2[0];
    const playerFour = props.team2[1];

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
            <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Match {props.matchID} Details</h1>
            <div className="text-2xl font-semibold">
                <span className="mr-8">Team 1: {team1Score}</span>
                <span>Team 2: {team2Score}</span>
            </div>
            </div>
            <div className="relative w-[400px] h-[400px] bg-green-700 rounded-lg flex flex-wrap">
            <div className="w-1/2 h-1/2 flex items-center justify-center text-white text-xl font-bold border-r-2  border-white">
                {playerOne}
            </div>
            <div className="w-1/2 h-1/2 flex items-center justify-center text-white text-xl font-bold border-l-2  border-white">
                {playerThree}
            </div>
            <div className="w-1/2 h-1/2 flex items-center justify-center text-white text-xl font-bold border-r-2  border-white">
                {playerTwo}
            </div>
            <div className="w-1/2 h-1/2 flex items-center justify-center text-white text-xl font-bold border-l-2  border-white">
                {playerFour}
            </div>
            </div>
            <div className="flex flex-col w-full max-w-md mt-8">
            <input
                className="border-2 border-gray-300 p-2 mb-4 rounded-md"
                placeholder="Enter Score Here (00-00)"
                type="text"
            />
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </div>
        </main>
        )
    }