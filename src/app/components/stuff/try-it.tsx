import React from "react";
import Requirements from "../tiny/requirements";
import TryItBtn from "../tiny/try-it-btn";

export default function TryIt() {
  return (
    <>
      <section className="w-11/12 mx-auto bg-gradient-to-br from-brick/10 to-blue-dark/20 my-8 py-12 px-5 md:px-10 border border-blue-light/40 rounded-md">
        <div className="w-full md:w-9/12 mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-8">
            Try It Out <span className="text-brick font-medium">for Free</span>{" "}
            Today
          </h2>
          <Requirements />
          <TryItBtn />
        </div>
      </section>
    </>
  );
}
