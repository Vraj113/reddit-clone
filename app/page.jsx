import Posts from "./components/containers/Posts";
import PageHeader from "./components/ui/PageHeader";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Home"
        title="Popular discussions"
        description="Latest posts from communities across the platform."
        action={
          <Link href="/create" className="btn-primary">
            New post
          </Link>
        }
      />
      <Posts />
    </div>
  );
}
