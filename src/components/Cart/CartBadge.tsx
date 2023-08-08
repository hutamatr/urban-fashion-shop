import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { CgShoppingCart } from 'react-icons/cg';
import { Link } from 'react-router-dom';

interface ICartBadgeProps {
  onCartItems: number;
  className?: string;
}

export default function CartBadge({ onCartItems, className }: ICartBadgeProps) {
  const [badgePulse, setBadgePulse] = useState(false);

  useEffect(() => {
    if (onCartItems) {
      setBadgePulse(true);
    }
    const timer = setTimeout(() => {
      setBadgePulse(false);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [onCartItems]);

  return (
    <Link
      to='/cart'
      className={clsx(className, 'relative flex items-center justify-center')}
    >
      <span
        className={clsx(
          onCartItems < 1 ? 'hidden' : 'block',
          onCartItems > 99 ? 'w-8' : 'w-7',
          badgePulse && 'animate-pulse',
          'absolute -right-3 -top-1 flex h-5 items-center justify-center rounded-full bg-dark-brown text-xs font-medium text-white-bone',
          'dark:bg-white-bone dark:text-dark-brown',
          'sm:-top-3'
        )}
      >
        {onCartItems > 99 ? '99+' : onCartItems}
      </span>
      <CgShoppingCart
        className={clsx('text-2xl text-dark-brown', 'dark:text-white-bone')}
      />
    </Link>
  );
}
