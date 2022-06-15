// import { Content, Contents } from "newt-client-js"
import * as cheerio from 'cheerio';
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { Post } from ".."
import { Footer } from '../../components/footer';
import { HeaderResponsive } from "../../components/header"
import { client } from "../../libs/client"
import { links } from "../../mock/headerLink"
import styles from '../../styles/detailPage.module.css'

// interface Post extends Content {
//   title: string
//   body: string
// }

const Blog: NextPage<Post> = (props) => {
  return (
    <div>
      <HeaderResponsive links={links} />
      <div className="max-w-[1200px] mx-auto flex space-x-10">
        <section className="w-[calc(100%_-_330px)]">
          <div dangerouslySetInnerHTML={{
            __html: props.content,
          }}/>
          <div>{props.content}</div>
        </section>
        <aside>
          <div dangerouslySetInnerHTML={{
            __html: props.toc,
          }}/>
        </aside>
      </div>
      <Footer />
    </div>
  )
}
const generateTableOfContent = (body: string) => {
  const $ = cheerio.load(body,{ decodeEntities: false })
  // const headings = $('h2, h3').toArray();
  // const toc = headings.map(data => ({
  //   text: data.children[0],
  //   id: data.attribs,
  //   name: data.name
  // }));
  let generateHtml = ''
  generateHtml = generateHtml + '<ul>'
  $('h2, h3').each((index, elm) => {
    const text = $(elm).html()
    const tag = $(elm)[0].name
    // const refId = $(elm)[0].attribs.id
    console.log(text)
    console.log(tag)
    generateHtml = generateHtml + 
    `<li class="toc_${tag}" key=${index}>`+
    `  <a href="#${index}">${text}</a>`+
    '</li>'
  })
  generateHtml = generateHtml + '</ul>'
  return generateHtml
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
  const $ = cheerio.load(data.body,{ decodeEntities: false })
  $('h2, h3').each((index, elm) => {
    $(elm).html();
    $(elm).addClass("headings")
    $(elm).attr('id', `${index}`)
  });
  const toc = generateTableOfContent(data.body)
  return {
    props: {
      data: data,   
      toc: toc,
      content: $.html()
    },
  };
}

export default Blog