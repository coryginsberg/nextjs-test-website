const BASE_URL = "https://hacker-news.firebaseio.com/v0";

export interface PostInfo {
  by: string,
  descendants: number,
  id: number,
  kids: Array<number>,
  score: number,
  text: string,
  time: number,
  title: string,
  type: string,
}

const awaitJson = (responses) => Promise.all(responses.map(response => {
  if(response.ok) return response.json();
  throw new Error(response.statusText);
}));

export async function genTopStories(
  limit: number | null = null
): Promise<Array<PostInfo>> {
  return await fetch(new URL(`${BASE_URL}/topstories.json`))
    .then((response) => response.json())
    .then((data) => {
      if (limit != null) {
        data = data.slice(0, limit);
      }
      let promises = [];
      for (const dat of data) {
        promises.push(fetch(`${BASE_URL}/item/${dat}.json`));
      }
      return Promise.all(promises);
    })
    .then(awaitJson)
    .catch((error) => {
      console.error(error);
      return [];
    });
}
