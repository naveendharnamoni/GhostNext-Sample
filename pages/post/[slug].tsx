import { useRouter } from "next/router";
import Link from 'next/link';

const { BLOG_URL, CONTENT_API_KEY } = process.env;

async function getPost(slug: string) {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt`
  ).then((res) => res.json());
  const posts = res.posts;
  return posts[0];
}

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: { post },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

const Post: React.FC = (props) => {
  console.log(props);
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return(
  <div>
      <Link href="/">
          Back
      </Link>
    <h1>Hello</h1>
  </div>)
};

export default Post;
