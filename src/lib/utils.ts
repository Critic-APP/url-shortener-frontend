import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const api = axios.create({
  baseURL: "https://shlnk.up.railway.app/",
  // timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
  },
});
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shareLink(url: string) {
  const data: ShareData = {
    url: url,
    text: "Your shortened link is ready!",
    title: "Shortened Link",
  };
  let shareSuccess = false;

  try {
    if (navigator.canShare && navigator.canShare(data) && navigator.share) {
      navigator.share(data);
      shareSuccess = true;
      return shareSuccess;
    }
  } catch (error) {
    shareSuccess = false;
    return shareSuccess;
  }

  // if (!shareSuccess) {
  //   if (navigator.clipboard) {
  //     navigator.clipboard.writeText(url);
  //     toast.success("Copied to clipboard");
  //   } else {
  //     console.log("Error copying to clipboard");
  //     toast.error("Error copying to clipboard");
  //   }
  // }
  // try {
  //   if (!shareSuccess) {
  //     if (navigator.clipboard) {
  //       navigator.clipboard
  //         .writeText(url)
  //         .then(() => toast.success("Copied to clipboard"));
  //     } else {
  //       // display("Error copying to clipboard");
  //       toast.error("Error copying to clipboard");
  //     }
  //   }
  // } catch (error) {
  //   // display("Error sharing");
  //   toast.error("Error sharing");
  // }
}
