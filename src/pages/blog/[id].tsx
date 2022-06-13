// import { Content, Contents } from "newt-client-js"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Post } from ".."
import { HeaderResponsive } from "../../components/header"
import { client } from "../../libs/client"
import { links } from "../../mock/headerLink"

// interface Post extends Content {
//   title: string
//   body: string
// }

const Blog: NextPage<Post> = (props) => {
  return (
    <div>
      <HeaderResponsive links={links} />
      <div className="max-w-[1200px] mx-auto">
        {/* <div>{props.title}</div> */}
        <div dangerouslySetInnerHTML={{ __html: props.body }}/>
        {/* <p>{props.body}</p> */}
      </div>
    </div>
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
  return {
    props: data,
  };
}

export default Blog