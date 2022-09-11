import React, { useRef } from "react";

const NewsLetter = () => {
  const inputRef = useRef();

  const emailSubmitHandler = (event) => {
    event.preventDefault();
    const emailInput = inputRef.current.value;
    alert(emailInput);
  };

  return (
    <section className="flex flex-col items-center gap-y-2 border-b border-b-dark-brown p-6 md:mx-0 md:min-h-fit md:min-w-[40%] md:border-r md:border-r-dark-brown md:border-b-transparent md:p-10">
      <h2 className="font-noto text-2xl font-medium uppercase md:text-3xl">
        NewsLetter
      </h2>
      <p className="text-sm">Join our newsletter</p>
      <form
        onSubmit={emailSubmitHandler}
        className="flex max-w-fit items-center border-b border-b-dark-brown"
      >
        <input
          type="email"
          ref={inputRef}
          placeholder="Email"
          className="max-w-sm bg-white-bone p-2 text-sm uppercase outline-none placeholder:text-dark-brown"
        />
        <button className="text-sm uppercase">Submit</button>
      </form>
    </section>
  );
};

export default NewsLetter;
