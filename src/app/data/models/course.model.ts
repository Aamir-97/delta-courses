export interface CoursesModel {
  idcourses: number;
  name: string;
  code: string;
  rating: string;
  price: string;
  description: string;
  image_url: string | null;
  category: string;
}

export interface CourseDetailModel {
  idcourses: number;
  name: string;
  code: string;
  rating: string;
  price: string;
  description: string;
  image_url: string;
  idteacher: number;
  nic: string;
  mobile: string;
  edu_qualification: string;
  course_id: number;
  teacher_name: string;
  course_name: string;
}

export interface CourseByUserIdModel {
  idcourses: number;
  name: string;
  code: string;
  rating: string;
  price: string;
  description: string;
  image_url: string;
  progress: number;
}
