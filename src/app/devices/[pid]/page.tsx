import PageTitle from "@/components/PageTitle/PageTitle";
import { useRouter } from "next/router";

export default function DevicesPage({params}) {
  const pid = params.pid;

  return (
    <div className="flex flex-col space-y-10 justify-center items-center">
      <PageTitle
        title={pid}
        description="All information about the device"
      />
    </div>
  );
}
