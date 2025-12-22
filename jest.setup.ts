/* eslint-disable @typescript-eslint/no-require-imports */
import '@testing-library/jest-dom';

// Framer-motion props to filter out from DOM elements
const framerMotionProps = [
  'whileTap',
  'whileHover',
  'whileFocus',
  'whileDrag',
  'whileInView',
  'onTap',
  'onTapStart',
  'onTapCancel',
  'onHoverStart',
  'onHoverEnd',
  'onDrag',
  'onDragStart',
  'onDragEnd',
  'animate',
  'initial',
  'exit',
  'variants',
  'transition',
  'layout',
  'layoutId',
  'drag',
  'dragConstraints',
  'dragElastic',
  'dragMomentum',
  'dragSnapToOrigin',
  'dragTransition',
  'onPan',
  'onPanStart',
  'onPanEnd',
  'onAnimationStart',
  'onAnimationComplete',
];

// Helper to filter framer-motion props
function filterMotionProps<T extends Record<string, unknown>>(props: T): Partial<T> {
  const filtered: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (!framerMotionProps.includes(key)) {
      filtered[key] = value;
    }
  }
  return filtered as Partial<T>;
}

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const React = require('react');

  const MotionA = React.forwardRef(function MotionA(
    { children, ...props }: Record<string, unknown> & { children?: React.ReactNode },
    ref: React.Ref<HTMLAnchorElement>
  ) {
    const filteredProps = filterMotionProps(props);
    return React.createElement('a', { ...filteredProps, ref }, children);
  });

  const MotionDiv = React.forwardRef(function MotionDiv(
    { children, ...props }: Record<string, unknown> & { children?: React.ReactNode },
    ref: React.Ref<HTMLDivElement>
  ) {
    const filteredProps = filterMotionProps(props);
    return React.createElement('div', { ...filteredProps, ref }, children);
  });

  const MotionSpan = React.forwardRef(function MotionSpan(
    { children, ...props }: Record<string, unknown> & { children?: React.ReactNode },
    ref: React.Ref<HTMLSpanElement>
  ) {
    const filteredProps = filterMotionProps(props);
    return React.createElement('span', { ...filteredProps, ref }, children);
  });

  return {
    motion: {
      a: MotionA,
      div: MotionDiv,
      span: MotionSpan,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

// Mock navigator.vibrate for haptic feedback tests
Object.defineProperty(navigator, 'vibrate', {
  value: jest.fn(),
  writable: true,
});
