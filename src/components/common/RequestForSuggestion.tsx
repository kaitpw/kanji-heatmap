import { otherOutLinks, outLinks } from "@/lib/external-links";
import { ExternalTextLink } from "./ExternalTextLink";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**

- Got a better sample vocabulary for this Kanji? Share your suggestions on GitHub or Discord – we'd love your input!
- Have a better example for this Kanji? Share your suggestions on GitHub or Discord—we appreciate your input!
- Know a more useful vocabulary example for this Kanji? Contribute on GitHub or Discord—your help is welcome!
- Can you suggest a better word for this Kanji? Join the discussion on GitHub or Discord!
- Want to improve this Kanji example? Share your ideas on GitHub or Discord!
- Have a more fitting vocabulary word for this Kanji? Let us know on GitHub or Discord!

Know a more useful vocabulary word for this Kanji? Share your thoughts on Github or Discord!
*/
export const RequestForSuggestionCasual = () => {
  return (
    <div className="text-sm my-3 text-left">
      *Want to suggest more useful sample words or a more memorable keyword for
      this kanji? Share your thoughts on
      <ExternalTextLink text={"Github"} href={outLinks.githubContentIssue} />
      or <ExternalTextLink text={"Discord"} href={outLinks.discord} />
      {"🫰🫰"}
    </div>
  );
};

export const MiscellaneousCallout = () => {
  return (
    <Alert className="my-2 border-yellow-400 border-2 border-dashed">
      <AlertCircle className="h-4 w-4 text-left flex items-start" />
      <AlertTitle className="text-left text-xs font-bold">
        Disclaimer:
      </AlertTitle>
      <AlertDescription className="text-xs text-left">
        <ul>
          <li>
            {"- Word Readings 📖  are pulled from"}
            <ExternalTextLink
              text={" doublevil/JmdictFurigana"}
              href={otherOutLinks.jmdictFurigana}
            />
            {"... they're not all manually-checked yet, so don't be surprised if some are a little... unique 🧐😅"}
          </li>
          <li>
            {"- The audio? 🔊 We use ElevenLabs AI for high-quality Japanese pronunciation, with browser Speech Synthesis as a fallback. Much better than robot vibes! 🎤✨"}
          </li>
          <li>
            {"- If you catch anything weird, drop us a note on"}
            <ExternalTextLink
              text={"Github"}
              href={outLinks.githubContentIssue}
            />
            or <ExternalTextLink text={"Discord"} href={outLinks.discord} />
            {"- We might fix it.. eventually 😁"}
          </li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};
