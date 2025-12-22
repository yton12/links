'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { AvatarGlow } from './AvatarGlow';

export interface AnimatedAvatarProps {
  reduceMotion: boolean;
}

export function AnimatedAvatar({ reduceMotion }: AnimatedAvatarProps): React.ReactElement {
  return (
    <div className="relative">
      <AvatarGlow />
      <motion.div
        className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/10"
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Image
          src="/avatar.webp"
          alt="Dinesh - Senior Software Engineer"
          width={96}
          height={96}
          className="h-full w-full object-cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAABH0lEQVR4nGNgGLSAmZGRkRlZgBnI+P///38GBgYGJmTFTEDG/1evXv0HMpiQFTMBGc+ePv0PZDAhK2YCMh49fvwfyGBCVswEZNy/f/8/kMGErJgJyLhz5+5/IIMJWTETkHHz1q3/QAYTsmImIOPatev/gQwmZMVMQMaVK1f/AxlMyIqZgIyLFy/9BzKYkBUzARnnzp3/D2QwISsGKma4cOHifyBGl4CQVy5d/g/EqIJM5y9c+A/E6IJM586d+w/E6IJMp8+c/Q/E6IJMp06d/g/E6IJMx0+c/A/E6IJMR44e+w/E6IJMB/8f+g/E6IJM+/cf+A/E6IJMO3ft/g/E6IJM27fv/A/E6IJMW7Zu+w/EKDowAADA1xqJLRf+IQAAAABJRU5ErkJggg=="
          priority
        />
      </motion.div>
    </div>
  );
}
