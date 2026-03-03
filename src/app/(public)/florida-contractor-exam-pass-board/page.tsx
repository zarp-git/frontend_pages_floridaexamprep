import { Metadata } from "next";
import Header from "@/presentation/components/organisms/landing-page/Header";
import LandingFooter from "@/presentation/components/organisms/landing-page/LandingFooter";
import { PassBoardView } from "@/presentation/pages/(public)/florida-contractor-exam-pass-board/pass-board.view";

export const metadata: Metadata = {
  title: "Florida Contractor Exam Pass Board | Florida Exam Prep",
  description:
    "Recognizing students who successfully passed their Florida state contractor certification exams. See the top performers and join them on the Pass Board.",
  openGraph: {
    title: "Florida Contractor Exam Pass Board | Florida Exam Prep",
    description:
      "Recognizing students who successfully passed their Florida state contractor certification exams.",
    type: "website",
    url: "https://floridaexamprep.com/florida-contractor-exam-pass-board",
  },
};

export default function PassBoardPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <PassBoardView />
      </main>
      <LandingFooter />
    </div>
  );
}
