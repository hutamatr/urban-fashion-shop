import { SVGProps } from 'react';

export default function PaymentProtectionLogo({
  ...props
}: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={props.width}
      height={props.height}
      viewBox='0 0 256 256'
      {...props}
    >
      <path d='M30 42.2c-4.9 1.4-9.7 5.3-12 9.8-1.9 3.8-2 6-2 62.5s.1 58.7 2 62.5c2.4 4.7 7.1 8.4 12.5 9.9 2.6.7 21.3 1.1 55.2 1.1 45.2 0 51.3-.2 52.7-1.6 1.9-1.8 2-2.8.6-5.5-1-1.8-2.7-1.9-52.6-1.9-56 0-56.2 0-59.9-5.6-1.9-2.7-2-5.1-2.3-43.2L23.9 90H208v9.8c0 10.3.7 12.2 4.5 12.2 4.3 0 4.5-1.1 4.5-28.5 0-23-.3-26.5-1.9-30-2.3-5.1-7.9-10.1-12.8-11.4-5.1-1.4-167.4-1.3-172.3.1zm172.1 10.1c4.1 2.8 5.9 6 5.9 10.9V67H23.8l.7-4.7c.4-2.5 1.4-5.7 2.3-7.1 3.4-5.2 1.6-5.1 89.8-5.2h82.1l3.4 2.3zM208 79v3H24v-6h184v3z' />
      <path d='m166 120.4-22.5 7.3-1.3 3.9c-.7 2.2-1.6 8.4-1.9 13.9-1.1 20.4 4.9 37.8 17.7 50.6 5.6 5.5 8.9 7.8 19.3 13l12.6 6.2 8.3-3.8c13-6 19.1-10 25.4-16.8 7.1-7.6 11.6-15.6 14.5-26.2 1.8-6.7 2.1-9.8 1.7-21.4-.6-19.9 1.2-18-25.8-26.8-12.4-4-23.2-7.2-24-7.2-.8 0-11.6 3.3-24 7.3zm63.9 15.1c1.1 1.2 1.3 22.2.2 27.7-3.3 15.9-13.8 28.9-30 37.2l-9.4 4.9-8.6-4.3c-11.8-5.8-17.4-10.1-22.5-17.4-5.4-7.7-8.1-14.3-9.7-23.1-1.2-7.3-.7-23.1 1-24.8.5-.5 9.6-3.7 20.2-7.1l19.2-6.2 19.5 6.2c10.7 3.5 19.7 6.6 20.1 6.9z' />
      <path d='m199.1 158.6-10.4 9.4-5.3-5c-5.3-5-8-6-10.2-3.8-2.5 2.5-1.1 5.4 6.2 12.7 5.2 5.1 7.9 7.2 9.4 6.9 2.4-.4 26.8-21.5 27.7-24 1-2.8-1.2-5.8-4.3-5.7-2 0-5.5 2.6-13.1 9.5zM41.7 153.7c-1.1 1.1-.8 5.8.5 7.1.8.8 6 1.2 16.9 1.2 13 0 16-.3 17.3-1.6 1.9-1.8 2.1-4.5.4-6.2-1.3-1.3-33.9-1.8-35.1-.5z' />
    </svg>
  );
}
