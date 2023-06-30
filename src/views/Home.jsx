import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Loader from "../components/Loader/Loader";
import NowShowing from "../components/NowShowing";
import Showcase from "../components/Showcase";
import Content from "../components/content/Content";
import { useGetRandomMovie } from "../hooks/useGetRandomMovie";

import { useGetTrendingQuery } from "../services/api";
import UpcomingMovie from "../components/UpcomingMovie";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import PopularTvShows from "../components/PopularTvShows";

const Home = () => {
  const { data: trending, isLoading } = useGetTrendingQuery({ type: "movies" });
  const { randomMovie } = useGetRandomMovie(trending);
  const [openModal, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
          onClick={() => setModalOpen(false)}
          className="fixed z-40 inset-0 overflow-hidden bg-gradient-to-r from-black/80 backdrop-blur"
        />
      )}
      {openModal && <Modal media={randomMovie} setModalOpen={setModalOpen} openModal={openModal} />}
      <Hero media={randomMovie} />
      <Content variant="primary">
        {isLoading ? <Loader /> : <Showcase media={randomMovie} isMediaSelected={false} setModalOpen={setModalOpen} />}
      </Content>
      <Content isSpacerOnly>
        <NowShowing />
        <UpcomingMovie />
        <PopularTvShows />
      </Content>
    </>
  );
};

export default Home;
