import facebook from "@/assets/facebook_symbol.svg";
import gmail from "@/assets/gmail_symbol.svg";
import whatsapp from "@/assets/whatsapp_symbol.svg";
import twitter from "@/assets/x_logo.svg";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ShortenURLResponse } from "@/interface";
import { shareLink } from "@/lib/utils";
import { Copy } from "lucide-react";
import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const socials = [
//   {
//     icon: whatsapp,
//     text: "Whatsapp",
//   },
//   {
//     icon: twitter,
//     text: "X(Twitter)",
//   },
//   {
//     icon: facebook,
//     text: "Facebook",
//   },

//   {
//     icon: gmail,
//     text: "Gmail",
//   },
// ];
export function ShareDialog({
  data,
  open,
  setOpen,
}: {
  data: ShortenURLResponse;
  open: boolean;
  setOpen: ((open: boolean) => void) | undefined;
}) {
  const socials = [
    {
      icon: whatsapp,
      text: "Whatsapp",
      href: data.whatsapp,
    },
    {
      icon: twitter,
      text: "X(Twitter)",
    },
    {
      icon: facebook,
      text: "Facebook",
      href: data.facebook,
    },

    {
      icon: gmail,
      text: "Gmail",
      href: data.gmail,
    },
  ];

  function copyToClipboard(url: string) {
    const canShare = shareLink(url);
    try {
      if (!canShare) {
        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(url)
            .then(() => toast.success("Copied to clipboard"));
        } else {
          toast.error("Error copying to clipboard");
        }
      }
    } catch (error) {
      toast.error("Error sharing");
    }
    // if (canShare) {
    //   toast.success("Success", {
    //     // closeButton: true,
    //     // duration: 3,
    //     icon: <ClipboardCheck className="mr-3" />,
    //     important: true,
    //     // position: "top-right",
    //     // style: { zIndex: 9999 },
    //     description: "Link copied to clipboard successfully",
    //   });
    // } else {
    //   toast.error("Error", {
    //     description: "Error in shortening process",
    //     action: { label: "Undo", onClick: () => console.log("Action!") },
    //   });
    // }
    // try {

    //   // shatoast({
    //   //   className: "bg-green-600",
    //   //   duration: 10000000,
    //   //   title: "Success",
    //   //   description: "Link copied to clipboard successfully",
    //   //   action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    //   // });
    // } catch (error) {
    //   console.log("error");

    //   toast.error("Error", {
    //     description: "Error in shortening process",
    //     action: { label: "Undo", onClick: () => console.log("Action!") },
    //   });
    // }
  }
  return (
    <Dialog open={open} modal={false} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="rounded-lg w-10/12 sm:max-w-lg text-black font-medium p-4 pb-6 sm:py-12 sm:px-16 sm:w-full">
        <DialogHeader>
          <DialogTitle className="sm:text-2xl text-center font-semibold">
            Link is ready!
          </DialogTitle>
          <DialogDescription className="text-center">
            Copy your shortened URL and share{" "}
          </DialogDescription>
        </DialogHeader>

        <div className="sm:grid sm:grid-cols-12 gap-4 space-y-1 sm:space-y-0">
          <input
            aria-label="search"
            className=" w-full col-span-8 max-w-sm text-primary-text sm:px-5 sm:py-3 placeholder-gray-500 border-black border-2 focus:border-slate-500 focus:ring-slate-500 rounded-md focus:ring-1"
            type="url"
            defaultValue={data.short_url}
            readOnly
            placeholder="Shortened link here..."
          />
          <div className="col-span-4 items-center gap-4">
            <Button
              onClick={() => copyToClipboard(data.short_url)}
              variant={"shadow"}
              className="gap-x-2 h-full w-full bg-primary-button"
            >
              <Copy />
              Copy
            </Button>
          </div>
        </div>
        <div className="text-center space-y-2">
          <p>Share via</p>
          <div className="flex justify-around gap-4">
            {socials.map((item) => (
              <div key={item.text} className="flex flex-col items-center">
                <Button
                  variant={"shadow"}
                  size={"icon"}
                  className="relative bg-primary-button rounded-full p-2.5"
                >
                  <a target="_blank" href={item.href || ""}>
                    <img src={item.icon} alt={item.text} />
                  </a>
                </Button>
                <span className="text-xs space-x-2 sm:text-base font-semibold">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}