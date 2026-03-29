import cx from 'classix';
import type { TButton } from '../types';
import { Link } from 'react-router';
import type { Ref } from 'react';

export const Button: FCClass<TButton> = ({
  className,
  children,
  ref,
  url,
  disabled,
  target,
  submit,
  download,
  onClick,
}) => {
  const elementClass = cx(
    'flex items-center w-fit h-32 border-1 border-black-100 rounded-md px-16 cursor-pointer whitespace-nowrap',
    className,
  );

  if (url) {
    return (
      <Link
        ref={ref as Ref<HTMLAnchorElement | null>}
        className={elementClass}
        to={url}
        target={target}
        onClick={onClick}
        download={download}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement | null>}
      className={elementClass}
      type={submit ? 'submit' : 'button'}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
