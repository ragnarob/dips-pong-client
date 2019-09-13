<template>
  <div style="width: 100%;">
    <h2>Ratings graph</h2>

    <div id="chart" v-if="$store.getters.ratingStats.categories.length > 1">
      <apexchart type=line height=300 :width="'100%'" :options="chartOptions" :series="series" />
    </div>

    <p v-else style="margin-top: 14px; text-align: center;">
      Need at least 2 days worth of data to display graph.
    </p>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  $mount: '#chart',
  
  components: {
    apexchart: VueApexCharts,
  },  

  data: function () {
    return {
      series: this.$store.getters.ratingStats.series,
      chartOptions: {
        chart: {
          zoom: {
              enabled: false
          },
          animations: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          categories: this.$store.getters.ratingStats.categories,
        }
      }
    }
  },

  created () {
    console.log(this.series)
  }
}
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
}
</style>