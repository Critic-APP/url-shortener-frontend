export interface ShortenURLResponse {
  short_url: string;
  url: string;
  whatsapp: string;
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
