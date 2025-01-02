interface Question {
  id: number;
  question: string;
  answer: string;
}

export interface Category {
  id: number;
  categorieName: string;
  questions: Question[];
}
