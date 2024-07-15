import React from 'react';


interface EditComponentProps {
  logoSrc: string;
  bannerSrc: string;
  cost: number;
  currency: string;
  rating: number;
}

const EditComponent: React.FC<EditComponentProps> = ({ logoSrc, bannerSrc, cost, currency, rating }) => {
  return (
    <main className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
      <img loading="lazy" src={logoSrc} alt="Company logo" className="shrink-0 aspect-[0.11] w-[91px]" />
      <section className="flex flex-col items-start px-5 my-auto max-md:max-w-full">
        <img loading="lazy" src={bannerSrc} alt="Banner" className="self-stretch w-full aspect-[5.26] max-md:max-w-full" />
        <h1 className="self-stretch mt-14 text-2xl font-bold leading-5 text-slate-600 max-md:mt-10 max-md:max-w-full">
          Edit
        </h1>
        <div className="flex gap-5 mt-11 max-w-full text-base bg-white w-[649px] max-md:flex-wrap max-md:mt-10">
          <div className="justify-center items-start px-10 py-5 text-white whitespace-nowrap bg-metal max-md:px-5">
            Cost
          </div>
          <div className="flex-auto my-auto font-bold text-slate-600 max-md:max-w-full">
            {cost} {currency}
          </div>
        </div>
        <div className="flex gap-5 pr-20 mt-10 bg-white max-md:flex-wrap max-md:pr-5 max-md:mt-10">
          <div className="justify-center px-9 py-5 text-base text-white whitespace-nowrap bg-metal max-md:px-5">
            Rating
          </div>
          
        </div>
        <button className="justify-center bg-liner100% items-center px-16 py-5 mt-10 max-w-full text-base font-bold text-center text-white whitespace-nowrap rounded-[41px] w-[371px] max-md:px-5 max-md:mt-10">
          UPDATE
        </button>
        
      </section>
    </main>
  );
};

export default EditComponent;