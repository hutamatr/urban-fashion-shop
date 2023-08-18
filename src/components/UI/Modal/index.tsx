import clsx from 'clsx';
import { createPortal } from 'react-dom';

interface IModalBackdropProps {
  onCloseModalHandler: () => void;
}

interface IModalCardProps {
  children: React.ReactNode;
  modalCardClassName: string;
}

type TModalProps = IModalBackdropProps & IModalCardProps;

function ModalBackdrop({ onCloseModalHandler }: IModalBackdropProps) {
  return (
    <div
      className='fixed left-0 top-0 z-[100] min-h-full w-full bg-slate-800/50'
      onClick={onCloseModalHandler}
    />
  );
}

function ModalCard({ children, modalCardClassName }: IModalCardProps) {
  return (
    <section
      className={clsx(
        'fixed bottom-0 z-[110] w-full',
        'md:bottom-auto md:left-1/2 md:top-1/2 md:w-auto md:-translate-x-1/2 md:-translate-y-1/2'
      )}
    >
      <div
        className={clsx(
          modalCardClassName,
          'flex flex-col rounded-t-2xl bg-white-bone p-4 shadow',
          'dark:bg-dark-brown',
          'md:rounded-md md:p-6'
        )}
      >
        {children}
      </div>
    </section>
  );
}

export const Modal = ({
  children,
  onCloseModalHandler,
  modalCardClassName,
}: TModalProps) => {
  return (
    <>
      {createPortal(
        <ModalBackdrop onCloseModalHandler={onCloseModalHandler} />,
        document.getElementById('modal-backdrop')!
      )}
      {createPortal(
        <ModalCard modalCardClassName={modalCardClassName}>
          {children}
        </ModalCard>,
        document.getElementById('modal-card')!
      )}
    </>
  );
};
