import { Metadata } from "next";
import ThankYouContent from "@/presentation/components/organisms/thank-you/ThankYouContent";

export const metadata: Metadata = {
  title: "Thank You | Florida Exam Prep",
  description: "Thank you for your purchase. Welcome to Florida Exam Prep!",
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
