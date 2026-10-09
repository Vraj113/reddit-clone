import PageHeader from "../components/ui/PageHeader";
import Link from "next/link";

export default function Explore() {
  return (
    <div>
      <PageHeader
        eyebrow="Discover"
        title="Explore"
        description="Find communities and conversations."
      />
      <Link href="/all" className="btn-primary inline-flex">
        Browse communities
      </Link>
    </div>
  );
}
