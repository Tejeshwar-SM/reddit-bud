import {
    Geist,
    Geist_Mono,
    Instrument_Sans,
    Noto_Sans,
} from "next/font/google";

export const notoSansHeading = Noto_Sans({
    subsets: ["latin"],
    variable: "--font-heading",
});

export const instrumentSans = Instrument_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
