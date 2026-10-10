import { getAllPosts, type Post } from "@/lib/posts";

export const WORK_CATEGORIES = ["gunpla", "girls-plamo"];
const HOW_TO_CATEGORY = "note";
const HOME_SECTION_COUNT = 3;

export function getWorksByNewest(): Post[] {
  return getAllPosts()
    .filter((post) => WORK_CATEGORIES.includes(post.category))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Featured と同じ作品が並ばないよう、制作記録は Featured の次から取る */
export function getHomeFeed(): {
  featured?: Post;
  works: Post[];
  howTos: Post[];
} {
  const [featured, ...restWorks] = getWorksByNewest();
  const howTos = getAllPosts()
    .filter((post) => post.category === HOW_TO_CATEGORY)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    featured,
    works: restWorks.slice(0, HOME_SECTION_COUNT),
    howTos: howTos.slice(0, HOME_SECTION_COUNT),
  };
}
