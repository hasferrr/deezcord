import { ProfilePhoto } from '@/components/profile-photo'

interface UserPhotoProps {
  image?: string | null
  username: string
}

const UserPhoto = ({
  image,
  username,
}: UserPhotoProps) => {
  return (
    <div className="relative w-[92px] h-[92px]">
      <ProfilePhoto
        className="box-content border-[6px] border-solid border-server dark:border-server-dark"
        image={image}
        username={username}
        width={80}
        height={80}
      />
      <div className="box-content absolute bg-green-500 rounded-full bottom-0 right-0 w-4 h-4
      border-[6px] border-solid border-server dark:border-server-dark" />
    </div>
  )
}

export default UserPhoto