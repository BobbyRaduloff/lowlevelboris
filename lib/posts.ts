import dayjs from "dayjs";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime from "reading-time";

const posts_directory = path.join(process.cwd(), "posts");

export type Post = {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

export function getSortedPostData(): Post[] {
  const file_names = readdirSync(posts_directory);
  const all_posts_data = file_names.map((file_name) => {
    const id = file_name.replace(/\.md$/, "");

    const full_path = path.join(posts_directory, file_name);
    const file_contents = readFileSync(full_path, "utf8");

    const matter_result = matter(file_contents);

    return {
      id,
      ...matter_result.data,
      date: dayjs(matter_result.data.date).format("MMMM D, YYYY"),
    } as Post;
  });

  return all_posts_data.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export type PostWithContent = Post & {
  content: string;
  minutes: string;
};
export function getPostDataWithContent(id: string): PostWithContent {
  const article_path = path.join(posts_directory, `${id}.md`);
  const source = readFileSync(article_path, "utf8");
  const { data, content } = matter(source);
  const time = readingTime(content);

  return {
    id,
    content,
    minutes: time.text,
    ...data,
  } as PostWithContent;
}
