import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import ytdl from "@distube/ytdl-core";



@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async downloadVideo(querystring: {url: string, format?: string}): Promise<string> {
    try {
          
          // Download a video
          await ytdl(querystring.url).pipe(require("fs").createWriteStream("video.mp4"));

          // Get video info
          await ytdl.getBasicInfo(querystring.url).then(info => {
            console.log(info.videoDetails.title);
          });

          // Get video info with download formats
          // ytdl.getInfo("http://www.youtube.com/watch?v=aqz-KE-bpKQ").then(info => {
          //   console.log(info.formats);
          // });

          return new Promise((resolve, reject) => {
            return resolve('success');
          })
    } catch (error) {
      throw new Error(`Failed to download video: ${error.message}`);
    }
  }
}
