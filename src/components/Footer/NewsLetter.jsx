import React, { useRef } from "react";

import { Input, Button } from "components/UI";

const NewsLetter = () => {
  const inputRef = useRef();

  const emailSubmitHandler = (event) => {
    event.preventDefault();
    const emailInput = inputRef.current.value;
    alert(emailInput);
  };

  return (
    <section className="flex flex-col items-center gap-y-2 border-y border-y-dark-brown p-6 dark:border-y-white-bone md:mx-0 md:min-h-fit md:min-w-[40%] md:border-r md:border-r-dark-brown md:p-10 md:dark:border-r-white-bone">
      <h2 className="font-noto text-2xl font-medium uppercase dark:text-white-bone md:text-3xl">
        NewsLetter
      </h2>
      <p className="text-sm dark:text-white-bone">Join our newsletter</p>
      <form
        onSubmit={emailSubmitHandler}
        className="flex max-w-fit items-center border-b border-b-dark-brown dark:border-white-bone"
      >
        <Input
          type="email"
          ref={inputRef}
          placeholder="Email"
          className="max-w-sm border-none bg-white-bone p-2 text-sm outline-none ring-0 placeholder:uppercase placeholder:text-dark-brown dark:bg-dark-brown dark:text-white-bone dark:placeholder:text-white-bone"
        />
        <Button className="py-2 px-3 text-sm uppercase duration-300 hover:bg-dark-brown hover:text-white-bone dark:bg-dark-brown dark:text-white-bone dark:hover:bg-white-bone dark:hover:text-dark-brown">
          Submit
        </Button>
      </form>
    </section>
  );
};

export default NewsLetter;
