export default function Avatar({ name, avatarUrl, size = 'sm' }) {
  const sizeClasses = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-12 h-12 text-base'

  const initials = (name || '')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={`${sizeClasses} rounded-full object-cover border border-brown-200`}
      />
    )
  }

  return (
    <div className={`${sizeClasses} rounded-full bg-brown-200 text-brown-800 font-semibold flex items-center justify-center`}>
      {initials || '?'}
    </div>
  )
}
