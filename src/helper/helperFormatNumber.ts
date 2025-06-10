const numberFormats: Record<string, string[]> = {
	en: ["", "K", "M", "B", "T"],
	id: ["", "RB", "JT", "M", "T"],
};

export const helperFormatNumber = ({
	price,
	locale = "en",
}: { price: number; locale?: string }) => {
	if (typeof price !== "number" || Number.isNaN(price)) return "0";

	const suffixes = numberFormats[locale] || numberFormats.en;
	const absPrice = Math.abs(price);
	const digits = absPrice === 0 ? 0 : Math.floor(Math.log10(absPrice));
	const suffixIndex = Math.max(Math.floor(digits / 3), 0);

	if (suffixIndex === 0) return price.toFixed(1).replace(/\.0$/, "");

	const formattedPrice = (price / 10 ** (suffixIndex * 3))
		.toFixed(1)
		.replace(/\.0$/, "");

	return `${formattedPrice}${suffixes[suffixIndex]}`;
};
