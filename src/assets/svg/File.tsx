type IconProps = {
  fill?: string;
  stroke?: string;
  width?: number;
  height?: number;
};

export default function File({
  fill = "none",
  stroke = "none",
  width = 25,
  height = 24,
}: IconProps) {
  return (
<svg width={width} height={height} viewBox="0 0 24 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_1412_21882)">
<g clipPath="url(#clip1_1412_21882)">
<path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H10L12 6H20C20.55 6 21.0208 6.19583 21.4125 6.5875C21.8042 6.97917 22 7.45 22 8V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H20V8H11.175L9.175 6H4V18Z" fill={fill} />
</g>
</g>
<defs>
<clipPath id="clip0_1412_21882">
<rect width="24" height="24" fill={fill} />
</clipPath>
<clipPath id="clip1_1412_21882">
<rect x="-8" y="-8" width="40" height="40" rx="20" fill={fill} />
</clipPath>
</defs>
</svg>

  );
}
