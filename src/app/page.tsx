import HomePage from "@/components/HomePage";
import { LocaleProvider } from "@/lib/site-context";

export default function Home() {
  return (
    <LocaleProvider locale="en">
      <HomePage />
    </LocaleProvider>
  );
}
