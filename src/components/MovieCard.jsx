import langToLang from "language-name-to-language-name";
import moment from "moment";
import { FaPlay } from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ media }) => {
  const navigate = useNavigate();
  const language = langToLang(media.original_language);

  const handleRouteChange = (movieId) => {
    navigate(`/details/${movieId}`);
  };

  return (
    <div className="w-full h-full">
      <div className="relative group w-72 sm:w-96 overflow-hidden cursor-default">
        <div className="rounded-md overflow-hidden">
          <img
            src={`${
              media?.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${media?.backdrop_path}`
                : "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"
            }`}
            alt=""
            className="h-[270px] object-cover"
          />
          <div className="absolute bottom-10 z-30 px-5 group-hover:-translate-y-32 transition-transform duration-300 ">
            <h2 className="text-lg sm:text-2xl group-hover:text-base transition duration-300 font-bold">
              {media?.title || media?.name}
            </h2>
            <span className="text-gray-300 capitalize text-sm">
              {language?.en.name ? language?.en.name : "English"}
            </span>{" "}
            • <span className="text-sm text-gray-300">{moment(media?.release_date).format("MMMM D YYYY")}</span>
          </div>
          <div className="absolute z-10 inset-0 group-hover:-translate-y-0 translate-y-full w-full h-full transition duration-300 bg-black/30 backdrop-blur rounded-md overflow-hidden">
            <div className="translate-y-28 px-5 py-1">
              <h4 className="font-bold text-sm">Overview</h4>
            </div>
            <div className="h-[60px] overflow-y-auto scrollbar px-5 translate-y-28">
              <p className="text-sm">{media?.overview}</p>
            </div>
            <div className="px-5 translate-y-28 flex gap-3 mt-4">
              <button className="flex items-center gap-1 text-sm hover:bg-[#FFAE06] bg-[#FFC54E] transition duration-300 rounded-full px-5 py-1">
                <FaPlay size="15px" />
                <span>Trailler</span>
              </button>
              <button
                onClick={() => handleRouteChange(media.id)}
                className="flex items-center gap-1 text-sm hover:bg-[#FFC54E] bg-[#FFAE06] transition duration-300 rounded-full px-5 py-1"
              >
                <LuClipboardList size="20px" />
                <span>Details</span>
              </button>
            </div>
          </div>
          <div className="absolute top-0 w-full h-full bg-black/30 rounded-md overflow-hidden" />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
