import { useRef } from 'react';
import { Share, MessageCircleMore, HeartPlus } from 'lucide-react';
import Navbar from '../Global_Component/Navbar';
import { usePosts } from '../../services/useApi.jsx';
import './Actualities.css';


function CadreExpo({ ShortName, Name, Time, Place, ExpoDate, Description, ExpoName, LikesNum, CommentsNum, PathAndType }) {
  const contentRef = useRef(null);
  const onHover = () => { if (PathAndType?.type === "video") contentRef.current?.play(); };
  const onLeave = () => { if (PathAndType?.type === "video" && contentRef.current) { contentRef.current.currentTime = 0; contentRef.current.pause(); } };
  const Media = () => PathAndType?.type === 'video'
    ? <video ref={contentRef} src={PathAndType.path} className='w-full h-full object-cover' muted loop />
    : <img ref={contentRef} src={PathAndType?.path} className='w-full h-full object-cover' />;

  return (
    <div className="border border-[#4e4836] w-[95%] aspect-[15/6] mb-[10px] mt-[20px] hover:border-[#786a43] transition-all duration-100">
      <div className="w-full h-[20%] bg-[#2E2820] flex">
        <div className="justify-items-center w-[7%]">
          <p className="border mt-[20%] border-[rgba(201,168,76,0.35)] p-[5px] pl-[7px] pr-[7px] rounded-full text-[27px] text-[#8B6914]">{ShortName}</p>
        </div>
        <div className="w-[78%]">
          <p className="text-[#F5EDD6] text-[20px] mt-[2%]">{Name}</p>
          <p className="text-[#9B8E75] text-[15px]">{Time} · {Place}</p>
        </div>
        <div className="w-[15%] justify-items-center">
          <p className="border text-[#5DADE2] text-[15px] pr-[10px] pl-[10px] mt-[18%]">EXPOSITION</p>
        </div>
      </div>
      <div className="h-[68%]">
        <div className="w-full h-[75%]" onMouseEnter={onHover} onMouseLeave={onLeave}>
          <Media />
        </div>
        <div className="w-full h-[25%] bg-[#2E2820] pl-[20px] pt-[18px]">
          <p className="text-[#E8D9B5] text-[16px]">Exposition : &lt;&lt; {ExpoName} &gt;&gt; --- {ExpoDate}</p>
          <p className="text-[#9B8E75] text-[14px]">{Description}</p>
        </div>
      </div>
      <div className="border-t border-[rgba(201,168,76,0.12)] w-full h-[12%] bg-[#2E2820] flex">
        <div className="h-full w-[85%] flex items-center">
          <div className="flex border border-white ml-[20px] mr-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer">
            <HeartPlus color='white' /><p className="text-white ml-[5px]">{LikesNum} Likes</p>
          </div>
          <div className="flex border border-white mr-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer">
            <MessageCircleMore color='white' /><p className="text-white ml-[5px]">{CommentsNum} Commentaires</p>
          </div>
          <div className="flex border border-white pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer">
            <Share color='white' /><p className="text-white ml-[5px]">Partager</p>
          </div>
        </div>
        <div className="h-full w-[15%] flex items-center justify-center hover:cursor-pointer">
          <p className="bg-[#8B6914] text-[13px] pt-[4px] rounded-[15px] pb-[4px] pl-[20px] pr-[20px]">Voir L'Exposition</p>
        </div>
      </div>
    </div>
  );
}

function CadreActu({ ShortName, Name, Time, Place, ActuName, Description, LikesNum, CommentsNum }) {
  return (
    <div className="border border-[#4e4836] w-[95%] aspect-[15/3] mb-[10px] mt-[20px] hover:border-[#786a43] transition-all duration-100">
      <div className="w-full h-[35%] bg-[#2E2820] flex border-b border-b-[rgba(201,168,76,0.12)]">
        <div className="justify-items-center w-[7%]">
          <p className="mt-[20%] p-[5px] pl-[7px] pr-[7px] rounded-full text-[27px] bg-[#1A1A4A] border border-[#282880] text-[#5DADE2]">{ShortName}</p>
        </div>
        <div className="w-[78%]">
          <p className="text-[#F5EDD6] text-[20px] mt-[2%]">{Name}</p>
          <p className="text-[#9B8E75] text-[15px]">{Time} · {Place}</p>
        </div>
        <div className="w-[15%] justify-items-center">
          <p className="border text-[#58D68D] text-[15px] pr-[10px] pl-[10px] mt-[18%]">ACTUALITÉ</p>
        </div>
      </div>
      <div className="w-full h-[35%] bg-[#2E2820] pl-[20px] pt-[18px]">
        <p className="text-[#E8D9B5] text-[16px]">{ActuName}</p>
        <p className="text-[#9B8E75] text-[14px]">{Description}</p>
      </div>
      <div className="border-t border-[rgba(201,168,76,0.12)] w-full h-[30%] bg-[#2E2820] flex">
        <div className="h-full w-[85%] flex items-center">
          <div className="flex border border-white ml-[20px] mr-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer">
            <HeartPlus color='white' /><p className="text-white ml-[5px]">{LikesNum} Likes</p>
          </div>
          <div className="flex border border-white mr-[20px] pt-[5px] pb-[5px] pl-[15px] pr-[15px] rounded-[7px] hover:bg-[rgba(43,104,248,0.1)] cursor-pointer">
            <MessageCircleMore color='white' /><p className="text-white ml-[5px]">{CommentsNum} Commentaires</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Actualities — branché sur usePosts() ─────────────────────────────────────
export function Actualities({ connetionState }) {
  const { posts, loading, error } = usePosts(); // ← API réelle

  return (
    <div>
      <Navbar isConnected={connetionState} />
      <div className="fixed w-full">
        <div className="mt-[105px] bg-[#12100D] w-full h-[100px] flex">
          <div className="flex-6 pl-[30px] pt-[5px]">
            <p className="text-[#C9A84C] text-[32px]">FIL D'ACTUALITÉ</p>
            <p className="text-[#9B8E75] mt-0">Les dernières nouvelles de la scène artistique africaine</p>
          </div>
        </div>
        <div className="w-full flex h-[100vh]">
          <div className="w-full no-scrollbar overflow-y-scroll bg-[#0A0806] border-2 justify-items-center border-[rgba(201,168,76,0.12)] flex-5 h-[calc(100vh-205px)]">

            {/* États de chargement */}
            {loading && (
              <p className="text-[#9B8E75] text-center mt-[10%] text-[18px] tracking-widest">
                Chargement des actualités...
              </p>
            )}
            {error && (
              <p className="text-[#E74C3C] text-center mt-[10%] text-[14px]">
                Erreur : {error}
              </p>
            )}

            {!loading && !error && posts.length === 0 && (
              <p className="text-[#9B8E75] text-center mt-[10%]">Aucune actualité pour le moment.</p>
            )}

            {!loading && posts.map((post) => (
              // Pour l'instant tous les posts sont affichés comme CadreActu
              // Adapte selon un champ "type" si ton modèle le supporte
              <CadreActu
                key={post.id}
                ShortName={post.shortName}
                Name={`${post.nom} ${post.prenom}`}
                Time="Récemment"
                Place=""
                ActuName={post.title || "Publication"}
                Description={post.content}
                LikesNum={post.nbr_likes}
                CommentsNum={post.nbr_comment}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
