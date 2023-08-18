import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout,{siteTitle} from '@/components/Layout'
import utilStyle from "../styles/utils.module.css"
import Link from 'next/link'
import {getPostsData} from '../lib/post'
import lottie from 'lottie-web'
import {createRef, useEffect } from 'react'

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

  let animationContainer = createRef();

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: "svg",
      loop:true,
      autoplay:true,
      path:"/animations/data.json"

    })

    return ()=> anim.destroy();
  },[])

  return(
    <Layout home>
      <Head>
        <title>
          {siteTitle}
        </title>
      </Head>
      <section>
        <p className={utilStyle.headingMd}>Next.js、Lottieなどなど学習用制作物</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2 >TOPICS</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date,thumbnail } ) => (
            <article key={id}>
              <Link href={`/posts/${id}`}> 
              {
                `${thumbnail}` == "animation" ? 
                  <div className = {styles.animationImage} ref={animationContainer}/> 
                  :
                  <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              }

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
