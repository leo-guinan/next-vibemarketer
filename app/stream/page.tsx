'use client'

import ReactPlayer from 'react-player'
import { useState } from 'react'

export default function StreamPage() {
  const [streamKey, setStreamKey] = useState('test')
  const streamUrl = `http://localhost:8000/live/${streamKey}/index.m3u8`

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Live Stream</h1>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={streamKey}
              onChange={(e) => setStreamKey(e.target.value)}
              className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Stream Key"
            />
            <div className="text-gray-400">
              RTMP URL: rtmp://localhost:1935/live
            </div>
          </div>
        </div>

        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <ReactPlayer
            url={streamUrl}
            width="100%"
            height="100%"
            playing
            controls
            config={{
              file: {
                attributes: {
                  style: {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
} 