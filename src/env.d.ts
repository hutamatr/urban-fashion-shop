/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_IMAGE_URL: string;
  readonly VITE_API_TOKEN: string;
  readonly VITE_MIDTRANS_CLIENT_KEY: string;
  readonly VITE_MIDTRANS_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
