import line from "@/assets/Line 40.svg";
import downarrow from "@/assets/down-arrow.svg";
import dot from "@/assets/ellipseicon.svg";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import "./App.css";
import { ShareDialog } from "./components/ShareDialog";
import { Button } from "./components/ui/button";
import { api } from "./lib/utils";

import { AxiosError } from "axios";
import { ShortenURLResponse, ValidationError } from "./interface";

function App() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [urlData, setUrlData] = useState<ShortenURLResponse | null>();
  const mutation = useMutation({
    mutationKey: ["shorten"],
    mutationFn: async (url: string): Promise<ShortenURLResponse> => {
      const response = await api.post("shorten-link", { url });
      const data = await response.data;
      console.log("Shorten response:", data);
      return data;
    },
    onSuccess: (data) => {
      // console.log("success", data, variables);
      setOpen(true);
      setUrlData(data);
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
    <main className="flex min-h-screen flex-col p-4 sm:p-5 items-center justify-center">
      <section className="container -mt-5 px-4 py-7 flex flex-col items-center justify-center gap-y-4">
        <div className="relative text-primary-header text-balance text-start md:text-center font-extrabold gap-y-2 mx-auto">
          {/* <h1 className="font-sans text-3xl sm:text-7xl">Shorten your URLs</h1> */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl 2xl:text-[7.5rem]">
            Shorten your URLs
          </h1>
          <h1 className="text-3xl sm:text-5xl lg:text-7xl 2xl:text-[7.5rem]">
            simple and easy
          </h1>
          {/* <Dot className="size-9 absolute top-0 left-1 " /> */}
          {/* <Dot className="size-10 absolute" /> */}
          <img
            className="absolute top-0 -left-2 sm:-left-3.5 w-3 sm:w-5 z-[2]"
            src={dot}
            alt="left dot"
          />
          <img
            className="absolute bottom-0 -right-2 sm:-right-3.5 w-3 sm:w-5 z-[4]"
            src={dot}
            alt="right dot"
          />
          <img
            className="absolute top-0 -left-1 h-full w-px"
            src={line}
            alt="left line"
          />
          <img
            className="absolute top-0 -right-1 h-full w-px"
            src={line}
            alt="right line"
          />
          {/* <img
            className="absolute bottom-0 h-full w-px"
            src={line}
            alt="top line"
          /> */}
          {/* <img className="absolute top-0 h-full w-px" src={line} /> */}
        </div>
        <div className="grid grid-flow-col">
          <p className="sm:my-4 text-lg sm:text-2xl xl:text-3xl text-primary-text">
            Just paste your link{" "}
          </p>
          <span className="inline-flex items-center">
            <img className="size-9" src={downarrow} alt="Down Arrow" />
          </span>
          {/* <ArrowDown className="w-5 h-9 text-primary-text" /> */}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(url);
            mutation.mutate(url);
          }}
          className="max-w-sm w-full"
          id="shorten-url"
        >
          <input
            aria-label="search"
            required
            className="text-primary-text md:px-5 md:py-3 w-full placeholder-gray-500 border-black border-2 focus:border-slate-500 focus:ring-slate-500 rounded-md focus:ring-1"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste link here..."
          />
        </form>
        {/* <button
          onClick={() => {
            toast.error("Event has not been created");
            toast.success("Event has been created", {
              duration: 2000,
              className: "bg-green-500",
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            });
          }}
          type="button"
          className="relative shadow-right hover:shadow-none transition-shadow border-black border-2 text-black bg-primary-button mt-8 inline-flex items-center justify-center px-6 py-3 sm:px-8 text-base font-medium rounded-md"
        >
          Shorten
        </button> */}

        <Button
          form="shorten-url"
          type="submit"
          disabled={mutation.isPending}
          // onClick={() => setOpen((bool) => !bool)}
          variant={"shadow"}
          className={`text-base bg-primary-button px-6 py-3 sm:px-8 h-auto`}
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
          {!mutation.isPending && "Shorten"}
        </Button>
      </section>
      {urlData && <ShareDialog data={urlData} open={open} setOpen={setOpen} />}
    </main>
  );
}

export default App;
