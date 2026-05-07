export default function MediaSlotCard({
  item,
  wide = false,
  compact = false,
  variant = 'default',
  onOpenVideo,
  videoActionLabel,
  imageLoading,
  imageFetchPriority,
}) {
  const isVideo = item.type === 'video'
  const hasVideoSource = Boolean(item.videoUrl || item.embedUrl)
  const resolvedImageLoading = imageLoading || (compact ? 'eager' : 'lazy')
  const resolvedImageFetchPriority = imageFetchPriority || (compact ? 'high' : 'low')
  const showDeveloperNote = item.developerImagePath
    ? isVideo
      ? !item.image || !hasVideoSource
      : !item.image
    : false
  const classes = [
    'media-slot',
    `media-slot--${variant}`,
    `media-slot--${item.type || 'photo'}`,
    wide ? 'media-slot--wide' : '',
    compact ? 'media-slot--compact' : '',
    item.size ? `media-slot--${item.size}` : '',
    item.tone ? `media-slot--tone-${item.tone}` : '',
    item.image ? 'has-image' : 'is-placeholder',
    isVideo ? 'media-slot--interactive' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const Element = isVideo ? 'button' : 'article'
  const interactiveProps = isVideo
    ? {
        type: 'button',
        onClick: () => onOpenVideo?.(item),
        'aria-label': videoActionLabel ? `${videoActionLabel}: ${item.title}` : item.title,
      }
    : {}

  return (
    <Element className={classes} {...interactiveProps}>
      <div className="media-slot__frame">
        {item.image ? (
          <img
            className={item.imageFit === 'contain' ? 'is-contain' : ''}
            src={item.image}
            alt={item.imageAlt || item.title}
            loading={resolvedImageLoading}
            decoding="async"
            fetchPriority={resolvedImageFetchPriority}
          />
        ) : (
          <div className="media-slot__mock" aria-hidden={showDeveloperNote ? undefined : true}>
            <span />
            <span />
            <span />

            {showDeveloperNote ? (
              <div className="media-slot__developer-note">
                <strong>{isVideo ? 'Developer: finish this video card' : 'Developer: finish this image slot'}</strong>

                {!item.image ? (
                  <>
                    <span className="media-slot__developer-label">Image config</span>
                    <code>{item.developerImagePath}</code>
                    {item.developerImageChecklist?.map((note) => (
                      <p key={note}>{note}</p>
                    ))}
                  </>
                ) : null}

                {isVideo && !hasVideoSource ? (
                  <>
                    <span className="media-slot__developer-label">Video source</span>
                    <code>{item.developerVideoPath}</code>
                    {item.developerVideoChecklist?.map((note) => (
                      <p key={note}>{note}</p>
                    ))}
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        )}

        <span className="media-slot__badge">{item.badge}</span>

        {item.type === 'video' ? <div className="media-slot__play" aria-hidden="true" /> : null}
      </div>

      <div className="media-slot__copy">
        <strong>{item.title}</strong>
        <p>{item.note}</p>
      </div>
    </Element>
  )
}
