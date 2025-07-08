import {
    freqCategoryCn,
    freqRankMaxMin,
    getFreqCategory,
} from "@/lib/freq/freq-category";

// Helper function to convert number to Japanese with 百 and 千
const toJapaneseHundreds = (num: number): string => {
    if (num >= 1000) {
        const thousands = num / 1000;
        return `${thousands.toFixed(1)}千`;
    }
    const hundreds = Math.floor(num / 100);
    return `${hundreds}百`;
};

export const CircularFreqBadge = ({
    freqRank,
}: {
    freqRank?: number | null;
}) => {
    if (freqRank == null || freqRank < 1) {
        return null;
    }

    const freqCategory = getFreqCategory(freqRank);
    const { max } = freqRankMaxMin[freqCategory];

    // Display the upper bound of the frequency bin in Japanese
    const displayValue = max === Number.POSITIVE_INFINITY
        ? "2400+"
        : toJapaneseHundreds(max);

    return (
        <div
            className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold shadow-md ${
                freqCategoryCn[freqCategory]
            } text-black`}
            title={`Frequency rank: ${freqRank} (bin: ${displayValue})`}
        >
            {displayValue}
        </div>
    );
};
