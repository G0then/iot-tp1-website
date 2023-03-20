import HomeTopInfoGrid from "@/components/Home/TopInfoGrid";
import HomeMainInfoGrid from "@/components/Home/MainInfoGrid"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center space-y-10">
      <HomeTopInfoGrid/>
      <HomeMainInfoGrid />
    </main>
  );
}
