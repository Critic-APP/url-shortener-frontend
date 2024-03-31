import qrcode from "@/assets/qrcode.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QRResponse, ValidationError } from "@/interface";
import { api } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Download } from "lucide-react";
import { ChangeEvent, ReactNode, useState } from "react";
import { toast } from "sonner";

export function DownloadQR({
  short_url,
  trigger,
}: {
  short_url: string;
  trigger: ReactNode;
}) {
  type QRFormatType = "image/png" | "image/svg+xml";

  const [qrFormat, setQrFormat] = useState<QRFormatType>("image/png");
  const handleFormatChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQrFormat(event.target.value as QRFormatType);
  };
  const mutation = useMutation({
    mutationKey: ["qr_code"],
    mutationFn: async (url: string): Promise<QRResponse> => {
      const response = await api.post("generate-qr-code", { url });
      const data = await response.data;
      console.log("qrcode response:", data);
      return data;
    },
    onSuccess: async (data) => {
      const download = (path: string, filename: string) => {
        // Create a new link
        const anchor = document.createElement("a");
        anchor.href = path;
        anchor.download = filename;
        // Append to the DOM
        document.body.appendChild(anchor);
        // Trigger `click` event
        anchor.click();
        // Remove element from DOM
        document.body.removeChild(anchor);
      };
      const response = await fetch(data.qr_code);
      const blob = await response.blob(); // Convert response to blob

      // Create a File object
      const metadata = { type: qrFormat }; // Assuming it's a PNG image
      const filename = "qrcode";
      const file = new File([blob], filename, metadata);

      // Create an object URL for the file
      const url = URL.createObjectURL(file);

      // Download file
      download(url, filename);

      // Release the object URL
      URL.revokeObjectURL(url);
      // console.log("success", data, variables);
      //   setUrlData(data);
    },
    onError: (error: AxiosError<ValidationError>, variables, context) => {
      console.log(variables, context);
      const detail = error.response?.data.detail[0];
      console.log(error);
      console.log(detail);
      toast.error(error.name, {
        duration: 2000,
        description: `${detail?.msg}\n`,
      });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-10/12 rounded-md sm:max-w-md text-black font-medium">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold">
            Customize QR Code
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-start">
          <figure className="grid flex-1 gap-2">
            <img className="w-auto" src={qrcode} alt="QR code" />
          </figure>
          <ul aria-label="QR format selection" className="grid *:space-x-2">
            <span>Choose format</span>
            <li>
              <input
                id="png"
                type="radio"
                name="qr-format"
                value={"image/png"}
                checked={qrFormat == "image/png"}
                onChange={handleFormatChange}
              />
              <label htmlFor="png" className="">
                PNG
              </label>
            </li>
            <li>
              <input
                id="svg"
                type="radio"
                name="qr-format"
                value={"image/svg+xml"}
                checked={qrFormat == "image/svg+xml"}
                onChange={handleFormatChange}
              />
              <label htmlFor="svg" className="">
                SVG
              </label>
            </li>
          </ul>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={() => mutation.mutate(short_url)}
            type="button"
            variant="shadow"
            className="gap-x-2 h-full w-auto bg-primary-button"
          >
            <svg
              className={`${
                mutation.isPending ? "animate-spin" : "hidden"
              } h-5 w-5 text-white`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx={12}
                cy={12}
                r={10}
                stroke="currentColor"
                strokeWidth={4}
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>{" "}
            {/* 	image/svg+xml */}
            {/* image/png */}
            {!mutation.isPending && (
              <>
                <Download /> Download
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
