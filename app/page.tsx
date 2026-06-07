import React from "react";

const sLand = {
  default: "w-full h-auto",
};

interface Mes {
  status: string;
  message: string;
}

const Home = async () => {
  const res = await fetch(process.env.API_URL);
  const mes: Mes = await res.json();
  return (
    <main className={sLand.default}>
      <p>{mes.message}</p>
    </main>
  );
};

export default Home;
