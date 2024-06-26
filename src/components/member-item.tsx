import ProfilePhoto from '@/components/profile-photo'
import { getFileURLFromGCS } from '@/helpers/helpers'
import { cn } from '@/lib/utils'

interface MemberItemProps {
  name: string
  image?: string | null
  about?: string | null
  className?: string
}

const MemberItem = ({
  name, image, about, className,
}: MemberItemProps) => (
  <div className={cn(
    'grid grid-cols-[auto_1fr] grid-rows-1 gap-x-3 items-center',
    'group rounded-md transition text-left',
    'hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',
    'outline-none select-none cursor-pointer',
    className,
  )}
  >
    <div className="row-span-2 my-auto">
      <ProfilePhoto
        username={name}
        src={image ? getFileURLFromGCS(image) : null}
        width={32}
        height={32}
      />
    </div>
    <div className="grid">
      <p className="text-sm truncate">{name}</p>
      {about
        && (
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {about}
          </p>
        )}
    </div>
  </div>
)

export default MemberItem
