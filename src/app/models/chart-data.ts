export interface ChartData {
    datasets: [{
      label: string,
      data: number[],
      backgroundColor: string,
      borderColor: string,
      borderWidth: number
    }],
    labels: string[],
  }
