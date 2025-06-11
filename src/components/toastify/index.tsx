// _app.tsx hoặc layout component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

import type { AppProps } from 'next/app';

export default function Toastify() {
  return (
    <>
      <ToastContainer
        style={
          {
            '--toastify-color-success': 'var(--success-color)',
            '--toastify-color-error': 'var(--warning-color)',
            '--toastify-color-info': 'var(--gray-solid-color)',
            top: '30px',

          } as React.CSSProperties
        }
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}
