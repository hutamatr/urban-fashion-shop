import OrderDetailItem from './OrderDetailItem';

export default function OrderDetails() {
  return (
    <>
      <OrderDetailItem title='Transaction ID' value='UFS-hutamatr-hutamatr' />
      <OrderDetailItem title='Full Name' value='Hutama Trirahmanto' />
      <OrderDetailItem title='Email' value='hutamaaaa@gmail.com' />
      <OrderDetailItem title='Payment Method' value='Bank Transfer' />
      <OrderDetailItem title='Order Date' value='2022-12-08' />
      <OrderDetailItem title='Order Status' value='Pending' />
    </>
  );
}
