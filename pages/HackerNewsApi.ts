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

export async function genTopStories(
  limit: number | null = null
): Promise<Array<number>> {
  return await fetch(new URL(`${BASE_URL}/topstories.json`))
    .then((response) => response.json())
    .then((data) => {
      if (limit != null) {
        return data.slice(0, limit);
      }
      return data;
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

export async function genItemById(itemId: number): Promise<any> {
  return await fetch(new URL(`${BASE_URL}/item/${itemId}.json`))
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch(() => {
      return;
    });
}