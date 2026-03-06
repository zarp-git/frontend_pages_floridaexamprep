// Pass Board Constants - Single Source of Truth for Pass Board data

export interface PassBoardStudent {
  name: string;
  grade: string;
  exam: string;
  examDate: string;
  hasAvatar: boolean;
  avatarPath?: string;
}

export const PASS_BOARD_STUDENTS: PassBoardStudent[] = [
  { name: "Alejandro Pujals", grade: "85.00%", exam: "Contract Administration", examDate: "02/14/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_alejando-pujals.jpg" },
  { name: "Alejandro Pujals", grade: "80.00%", exam: "Project Management", examDate: "02/28/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_alejando-pujals.jpg" },
  { name: "Antwon Zanders", grade: "70.00%", exam: "Contract Administration", examDate: "11/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_antwon-zanders.jpg" },
  { name: "Brandon Green", grade: "81.66%", exam: "Business and Finance", examDate: "12/27/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_brandon-green.jpg" },
  { name: "Camila Lujan", grade: "88.33%", exam: "Business and Finance", examDate: "12/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_camila-lujan.jpg" },
  { name: "Camila Lujan", grade: "83.33%", exam: "Contract Administration", examDate: "12/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_camila-lujan.jpg" },
  { name: "Camila Lujan", grade: "76.66%", exam: "Project Management", examDate: "12/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_camila-lujan.jpg" },
  { name: "Carl Brems", grade: "87.50%", exam: "Business and Finance", examDate: "10/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_carl-brems.jpg" },
  { name: "Caua Cunha", grade: "91.66%", exam: "Business and Finance", examDate: "09/16/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_caua-cunha.jpeg" },
  { name: "Christina Cabrera", grade: "85.00%", exam: "Contract Administration", examDate: "11/17/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_christina-cabrera.jpg" },
  { name: "Christina Taylor", grade: "86.88%", exam: "Project Management", examDate: "02/28/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_christina-taylor.jpg" },
  { name: "Christina Taylor", grade: "80.00%", exam: "Business and Finance", examDate: "02/28/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_christina-taylor.jpg" },
  { name: "Christina Taylor", grade: "80.00%", exam: "Contract Administration", examDate: "02/28/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_christina-taylor.jpg" },
  { name: "Corey Outlaw", grade: "92.50%", exam: "Business and Finance", examDate: "10/25/2025", hasAvatar: false },
  { name: "Daniel Pryor", grade: "85.00%", exam: "Business and Finance", examDate: "02/11/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_daniel-pryor.jpg" },
  { name: "Dayeissi Cabrera", grade: "71.56%", exam: "Business and Finance", examDate: "01/27/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_dayeissi-cabrera.jpg" },
  { name: "Deborah Thornton", grade: "88.33%", exam: "Business and Finance", examDate: "12/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_deborah-throrton.jpg" },
  { name: "Deborah Thornton", grade: "80.00%", exam: "Project Management", examDate: "12/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_deborah-throrton.jpg" },
  { name: "Dillon Moore", grade: "81.00%", exam: "Business and Finance", examDate: "10/02/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_dillon-moore.jpg" },
  { name: "Edison Padilha", grade: "85.00%", exam: "Business and Finance", examDate: "10/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_edison-padilha.jpg" },
  { name: "Felix Conde", grade: "70.83%", exam: "Business and Finance", examDate: "01/27/2026", hasAvatar: false },
  { name: "Gabby Trier", grade: "95.83%", exam: "Business and Finance", examDate: "03/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_gabby-tryer.jpg" },
  { name: "Gabriela Rivero", grade: "78.33%", exam: "Business and Finance", examDate: "09/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_gabriela-rivero.jpg" },
  { name: "Gavin Rudnick", grade: "70.00%", exam: "Project Management", examDate: "02/18/2026", hasAvatar: false },
  { name: "Henrique Lourenco", grade: "78.33%", exam: "Contract Administration", examDate: "02/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_henrique-lourenco.jpg" },
  { name: "Heriberto Canete", grade: "81.65%", exam: "Business and Finance", examDate: "01/06/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_heriberto-canete.jpg" },
  { name: "Howard Lizano", grade: "83.33%", exam: "Business and Finance", examDate: "01/12/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_howard-lizano.jpg" },
  { name: "Ilirjan Llangozi", grade: "75.83%", exam: "Business and Finance", examDate: "11/14/2025", hasAvatar: false },
  { name: "Joel Kennedy", grade: "78.33%", exam: "Business and Finance", examDate: "12/03/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_joel-kennedy.jpg" },
  { name: "Joey Baixauli", grade: "85.83%", exam: "Business and Finance", examDate: "12/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_joey-bauxali.jpg" },
  { name: "Joey Baixauli", grade: "85.00%", exam: "Contract Administration", examDate: "02/14/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_joey-bauxali.jpg" },
  { name: "John Baldovinos", grade: "71.66%", exam: "Business and Finance", examDate: "10/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_john-baldovinos.jpg" },
  { name: "Jonathan Parsons", grade: "70.83%", exam: "Business and Finance", examDate: "01/09/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_jonathan-parsons.jpg" },
  { name: "Jonathan Stewart", grade: "72.50%", exam: "Business and Finance", examDate: "10/04/2025", hasAvatar: false },
  { name: "Jorge Lima", grade: "98.33%", exam: "Business and Finance", examDate: "02/18/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_jorge-lima.jpg" },
  { name: "Jorge Rivera", grade: "79.16%", exam: "Business and Finance", examDate: "11/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_jorge-rivera.jpg" },
  { name: "Juan Cruz", grade: "70.00%", exam: "Business and Finance", examDate: "12/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_juan-cruz.jpg" },
  { name: "Kamila Ferreira", grade: "80.00%", exam: "Business and Finance", examDate: "10/18/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_kamila-ferreira.jpg" },
  { name: "Kevin Lopez", grade: "76.66%", exam: "Business and Finance", examDate: "02/12/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_kevin-lopez.jpg" },
  { name: "Klea Berhamaj", grade: "76.66%", exam: "Business and Finance", examDate: "01/24/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_klea-berhamaj.jpg" },
  { name: "Liliana Estepa", grade: "85.00%", exam: "Business and Finance", examDate: "09/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_liliana-estepa.jpg" },
  { name: "Liliana Estepa", grade: "83.33%", exam: "Project Management", examDate: "12/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_liliana-estepa.jpg" },
  { name: "Maansi Sharma", grade: "75.00%", exam: "Contract Administration", examDate: "02/26/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_maansi-sharma.jpg" },
  { name: "Michael Cardinez", grade: "85.83%", exam: "Business and Finance", examDate: "02/20/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_michael-cardinez.jpg" },
  { name: "Michael Garcia", grade: "86.66%", exam: "Business and Finance", examDate: "11/08/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_michael-garcia.jpg" },
  { name: "Michael Garcia", grade: "83.33%", exam: "Contract Administration", examDate: "01/03/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_michael-garcia.jpg" },
  { name: "Michael Garcia", grade: "76.66%", exam: "Project Management", examDate: "01/31/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_michael-garcia.jpg" },
  { name: "Miely Bandeira", grade: "71.66%", exam: "Business and Finance", examDate: "02/04/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_miely-bandeira.jpg" },
  { name: "Norberto Ortiz", grade: "70.00%", exam: "Business and Finance", examDate: "08/21/2025", hasAvatar: false },
  { name: "Oriana Hall", grade: "75.83%", exam: "Business and Finance", examDate: "01/21/2026", hasAvatar: false },
  { name: "Oryan Grey", grade: "80.00%", exam: "Business and Finance", examDate: "12/30/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_oryan-grey.jpg" },
  { name: "Paul Athineos", grade: "70.00%", exam: "Business and Finance", examDate: "10/15/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_paul-athineos.jpg" },
  { name: "Raphael Ventura", grade: "78.33%", exam: "Contract Administration", examDate: "02/06/2026", hasAvatar: false },
  { name: "Rebeca Gurgel", grade: "80.83%", exam: "Business and Finance", examDate: "01/21/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_rebeca-gurgel.jpg" },
  { name: "Robert Bagget", grade: "79.16%", exam: "Business and Finance", examDate: "12/02/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_robert-bagget.jpg" },
  { name: "Steven Diaz", grade: "78.33%", exam: "Business and Finance", examDate: "12/29/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_steven-diaz.jpg" },
  { name: "Tim Andersen", grade: "72.50%", exam: "Business and Finance", examDate: "09/27/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_tim-andersen.jpg" },
  { name: "Tyler Cook", grade: "76.66%", exam: "Business and Finance", examDate: "12/25/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_tyler-cook.jpg" },
  { name: "Vitor Neves", grade: "72.50%", exam: "Business and Finance", examDate: "01/13/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_vitor-neves.jpg" },
  { name: "Xiomara Medrano", grade: "80.00%", exam: "Business and Finance", examDate: "11/22/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_xiomara-medrano.jpg" },
  { name: "Zachary Ruderman", grade: "93.33%", exam: "Project Management", examDate: "02/18/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_zachary-ruderman.jpg" },
  { name: "Zachary Ruderman", grade: "100.00%", exam: "Contract Administration", examDate: "02/06/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_zachary-ruderman.jpg" },
  { name: "Zahira Tieso-Tieso", grade: "80.83%", exam: "Business and Finance", examDate: "11/17/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_zahira-tieso-tieso.jpg" },
];

export const PASS_BOARD_EXAM_CATEGORIES = [
  "All Course Categories",
  "Business and Finance",
  "Contract Administration",
  "Project Management",
] as const;

export const PASS_BOARD_CONFIG = {
  title: "Florida's Pass Board",
  subtitle: "FloridaExamPrep Passport recognizes students who use FloridaExamPrep to successfully pass their Florida State Exam.",
  lastUpdated: "Mar 5, 2026",
  itemsPerPage: 10,
} as const;
