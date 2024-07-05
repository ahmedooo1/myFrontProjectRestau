<template>
  <div>
    <doughnut :data="chartData" :options="chartOptions"></doughnut>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  components: {
    Doughnut
  },
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartData() {
      return {
        labels: ['Utilisateurs', 'Commandes'],
        datasets: [
          {
            label: 'Statistics',
            backgroundColor: ['#FF6384', '#36A2EB'],
            data: this.data
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  }
}
</script>
