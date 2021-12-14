import { Request, Response } from "express"
import axios from "axios"

interface YoutubeDataAPI {
  data: {
    pageInfo: {
      totalResults: number,
      resultsPerPage: number
    },
    items: [
      {
        snippet: {
          title: string,
          customUrl: string,
          thumbnails: {
            default: {
              url: string,
              width: number,
              height: number
            },
          }
        },
        statistics: {
          viewCount: string,
          subscriberCount: string,
        }
      }
    ]
  }

}

export function createFlow(controller) {
  return async (req: Request, res: Response) => {
    try {
      const { data }: YoutubeDataAPI = await axios.get(
        'https://www.googleapis.com/youtube/v3/channels',
        {
          params: {
            key: process.env.API_KEY_YOUTUBE,
            part: 'snippet, statistics',
            id: process.env.ID_FLOW
          }
        }
      )

      const response = {
        name: data.items[0].snippet.title,
        icon_url: data.items[0].snippet.thumbnails.default.url,
        subscribe: data.items[0].statistics.subscriberCount,
        views: data.items[0].statistics.viewCount,
        hosts_instagrams: ['', '']
      }

      const newChannel = await controller.create(response)
      console.log(newChannel)
      return res.status(201).json(response)
    } catch (error) {

    }
  }
}
