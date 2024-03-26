import page404 from "@/assets/404.svg";

export default function NoMatch() {
  return (
    <main className="flex min-h-screen flex-col p-4 sm:p-5 items-center justify-center">
      <section className="container -mt-5 px-4 py-7 flex flex-col items-center justify-center">
        <div className="text-primary-header text-balance text-start md:text-center font-extrabold mx-auto">
          {/* <h1 className="font-sans text-3xl sm:text-7xl 2xl:text-[7.5rem]">Shorten your URLs</h1> */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl">
            Don’t panic! We’re short of something right now. We’ll be back soon.
          </h1>
        </div>
        <div className="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
          <img className="w-52" src={page404} alt="Error 404 Image" />
        </div>
      </section>
    </main>
  );
}
