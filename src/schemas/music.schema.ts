import { z } from "zod";

export const musicSchema = z.object({
  id: z.string(),
  name: z.string(),
  album: z.string(),
  artist: z.string(),
  genre: z.string(),
  year: z.string(),
  cover_image: z.string(),
  music_url: z.string()
});

export const musicSchemaRequest = musicSchema.omit({
  id: true,
  cover_image: true,
  music_url: true
});

export type musicRequest = z.infer<typeof musicSchemaRequest>;

export type musicData = z.infer<typeof musicSchema>;

export interface CurrentMusicType extends musicData {
  duration?: number;
  curTime?: number;
  isPlaying?: boolean;
}

export type PlayerContextType = {
  currentMusic: CurrentMusicType;
  setCurrentMusic: (cm: Partial<CurrentMusicType>, replace?: boolean) => void;
  playList: musicData[];
};
