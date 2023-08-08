import clsx from 'clsx';
import { createPortal } from 'react-dom';

interface IModalBackdropProps {
  onCloseModalHandler: () => void;
}

interface IModalCardProps {
  children: React.ReactNode;
}

type TModalProps = IModalBackdropProps & IModalCardProps;

function ModalBackdrop({ onCloseModalHandler }: IModalBackdropProps) {
  return (
    <div
      className='fixed left-0 top-0 z-20 min-h-full w-full bg-slate-900/75'
      onClick={onCloseModalHandler}
    />
  );
}

function ModalCard({ children }: IModalCardProps) {
  return (
    <section
      className={clsx(
        'fixed bottom-0 left-0 right-0 z-30 mx-auto flex max-h-full max-w-lg flex-col overflow-y-scroll rounded-md bg-white-bone p-5 shadow',
        'sm:top-1/4 sm:max-h-fit'
      )}
    >
      {children}
    </section>
  );
}

export const Modal = ({ children, onCloseModalHandler }: TModalProps) => {
  return (
    <>
      {createPortal(
        <ModalBackdrop onCloseModalHandler={onCloseModalHandler} />,
        document.getElementById('modal-backdrop')!
      )}
      {createPortal(
        <ModalCard>{children}</ModalCard>,
        document.getElementById('modal-card')!
      )}
    </>
  );
};