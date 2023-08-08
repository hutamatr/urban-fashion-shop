type TImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function Image({ ...props }: TImageProps) {
  return <img {...props} loading='lazy' />;
}
