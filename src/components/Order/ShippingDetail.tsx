import OrderDetailItem from './OrderDetailItem';

interface IShippingDetail {
  shippingStatus: string;
  shippingCost: string;
  shippingAddress: string;
}

export default function ShippingDetail({
  shippingStatus,
  shippingCost,
  shippingAddress,
}: Readonly<IShippingDetail>) {
  return (
    <>
      <OrderDetailItem title='Shipping Status' value={shippingStatus} />
      <OrderDetailItem title='Shipping Cost (Flat rate)' value={shippingCost} />
      <OrderDetailItem title='Shipping Address' value={shippingAddress} />
    </>
  );
}
