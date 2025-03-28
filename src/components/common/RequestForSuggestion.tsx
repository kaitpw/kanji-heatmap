import { outLinks } from "@/lib/external-links";
import { ExternalTextLink } from "./ExternalTextLink";

/**

- Got a better sample vocabulary for this Kanji? Share your suggestions on GitHub or Discord – we'd love your input!
- Have a better example for this Kanji? Share your suggestions on GitHub or Discord—we appreciate your input!
- Know a more useful vocabulary example for this Kanji? Contribute on GitHub or Discord—your help is welcome!
- Can you suggest a better word for this Kanji? Join the discussion on GitHub or Discord!
- Want to improve this Kanji example? Share your ideas on GitHub or Discord!
- Have a more fitting vocabulary word for this Kanji? Let us know on GitHub or Discord!

Know a more useful vocabulary word for this Kanji? Share your thoughts on Github or Discord!
*/
export const RequestForSuggestion = () => {
  return (
    <div className="text-sm my-3 text-left">
      *Want to suggest a better keyword or more useful sample vocabulary for
      this Kanji? Share your thoughts on
      <ExternalTextLink text={"Github"} href={outLinks.githubContentIssue} />
      or <ExternalTextLink text={"Discord"} href={outLinks.discord} />
      {"🫰🫰"}
    </div>
  );
};
