import GradientLayout from '../../../components/GradientLayout';
import SongsTable from '../../../components/SongsTable';
import { validateToken } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

const getBGColor = () => {
  const colors = [
    'red',
    'green',
    'blue',
    'purple',
    'yellow',
    'orange',
    'gray',
    'teal',
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
  const color = getBGColor();
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle='playlist'
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;
  try {
    user = validateToken(req.cookies.MONSOON_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    };
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id, //'+' converts the query value to a number
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: { playlist: JSON.parse(JSON.stringify(playlist)) },
  };
};

export default Playlist;
