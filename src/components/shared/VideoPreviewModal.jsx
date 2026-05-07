import { useEffect, useMemo, useRef, useState } from 'react'
import { getVideoPreviewSource } from '../../utils/appUtils'

const emptyPlayerState = {
  currentTime: 0,
  duration: 0,
  isPlaying: false,
}

function formatVideoTime(value) {
  if (!Number.isFinite(value) || value < 0) {
    return '0:00'
  }

  const totalSeconds = Math.floor(value)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function getVideoMimeType(src) {
  if (src.endsWith('.webm')) {
    return 'video/webm'
  }

  if (src.endsWith('.ogg')) {
    return 'video/ogg'
  }

  return 'video/mp4'
}

export default function VideoPreviewModal({ item, content, onClose }) {
  const videoSource = useMemo(() => getVideoPreviewSource(item), [item])
  const videoRef = useRef(null)
  const [playerState, setPlayerState] = useState(emptyPlayerState)
  const showDeveloperVideoNote =
    videoSource.kind === 'placeholder' && item?.developerVideoPath && item.type === 'video'
  const isFileVideo = videoSource.kind === 'file'
  const playerLabels = content.playerLabels || {}
  const progressPercent =
    playerState.duration > 0 ? (playerState.currentTime / playerState.duration) * 100 : 0

  const syncPlayerState = () => {
    const video = videoRef.current

    if (!video) {
      setPlayerState(emptyPlayerState)
      return
    }

    setPlayerState({
      currentTime: video.currentTime || 0,
      duration: Number.isFinite(video.duration) ? video.duration : 0,
      isPlaying: !video.paused && !video.ended,
    })
  }

  const togglePlayPause = () => {
    const video = videoRef.current

    if (!video) {
      return
    }

    if (video.paused || video.ended) {
      const playPromise = video.play()
      playPromise?.catch(() => {})
    } else {
      video.pause()
    }
  }

  const restartVideo = () => {
    const video = videoRef.current

    if (!video) {
      return
    }

    video.currentTime = 0
    const playPromise = video.play()
    playPromise?.catch(() => {})
    syncPlayerState()
  }

  const handleTimelineChange = (event) => {
    const video = videoRef.current

    if (!video) {
      return
    }

    const nextTime = Number(event.target.value)
    video.currentTime = nextTime
    syncPlayerState()
  }

  useEffect(() => {
    if (!item) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [item, onClose])

  useEffect(() => {
    if (!isFileVideo) {
      setPlayerState(emptyPlayerState)
      return undefined
    }

    const video = videoRef.current

    if (!video) {
      return undefined
    }

    video.load()
    video.muted = true
    video.defaultMuted = true
    video.volume = 0
    syncPlayerState()
    const playPromise = video.play()
    playPromise?.catch(() => {})

    return () => {
      video.pause()
    }
  }, [isFileVideo, videoSource.src])

  if (!item) {
    return null
  }

  return (
    <div
      className="video-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="video-modal__panel">
        <button
          type="button"
          className="video-modal__close"
          aria-label={content.closeLabel}
          onClick={onClose}
          autoFocus
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={`video-modal__stage video-modal__stage--${videoSource.kind}`}>
          <div className="video-modal__stage-topbar" aria-hidden="true">
            <div className="video-modal__stage-meta">
              <span className="video-modal__stage-badge">{item.badge}</span>
              <span className="video-modal__stage-signal" />
              <span className="video-modal__stage-tag">{content.eyebrow}</span>
            </div>
            <span className="video-modal__stage-title">{item.title}</span>
          </div>

          <div className="video-modal__viewport">
            {videoSource.kind === 'embed' ? (
              <iframe
                src={videoSource.src}
                title={item.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : videoSource.kind === 'file' ? (
              <video
                key={videoSource.src}
                ref={videoRef}
                autoPlay
                muted
                defaultMuted
                playsInline
                poster={item.videoPoster}
                preload="metadata"
                onClick={togglePlayPause}
                onDurationChange={syncPlayerState}
                onEnded={syncPlayerState}
                onLoadedMetadata={syncPlayerState}
                onPause={syncPlayerState}
                onPlay={syncPlayerState}
                onTimeUpdate={syncPlayerState}
                onVolumeChange={syncPlayerState}
              >
                <source src={videoSource.src} type={getVideoMimeType(videoSource.src)} />
              </video>
            ) : (
              <div
                className={`video-modal__placeholder-screen ${
                  item.tone ? `video-modal__placeholder-screen--${item.tone}` : ''
                }`}
                aria-hidden="true"
              >
                <div className="video-modal__placeholder-grid" />
                <div className="video-modal__placeholder-play" />
                <div className="video-modal__placeholder-bars">
                  <span />
                  <span />
                </div>
                <div className="video-modal__placeholder-orb" />
                <div className="video-modal__placeholder-copy">
                  <strong>{content.placeholderTitle}</strong>
                  <p>{content.placeholderText}</p>
                  {showDeveloperVideoNote ? (
                    <div className="video-modal__developer-note">
                      <span className="video-modal__developer-kicker">Developer handoff</span>
                      <span className="video-modal__developer-label">Video source</span>
                      <code>{item.developerVideoPath}</code>
                      {item.developerVideoChecklist?.map((note) => (
                        <p key={note}>{note}</p>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          {isFileVideo ? (
            <div className="video-modal__stage-dock video-modal__stage-dock--interactive">
              <label className="video-modal__timeline">
                <span style={{ width: `${progressPercent}%` }} />
                <input
                  className="video-modal__timeline-input"
                  type="range"
                  min="0"
                  max={playerState.duration || 0}
                  step="0.1"
                  value={Math.min(playerState.currentTime, playerState.duration || 0)}
                  onChange={handleTimelineChange}
                  aria-label={playerLabels.progress || 'Video progress'}
                  disabled={!playerState.duration}
                />
              </label>
              <div className="video-modal__controls">
                <button
                  type="button"
                  className={`video-modal__control-button video-modal__control-button--play ${
                    playerState.isPlaying ? 'is-playing' : ''
                  }`}
                  onClick={togglePlayPause}
                  aria-label={
                    playerState.isPlaying
                      ? playerLabels.pause || 'Pause video'
                      : playerLabels.play || 'Play video'
                  }
                >
                  <span className="video-modal__visually-hidden">
                    {playerState.isPlaying
                      ? playerLabels.pause || 'Pause video'
                      : playerLabels.play || 'Play video'}
                  </span>
                </button>
                <button
                  type="button"
                  className="video-modal__control-button video-modal__control-button--secondary"
                  onClick={restartVideo}
                >
                  {playerLabels.restartShort || 'Restart'}
                </button>
                <span className="video-modal__time">
                  {formatVideoTime(playerState.currentTime)} / {formatVideoTime(playerState.duration)}
                </span>
              </div>
            </div>
          ) : (
            <div className="video-modal__stage-dock" aria-hidden="true">
              <div className="video-modal__timeline">
                <span />
              </div>
              <div className="video-modal__controls">
                <span className="video-modal__control video-modal__control--play" />
                <span className="video-modal__control" />
                <span className="video-modal__control" />
                <span className="video-modal__time">00:45</span>
              </div>
            </div>
          )}
        </div>

        <div className="video-modal__content">
          <span className="card-eyebrow">{content.eyebrow}</span>
          <h3 id="video-modal-title">{item.title}</h3>
          <p>{item.note}</p>

          <div className="video-modal__chips">
            <span className="video-modal__chip">{item.badge}</span>
          </div>

          <div className="video-modal__highlight-list">
            {content.highlights.map((highlight) => (
              <div key={highlight} className="video-modal__highlight">
                <span aria-hidden="true" />
                <strong>{highlight}</strong>
              </div>
            ))}
          </div>

          {videoSource.kind === 'external' ? (
            <a
              className="secondary-button video-modal__external"
              href={videoSource.src}
              target="_blank"
              rel="noreferrer"
            >
              {content.openExternal}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}
