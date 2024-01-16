import OrderDetailItem from './OrderDetailItem';

interface IOrderDetailsProps {
  transactionId: string;
  fullName: string;
  email: string;
  paymentMethod: string;
  orderDate: string;
  orderStatus: string;
}

export default function OrderDetails({
  transactionId,
  fullName,
  email,
  paymentMethod,
  orderStatus,
  orderDate,
}: Readonly<IOrderDetailsProps>) {
  return (
    <>
      <OrderDetailItem title='Transaction ID' value={transactionId} />
      <OrderDetailItem title='Full Name' value={fullName} />
      <OrderDetailItem title='Email' value={email} />
      <OrderDetailItem title='Payment Method' value={paymentMethod} />
      <OrderDetailItem title='Order Date' value={orderDate} />
      <OrderDetailItem title='Order Status' value={orderStatus} />
    </>
  );
}
