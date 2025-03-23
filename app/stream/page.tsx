'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Streamer from '../components/Streamer'

function StreamContent() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get('room') || 'default'
  const isHost = searchParams.get('host') === 'true'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {isHost ? 'Broadcasting' : 'Viewing'} Stream
        </h1>
        <Streamer roomId={roomId} isHost={isHost} />
        {isHost && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm">Share this URL with viewers:</p>
            <code className="block mt-2 p-2 bg-white rounded border">
              {`${window.location.origin}/stream?room=${roomId}`}
            </code>
          </div>
        )}
      </div>
    </div>
  )
}

export default function StreamPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StreamContent />
    </Suspense>
  )
} 