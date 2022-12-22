import React from "react";

const AccountDetails = ({ address, email, phone, name, loading }) => {
  return (
    <section className="mx-auto p-6">
      {loading.isLoading ? (
        <p className="w-full text-center text-dark-brown dark:text-white-bone">
          {loading.loadingMessage}
        </p>
      ) : (
        <>
          <h2 className="mb-4 text-lg font-semibold dark:text-white-bone">
            User Detail :
          </h2>
          <div className="mb-6 flex items-center dark:text-white-bone">
            <span className="w-24">Name</span>
            <span>{`${name?.firstname} ${name?.lastname}`}</span>
          </div>
          <div className="mb-6 flex items-center dark:text-white-bone">
            <span className="w-24">Email</span>
            <span>{email}</span>
          </div>
          <div className="mb-6 flex items-center dark:text-white-bone">
            <span className="w-24">Phone</span>
            <span>{phone}</span>
          </div>
          <h2 className="mb-4 text-lg font-semibold dark:text-white-bone">
            Address :
          </h2>
          <div className="mb-6 flex items-center dark:text-white-bone">
            <span className="w-24">Street</span>
            <span>
              {address?.street}, {address?.number}
            </span>
          </div>
          <div className="mb-6 flex items-center dark:text-white-bone">
            <span className="w-24">City</span>
            <span>{address?.city}</span>
          </div>
          <div className="mb-6 flex items-center dark:text-white-bone">
            <span className="w-24">Zip Code</span>
            <span>{address?.zipcode}</span>
          </div>
        </>
      )}
    </section>
  );
};

export default AccountDetails;
