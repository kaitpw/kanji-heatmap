import { useState } from "react";

import BasicSelect from "../../common/BasicSelect";

export function DummySelect() {
  const [value, setValue] = useState("meaning");

  return (
    <BasicSelect
      value={value}
      onChange={(newValue) => setValue(newValue)}
      triggerCN={"h-8 max-w-44 sm:max-w-64"}
      options={[
        { value: "meaning", label: "Meaning" },
        { value: "onyomi", label: "Onyomi" },
        { value: "kunyomi", label: "Kunyomi" },
      ]}
    />
  );
}

const UppercaseHeading = ({ title }: { title: string }) => {
  return (
    <h1 className="text-xs uppercase font-bold my-1 underline">{title}</h1>
  );
};

const SortOrderSection = () => {
  return (
    <section className="flex items-start flex-col mt-2">
      <UppercaseHeading title="Sort Order" />
      <section className="flex flex-col ml-4 space-y-1 w-full md:flex-row md:space-y-0 md:space-x-0">
        <div className="pl-2 flex items-center">
          <div className="mr-2 text-nowrap text-left w-[60px]">Order by</div>
          <DummySelect />
        </div>
        <div className="pl-2 flex items-center ">
          <div className="mr-2 text-nowrap text-left w-[60px]">Then by</div>
          <DummySelect />
        </div>
        <div className="pl-2 flex items-center">
          <div className="mr-2 text-nowrap text-left w-[60px]">Then by</div>
          <DummySelect />
        </div>
      </section>
    </section>
  );
};

const FilterSection = () => {
  return (
    <section>
      <UppercaseHeading title="Filters" />
    </section>
  );
};

const SettingsForm = () => {
  return (
    <section className="flex flex-col items-start justify-start px-4 w-full">
      <SortOrderSection />
      <FilterSection />
    </section>
  );
};

export default SettingsForm;
