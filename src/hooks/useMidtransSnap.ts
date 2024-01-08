import { useEffect, useState } from 'react';

import { midtransApiUrl, midtransClientKey } from '@utils/constant';

interface ISnap extends Window {
  embed: (
    _snap_token: string,
    _action: {
      embedId: string;
      onSuccess: (_result: IMidtransResponse) => void;
      onPending: (_result: IMidtransResponse) => void;
      onError: (_result: IMidtransResponse) => void;
      onClose: () => void;
    }
  ) => void;
  hide: () => void;
}

export default function useMidtransSnap() {
  const [snap, setSnap] = useState<ISnap | null>(null);
  useEffect(() => {
    const myMidtransClientKey = midtransClientKey;
    const midtransScriptUrl = `${midtransApiUrl}/snap/snap.js`;
    const scriptTag = document.createElement('script');

    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    scriptTag.onload = () => {
      setSnap(window?.snap);
    };

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const snapEmbed = (
    snap_token: string,
    embedId: string,
    action: {
      onSuccess: (_result: IMidtransResponse) => void;
      onPending: (_result: IMidtransResponse) => void;
      onError: (_result: IMidtransResponse) => void;
      onClose: () => void;
    }
  ) => {
    if (snap) {
      snap?.embed(snap_token, {
        embedId,
        onSuccess: (result) => {
          action.onSuccess(result);
        },
        onPending: (result) => {
          action.onPending(result);
        },
        onError: (result) => {
          action.onError(result);
        },
        onClose: () => {
          snap.hide();
          action.onClose();
        },
      });
    }
  };

  return { snapEmbed };
}
