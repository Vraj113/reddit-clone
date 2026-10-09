import PageHeader from "../components/ui/PageHeader";

export default function Settings() {
  return (
    <div>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Account preferences will live here."
      />
      <div className="card p-8 text-sm text-slate-600">No settings to change yet.</div>
    </div>
  );
}
