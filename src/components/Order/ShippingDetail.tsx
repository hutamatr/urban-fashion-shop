import OrderDetailItem from './OrderDetailItem';

export default function ShippingDetail() {
  return (
    <>
      <OrderDetailItem title='Shipping Cost (Flat rate)' value='Rp. 15.000' />
      <OrderDetailItem
        title='Shipping Address'
        value='Jalan Pahlawan No. 1 Jakarta Pusat Indonesia - 10110'
      />
    </>
  );
}
