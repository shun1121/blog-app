import { Content, Contents } from "newt-client-js"
import { GetStaticPaths, GetStaticProps } from "next"
import { client } from "../../libs/client"

interface Post extends Content {
  title: string
  body: string
}

const Blog = (props: any) => {
  // console.log(props)
  return (
    <p>{props.title}</p>
  )
}

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getContents<Post>({
    appUid: 'blog',
    modelUid: 'article',
  })
  // 記事のidを配列で返す。
  const ids = data.items.map((item) => `/blog/${item._id}`)
  return {
    paths: ids,
    fallback: false,
  }
}
export const getStaticProps: GetStaticProps<{}, {id: string}> = async (context) => {
  if (!context.params) {
    return { notFound: true }
  }
  
  const data = await client.getContent<Post>({
    appUid: 'blog',
    modelUid: 'article',
    contentId: context.params.id,
  })
  // console.log(context.params.id);
  
  return {
    props: data,
  };
}

export default Blog