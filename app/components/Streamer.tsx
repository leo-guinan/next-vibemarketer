import { useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer'
import { io, Socket } from 'socket.io-client'

interface StreamerProps {
  roomId: string
  isHost?: boolean
}

export default function Streamer({ roomId, isHost = false }: StreamerProps) {
  const [peers, setPeers] = useState<{ [key: string]: Peer.Instance }>({})
  const [stream, setStream] = useState<MediaStream | null>(null)
  const socketRef = useRef<Socket>()
  const streamRef = useRef<MediaStream>()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Connect to signaling server
    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin)

    // If host, get user media
    if (isHost) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream)
          streamRef.current = stream
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }

          socketRef.current?.emit('join-room', roomId)
        })
        .catch((err) => {
          console.error('Failed to get media devices:', err)
        })
    } else {
      socketRef.current?.emit('join-room', roomId)
    }

    // Handle new user connections
    socketRef.current?.on('user-connected', (userId: string) => {
      if (!isHost) return // Only host initiates connections

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: streamRef.current!
      })

      peer.on('signal', (signal) => {
        socketRef.current?.emit('signal', {
          to: userId,
          from: socketRef.current.id,
          signal
        })
      })

      setPeers((peers) => ({ ...peers, [userId]: peer }))
    })

    // Handle incoming signals
    socketRef.current?.on('signal', ({ from, signal }) => {
      if (isHost) {
        // Host handles incoming viewer signals
        const peer = peers[from]
        if (peer) {
          peer.signal(signal)
        }
      } else {
        // Viewer creates new peer when receiving host signal
        const peer = new Peer({
          initiator: false,
          trickle: false
        })

        peer.on('signal', (signal) => {
          socketRef.current?.emit('signal', {
            to: from,
            from: socketRef.current.id,
            signal
          })
        })

        peer.on('stream', (stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })

        peer.signal(signal)
        setPeers((peers) => ({ ...peers, [from]: peer }))
      }
    })

    // Handle disconnections
    socketRef.current?.on('user-disconnected', (userId: string) => {
      if (peers[userId]) {
        peers[userId].destroy()
        const newPeers = { ...peers }
        delete newPeers[userId]
        setPeers(newPeers)
      }
    })

    return () => {
      // Cleanup
      stream?.getTracks().forEach((track) => track.stop())
      Object.values(peers).forEach((peer) => peer.destroy())
      socketRef.current?.disconnect()
    }
  }, [roomId, isHost])

  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isHost}
        className="w-full h-full object-cover"
      />
    </div>
  )
} 