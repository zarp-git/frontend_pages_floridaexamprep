import { Metadata } from "next";
import MaintenancePage from "@/presentation/pages/maintance/MaintenancePage";

export const metadata: Metadata = {
  title: "Site Under Maintenance | AllBricks Pavers",
  description:
    "Explore expert paver installation, sealing, and maintenance services in Lakeland, Davenport, and Central Florida. Trusted, local, and competitively priced.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Maintenance() {
  return <MaintenancePage />;
}
