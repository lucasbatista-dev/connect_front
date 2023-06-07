import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef } from "react";
import { TbMusic, TbPlayerSkipBack, TbPlayerSkipForward, TbPlayerStop } from "react-icons/tb";
import { usePlayer } from "@/contexts/playerContext";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Image from "next/image";

const secondsToMinutes = (sec: number | undefined) => {
  if (!sec) return "00:00";
  sec = Math.trunc(+sec);
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;

  return minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
};

const Player = () => {
  const audioRef = useRef<HTMLAudioElement>();
  const { currentMusic, setCurrentMusic, playList } = usePlayer();

  useEffect(() => {
    audioRef.current = new Audio(currentMusic.music_url);

    audioRef.current.addEventListener("play", () => {
      setCurrentMusic({ isPlaying: true });
    });

    audioRef.current.addEventListener("pause", () => {
      setCurrentMusic({ isPlaying: false });
    });

    audioRef.current.addEventListener("ended", (e: any) => {
      skipNext(`https://res.cloudinary.com${new URL(e.target.src).pathname}`);
    });

    audioRef.current.addEventListener("canplay", () => {
      audioRef.current?.play();
    });

    audioRef.current.addEventListener("loadedmetadata", (e: any) => {
      setCurrentMusic({
        curTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
    audioRef.current.addEventListener("timeupdate", (e: any) => {
      setCurrentMusic({
        curTime: e.target.currentTime
      });
    });

    return () => {
      audioRef.current?.pause();
    };
  }, [currentMusic.music_url]);

  const skipNext = (music_url: string) => {
    const musicIndex = playList.findIndex((m) => m.music_url === music_url);

    if (musicIndex === playList.length - 1) {
      setCurrentMusic(playList[0], true);
    } else {
      setCurrentMusic(playList[musicIndex + 1], true);
    }
  };

  const skipPrev = (music_url: string) => {
    const musicIndex = playList.findIndex((m) => m.music_url === music_url);

    if (musicIndex === 0) {
      setCurrentMusic(playList[playList.length - 1]);
    } else {
      setCurrentMusic(playList[musicIndex - 1]);
    }
  };

  return (
    <div className="fixed w-screen bottom-0 inset-x-0 h-24">
      <div className="py-3 bg-blue-900/70  text-gray-100">
        <div className="container flex">
          <div className="flex items-center lg:w-3/12 gap-2 ml-4">
            <div>
              {currentMusic.cover_image ? (
                <Image
                  width={80}
                  height={64}
                  className="w-20 h-16"
                  src={currentMusic.cover_image}
                  alt={currentMusic.name}
                />
              ) : (
                <div className="bg-pink-500 text-gray-100 justify-center items-center text-2xl rounded-lg flex w-full h-full">
                  <TbMusic />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="text-sm font-semibold">{currentMusic.name}</h6>
              <span className="text-xs text-gray-400">{currentMusic.artist}</span>
            </div>
          </div>
          <div className="flex flex-col w-full items-center">
            <div className="flex items-center justify-center gap-3 lg:w-2/12">
              <button onClick={() => skipPrev(currentMusic.music_url)}>
                <TbPlayerSkipBack size={20} className="fill-gray-100 m-1" />
              </button>
              <button
                onClick={() => {
                  if (currentMusic.isPlaying) {
                    audioRef.current?.pause();
                  } else {
                    audioRef.current?.play();
                  }
                }}
                className="rounded-full p-1">
                {currentMusic.isPlaying ? (
                  <TbPlayerStop size={26} className="fill-pink-500 m-1" />
                ) : (
                  <BsFillPlayCircleFill size={26} className="fill-pink-500 m-1 border-pink-500" />
                )}
              </button>
              <button onClick={() => skipNext(currentMusic.music_url)}>
                <TbPlayerSkipForward size={20} className="fill-gray-100 m-1" />
              </button>
            </div>
            <div className="hidden lg:flex w-6/12 flex-row gap-2 justify-center">
              <span className=" text-xs">{secondsToMinutes(currentMusic.curTime)}</span>
              <Slider
                trackStyle={{ background: "#E91E63" }}
                handleStyle={{
                  background: "#E91E63",
                  boxShadow: "none",
                  opacity: 1
                }}
                min={0}
                max={currentMusic.duration}
                value={currentMusic.curTime}
                onChange={(val) => {
                  audioRef.current!.currentTime = +val;
                }}
              />
              <span className=" text-xs">{secondsToMinutes(currentMusic.duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
