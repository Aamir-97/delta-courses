import { Component, Type } from '@angular/core';
// import { ChartOptions, ChartData, ChartConfiguration } from 'chart.js';
// import { BaseChartDirective, ThemeService } from 'ng2-charts';
import { Theme } from '../../global/shared/theme.model';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { DashboardService } from '../../data/services/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // imports: [BaseChartDirective],
  imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // constructor(private themeService: ThemeService) {}
  // public barChartOptions: ChartOptions<'line'> = {
  //   responsive: false,
  // };

  constructor(
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar
  ) {}

  public lineChartLegend = true;

  ngOnInit() {
    // this.barChartOptions = this.themeService.getColorschemesOptions();
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
        this.barChartData.labels = enrolledCourses;
        this.barChartData.datasets[0].data = enrolledCoursesCount;
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
        // const courseProgress = response.courses.map((course: any) => {
        //   return course.course_progress;
        // });

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

        // const courseProgressCount = response.courses.map((course: any) => {
        //   return course.enrolled_user_count;
        // });
        this.lineChartData.labels = uniqueCourseNames;
        this.lineChartData.datasets = groupedData;
      },
      error: (error) => {
        this.openSnackBar(error.error.error, 'Close');
      },
    });
  }

  // public set selectedTheme(value) {
  //   this._selectedTheme = value;
  //   let overrides: ChartOptions;
  //   if (this.selectedTheme === 'dark-theme') {
  //     overrides = {
  //       plugins: {
  //         legend: {
  //           labels: { color: 'white' },
  //         },
  //       },
  //       scales: {
  //         x: {
  //           ticks: { color: 'white' },
  //           grid: { color: 'rgba(255,255,255,0.1)' },
  //         },
  //         y: {
  //           ticks: { color: 'white' },
  //           grid: { color: 'rgba(255,255,255,0.1)' },
  //         },
  //       },
  //     };
  //   } else {
  //     overrides = {};
  //   }
  //   this.themeService.setColorschemesOptions(overrides);
  // }

  // setCurrentTheme(theme: Theme) {
  //   this.selectedTheme = theme;
  // }

  // public lineChartData: ChartConfiguration<'line'>['data'] = {
  //   labels: [
  //     'January',
  //     'February',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July',
  //     'August',
  //     'September',
  //     'October',
  //     'November',
  //     'December',
  //   ],

  //   datasets: [
  //     {
  //       data: [40, 45, 50, 55, 60, 65, 70, 75, 70, 60, 50, 45],
  //       label: 'Angular',
  //       fill: true,
  //       tension: 0.5,
  //       borderColor: 'black',
  //       backgroundColor: 'rgba(255,0,0,0.3)',
  //     },

  //     {
  //       data: [45, 50, 60, 70, 75, 65, 50, 60, 55, 50, 45, 45],
  //       label: 'React',
  //       fill: true,
  //       tension: 0.5,
  //       borderColor: 'black',
  //       backgroundColor: 'rgba(0,255,0,0.3)',
  //     },
  //   ],
  // };

  // datasets: ChartData<'bar', { key: string; value: number }[]> = {
  //   datasets: [
  //     {
  //       data: [
  //         { key: 'Sales', value: 20 },
  //         { key: 'Revenue', value: 10 },
  //       ],
  //       parsing: {
  //         xAxisKey: 'key',
  //         yAxisKey: 'value',
  //       },
  //     },
  //   ],
  // };

  // Line Chart Configuration
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55],
        label: 'Course Dataset',
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        fill: true,
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  // Bar Chart Configuration
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
