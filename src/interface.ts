export interface ShortenURLResponse {
  short_url: string;
  url: string;
  whatsapp: string;
  twitter: string;
  facebook: string;
  gmail: string;
}

export interface ValidationError {
  detail: Detail[];
}

export interface Detail {
  loc: [string, number];
  msg: string;
  type: string;
}
export interface QRResponse {
  qr_code: string;
}
