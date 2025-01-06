import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { Helmet } from "react-helmet";
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Footer from '../../components/Footer/Footer';
import AppDownload from '../../components/AppDownload/AppDownload';


const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div className=" font-[Outfit]" >
      <Helmet>
        <title>Home - Deliveroo</title>
        <meta
          name="description"
          content="Explore a wide range of delicious dishes with Deliveroo's food delivery service. Order now for fast and reliable delivery!"
        />
        <meta name="keywords" content="order food online, fast food delivery, Deliveroo" />
      </Helmet>
      <Header />
      <main className='max-w-[1200px] mx-auto'>
        
        <ExploreMenu category={category} setCategory={setCategory} />
        <hr className="h-[2px] mt-[10px] border-none bg-slate-100" />

        <FoodDisplay category={category} />
        <AppDownload/>
      </main>
      
    </div>
  );
}

export default Home
