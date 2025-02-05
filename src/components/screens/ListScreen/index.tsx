import { Settings } from "lucide-react";
import ControlBar from "./ControlBar";
import SimpleAccordion from "@/components/common/SimpleAccordion";
import SettingsForm from "./SettingsForm";

const SettingsAccordion = () => {
  return (
    <SimpleAccordion
      trigger={
        <>
          <Settings size={15} />
          <span className="px-1">Settings</span>
        </>
      }
      content={<SettingsForm />}
    />
  );
};

const ListScreen = () => {
  return (
    <div className="w-full text-sm p-2 mx-auto">
      <ControlBar />
      <section className="mx-auto max-w-screen-xl my-1 rounded-sm">
        <SettingsAccordion />
      </section>
    </div>
  );
};

export default ListScreen;
