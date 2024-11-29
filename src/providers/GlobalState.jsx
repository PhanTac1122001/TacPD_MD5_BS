import React from "react";
import Header from "../components/Header";

import FormAdd from "../components/FormAdd";

export default function GlobalState() {
  return (
    <>
      <div className="container mx-auto p-6">
        <Header />
        <FormAdd />
      </div>
    </>
  );
}
