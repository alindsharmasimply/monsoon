import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import GradientLayout from '../../components/GradientLayout';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <GradientLayout
      color='red'
      roundImage={true}
      subtitle='profile'
      title='Alind Sharma'
      description='Public Playlists'
      image='user-profile.jpg'
    >
      <div>Home Page</div>
    </GradientLayout>
  );
}
