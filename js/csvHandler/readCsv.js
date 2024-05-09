export async function readCsv(fileName="exercise.csv") {
    const url = `http://localhost:5001/getCsv?fileName=${fileName}`;
    try {
        const response = await fetch(url, { mode: "cors" });
        const data = await response.json();
        return data;
    }
    catch (error) {
        throw error;
    }
}
