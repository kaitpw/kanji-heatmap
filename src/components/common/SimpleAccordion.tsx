import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactNode, useId } from "react";

const SimpleAccordion = ({
  trigger,
  children,
}: {
  trigger: ReactNode;
  children: ReactNode;
}) => {
  const accordionId = useId();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`accordion-${accordionId}`}>
        <AccordionTrigger className="p-2 flex justify-start space-x-2 focus:outline-none">
          {trigger}
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SimpleAccordion;
