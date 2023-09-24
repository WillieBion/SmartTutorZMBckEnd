export interface IContentManagemnt {
  name: string;
  description: string;
}

export interface IExam {
  title: string;
  description: string;
  subject: number;
  year: string;
}

export interface IExamContent {
  exam: number;
  exam_type: string;
  exam_link: string;
}
