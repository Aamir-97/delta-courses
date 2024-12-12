import { ChangeDetectorRef, Component, Type } from '@angular/core';
import { Theme } from '../../global/shared/theme.model';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService } from '../../data/services/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    private cdf: ChangeDetectorRef
  ) {}

  public lineChartLegend = true;

  ngOnInit() {
    this.getCouresEnrolled();
    this.getUserCourseProgress();
  }

  private _selectedTheme: Theme = 'light-theme';
  public get selectedTheme() {
    return this._selectedTheme;
  }

  getCouresEnrolled() {
    this.dashboardService.getCoursesEnrolled().subscribe({
      next: (response) => {
        const enrolledCourses = response.courses.map((course: any) => {
          return course.course_name;
        });
        const enrolledCoursesCount = response.courses.map((course: any) => {
          return course.enrolled_user_count;
        });
        this.barChartData = {
          ...this.barChartData, // Spread operator to preserve other properties
          labels: enrolledCourses,
          datasets: [
            {
              ...this.barChartData.datasets[0],
              data: enrolledCoursesCount,
            },
          ],
        };
        // this.barChartData.labels = enrolledCourses;
        // this.barChartData.datasets[0].data = enrolledCoursesCount;
        this.cdf.detectChanges();
      },
      error: (error) => {
        this.openSnackBar(error.error.error, 'Close');
      },
    });
  }

  getUserCourseProgress() {
    this.dashboardService.getUserCourseProgerss().subscribe({
      next: (response) => {
        // Extract unique course names
        const uniqueCourseNames = [
          ...new Set(response.courses.map((course: any) => course.course_name)),
        ];

        // Group data by user_name
        const groupedData = response.courses.reduce((acc: any, course: any) => {
          // Find if user already exists in accumulator
          const existingUser = acc.find(
            (user: any) => user.label === course.user_name
          );

          if (existingUser) {
            // Add progress to existing user data
            existingUser.data.push(course.progress);
          } else {
            // Create new user data with course progress
            acc.push({
              label: course.user_name,
              data: [course.progress],
            });
          }

          return acc;
        }, []);
        this.lineChartData = {
          ...this.barChartData, // Spread operator to preserve other properties
          labels: uniqueCourseNames,
          datasets: groupedData,
        };
        // this.lineChartData.labels = uniqueCourseNames;
        // this.lineChartData.datasets = groupedData;
        this.cdf.detectChanges();
      },
      error: (error) => {
        this.openSnackBar(error.error.error, 'Close');
      },
    });
  }

  // Line Chart Configuration
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        label: 'Course Dataset',
        borderColor: 'blue',
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  // Bar Chart Configuration
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        label: 'Enrolled Courses Dataset',
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };

  // Pie Chart Configuration
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };

  // Radar Chart Configuration
  public radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: ['Strength', 'Speed', 'Endurance', 'Agility', 'Flexibility'],
    datasets: [
      {
        data: [65, 59, 90, 81, 56],
        label: 'Athlete 1',
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
      },
      {
        data: [28, 48, 40, 19, 96],
        label: 'Athlete 2',
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
      },
    ],
  };
  public radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
  };

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
