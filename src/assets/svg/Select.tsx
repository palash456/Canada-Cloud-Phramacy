type IconProps = {
  fill?: string;
  stroke?: string;
  width?: number;
  height?: number;
};

export default function Select({
  fill = "none",
  stroke = "none",
  width = 25,
  height = 24,
}: IconProps) {
  return (
<svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_1412_21878)">
<g clipPath="url(#clip1_1412_21878)">
<path d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill={fill}/>
</g>
</g>
<defs>
<clipPath id="clip0_1412_21878">
<rect width="24" height="24" fill={fill}/>
</clipPath>
<clipPath id="clip1_1412_21878">
<rect x="-8" y="-8" width="40" height="40" rx="20" fill={fill}/>
</clipPath>
</defs>
</svg>

  );
}
