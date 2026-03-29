import type { Ref } from 'react';

export type TButton = {
  ref?: Ref<HTMLButtonElement | HTMLAnchorElement | null>;
  // FIXME: добавить иконки
  // icon?: IconsArray;
  // iconClassName?: string;
  // renderIcon?: () => ReactNode;
  url?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  disabled?: boolean;
  download?: boolean;
  submit?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};
