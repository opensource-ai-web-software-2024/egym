export async function readCsv(fileName="user_routine.csv") {
    const url = `http://localhost:5001/getCsv?fileName=${fileName}`;
    try {
        const response = await fetch(url, { mode: "cors" });
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        throw error;
    }
}

readCsv("exercise.csv");
