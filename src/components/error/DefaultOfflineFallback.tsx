import { DefaultErrorFallback } from "./DefaultErrorFallback";

export const DefaultOfflineFallback = () => {
  const offlineMessage = `This feature isn’t cached yet 😅—Try it out once while online, and it'll be available anytime, anywhere—even offline! 📱✨`;

  return (
    <DefaultErrorFallback message={offlineMessage} showDefaultCta={false} />
  );
};
