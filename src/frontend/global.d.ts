type FCClass<P = object> = React.FC<P & React.PropsWithChildren & {
  className?: string;
}>;

type GetElementTypeFromArray<T> = T extends (infer U)[] ? U : never;
