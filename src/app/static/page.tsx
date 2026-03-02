import { redirect } from "next/navigation";
import StaticCheckout from "@/presentation/components/static/StaticCheckout";

export default function StaticPage() {
  // Só permite acesso em desenvolvimento
  if (process.env.NODE_ENV !== "development") {
    redirect("/");
  }

  return <StaticCheckout />;
}
