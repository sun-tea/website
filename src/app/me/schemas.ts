import { z } from 'zod'

// Music data schemas
export const LastFMUserInfoSchema = z.object({
  playcount: z.string(),
})

export const LastFMArtistSchema = z.object({
  mbid: z.string(),
  '#text': z.string(),
})

export const LastFMAlbumSchema = z.object({
  mbid: z.string(),
  '#text': z.string(),
})

export const LastFMRecentTrackSchema = z.object({
  name: z.string().optional(),
  artist: LastFMArtistSchema,
  album: LastFMAlbumSchema,
  image: z
    .array(
      z.object({
        '#text': z.string(),
        size: z.enum(['small', 'medium', 'large', 'extralarge']),
      })
    )
    .optional(),
  '@attr': z
    .object({
      nowplaying: z.enum(['true']),
    })
    .optional(),
  date: z
    .object({
      '#text': z.string(),
      uts: z.string(),
    })
    .optional(),
  url: z.string(),
})

export const LastFMTopArtistSchema = z.object({
  name: z.string(),
  playcount: z.string(),
  '@attr': z.object({
    rank: z.string(),
  }),
  image: z
    .array(
      z.object({
        '#text': z.string(),
        size: z.enum(['small', 'medium', 'large', 'extralarge', 'mega']),
      })
    )
    .optional(),
})

export const LastFMMusicDataSchema = z.object({
  username: z.string(),
  userInfo: LastFMUserInfoSchema,
  recentTracks: z.array(LastFMRecentTrackSchema),
  topArtists: z.array(LastFMTopArtistSchema),
})

export type LastFMUserInfo = z.infer<typeof LastFMUserInfoSchema>
export type LastFMArtist = z.infer<typeof LastFMArtistSchema>
export type LastFMAlbum = z.infer<typeof LastFMAlbumSchema>
export type LastFMRecentTrack = z.infer<typeof LastFMRecentTrackSchema>
export type LastFMTopArtist = z.infer<typeof LastFMTopArtistSchema>
export type LastFMMusicData = z.infer<typeof LastFMMusicDataSchema>
