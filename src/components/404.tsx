import page404 from "@/assets/404.svg";

export default function NoMatch() {
  return (
    <main className="flex min-h-screen flex-col p-4 sm:p-5 items-center justify-center">
      <section className="container -mt-5 px-4 py-7 flex flex-col items-center justify-center">
        <div className="text-primary-header text-balance text-start md:text-center font-extrabold mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl">
            Don’t panic! <br /> We’re short on something right now. <br />
            We’ll be back soon.
          </h1>
        </div>
        <div className="flex-1 text-center mt-4 lg:mt-0 lg:ml-3">
          <img className="w-52" src={page404} alt="Error 404 Image" />
        </div>
      </section>
    </main>
  );
}
