import PortfolioForm from "./PortfolioForm";

export default function AdminPage() {
  return (
    <div className="mt-20 p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* ONLY FORM */}
      <PortfolioForm />
    </div>
  );
}