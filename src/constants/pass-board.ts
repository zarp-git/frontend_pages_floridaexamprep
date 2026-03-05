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
  { name: "Alejandro Pujals", grade: "85.00%", exam: "Contract Administration", examDate: "14/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_alejando-pujals.jpg" },
  { name: "Alejandro Pujals", grade: "80.00%", exam: "Project Management", examDate: "28/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_alejando-pujals.jpg" },
  { name: "Antwon Zanders", grade: "70.00%", exam: "Contract Administration", examDate: "12/11/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_antwon-zanders.jpg" },
  { name: "Brandon Green", grade: "81.66%", exam: "Business and Finance", examDate: "27/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_brandon-green.jpg" },
  { name: "Camila Lujan", grade: "88.33%", exam: "Business and Finance", examDate: "25/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_camila-lujan.jpg" },
  { name: "Camila Lujan", grade: "83.33%", exam: "Contract Administration", examDate: "25/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_camila-lujan.jpg" },
  { name: "Camila Lujan", grade: "76.66%", exam: "Project Management", examDate: "25/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_camila-lujan.jpg" },
  { name: "Carl Brems", grade: "87.50%", exam: "Business and Finance", examDate: "25/10/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_carl-brems.jpg" },
  { name: "Caua Cunha", grade: "91.66%", exam: "Business and Finance", examDate: "16/09/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_caua-cunha.jpeg" },
  { name: "Christina Cabrera", grade: "85.00%", exam: "Contract Administration", examDate: "17/11/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_christina-cabrera.jpg" },
  { name: "Christina Taylor", grade: "86.88%", exam: "Project Management", examDate: "28/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_christina-taylor.jpg" },
  { name: "Christina Taylor", grade: "80.00%", exam: "Business and Finance", examDate: "28/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_christina-taylor.jpg" },
  { name: "Christina Taylor", grade: "80.00%", exam: "Contract Administration", examDate: "28/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_christina-taylor.jpg" },
  { name: "Corey Outlaw", grade: "92.50%", exam: "Business and Finance", examDate: "25/10/2025", hasAvatar: false },
  { name: "Daniel Pryor", grade: "85.00%", exam: "Business and Finance", examDate: "11/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_daniel-pryor.jpg" },
  { name: "Dayeissi Cabrera", grade: "71.56%", exam: "Business and Finance", examDate: "27/01/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_dayeissi-cabrera.jpg" },
  { name: "Deborah Thornton", grade: "88.33%", exam: "Business and Finance", examDate: "25/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_deborah-throrton.jpg" },
  { name: "Deborah Thornton", grade: "80.00%", exam: "Project Management", examDate: "25/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_deborah-throrton.jpg" },
  { name: "Dillon Moore", grade: "81.00%", exam: "Business and Finance", examDate: "02/10/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_dillon-moore.jpg" },
  { name: "Edison Padilha", grade: "85.00%", exam: "Business and Finance", examDate: "25/10/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_edison-padilha.jpg" },
  { name: "Felix Conde", grade: "70.83%", exam: "Business and Finance", examDate: "27/01/2026", hasAvatar: false },
  { name: "Gabby Trier", grade: "95.83%", exam: "Business and Finance", examDate: "02/03/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_gabby-tryer.jpg" },
  { name: "Gabriela Rivero", grade: "78.33%", exam: "Business and Finance", examDate: "25/09/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_gabriela-rivero.jpg" },
  { name: "Gavin Rudnick", grade: "70.00%", exam: "Project Management", examDate: "18/02/2026", hasAvatar: false },
  { name: "Henrique Lourenco", grade: "78.33%", exam: "Contract Administration", examDate: "12/02/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_henrique-lourenco.jpg" },
  { name: "Heriberto Canete", grade: "81.65%", exam: "Business and Finance", examDate: "06/01/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_heriberto-canete.jpg" },
  { name: "Howard Lizano", grade: "83.33%", exam: "Business and Finance", examDate: "12/01/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_howard-lizano.jpg" },
  { name: "Ilirjan Llangozi", grade: "75.83%", exam: "Business and Finance", examDate: "14/11/2025", hasAvatar: false },
  { name: "Joel Kennedy", grade: "78.33%", exam: "Business and Finance", examDate: "03/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_joel-kennedy.jpg" },
  { name: "Joey Baixauli", grade: "85.83%", exam: "Business and Finance", examDate: "25/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_joey-bauxali.jpg" },
  { name: "Joey Baixauli", grade: "85.00%", exam: "Contract Administration", examDate: "14/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_joey-bauxali.jpg" },
  { name: "John Baldovinos", grade: "71.66%", exam: "Business and Finance", examDate: "25/10/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_john-baldovinos.jpg" },
  { name: "Jonathan Parsons", grade: "70.83%", exam: "Business and Finance", examDate: "09/01/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_jonathan-parsons.jpg" },
  { name: "Jonathan Stewart", grade: "72.50%", exam: "Business and Finance", examDate: "04/10/2025", hasAvatar: false },
  { name: "Jorge Lima", grade: "98.33%", exam: "Business and Finance", examDate: "18/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_jorge-lima.jpg" },
  { name: "Jorge Rivera", grade: "79.16%", exam: "Business and Finance", examDate: "25/11/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_jorge-rivera.jpg" },
  { name: "Juan Cruz", grade: "70.00%", exam: "Business and Finance", examDate: "25/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_juan-cruz.jpg" },
  { name: "Kamila Ferreira", grade: "80.00%", exam: "Business and Finance", examDate: "18/10/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_kamila-ferreira.jpg" },
  { name: "Kevin Lopez", grade: "76.66%", exam: "Business and Finance", examDate: "12/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_kevin-lopez.jpg" },
  { name: "Klea Berhamaj", grade: "76.66%", exam: "Business and Finance", examDate: "24/0/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_klea-berhamaj.jpg" },
  { name: "Liliana Estepa", grade: "85.00%", exam: "Business and Finance", examDate: "25/09/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_liliana-estepa.jpg" },
  { name: "Liliana Estepa", grade: "83.33%", exam: "Project Management", examDate: "25/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_liliana-estepa.jpg" },
  { name: "Maansi Sharma", grade: "75.00%", exam: "Contract Administration", examDate: "26/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_maansi-sharma.jpg" },
  { name: "Michael Cardinez", grade: "85.83%", exam: "Business and Finance", examDate: "20/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_michael-cardinez.jpg" },
  { name: "Michael Garcia", grade: "86.66%", exam: "Business and Finance", examDate: "08/11/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_michael-garcia.jpg" },
  { name: "Michael Garcia", grade: "83.33%", exam: "Contract Administration", examDate: "03/01/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_michael-garcia.jpg" },
  { name: "Michael Garcia", grade: "76.66%", exam: "Project Management", examDate: "31/01/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_michael-garcia.jpg" },
  { name: "Miely Bandeira", grade: "71.66%", exam: "Business and Finance", examDate: "04/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_miely-bandeira.jpg" },
  { name: "Norberto Ortiz", grade: "70.00%", exam: "Business and Finance", examDate: "21/08/2025", hasAvatar: false },
  { name: "Oriana Hall", grade: "75.83%", exam: "Business and Finance", examDate: "21/01/2026", hasAvatar: false },
  { name: "Oryan Grey", grade: "80.00%", exam: "Business and Finance", examDate: "30/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_oryan-grey.jpg" },
  { name: "Paul Athineos", grade: "70.00%", exam: "Business and Finance", examDate: "15/10/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_paul-athineos.jpg" },
  { name: "Raphael Ventura", grade: "78.33%", exam: "Contract Administration", examDate: "06/02/2026", hasAvatar: false },
  { name: "Rebeca Gurgel", grade: "80.83%", exam: "Business and Finance", examDate: "21/01/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_rebeca-gurgel.jpg" },
  { name: "Robert Bagget", grade: "79.16%", exam: "Business and Finance", examDate: "02/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_robert-bagget.jpg" },
  { name: "Steven Diaz", grade: "78.33%", exam: "Business and Finance", examDate: "29/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_steven-diaz.jpg" },
  { name: "Tim Andersen", grade: "72.50%", exam: "Business and Finance", examDate: "27/09/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_tim-andersen.jpg" },
  { name: "Tyler Cook", grade: "76.66%", exam: "Business and Finance", examDate: "25/12/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_tyler-cook.jpg" },
  { name: "Vitor Neves", grade: "72.50%", exam: "Business and Finance", examDate: "13/01/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_vitor-neves.jpg" },
  { name: "Xiomara Medrano", grade: "80.00%", exam: "Business and Finance", examDate: "22/11/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_xiomara-medrano.jpg" },
  { name: "Zachary Ruderman", grade: "93.33%", exam: "Project Management", examDate: "18/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_zachary-ruderman.jpg" },
  { name: "Zachary Ruderman", grade: "100.00%", exam: "Contract Administration", examDate: "06/02/2026", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_zachary-ruderman.jpg" },
  { name: "Zahira Tieso-Tieso", grade: "80.83%", exam: "Business and Finance", examDate: "17/11/2025", hasAvatar: true, avatarPath: "/images/pass-board_avatars/floridaexamprep_student_zahira-tieso-tieso.jpg" },
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
