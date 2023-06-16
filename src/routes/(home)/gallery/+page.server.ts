import type { PageServerLoad } from "./$types";
import {
  Collections,
  type PhotosResponse,
  type YearsResponse,
} from "$lib/pb_types";

export const load: PageServerLoad = async ({ locals }) => {
  const { pb, user } = locals;

  const years = await pb
    .collection(Collections.Years)
    .getList<YearsResponse>(1, 4);
  let photos: string[] = [];
  // get 1 photo from each year
  for (const year of years.items) {
    photos.push(locals.getFile("mpzr3s6p7kf0noq", year.photoId, year.photo));
  }

  return {
    years: structuredClone(years),
    photos: structuredClone(photos),
  };
};
