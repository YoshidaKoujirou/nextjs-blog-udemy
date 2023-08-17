import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout,{siteTitle} from '@/components/Layout'
import utilStyle from "../styles/utils.module.css"
import Link from 'next/link'
import {getPostsData} from '../lib/post'

//SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostsData(); //id, title, date, thumbnail
  return{
    props: {
      allPostsData: Array.isArray(allPostsData) ? allPostsData : [],
    },
  };
}

export default function Home({ allPostsData }) {
  return(
    <Layout home>
      <Head>
        <title>
          {siteTitle}
        </title>
      </Head>
      <section>
        <p className={utilStyle.headingMd}>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2 >TOPICS</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date,thumbnail } ) => (
            <article key={id}>
              <Link href={`/posts/${id}`}> 
                <img 
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br/>
              <small className={utilStyle.lightText}>{date}</small>
            </article>        
          ))}
        </div>
      </section>
    </Layout>
)}
