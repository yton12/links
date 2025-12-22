import Image from 'next/image';

import { AvatarGlow } from './AvatarGlow';
import { StatusIndicator } from './StatusIndicator';

export function HeroSection(): React.ReactElement {
  return (
    <section className="flex flex-col items-center gap-4 text-center">
      {/* Avatar with gradient glow */}
      <div className="relative">
        <AvatarGlow />
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/10">
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
        </div>
      </div>

      {/* Identity */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">Dinesh</h1>
        <p className="text-sm text-gray-400">I make computers do fun and useful things.</p>
      </div>

      {/* Status */}
      <StatusIndicator statusText="Online • Working on PassFX" />
    </section>
  );
}
